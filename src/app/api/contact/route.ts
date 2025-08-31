import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

// Initialize Resend lazily to avoid build-time errors
let resend: Resend | null = null
const getResend = () => {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  budget: z.string().optional(),
  timeline: z.string().optional(),
})

// Rate limiting (simple in-memory store)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 5 // max 5 requests per minute per IP
  
  const record = rateLimitStore.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>"'&]/g, '') // Remove potentially dangerous characters
    .trim()
}

function createEmailTemplate(data: z.infer<typeof contactSchema>): { html: string; text: string } {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb, #10b981); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .content { background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #374151; }
        .value { margin-top: 5px; padding: 8px; background: white; border-radius: 4px; border: 1px solid #e5e7eb; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>New Contact Form Submission</h1>
        <p>You have received a new message through your portfolio contact form.</p>
      </div>
      
      <div class="content">
        <div class="field">
          <div class="label">Name:</div>
          <div class="value">${sanitizeInput(data.name)}</div>
        </div>
        
        <div class="field">
          <div class="label">Email:</div>
          <div class="value">${sanitizeInput(data.email)}</div>
        </div>
        
        ${data.company ? `
        <div class="field">
          <div class="label">Company:</div>
          <div class="value">${sanitizeInput(data.company)}</div>
        </div>
        ` : ''}
        
        ${data.budget ? `
        <div class="field">
          <div class="label">Budget:</div>
          <div class="value">${sanitizeInput(data.budget)}</div>
        </div>
        ` : ''}
        
        ${data.timeline ? `
        <div class="field">
          <div class="label">Timeline:</div>
          <div class="value">${sanitizeInput(data.timeline)}</div>
        </div>
        ` : ''}
        
        <div class="field">
          <div class="label">Message:</div>
          <div class="value">${sanitizeInput(data.message).replace(/\n/g, '<br>')}</div>
        </div>
      </div>
      
      <div class="footer">
        <p>This message was sent through your portfolio contact form at ${new Date().toLocaleString()}</p>
        <p>Reply directly to this email to respond to ${data.name}</p>
      </div>
    </body>
    </html>
  `
  
  const text = `
New Contact Form Submission
${'-'.repeat(30)}

Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}\n` : ''}${data.budget ? `Budget: ${data.budget}\n` : ''}${data.timeline ? `Timeline: ${data.timeline}\n` : ''}
Message:
${data.message}

${'-'.repeat(30)}
Sent at: ${new Date().toLocaleString()}
  `
  
  return { html, text }
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }
    
    // Parse and validate request body
    const body = await request.json()
    const validatedData = contactSchema.parse(body)
    
    // Check required environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { success: false, message: 'Email service is not configured' },
        { status: 500 }
      )
    }
    
    if (!process.env.OWNER_EMAIL || !process.env.SENDER_EMAIL) {
      console.error('OWNER_EMAIL or SENDER_EMAIL is not configured')
      return NextResponse.json(
        { success: false, message: 'Email configuration is incomplete' },
        { status: 500 }
      )
    }
    
    // Create email templates
    const { html, text } = createEmailTemplate(validatedData)
    
    // Send email to owner
    const emailData = {
      from: process.env.SENDER_EMAIL,
      to: process.env.OWNER_EMAIL,
      replyTo: validatedData.email,
      subject: `New Contact: ${validatedData.name} - ${validatedData.company || 'Portfolio Contact'}`,
      html,
      text,
      headers: {
        'X-Entity-Ref-ID': `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      },
    }
    
    const resendClient = getResend()
    if (!resendClient) {
      return NextResponse.json(
        { success: false, message: 'Email service is not configured' },
        { status: 500 }
      )
    }
    
    const { error: sendError } = await resendClient.emails.send(emailData)
    
    if (sendError) {
      console.error('Resend error:', sendError)
      return NextResponse.json(
        { success: false, message: 'Failed to send email' },
        { status: 500 }
      )
    }
    
    // Send confirmation email to user
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Thank you for your message</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb, #10b981); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
          .content { background: #f8fafc; padding: 20px; border-radius: 8px; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Thank You, ${validatedData.name}!</h1>
          <p>I've received your message and will respond within 24 hours.</p>
        </div>
        
        <div class="content">
          <p>Hi ${validatedData.name},</p>
          
          <p>Thank you for reaching out! I've received your message about your project and I'm excited to learn more about how I can help.</p>
          
          <p><strong>What happens next:</strong></p>
          <ul>
            <li>I'll review your project details and requirements</li>
            <li>I'll respond with initial thoughts and questions within 24 hours</li>
            <li>We can schedule a call to discuss your project in detail</li>
            <li>I'll provide a customized proposal if there's a good fit</li>
          </ul>
          
          <p>In the meantime, feel free to check out my case studies on my website or connect with me on LinkedIn.</p>
          
          <p>Best regards,<br>Danny Elzein</p>
        </div>
        
        <div class="footer">
          <p><strong>Danny Elzein</strong> | Cloud Architecture & Performance Engineering</p>
          <p>Response time: < 2 hours | All consultations confidential</p>
        </div>
      </body>
      </html>
    `
    
    const confirmationText = `
Thank You, ${validatedData.name}!

I've received your message and will respond within 24 hours.

What happens next:
- I'll review your project details and requirements
- I'll respond with initial thoughts and questions within 24 hours  
- We can schedule a call to discuss your project in detail
- I'll provide a customized proposal if there's a good fit

Best regards,
Danny Elzein

Cloud Architecture & Performance Engineering
Response time: < 2 hours | All consultations confidential
    `
    
    await resendClient.emails.send({
      from: process.env.SENDER_EMAIL,
      to: validatedData.email,
      subject: 'Thank you for reaching out - Danny Elzein',
      html: confirmationHtml,
      text: confirmationText,
    })
    
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!'
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid form data', 
          errors: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}