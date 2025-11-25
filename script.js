// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const menuOverlay = document.querySelector('.menu-overlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');

  // Helper function to send GA events
  function sendGAEvent(eventName, eventParams = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, eventParams);
    }
  }

  function closeMenu() {
    navMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    // Track mobile menu close event
    sendGAEvent('mobile_menu_close', {
      event_category: 'Navigation',
      event_label: 'Mobile Menu Closed'
    });
  }

  function openMenu() {
    navMenu.classList.add('active');
    menuOverlay.classList.add('active');
    // Track mobile menu open event
    sendGAEvent('mobile_menu_open', {
      event_category: 'Navigation',
      event_label: 'Mobile Menu Opened'
    });
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', closeMenu);
    }

    if (menuOverlay) {
      menuOverlay.addEventListener('click', closeMenu);
    }

    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // Track all navigation link clicks
  const allNavLinks = document.querySelectorAll('.nav-menu a');
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const linkText = link.textContent.trim();
      const linkHref = link.getAttribute('href');
      sendGAEvent('navigation_click', {
        event_category: 'Navigation',
        event_label: linkText,
        link_url: linkHref,
        link_text: linkText
      });
    });
  });

  // Track logo clicks
  const logoLinks = document.querySelectorAll('.logo');
  logoLinks.forEach(logo => {
    logo.addEventListener('click', () => {
      sendGAEvent('logo_click', {
        event_category: 'Navigation',
        event_label: 'Logo Click to Home'
      });
    });
  });

  // Track all button clicks (CTA buttons)
  const buttons = document.querySelectorAll('.btn, button[class*="btn"]');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const buttonText = button.textContent.trim();
      const buttonHref = button.getAttribute('href') || 'no-href';
      const buttonClass = button.className;

      sendGAEvent('button_click', {
        event_category: 'CTA',
        event_label: buttonText,
        button_text: buttonText,
        button_url: buttonHref,
        button_class: buttonClass
      });
    });
  });

  // Track project card clicks
  const projectCards = document.querySelectorAll('.project-card-custom, .project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectName = card.querySelector('.project-name')?.textContent.trim() || 'Unknown Project';
      const projectDesc = card.querySelector('.project-desc')?.textContent.trim() || '';

      sendGAEvent('project_click', {
        event_category: 'Content',
        event_label: projectName,
        project_name: projectName,
        project_description: projectDesc
      });
    });
  });

  // Track news item clicks
  const newsItems = document.querySelectorAll('.news-item, .news-card');
  newsItems.forEach(item => {
    item.addEventListener('click', () => {
      const newsTitle = item.querySelector('.news-title, .news-item-title')?.textContent.trim() || 'Unknown News';
      const newsDate = item.querySelector('.news-date, .news-item-date')?.textContent.trim() || '';

      sendGAEvent('news_click', {
        event_category: 'Content',
        event_label: newsTitle,
        news_title: newsTitle,
        news_date: newsDate
      });
    });
  });

  // Track news "Read More" link clicks
  const newsLinks = document.querySelectorAll('.news-item-link');
  newsLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const newsItem = link.closest('.news-item');
      const newsTitle = newsItem?.querySelector('.news-item-title')?.textContent.trim() || 'Unknown';

      sendGAEvent('news_read_more', {
        event_category: 'Content',
        event_label: newsTitle,
        news_title: newsTitle
      });
    });
  });

  // Highlight active menu item based on current page
  const currentPath = window.location.pathname;
  const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    // Only highlight if the link exactly matches the current page
    if (linkPath === currentPage) {
      link.classList.add('active');
    }
  });

  // Smooth scroll for anchor links with tracking
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Track smooth scroll event
        sendGAEvent('smooth_scroll', {
          event_category: 'Navigation',
          event_label: this.getAttribute('href'),
          target_element: this.getAttribute('href')
        });
      }
    });
  });

  // Intersection Observer for fade-in animations (optional enhancement)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Add fade-in class to elements you want to animate
  const animatedElements = document.querySelectorAll('.project-card, .stat-card, .team-member');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Header background change on scroll
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
  });

  // Track page load
  sendGAEvent('page_load_complete', {
    event_category: 'Page',
    event_label: document.title,
    page_title: document.title,
    page_path: window.location.pathname
  });
});
