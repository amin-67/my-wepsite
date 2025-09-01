/**
 * ARABIC BOOK PAGE - ENHANCED JAVASCRIPT
 * كتاب الامتحان عربي - جافاسكريبت محسن
 * 
 * المميزات:
 * - تتبع التفاعلات المتقدم
 * - تأثيرات بصرية محسنة  
 * - إدارة الحالة المحلية
 * - تحسينات الأداء
 * - إمكانيات متقدمة
 */

class ArabicBookPage {
  constructor() {
    this.bookData = {
      title: 'كتاب الامتحان - اللغة العربية',
      grade: 'الصف الأول الإعدادي',
      year: '2026',
      downloadLink: 'https://t.me/G5_Y5/12243?single',
      totalDownloads: 15847,
      rating: 4.9,
      pages: 250
    };

    this.userInteractions = {
      pageViews: 0,
      timeSpent: 0,
      scrollDepth: 0,
      buttonClicks: 0
    };

    this.init();
  }

  // ===== تهيئة الصفحة =====
  init() {
    this.trackPageView();
    this.setupScrollAnimations();
    this.setupParallaxEffects();
    this.setupLazyLoading();
    this.setupKeyboardNavigation();
    this.setupPerformanceMonitoring();
    this.loadUserPreferences();
    this.initializeCounters();

    console.log('🚀 صفحة كتاب الامتحان تم تحميلها بنجاح!');
  }

  // ===== تتبع زيارة الصفحة =====
  trackPageView() {
    const visits = parseInt(localStorage.getItem('arabicBookPageVisits') || '0') + 1;
    localStorage.setItem('arabicBookPageVisits', visits);

    this.userInteractions.pageViews = visits;
    this.userInteractions.startTime = Date.now();

    // تتبع وقت البقاء في الصفحة
    window.addEventListener('beforeunload', () => {
      const timeSpent = Date.now() - this.userInteractions.startTime;
      localStorage.setItem('timeSpentOnPage', timeSpent);
    });

    console.log(`📊 زيارة رقم ${visits} للصفحة`);
  }

