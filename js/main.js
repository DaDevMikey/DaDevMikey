const staticProjects = [
  {
    title: "WikiMaterial",
    description: "A modern Wikipedia interface with Material Design principles and improved user experience.",
    liveDemo: "https://wikimaterial.netlify.app/",
    tags: ["static"]
  }
];

let allProjects = [];
let pinnedProjects = [];
let otherProjects = [];
let showingPinned = true;

async function fetchGitHubProjects() {
  try {
    // Use GraphQL API to get actual pinned repositories
    const pinnedQuery = `
      query {
        user(login: "DaDevMikey") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                }
                updatedAt
              }
            }
          }
        }
      }
    `;

    const [reposResponse] = await Promise.all([
      fetch('https://api.github.com/users/DaDevMikey/repos?per_page=100&sort=updated')
    ]);
    
    if (!reposResponse.ok) {
      throw new Error('Failed to fetch repositories');
    }
    
    const allRepos = await reposResponse.json();
    
    // Try to get pinned repos via GraphQL (this might not work without auth token)
    let actualPinnedRepos = [];
    try {
      const pinnedResponse = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: pinnedQuery })
      });
      
      if (pinnedResponse.ok) {
        const pinnedData = await pinnedResponse.json();
        actualPinnedRepos = pinnedData.data?.user?.pinnedItems?.nodes || [];
      }
    } catch (error) {
      console.log('GraphQL API not available, using fallback pinned repos');
    }
    
    // Fallback to predefined list if GraphQL fails
    const fallbackPinnedNames = [
      'Wikipedia-Command-Line-Interface',
      'redirect-confirmer',
      'GitHub-Insights', 
      'The-Holiday-Library',
      'TempChats',
      'Visual-Web-Code'
    ];
    
    const pinnedRepoNames = actualPinnedRepos.length > 0 
      ? actualPinnedRepos.map(repo => repo.name)
      : fallbackPinnedNames;
    
    pinnedProjects = allRepos
      .filter(repo => pinnedRepoNames.includes(repo.name))
      .map(repo => ({
        title: formatRepoName(repo.name),
        description: repo.description || 'No description available',
        sourceCode: repo.html_url,
        liveDemo: getLiveDemo(repo.name),
        tags: getTags(repo.name),
        stats: {
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          updated: new Date(repo.updated_at)
        },
        pinned: true
      }))
      .sort((a, b) => pinnedRepoNames.indexOf(getRepoName(a.title)) - pinnedRepoNames.indexOf(getRepoName(b.title)));
    
    otherProjects = allRepos
      .filter(repo => !pinnedRepoNames.includes(repo.name) && !repo.fork)
      .map(repo => ({
        title: formatRepoName(repo.name),
        description: repo.description || 'No description available',
        sourceCode: repo.html_url,
        liveDemo: getLiveDemo(repo.name),
        tags: [],
        stats: {
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          updated: new Date(repo.updated_at)
        }
      }))
      .sort((a, b) => b.stats.updated - a.stats.updated);
    
    allProjects = [...pinnedProjects, ...staticProjects];
    
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    // Fallback to static projects if API fails
    allProjects = staticProjects;
  }
}

