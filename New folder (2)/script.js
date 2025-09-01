// ========================================
//    SCRIPT.JS - الجافاسكريبت الرئيسي
//    موقع المتميزون - وظائف تفاعلية محسنة
// ========================================

class WebsiteManager {
  constructor() {
    this.searchManager = new SearchManager();
    this.navigationManager = new NavigationManager();
    this.animationManager = new AnimationManager();
    this.init();
  }

  init() {
    this.setupLoadingScreen();
    this.setupNavigation();
    this.setupSearch();
    this.setupAnimations();
    this.setupScrollEffects();
    this.setupStats();
    this.setupModals();
    this.setupContactForm();

    console.log('🚀 Website Manager Initialized');
  }

  // ========================================
  //        LOADING SCREEN
  // ========================================

  setupLoadingScreen() {
    window.addEventListener('load', () => {
      const loadingScreen = document.getElementById('loading-screen');
      const progressBar = document.querySelector('.progress-bar');

      // تحديث شريط التقدم
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progressBar) {
          progressBar.style.width = progress + '%';
        }

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (loadingScreen) {
              loadingScreen.style.opacity = '0';
              setTimeout(() => {
                loadingScreen.style.display = 'none';
              }, 500);
            }
          }, 500);
        }
      }, 100);
    });
  }

  // ========================================
  //        NAVIGATION
  // ========================================

  setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        this.animateHamburger(navToggle);
      });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    });

    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }

          // Close mobile menu
          if (navMenu) {
            navMenu.classList.remove('active');
          }
        }
      });
    });

    // Active section highlighting
    this.highlightActiveSection();
  }

  animateHamburger(toggle) {
    const spans = toggle.querySelectorAll('span');
    if (toggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans.forEach(span => {
        span.style.transform = '';
        span.style.opacity = '';
      });
    }
    toggle.classList.toggle('active');
  }

  highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // ========================================
  //        SEARCH FUNCTIONALITY
  // ========================================

  setupSearch() {
    const mainSearchInput = document.querySelector('.search-input-main');
    const navSearchInput = document.querySelector('.search-input-nav');
    const mainSearchBtn = document.querySelector('.search-btn-main');
    const navSearchBtn = document.querySelector('.search-btn-nav');

    // Main search
    if (mainSearchBtn) {
      mainSearchBtn.addEventListener('click', () => {
        const query = mainSearchInput?.value.trim();
        this.searchManager.performSearch(query);
      });
    }

    if (mainSearchInput) {
      mainSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const query = mainSearchInput.value.trim();
          this.searchManager.performSearch(query);
        }
      });
    }

    // Nav search
    if (navSearchBtn) {
      navSearchBtn.addEventListener('click', () => {
        const query = navSearchInput?.value.trim();
        this.searchManager.performSearch(query);
      });
    }

    if (navSearchInput) {
      navSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const query = navSearchInput.value.trim();
          this.searchManager.performSearch(query);
        }
      });
    }

    // Popular search tags
    document.querySelectorAll('.tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const query = tag.textContent.trim();
        this.searchManager.performSearch(query);
      });
    });
  }

  // ========================================
  //        ANIMATIONS
  // ========================================

  setupAnimations() {
    this.animateOnScroll();
    this.animateHeroElements();
  }

  animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .grade-card, .contact-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s ease';
      observer.observe(el);
    });
  }

  animateHeroElements() {
    // Hero text animation
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
      setTimeout(() => {
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateX(0)';
      }, 1000);
    }

    // Hero visual animation
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
      setTimeout(() => {
        heroVisual.style.opacity = '1';
        heroVisual.style.transform = 'translateX(0)';
      }, 1200);
    }
  }

  // ========================================
  //        SCROLL EFFECTS
  // ========================================

  setupScrollEffects() {
    this.setupScrollToTop();
    this.setupParallaxEffect();
  }

  setupScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');
    if (scrollBtn) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          scrollBtn.style.display = 'flex';
        } else {
          scrollBtn.style.display = 'none';
        }
      });

      scrollBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  setupParallaxEffect() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.hero-background');

      parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }

  // ========================================
  //        STATISTICS ANIMATION
  // ========================================

  setupStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateStats = () => {
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
          if (current < target) {
            current += increment;
            stat.textContent = Math.ceil(current).toLocaleString('ar-EG');
            setTimeout(updateCounter, 20);
          } else {
            stat.textContent = target.toLocaleString('ar-EG');
          }
        };
        updateCounter();
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animateStats();
          animated = true;
        }
      });
    });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  // ========================================
  //        MODAL FUNCTIONALITY
  // ========================================

  setupModals() {
    // Books modal setup will be handled by grade functions
    window.closeBooksModal = () => {
      const modal = document.getElementById('books-modal');
      if (modal) {
        modal.style.display = 'none';
      }
    };

    // Close modal on backdrop click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) {
        window.closeBooksModal();
      }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.closeBooksModal();
      }
    });
  }

  // ========================================
  //        CONTACT FORM
  // ========================================

  setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleContactSubmit(contactForm);
      });
    }
  }

  handleContactSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    submitBtn.disabled = true;

    setTimeout(() => {
      alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  }
}

// ========================================
//    SEARCH MANAGER CLASS
// ========================================

class SearchManager {
  constructor() {
    this.searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
  }

