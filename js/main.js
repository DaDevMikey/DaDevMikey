const projects = [
  {
    title: "Wiki-CLI",
    description: "A command-line interface for Wikipedia, allowing quick and efficient access to Wikipedia articles directly from your terminal.",
    sourceCode: "https://github.com/DaDevMikey/Wikipedia-Command-Line-Interface",
    tag: "NEW"
  },
  {
    title: "TempChats",
    description: "A modern temporary chat room platform for instant, secure communication. Create disposable chat rooms that automatically delete themselves.",
    sourceCode: "https://github.com/DaDevMikey/TempChats",
    liveDemo: "https://tempchats.web.app/",
    tag: "NEW"
  },
  {
    title: "GitHub Insights",
    description: "An advanced tool for exploring GitHub users, repositories, and gists with a modern interface.",
    sourceCode: "https://github.com/DaDevMikey/github-insights",
    liveDemo: "https://githubinsights.vercel.app/"
  },
  {
    title: "Simple Clock",
    description: "A minimalist clock application built with HTML, featuring a clean and modern design.",
    sourceCode: "https://github.com/DaDevMikey/Simple-Clock-HTML",
    liveDemo: "https://dadevmikey.github.io/Simple-Clock-HTML"
  },
  {
    title: "Bingo ALPHA",
    description: "A customizable bingo board creator with modern UI and interactive features.",
    sourceCode: "https://github.com/DaDevMikey/Bingo",
    liveDemo: "https://dadevmikey.github.io/Bingo",
    tag: "ALPHA"
  },
  {
    title: "Adder",
    description: "A sleek calculator application focusing on addition operations.",
    sourceCode: "https://github.com/DevMikey123/Expiriments/tree/main/adder",
    liveDemo: "https://devmikey123.github.io/Expiriments/adder"
  },
  {
    title: "Adder Beta",
    description: "Enhanced version of Adder with additional features and improved UI.",
    sourceCode: "https://github.com/DevMikey123/Expiriments/tree/main/adder-beta",
    liveDemo: "https://devmikey123.github.io/Expiriments/adder-beta",
    tag: "BETA"
  },
  {
    title: "WikiMaterial",
    description: "A modern Wikipedia interface with Material Design principles and improved user experience.",
    liveDemo: "https://wikimaterial.netlify.app/"
  },
  {
    title: "The Holiday Library",
    description: "A comprehensive library of holiday information and resources.",
    sourceCode: "https://github.com/DaDevMikey/The-Holiday-Library",
    liveDemo: "https://dadevmikey.github.io/The-Holiday-Library/",
    tag: "OPEN BETA"
  }
];

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  
  const tagHtml = project.tag ? `<span class="alpha-tag ${project.tag === 'NEW' ? 'new-tag' : ''}">${project.tag}</span>` : '';
  
  card.innerHTML = `
    <div class="project-content">
      <h3>${project.title}${tagHtml}</h3>
      <p>${project.description}</p>
    </div>
    <div class="project-links">
      ${project.sourceCode ? `
        <a href="${project.sourceCode}" target="_blank">
          <i class="mdi mdi-github"></i> Source Code
        </a>
      ` : ''}
      ${project.liveDemo ? `
        <a href="${project.liveDemo}" target="_blank">
          <i class="mdi mdi-open-in-new"></i> Live Demo
        </a>
      ` : ''}
    </div>
  `;
  
  return card;
}

function displayProjects(projectsToShow) {
  const projectGrid = document.getElementById('projectGrid');
  projectGrid.innerHTML = '';
  
  projectsToShow.forEach(project => {
    projectGrid.appendChild(createProjectCard(project));
  });
}

function initializeSearch() {
  const searchInput = document.getElementById('projectSearch');
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProjects = projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm)
    );
    displayProjects(filteredProjects);
  });
}

function initializeNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  displayProjects(projects);
  initializeSearch();
  initializeNavigation();
});