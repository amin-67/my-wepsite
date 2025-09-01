// ========================================
//      ADVANCED WEBSITE INTERACTIONS
//        التفاعلات المتطورة للموقع
// ========================================

class WebsiteController {
  constructor() {
    this.isLoading = true;
    this.scrollPosition = 0;
    this.isMobile = window.innerWidth <= 768;
    this.animationQueue = [];

    this.init();
  }

  init() {
    this.initializeLoading();
    this.initializeNavigation();
    this.initializeAnimations();
    this.initializeInteractions();
    this.initializeResponsive();
    this.initializePerformance();

    console.log('🚀 Website Controller initialized');
  }

  // ========================================
  //           LOADING SYSTEM
  // ========================================

  initializeLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    let progress = 0;

    // محاكاة تحميل المحتوى
    const loadingInterval = setInterval(() => {
      progress += Math.random() * 30;

      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);

        setTimeout(() => {
          this.hideLoadingScreen();
        }, 500);
      }

      this.updateLoadingProgress(progress);
    }, 200);

    // إخفاء شاشة التحميل عند تحميل الصفحة بالكامل
    window.addEventListener('load', () => {
      clearInterval(loadingInterval);
      setTimeout(() => {
        this.hideLoadingScreen();
      }, 1000);
    });
  }

  updateLoadingProgress(progress) {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
      progressBar.style.setProperty('--progress', `${progress}%`);
    }
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');

      setTimeout(() => {
        loadingScreen.style.display = 'none';
        this.isLoading = false;
        this.triggerPageAnimations();
      }, 500);
    }
  }

  // ========================================
  //           NAVIGATION SYSTEM
  // ========================================

  initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // تأثير التمرير على شريط التنقل
    window.addEventListener('scroll', this.throttle(() => {
      this.handleNavbarScroll(navbar);
    }, 16));

    // زر القائمة للجوال
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        this.toggleMobileMenu(navMenu, navToggle);
      });
    }

    // التنقل السلس
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        this.handleSmoothNavigation(e, link);
      });
    });

    // تحديث الروابط النشطة
    this.updateActiveNavLink();
    window.addEventListener('scroll', this.throttle(() => {
      this.updateActiveNavLink();
    }, 100));
  }

  handleNavbarScroll(navbar) {
    const scrolled = window.pageYOffset;

    if (scrolled > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    this.scrollPosition = scrolled;
  }

  toggleMobileMenu(navMenu, navToggle) {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');

    // منع التمرير عند فتح القائمة
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  handleSmoothNavigation(e, link) {
    const href = link.getAttribute('href');

    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const offsetTop = target.offsetTop - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // إغلاق القائمة المحمولة
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');

        if (navMenu.classList.contains('active')) {
          this.toggleMobileMenu(navMenu, navToggle);
        }
      }
    }
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    const scrollPos = window.pageYOffset + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // ========================================
  //           ANIMATIONS SYSTEM
  // ========================================

  initializeAnimations() {
    // تهيئة مكتبة AOS
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
      });
    }

    // رسوم متحركة مخصصة للأرقام
    this.initializeCounterAnimations();

    // رسوم متحركة للعناصر عند التمرير
    this.initializeScrollAnimations();
  }

  initializeCounterAnimations() {
    const counters = document.querySelectorAll('[data-target]');

    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      element.textContent = this.formatNumber(Math.floor(current));
    }, 16);
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }

  triggerPageAnimations() {
    // تشغيل الرسوم المتحركة عند تحميل الصفحة
    document.body.classList.add('loaded');

    // رسوم متحركة للعناصر الرئيسية
    setTimeout(() => {
      const heroElements = document.querySelectorAll('.hero .animate-on-load');
      heroElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animated');
        }, index * 200);
      });
    }, 300);
  }

  // ========================================
  //           INTERACTIONS SYSTEM
  // ========================================

  initializeInteractions() {
    this.initializeButtons();
    this.initializeModals();
    this.initializeTooltips();
    this.initializeScrollToTop();
    this.initializeParallax();
  }

  initializeButtons() {
    const buttons = document.querySelectorAll('.btn, .grade-btn, .book-btn');

    buttons.forEach(btn => {
      // تأثير الضغط
      btn.addEventListener('mousedown', (e) => {
        this.createRippleEffect(e, btn);
      });

      // تأثير التحويم
      btn.addEventListener('mouseenter', () => {
        if (!this.isMobile) {
          btn.style.transform = 'translateY(-2px)';
        }
      });

      btn.addEventListener('mouseleave', () => {
        if (!this.isMobile) {
          btn.style.transform = '';
        }
      });
    });
  }

  createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  initializeModals() {
    // إغلاق المودال بالضغط على Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });

    // إغلاق المودال بالنقر خارجه
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) {
        this.closeAllModals();
      }
    });
  }

  closeAllModals() {
    const modals = document.querySelectorAll('.modal, .books-modal');
    modals.forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }

  initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        this.showTooltip(e.target);
      });

      element.addEventListener('mouseleave', () => {
        this.hideTooltip();
      });
    });
  }

  showTooltip(element) {
    const tooltipText = element.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');

    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';

    setTimeout(() => {
      tooltip.style.opacity = '1';
    }, 100);

    this.currentTooltip = tooltip;
  }

  hideTooltip() {
    if (this.currentTooltip) {
      this.currentTooltip.style.opacity = '0';
      setTimeout(() => {
        if (this.currentTooltip) {
          this.currentTooltip.remove();
          this.currentTooltip = null;
        }
      }, 300);
    }
  }

  initializeScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');

    if (scrollBtn) {
      window.addEventListener('scroll', this.throttle(() => {
        if (window.pageYOffset > 300) {
          scrollBtn.classList.add('visible');
        } else {
          scrollBtn.classList.remove('visible');
        }
      }, 100));

      scrollBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');

    if (parallaxElements.length > 0 && !this.isMobile) {
      window.addEventListener('scroll', this.throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        parallaxElements.forEach(element => {
          element.style.transform = `translateY(${rate}px)`;
        });
      }, 16));
    }
  }

  // ========================================
  //           RESPONSIVE SYSTEM
  // ========================================

  initializeResponsive() {
    // مراقبة تغيير حجم النافذة
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));

    // تحديد نوع الجهاز
    this.detectDevice();
  }

  handleResize() {
    const newIsMobile = window.innerWidth <= 768;

    if (newIsMobile !== this.isMobile) {
      this.isMobile = newIsMobile;
      this.handleDeviceChange();
    }

    // إعادة حساب مواقع العناصر
    this.recalculatePositions();
  }

  handleDeviceChange() {
    // إعادة تهيئة بعض الميزات حسب نوع الجهاز
    if (this.isMobile) {
      this.disableHoverEffects();
    } else {
      this.enableHoverEffects();
    }
  }

  detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);

    document.documentElement.classList.add(
      this.isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
    );
  }

  disableHoverEffects() {
    document.documentElement.classList.add('no-hover');
  }

  enableHoverEffects() {
    document.documentElement.classList.remove('no-hover');
  }

  recalculatePositions() {
    // إعادة حساب مواقع العناصر المطلقة
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
      tooltip.remove();
    });
  }

  // ========================================
  //           PERFORMANCE OPTIMIZATION
  // ========================================

  initializePerformance() {
    // تحسين الأداء للرسوم المتحركة
    this.optimizeAnimations();

    // تحسين التمرير
    this.optimizeScrolling();

    // تنظيف الذاكرة
    this.setupMemoryCleanup();
  }

  optimizeAnimations() {
    // تقليل الرسوم المتحركة على الأجهزة الضعيفة
    if (navigator.hardwareConcurrency < 4) {
      document.documentElement.classList.add('reduced-motion');
    }

    // استخدام requestAnimationFrame للرسوم المتحركة
    this.animationFrame = null;
  }

  optimizeScrolling() {
    // استخدام Passive Event Listeners
    const passiveOptions = { passive: true };

    window.addEventListener('scroll', this.handleScroll.bind(this), passiveOptions);
    window.addEventListener('touchstart', this.handleTouch.bind(this), passiveOptions);
  }

  handleScroll() {
    if (this.animationFrame) return;

    this.animationFrame = requestAnimationFrame(() => {
      // معالجة أحداث التمرير
      this.animationFrame = null;
    });
  }

  handleTouch() {
    // معالجة أحداث اللمس للجوال
    document.body.classList.add('touching');

    setTimeout(() => {
      document.body.classList.remove('touching');
    }, 300);
  }

  setupMemoryCleanup() {
    // تنظيف الذاكرة عند مغادرة الصفحة
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });
  }

  cleanup() {
    // إلغاء جميع المؤقتات والمراقبين
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }

    // تنظيف الأحداث
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);

    console.log('🧹 Website cleanup completed');
  }

  // ========================================
  //           UTILITY FUNCTIONS
  // ========================================

  throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // API عامة للموقع
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">×</button>
        `;

    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);

    notification.querySelector('.notification-close').addEventListener('click', () => {
      this.hideNotification(notification);
    });

    setTimeout(() => {
      this.hideNotification(notification);
    }, 5000);
  }

  hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }

  getNotificationIcon(type) {
    const icons = {
      success: 'check-circle',
      error: 'exclamation-circle',
      warning: 'exclamation-triangle',
      info: 'info-circle'
    };
    return icons[type] || 'info-circle';
  }
}

// CSS للرسوم المتحركة الإضافية
const additionalCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 300px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left: 4px solid #48bb78;
    }
    
    .notification-error {
        border-left: 4px solid #f56565;
    }
    
    .notification-warning {
        border-left: 4px solid #ed8936;
    }
    
    .notification-info {
        border-left: 4px solid #4299e1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }
    
    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .scroll-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
    }
    
    .reduced-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .no-hover *:hover {
        transform: none !important;
    }
`;

// إضافة CSS إضافي
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// تشغيل النظام
let websiteController;

document.addEventListener('DOMContentLoaded', () => {
  websiteController = new WebsiteController();

  // API عامة للموقع
  window.websiteController = websiteController;

  console.log('🎉 Advanced Website System fully loaded!');
});

// تصدير للاستخدام الخارجي
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WebsiteController;
}