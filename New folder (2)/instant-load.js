// ========================================
//      INSTANT LOAD OPTIMIZER
//       محسن التحميل الفوري
// ========================================

(function () {
  'use strict';

  // ========================================
  //        INSTANT OPTIMIZATIONS
  // ========================================

  // منع تحميل الموارد الثقيلة في البداية
  const heavyResources = [
    'https://unpkg.com/aos@2.3.1/dist/aos.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.js'
  ];

  // تأجيل تحميل الموارد الثقيلة
  const deferHeavyResources = () => {
    const links = document.querySelectorAll('link[href*="aos"], script[src*="aos"]');
    links.forEach(link => {
      link.remove();
    });
  };

  // تطبيق التحسينات الفورية
  const applyInstantOptimizations = () => {
    // كشف نوع الجهاز
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = navigator.deviceMemory && navigator.deviceMemory <= 2;
    const isSlowConnection = navigator.connection && navigator.connection.effectiveType === '2g';

    if (isMobile || isLowEnd || isSlowConnection) {
      document.documentElement.classList.add('mobile-optimized');
      deferHeavyResources();

      // إزالة العناصر الثقيلة فوراً
      const style = document.createElement('style');
      style.textContent = `
                .particle, .shape, .floating-elements, 
                .hero-geometric-shapes > *:nth-child(n+3) {
                    display: none !important;
                }
                *, *::before, *::after {
                    animation-duration: 0.3s !important;
                    transition-duration: 0.3s !important;
                }
            `;
      document.head.appendChild(style);
    }

    // تحسين تحميل الصور
    optimizeImages();

    // تحسين الخطوط
    optimizeFonts();

    // إعداد intersection observer
    setupLazyLoading();

    console.log('⚡ Instant optimizations applied!');
  };

  // ========================================
  //        IMAGE OPTIMIZATION
  // ========================================

  const optimizeImages = () => {
    // تحويل جميع الصور إلى lazy loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.loading) {
        img.loading = 'lazy';
      }
      if (!img.decoding) {
        img.decoding = 'async';
      }

      // إضافة placeholder
      if (!img.src || img.src.endsWith('.svg')) {
        img.style.backgroundColor = '#f0f0f0';
        img.style.minHeight = '200px';
      }
    });

    // تحديد حجم الصور للموبايل
    if (window.innerWidth <= 768) {
      images.forEach(img => {
        if (img.dataset.mobileSrc) {
          img.src = img.dataset.mobileSrc;
        }
      });
    }
  };

  // ========================================
  //        FONT OPTIMIZATION
  // ========================================

  const optimizeFonts = () => {
    // تحسين تحميل خط Cairo
    const fontLink = document.querySelector('link[href*="Cairo"]');
    if (fontLink) {
      fontLink.rel = 'preload';
      fontLink.as = 'font';
      fontLink.type = 'font/woff2';
      fontLink.crossOrigin = 'anonymous';

      // تطبيق الخط بعد التحميل
      setTimeout(() => {
        fontLink.rel = 'stylesheet';
      }, 100);
    }

    // خط احتياطي سريع
    const fallbackStyle = document.createElement('style');
    fallbackStyle.textContent = `
            body, * {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            }
        `;
    document.head.appendChild(fallbackStyle);
  };

  // ========================================
  //        LAZY LOADING SETUP
  // ========================================

  const setupLazyLoading = () => {
    // إعداد intersection observer بسيط
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.add('loaded');
            }
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px',
        threshold: 0.01
      });

      // مراقبة الصور
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });

      // مراقبة الأقسام
      document.querySelectorAll('section:not(.hero)').forEach(section => {
        imageObserver.observe(section);
      });
    }
  };

  // ========================================
  //        CRITICAL CSS INJECTION
  // ========================================

  const injectCriticalCSS = () => {
    const criticalCSS = `
            /* Critical CSS للتحميل الفوري */
            * { box-sizing: border-box; }
            body { 
                margin: 0; 
                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .loading-screen { 
                position: fixed; 
                top: 0; 
                left: 0; 
                width: 100%; 
                height: 100%; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                z-index: 9999; 
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 18px;
            }
            .hero { 
                min-height: 100vh; 
                display: flex; 
                align-items: center; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-align: center;
            }
            .container { 
                max-width: 1200px; 
                margin: 0 auto; 
                padding: 0 20px; 
            }
            .btn { 
                display: inline-block;
                padding: 12px 30px; 
                background: #ffd89b;
                color: #333;
                text-decoration: none;
                border-radius: 25px; 
                font-weight: 600;
                transition: transform 0.3s ease;
            }
            .btn:hover { transform: translateY(-2px); }
            .hero-title {
                font-size: 3rem;
                font-weight: 900;
                margin-bottom: 1rem;
                line-height: 1.2;
            }
            .hero-description {
                font-size: 1.2rem;
                margin-bottom: 2rem;
                opacity: 0.9;
            }
            .hero-buttons {
                display: flex;
                gap: 1rem;
                justify-content: center;
                flex-wrap: wrap;
            }
            @media (max-width: 768px) {
                .hero-title { font-size: 2.2rem; }
                .hero-description { font-size: 1rem; }
                .hero-buttons { flex-direction: column; align-items: center; }
                .btn { width: 100%; max-width: 280px; }
                .container { padding: 0 15px; }
            }
        `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);
  };

  // ========================================
  //        LOADING SCREEN OPTIMIZATION
  // ========================================

  const optimizeLoadingScreen = () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      // تقليل وقت الـ loading للأجهزة السريعة
      const hideLoadingScreen = () => {
        const isFastDevice = navigator.deviceMemory > 4 && navigator.hardwareConcurrency > 4;
        const delay = isFastDevice ? 500 : 1500;

        setTimeout(() => {
          loadingScreen.style.opacity = '0';
          loadingScreen.style.transition = 'opacity 0.5s ease';
          setTimeout(() => {
            loadingScreen.style.display = 'none';
          }, 500);
        }, delay);
      };

      // إخفاء loading screen عند اكتمال التحميل
      if (document.readyState === 'complete') {
        hideLoadingScreen();
      } else {
        window.addEventListener('load', hideLoadingScreen);
      }
    }
  };

  // ========================================
  //        PRELOAD CRITICAL RESOURCES
  // ========================================

  const preloadCriticalResources = () => {
    const criticalResources = [
      { href: 'styles.css', as: 'style' },
      { href: 'main.js', as: 'script' },
      { href: 'mobile-performance.css', as: 'style' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      document.head.appendChild(link);
    });
  };

  // ========================================
  //        INITIALIZATION
  // ========================================

  // تطبيق التحسينات فوراً
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectCriticalCSS();
      applyInstantOptimizations();
      optimizeLoadingScreen();
      preloadCriticalResources();
    });
  } else {
    injectCriticalCSS();
    applyInstantOptimizations();
    optimizeLoadingScreen();
    preloadCriticalResources();
  }

  console.log('🚀 Instant Load Optimizer Active!');

})();