  performSearch(query) {
    if (!query.trim()) return;

    // Save to history
    this.saveToHistory(query);

    // توجيه لصفحة البحث المحسنة
    window.location.href = `pages/books.html?search=${encodeURIComponent(query)}`;
  }

  saveToHistory(query) {
    if (!this.searchHistory.includes(query)) {
      this.searchHistory.unshift(query);
      this.searchHistory = this.searchHistory.slice(0, 10); // Keep only last 10 searches
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
    }
  }

  getSearchHistory() {
    return this.searchHistory;
  }
}

// ========================================
//    NAVIGATION MANAGER CLASS
// ========================================

class NavigationManager {
  constructor() {
    this.currentSection = 'hero';
    this.setupSmoothScrolling();
  }

  setupSmoothScrolling() {
    // Already handled in main class
  }

  navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}

// ========================================
//    ANIMATION MANAGER CLASS
// ========================================

class AnimationManager {
  constructor() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, options);

    // Observe all animatable elements
    document.querySelectorAll('[data-aos]').forEach(el => {
      observer.observe(el);
    });
  }

  animateElement(element) {
    const animationType = element.getAttribute('data-aos');
    const delay = element.getAttribute('data-aos-delay') || 0;

    setTimeout(() => {
      element.classList.add('aos-animate');
    }, delay);
  }
}

// ========================================
//    GLOBAL FUNCTIONS
// ========================================

// وظائف الكتب المبسطة
function showGradeBooks(gradeId) {
  // للكتاب الوحيد المتاح - توجيه مباشر لصفحة التفاصيل
  if (gradeId === 'grade-1-prep') {
    window.location.href = 'pages/book-details.html';
  } else {
    // للمراحل الأخرى - توجيه لصفحة الكتب المحسنة
    window.location.href = `pages/books.html?grade=${gradeId}`;
  }
}

// وظائف أخرى
function openVideoModal(videoId) {
  // فتح مودال الفيديو (يمكن تطويرها لاحقاً)
  alert('ميزة الفيديو التعريفي ستكون متاحة قريباً!');
}

function shareWebsite() {
  if (navigator.share) {
    navigator.share({
      title: 'المتميزون - منصتك المجانية للكتب المدرسية',
      text: 'أفضل موقع لتحميل الكتب المدرسية المصرية مجاناً',
      url: window.location.href
    });
  } else {
    // Fallback for browsers that don't support Web Share API
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('تم نسخ رابط الموقع! يمكنك مشاركته الآن.');
    });
  }
}

// تحديث عدد الكتب في الكروت
function updateBooksCount() {
  // تحديث العدادات (يمكن ربطها بقاعدة بيانات لاحقاً)
  const counters = {
    'books-count-grade-1': 5,
    'books-count-grade-2': 0,
    'books-count-grade-3': 0,
    'books-count-grade-1-sec': 0,
    'books-count-grade-2-sec': 0,
    'books-count-grade-3-sec': 0
  };

  Object.entries(counters).forEach(([id, count]) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = count;
    }
  });
}

// ========================================
//    INITIALIZATION
// ========================================

let websiteManager;

document.addEventListener('DOMContentLoaded', () => {
  websiteManager = new WebsiteManager();
  updateBooksCount();

  // Add AOS styles if not already present
  if (!document.querySelector('[data-aos-style]')) {
    const style = document.createElement('style');
    style.setAttribute('data-aos-style', 'true');
    style.textContent = `
            [data-aos] {
                opacity: 0;
                transition: all 0.6s ease;
            }
            
            [data-aos="fade-up"] {
                transform: translateY(30px);
            }
            
            [data-aos="fade-left"] {
                transform: translateX(30px);
            }
            
            [data-aos="fade-right"] {
                transform: translateX(-30px);
            }
            
            [data-aos="zoom-in"] {
                transform: scale(0.8);
            }
            
            [data-aos].aos-animate {
                opacity: 1;
                transform: translate(0) scale(1);
            }
        `;
    document.head.appendChild(style);
  }
});

// ========================================
//    UTILITY FUNCTIONS
// ========================================

// دالة لتنسيق الأرقام
function formatNumber(num) {
  return parseInt(num).toLocaleString('ar-EG');
}

// دالة للتحقق من دعم الجهاز للميزات
function checkFeatureSupport() {
  return {
    serviceWorker: 'serviceWorker' in navigator,
    webShare: 'share' in navigator,
    clipboard: 'clipboard' in navigator,
    intersection: 'IntersectionObserver' in window
  };
}

// دالة لتسجيل الأحداث (Analytics)
function trackEvent(eventName, data = {}) {
  console.log(`📊 Event: ${eventName}`, data);
  // يمكن ربطها بـ Google Analytics أو أي خدمة تحليلات أخرى
}

// ========================================
//    PERFORMANCE MONITORING
// ========================================

// مراقبة الأداء
if ('performance' in window) {
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`⚡ Page loaded in ${loadTime}ms`);
    trackEvent('page_load_time', { time: loadTime });
  });
}

console.log('🚀 Al-Mutamayizun Website Script Loaded Successfully!');

// ========================================
//    SERVICE WORKER REGISTRATION
// ========================================

// تسجيل Service Worker للأداء المحسن
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('✅ Service Worker registered successfully');
      })
      .catch(error => {
        console.log('❌ Service Worker registration failed');
      });
  });
}