function formatRepoName(name) {
  const nameMap = {
    'Wikipedia-Command-Line-Interface': 'Wiki-CLI',
    'redirect-confirmer': 'Redirect Confirmer',
    'GitHub-Insights': 'GitHub Insights',
    'The-Holiday-Library': 'The Holiday Library',
    'Visual-Web-Code': 'Visual Web Code'
  };
  return nameMap[name] || name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function getRepoName(title) {
  const reverseMap = {
    'Wiki-CLI': 'Wikipedia-Command-Line-Interface',
    'Redirect Confirmer': 'redirect-confirmer',
    'GitHub Insights': 'GitHub-Insights',
    'The Holiday Library': 'The-Holiday-Library',
    'Visual Web Code': 'Visual-Web-Code'
  };
  return reverseMap[title] || title.toLowerCase().replace(/\s+/g, '-');
}

function getLiveDemo(repoName) {
  const demoMap = {
    'redirect-confirmer': 'https://dadevmikey.github.io/redirect-confirmer/',
    'GitHub-Insights': 'https://githubinsights.vercel.app/',
    'The-Holiday-Library': 'https://dadevmikey.github.io/The-Holiday-Library/',
    'TempChats': 'https://tempchats.web.app/',
    'Visual-Web-Code': 'https://dadevmikey.github.io/Visual-Web-Code/'
  };
  return demoMap[repoName];
}

function getTags(repoName) {
  const tagMap = {
    'Wikipedia-Command-Line-Interface': ['new', 'pinned'],
    'redirect-confirmer': ['pinned'],
    'GitHub-Insights': ['pinned'],
    'The-Holiday-Library': ['open-beta', 'pinned'],
    'TempChats': ['new', 'pinned'],
    'Visual-Web-Code': ['pinned']
  };
  return tagMap[repoName] || ['pinned'];
}

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.style.animationDelay = `${Math.random() * 0.5}s`;
  
  const tagsHtml = project.tags?.map(tag => 
    `<span class="project-tag tag-${tag}">${tag.toUpperCase()}</span>`
  ).join('') || '';
  
  const statsHtml = project.stats ? `
    <div class="project-stats">
      ${project.stats.language ? `<div class="project-stat"><i class="mdi mdi-code-tags"></i>${project.stats.language}</div>` : ''}
      <div class="project-stat"><i class="mdi mdi-star"></i>${project.stats.stars}</div>
      <div class="project-stat"><i class="mdi mdi-source-fork"></i>${project.stats.forks}</div>
      <div class="project-stat"><i class="mdi mdi-clock"></i>${formatDate(project.stats.updated)}</div>
    </div>
  ` : '';
  
  card.innerHTML = `
    <div class="project-content">
      <h3>${project.title}</h3>
      ${tagsHtml ? `<div class="project-meta">${tagsHtml}</div>` : ''}
      <p>${project.description}</p>
      ${statsHtml}
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

function createLoadingSkeleton() {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `
    <div class="project-content">
      <div class="loading-skeleton skeleton-title"></div>
      <div class="loading-skeleton skeleton-text"></div>
      <div class="loading-skeleton skeleton-text"></div>
      <div class="loading-skeleton skeleton-text"></div>
    </div>
  `;
  return card;
}

function displayProjects(projectsToShow) {
  const projectGrid = document.getElementById('projectGrid');
  projectGrid.innerHTML = '';
  
  projectsToShow.forEach((project, index) => {
    const card = createProjectCard(project);
    card.style.animationDelay = `${index * 0.1}s`;
    projectGrid.appendChild(card);
  });
}

function formatDate(date) {
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

function initializeProjectToggle() {
  const projectsSection = document.querySelector('.projects');
  const controlsHtml = `
    <div class="projects-controls">
      <button class="projects-toggle active" data-type="pinned">
        <i class="mdi mdi-pin"></i> Featured Projects
      </button>
      <button class="projects-toggle" data-type="other">
        <i class="mdi mdi-folder-multiple"></i> Other Projects
      </button>
    </div>
  `;
  
  const searchContainer = projectsSection.querySelector('.search-container');
  searchContainer.insertAdjacentHTML('afterend', controlsHtml);
  
  const toggleButtons = projectsSection.querySelectorAll('.projects-toggle');
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      toggleButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const type = button.dataset.type;
      showingPinned = type === 'pinned';
      
      if (showingPinned) {
        displayProjects([...pinnedProjects, ...staticProjects]);
      } else {
        displayProjects(otherProjects);
      }
    });
  });
}

function initializeSearch() {
  const searchInput = document.getElementById('projectSearch');
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const currentProjects = showingPinned ? [...pinnedProjects, ...staticProjects] : otherProjects;
    
    const filteredProjects = currentProjects.filter(project => 
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      (project.stats?.language && project.stats.language.toLowerCase().includes(searchTerm))
    );
    displayProjects(filteredProjects);
  });
}

function initializeNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  // Show loading skeletons
  const projectGrid = document.getElementById('projectGrid');
  for (let i = 0; i < 6; i++) {
    projectGrid.appendChild(createLoadingSkeleton());
  }
  
  await fetchGitHubProjects();
  displayProjects([...pinnedProjects, ...staticProjects]);
  initializeProjectToggle();
  initializeSearch();
  initializeNavigation();
});