  // ===== إعداد الرسوم المتحركة عند التمرير =====
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);

          // تشغيل العدادات للإحصائيات
          if (entry.target.classList.contains('stats-section')) {
            this.animateStatistics();
          }

          // تحريك البطاقات
          if (entry.target.classList.contains('book-card')) {
            this.animateBookCard(entry.target);
          }
        }
      });
    }, observerOptions);

    // مراقبة العناصر
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  // ===== تحريك العناصر =====
  animateElement(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    element.classList.add('animate');

    // إضافة تأثيرات خاصة
    if (element.classList.contains('book-info')) {
      element.style.animation = 'slideInRight 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }
  }

  // ===== تحريك العدادات =====
  animateStatistics() {
    const statElements = document.querySelectorAll('.stat-number');

    statElements.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      this.animateCounter(stat, 0, target, 2000);
    });
  }

  // ===== عداد متحرك =====
  animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // استخدام easing function للحركة الطبيعية
      const easedProgress = this.easeOutCubic(progress);
      const current = start + (range * easedProgress);

      if (element.classList.contains('stat-number')) {
        element.textContent = Math.floor(current).toLocaleString('ar-EG');
      } else {
        element.textContent = Math.floor(current);
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = end.toLocaleString('ar-EG');
      }
    };

    requestAnimationFrame(updateCounter);
  }

  // ===== دالة التسارع =====
  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // ===== تأثيرات البطاقات =====
  animateBookCard(card) {
    card.style.transform = 'translateY(0) scale(1)';
    card.style.opacity = '1';

    // تأثير تدريجي للعناصر الفرعية
    const children = card.querySelectorAll('*');
    children.forEach((child, index) => {
      setTimeout(() => {
        child.style.opacity = '1';
        child.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  // ===== تأثيرات المنظور =====
  setupParallaxEffects() {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-bg');

      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      this.trackScrollDepth();

      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  // ===== تتبع عمق التمرير =====
  trackScrollDepth() {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollDepth = Math.round((scrollTop / documentHeight) * 100);

    this.userInteractions.scrollDepth = Math.max(this.userInteractions.scrollDepth, scrollDepth);

    // حفظ أقصى عمق تمرير
    localStorage.setItem('maxScrollDepth', this.userInteractions.scrollDepth);
  }

  // ===== التحميل التدريجي =====
  setupLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('loading');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ===== التنقل بالكيبورد =====
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'h':
        case 'H':
          if (e.ctrlKey) {
            e.preventDefault();
            document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
          }
          break;

        case 'd':
        case 'D':
          if (e.ctrlKey) {
            e.preventDefault();
            this.downloadBook();
          }
          break;

        case 's':
        case 'S':
          if (e.ctrlKey) {
            e.preventDefault();
            this.shareBook();
          }
          break;

        case 'Escape':
          this.closeAllModals();
          break;
      }
    });
  }

  // ===== مراقبة الأداء =====
  setupPerformanceMonitoring() {
    // قياس وقت التحميل
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`⚡ وقت تحميل الصفحة: ${loadTime}ms`);

      // تقرير الأداء
      if (loadTime > 3000) {
        console.warn('⚠️ الصفحة تحتاج وقت طويل للتحميل');
      }
    });

    // مراقبة الذاكرة
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        if (memory.usedJSHeapSize > 50000000) { // 50MB
          console.warn('⚠️ استخدام ذاكرة عالي');
        }
      }, 30000);
    }
  }

  // ===== تحميل تفضيلات المستخدم =====
  loadUserPreferences() {
    const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');

    // تطبيق الثيم المفضل
    if (preferences.darkMode) {
      document.body.classList.add('dark-mode');
    }

    // تطبيق إعدادات الحركة
    if (preferences.reduceMotion) {
      document.body.classList.add('reduce-motion');
    }

    // استعادة التقييم السابق
    if (preferences.bookRating) {
      this.displayPreviousRating(preferences.bookRating);
    }
  }

  // ===== تهيئة العدادات =====
  initializeCounters() {
    // تحديث عداد التحميلات من التخزين المحلي
    const savedDownloads = localStorage.getItem('totalDownloads');
    if (savedDownloads) {
      this.bookData.totalDownloads = parseInt(savedDownloads);
    }

    // تحديث عرض العدادات
    this.updateCounterDisplays();
  }

  // ===== تحديث عرض العدادات =====
  updateCounterDisplays() {
    const downloadsElement = document.querySelector('[data-target="15847"]');
    if (downloadsElement) {
      downloadsElement.setAttribute('data-target', this.bookData.totalDownloads);
    }
  }

  // ===== تحميل الكتاب المحسن =====
  downloadBook() {
    this.userInteractions.buttonClicks++;

    // تتبع التحميل
    console.log('📊 تم تتبع طلب تحميل الكتاب');

    // تحديث العداد
    this.bookData.totalDownloads++;
    localStorage.setItem('totalDownloads', this.bookData.totalDownloads);

    // إضافة تأثير بصري
    const downloadBtn = document.querySelector('.btn-download');
    if (downloadBtn) {
      downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحضير...';
      downloadBtn.style.pointerEvents = 'none';

      setTimeout(() => {
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> تحميل الكتاب مجاناً';
        downloadBtn.style.pointerEvents = 'auto';

        // إرسال تنبيه محسن
        this.showEnhancedAlert('download');

        // فتح الرابط
        window.open(this.bookData.downloadLink, '_blank');
      }, 1500);
    }

    // حفظ وقت التحميل
    localStorage.setItem('lastDownloadTime', Date.now());
  }

  // ===== مشاركة الكتاب المحسنة =====
  async shareBook() {
    this.userInteractions.buttonClicks++;

    const shareData = {
      title: this.bookData.title,
      text: `أفضل كتاب خارجي في اللغة العربية للصف الأول الإعدادي - تحميل مجاني من موقع المتميزون`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        console.log('✅ تم مشاركة الكتاب بنجاح');
      } else {
        // نسخ للحافظة
        await navigator.clipboard.writeText(window.location.href);
        this.showEnhancedAlert('share');
      }
    } catch (error) {
      console.error('❌ خطأ في المشاركة:', error);
      this.showEnhancedAlert('error');
    }
  }

  // ===== تقييم الكتاب المحسن =====
  rateBook() {
    this.userInteractions.buttonClicks++;

    const modal = this.createRatingModal();
    document.body.appendChild(modal);

    // تأثير ظهور
    setTimeout(() => {
      modal.style.opacity = '1';
      modal.querySelector('.rating-modal').style.transform = 'scale(1)';
    }, 10);
  }

  // ===== إنشاء مودال التقييم =====
  createRatingModal() {
    const modal = document.createElement('div');
    modal.className = 'rating-modal-overlay';
    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

    modal.innerHTML = `
            <div class="rating-modal" style="
                background: white;
                border-radius: 20px;
                padding: 40px;
                max-width: 400px;
                width: 90%;
                text-align: center;
                transform: scale(0.7);
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            ">
                <h3 style="color: #333; margin-bottom: 20px; font-size: 1.5rem;">قيم الكتاب</h3>
                <p style="color: #666; margin-bottom: 30px;">ساعدنا في تحسين خدماتنا</p>
                
                <div class="star-rating" style="margin-bottom: 30px;">
                    ${[1, 2, 3, 4, 5].map(num => `
                        <i class="fas fa-star rating-star" data-rating="${num}" style="
                            font-size: 2rem;
                            color: #ddd;
                            cursor: pointer;
                            margin: 0 5px;
                            transition: all 0.3s ease;
                        "></i>
                    `).join('')}
                </div>
                
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button onclick="this.closest('.rating-modal-overlay').remove()" style="
                        background: #6c757d;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: background 0.3s ease;
                    ">إلغاء</button>
                    
                    <button class="submit-rating" style="
                        background: #667eea;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: background 0.3s ease;
                        opacity: 0.5;
                        pointer-events: none;
                    ">تأكيد التقييم</button>
                </div>
            </div>
        `;

    this.setupRatingInteraction(modal);
    return modal;
  }

  // ===== إعداد تفاعل التقييم =====
  setupRatingInteraction(modal) {
    const stars = modal.querySelectorAll('.rating-star');
    const submitBtn = modal.querySelector('.submit-rating');
    let selectedRating = 0;

    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const rating = parseInt(star.dataset.rating);
        this.highlightStars(stars, rating);
      });

      star.addEventListener('mouseleave', () => {
        this.highlightStars(stars, selectedRating);
      });

      star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.rating);
        this.highlightStars(stars, selectedRating);

        submitBtn.style.opacity = '1';
        submitBtn.style.pointerEvents = 'auto';
      });
    });

    submitBtn.addEventListener('click', () => {
      this.submitRating(selectedRating);
      modal.remove();
    });

    // إغلاق عند النقر خارج المودال
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  // ===== تمييز النجوم =====
  highlightStars(stars, rating) {
    stars.forEach((star, index) => {
      if (index < rating) {
        star.style.color = '#ffd700';
        star.style.transform = 'scale(1.1)';
      } else {
        star.style.color = '#ddd';
        star.style.transform = 'scale(1)';
      }
    });
  }

  // ===== إرسال التقييم =====
  submitRating(rating) {
    const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    preferences.bookRating = rating;
    preferences.ratingDate = Date.now();
    localStorage.setItem('userPreferences', JSON.stringify(preferences));

    this.showEnhancedAlert('rating', rating);
    console.log(`⭐ تم تقييم الكتاب: ${rating}/5`);
  }

  // ===== عرض التنبيهات المحسنة =====
  showEnhancedAlert(type, extra = null) {
    const alerts = {
      download: {
        icon: '🎉',
        title: 'شكراً لك!',
        message: 'سيتم توجيهك لرابط التحميل.\nإذا لم يبدأ التحميل تلقائياً، تأكد من السماح للنوافذ المنبثقة.'
      },
      share: {
        icon: '✅',
        title: 'تم نسخ الرابط!',
        message: 'يمكنك الآن مشاركته مع أصدقائك.'
      },
      rating: {
        icon: '⭐',
        title: 'شكراً لتقييمك!',
        message: `تقييمك ${extra}/5 يساعدنا في تحسين خدماتنا.`
      },
      error: {
        icon: '❌',
        title: 'عذراً!',
        message: 'حدث خطأ. يرجى المحاولة مرة أخرى.'
      }
    };

    const alertData = alerts[type];
    const alertEl = this.createAlertElement(alertData);
    document.body.appendChild(alertEl);

    // إزالة تلقائية بعد 5 ثوان
    setTimeout(() => {
      alertEl.remove();
    }, 5000);
  }

  // ===== إنشاء عنصر التنبيه =====
  createAlertElement(data) {
    const alert = document.createElement('div');
    alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 3000;
            max-width: 350px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border-left: 4px solid #667eea;
        `;

    alert.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <span style="font-size: 2rem;">${data.icon}</span>
                <div>
                    <h4 style="margin: 0 0 5px 0; color: #333;">${data.title}</h4>
                    <p style="margin: 0; color: #666; line-height: 1.4;">${data.message}</p>
                </div>
                <button onclick="this.closest('div').remove()" style="
                    background: none;
                    border: none;
                    font-size: 1.2rem;
                    cursor: pointer;
                    color: #999;
                    margin-right: auto;
                ">×</button>
            </div>
        `;

    // تأثير الظهور
    setTimeout(() => {
      alert.style.opacity = '1';
      alert.style.transform = 'translateX(0)';
    }, 10);

    return alert;
  }

  // ===== إغلاق جميع المودالز =====
  closeAllModals() {
    document.querySelectorAll('.rating-modal-overlay').forEach(modal => {
      modal.remove();
    });
  }

  // ===== عرض التقييم السابق =====
  displayPreviousRating(rating) {
    console.log(`⭐ تقييم سابق: ${rating}/5`);
  }

  // ===== معاينة الكتاب =====
  previewBook() {
    this.showEnhancedAlert('error');
    console.log('📖 معاينة الكتاب - قيد التطوير');
  }

  // ===== الانتقال للأعلى =====
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // ===== تقرير الإحصائيات =====
  getAnalyticsReport() {
    return {
      pageViews: this.userInteractions.pageViews,
      timeSpent: Date.now() - this.userInteractions.startTime,
      scrollDepth: this.userInteractions.scrollDepth,
      buttonClicks: this.userInteractions.buttonClicks,
      totalDownloads: this.bookData.totalDownloads
    };
  }
}

// ===== GLOBAL FUNCTIONS =====
let arabicBookPageInstance;

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function () {
  arabicBookPageInstance = new ArabicBookPage();

  // تسجيل الوظائف العامة
  window.downloadBook = () => arabicBookPageInstance.downloadBook();
  window.shareBook = () => arabicBookPageInstance.shareBook();
  window.rateBook = () => arabicBookPageInstance.rateBook();
  window.previewBook = () => arabicBookPageInstance.previewBook();
  window.scrollToTop = () => arabicBookPageInstance.scrollToTop();
  window.trackDownload = () => arabicBookPageInstance.downloadBook();
});

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('✅ Service Worker مسجل بنجاح');
      })
      .catch(error => {
        console.log('❌ فشل تسجيل Service Worker');
      });
  });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function (e) {
  console.error('❌ خطأ في الصفحة:', e.error);
  // يمكن إرسال التقرير لخدمة تتبع الأخطاء
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', function () {
  const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
  console.log(`⚡ وقت تحميل الصفحة: ${loadTime}ms`);

  if (loadTime > 3000) {
    console.warn('⚠️ الصفحة تستغرق وقتاً طويلاً للتحميل');
  }
});

console.log('🚀 Arabic Book Page Script Loaded Successfully!');