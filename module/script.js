function loadProjects() {
  const projectGrid = document.getElementById("projects-grid");
  
  if (typeof projectsData === 'undefined' || projectsData.length === 0) {
    if (projectGrid) projectGrid.innerHTML = "<p>Gagal memuat proyek. Coba lagi nanti.</p>";
    return;
  }

  const projectCardsHTML = projectsData.map(project => {
    const techTags = project.techStack.map(tech => 
      `<span class="tech-tag">${tech}</span>`
    ).join('');

    let badgeHTML = ''; 
    if (project.status) {
      const statusClass = `status-${project.status.toLowerCase().replace(' ', '-')}`;
      badgeHTML = `<div class="project-status-wrapper">
                     <span class="project-badge ${statusClass}">${project.status}</span>
                   </div>`;
    }

    let dateHTML = '';
    if (project.startDate) {
      dateHTML = `<span class="project-date">${project.startDate}</span>`;
    }

    return `
      <div class="project-card">
        <div class="card-header">
          <h3>${project.title}</h3>
          ${dateHTML}
        </div>
        <p>${project.description}</p>
        ${badgeHTML} 
        <div class="project-tech-stack">
          ${techTags}
        </div>
        <div class="project-links">
          <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    `;
  }).join('');

  if (projectGrid) projectGrid.innerHTML = projectCardsHTML;
}

function loadInterests() {
  const interestsGrid = document.getElementById("interests-grid");
  if (!interestsGrid || typeof interestsData === 'undefined' || interestsData.length === 0) {
     if (interestsGrid) interestsGrid.innerHTML = "<p>Gagal memuat minat.</p>";
    return;
  }

  const interestsHTML = interestsData.map(interest => {
    return `<div class="skill-tag">${interest}</div>`;
  }).join('');

  interestsGrid.innerHTML = interestsHTML;
}

function initGreetingAnimation() {
  const greetingElement = document.getElementById("greeting-text");
  
  if (typeof greetings === 'undefined' || greetings.length === 0) { 
    console.error("Gagal memuat data greetings."); 
    return;
  }

  if (!greetingElement) {
     console.error("Elemen greeting-text tidak ditemukan.");
     return;
  }

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 150, deleteSpeed = 100, pauseTime = 2000;

  function type() {
    if (!greetings[wordIndex]) {
        console.error(`Index kata greeting tidak valid: ${wordIndex}`);
        wordIndex = 0;
        setTimeout(type, typeSpeed);
        return;
    }
    const currentWord = greetings[wordIndex];

    if (isDeleting) {
      greetingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % greetings.length;
        setTimeout(type, typeSpeed);
      } else {
        setTimeout(type, deleteSpeed);
      }
    } else {
      greetingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, pauseTime);
      } else {
        setTimeout(type, typeSpeed);
      }
    }
  }
  setTimeout(type, 500);
}

function initMobileNav() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains('active')) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
      }
    });
  });
}

function initBackgroundScrollEffects() {
  const sections = document.querySelectorAll('section');
  const body = document.body;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        
        body.classList.remove('scrolled', 'projects-active', 'contact-active');
        if (entry.target.id === 'projects') {
          body.classList.add('projects-active');
        } else if (entry.target.id === 'contact') {
          body.classList.add('contact-active');
        } else if (entry.target.id !== 'hero') {
          body.classList.add('scrolled');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });
}

function initBackToTopButton() {
  const toTopBtn = document.getElementById("to-top-btn");
  if (!toTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      toTopBtn.classList.add("show");
    } else {
      toTopBtn.classList.remove("show");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  
  loadProjects();
  loadInterests();

  initGreetingAnimation();
  initMobileNav();
  initBackgroundScrollEffects();
  initBackToTopButton();

});