document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);

  const loadingScreen = document.querySelector('.loading-screen');
  const progress = document.querySelector('.progress');
  const typingText = document.querySelector('.typing-text');
  let percent = 0;

  typingText.style.width = '0';

  const interval = setInterval(() => {
    percent += Math.floor(Math.random() * 10) + 1;
    if (percent > 100) percent = 100;
    progress.textContent = percent + '%';

    if (percent === 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          document.body.classList.remove('loading');
          typingText.style.width = '100%';
        }, 500);
      }, 500);
    }
  }, 100);

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      document.body.classList.remove('loading');
    }, 500);
  }, 2000); 

  setTimeout(handleScrollAnimations, 2500);

  const navContainer = document.querySelector('.nav-links-container');

  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  

  const welcomeMessage = `Welcome to terminal. Available commands:

ls         List sections
cd         Change section
nav        Navigation help
clear      Clear terminal
help       Show all commands

Type 'nav' to get started.`;


  terminalOutput.innerHTML = `<div class="welcome-message">${welcomeMessage}</div>`;

  const commands = {
    help: () => `Available commands:

ls         List sections
cd         Change section
pwd        Show current section
clear      Clear terminal
cat        View content
help       Show all commands
nav        Show navigation commands
goto       Quick navigation
resume     Download resume
back       Go to previous section
home       Go to top`,
    
    nav: () => `Navigation commands:

goto about     About section
goto exp       Experience section
goto projects  Projects section
goto contact   Contact section
back           Previous section
home           Top of page`,
    
    goto: (args) => {
      const section = args[0]?.toLowerCase();
      const sections = {
        'about': '#about',
        'exp': '#experience',
        'experience': '#experience',
        'projects': '#projects',
        'contact': '#contact',
        'skills': '#experience',
        'home': '#profile'
      };
      
      if (sections[section]) {
        window.location.href = sections[section];
        return `Navigating to ${section}...`;
      }
      return `Invalid section. Type 'nav' to see available sections.`;
    },
    
    back: () => {
      window.history.back();
      return 'Going back...';
    },
    
    home: () => {
      window.location.href = '#profile';
      return 'Returning home...';
    },
    
    ls: () => `sections/
about/
experience/
projects/
contact/`,
    
    pwd: () => {
      const currentSection = window.location.hash.slice(1) || 'home';
      return `/portfolio/${currentSection}`;
    },
    
    cd: (args) => {
      const section = args[0]?.replace('/', '');
      if (!section) return 'Usage: cd <section>';
      
      const validSections = ['about', 'experience', 'projects', 'contact'];
      if (validSections.includes(section)) {
        window.location.href = `#${section}`;
        return `Navigating to ${section}...`;
      }
      return `cd: no such directory: ${section}`;
    },
    
    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    },
    
    cat: (args) => {
      const file = args[0];
      if (!file) return 'Usage: cat <file>';
      
      const files = {
        'about.txt': 'Software Engineer passionate about building systems...',
        'resume.txt': `Danny Elzein - Software Engineer
Experience: 3+ years in Backend/Frontend Development
Education: Software Development and Network Engineering
Skills: Java, Python, C++, SQL, Angular, Git

Download resume with: resume
View full resume: curl -O resume.pdf`,
      };
      
      return files[file] || `cat: ${file}: No such file`;
    },
    
    resume: () => {
      window.open('./assets/Danny_Elzein_Software_Engineer_Resume.pdf');
      return `Downloading resume...
Type 'cat resume.txt' to view resume details`;
    }
  };

  function executeCommand(input) {
    const [cmd, ...args] = input.trim().split(' ');
    const command = commands[cmd];
    
    if (command) {
      return command(args);
    }
    return `Command not found: ${cmd}. Type 'help' for available commands.`;
  }

  terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const input = terminalInput.value;
      const output = executeCommand(input);
      
      terminalOutput.innerHTML += `<div class="command-line">$ ${input}</div>`;
      terminalOutput.innerHTML += `<div>${output}</div>`;
      
      // Clear input and scroll to bottom
      terminalInput.value = '';
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });

  typingText.style.width = '0';  // Start at 0 width

  setTimeout(() => {
    typingText.style.width = '100%';  // Expand to full width
  }, 2500);  // Change from 4500 to 2500

  terminalInput.addEventListener('input', () => {
    // Calculate text width
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '0.8rem Consolas';
    const textWidth = context.measureText(terminalInput.value).width;
    
    terminalInput.style.setProperty('--input-width', `${textWidth}px`);
  });
});

function handleScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target.classList.contains('section-header')) {
        if (entry.isIntersecting) {
          entry.target.style.width = '100%';
        }
      }
      
      if (entry.target.classList.contains('animate-on-scroll')) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target); // Only animate once
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px'
  });

  document.querySelectorAll('.section-header').forEach(header => {
    header.style.width = '0';
    observer.observe(header);
  });

  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
}
