/**
 * AZHAR BAYAN BOOK PAGE - ENHANCED JAVASCRIPT
 * كتاب البيان أزهري - جافاسكريبت محسن
 * 
 * المميزات الأزهرية:
 * - تصميم إسلامي أنيق
 * - تتبع متقدم للطلاب الأزهريين
 * - إحصائيات خاصة بالمنهج الأزهري
 * - تفاعلات محسنة مع طابع أزهري
 */

class AzharBayanBookPage {
  constructor() {
    this.bookData = {
      title: 'كتاب البيان - اللغة العربية',
      grade: 'الصف الأول الإعدادي الأزهري',
      term: 'الفصل الدراسي الأول',
      year: '2026',
      downloadLink: 'https://t.me/G5_Y5/12611',
      totalDownloads: 8534,
      rating: 4.9,
      pages: 180,
      institution: 'الأزهر الشريف'
    };

    this.azharTheme = {
      primaryColor: '#1e7e34',
      secondaryColor: '#28a745',
      accentColor: '#20c997',
      goldColor: '#ffd700',
      darkColor: '#155724'
    };

    this.userInteractions = {
      pageViews: 0,
      timeSpent: 0,
      scrollDepth: 0,
      buttonClicks: 0,
      azharStudentFlag: false
    };

    this.init();
  }

  // ===== تهيئة الصفحة الأزهرية =====
  init() {
    this.trackAzharPageView();
    this.setupIslamicAnimations();
    this.setupAzharScrollEffects();
    this.setupIslamicParallax();
    this.setupAzharKeyboardNavigation();
    this.loadAzharPreferences();
    this.initializeAzharCounters();
    this.setupIslamicPatterns();

    console.log('🌙 صفحة كتاب البيان الأزهري تم تحميلها بنجاح!');
    console.log('🕌 مرحباً بطلاب الأزهر الشريف');
  }

  // ===== تتبع زيارة طلاب الأزهر =====
  trackAzharPageView() {
    const azharVisits = parseInt(localStorage.getItem('azharBayanPageVisits') || '0') + 1;
    localStorage.setItem('azharBayanPageVisits', azharVisits);

    this.userInteractions.pageViews = azharVisits;
    this.userInteractions.startTime = Date.now();

    // تحديد نوع الطالب
    const isAzharStudent = this.detectAzharStudent();
    if (isAzharStudent) {
      this.userInteractions.azharStudentFlag = true;
      localStorage.setItem('isAzharStudent', 'true');
    }

    // تتبع وقت البقاء
    window.addEventListener('beforeunload', () => {
      const timeSpent = Date.now() - this.userInteractions.startTime;
      localStorage.setItem('azharTimeSpent', timeSpent);

      // إرسال دعاء عند مغادرة الصفحة
      console.log('🤲 بارك الله في علمك وعملك');
    });

    console.log(`📊 زيارة رقم ${azharVisits} لصفحة كتاب البيان الأزهري`);
  }

  // ===== كشف الطالب الأزهري =====
  detectAzharStudent() {
    const userAgent = navigator.userAgent.toLowerCase();
    const language = navigator.language;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // مؤشرات الطالب الأزهري (تحليل بسيط)
    const azharIndicators = [
      localStorage.getItem('azharStudentHistory'),
      timeZone.includes('Cairo'),
      language.includes('ar'),
      document.referrer.includes('azhar')
    ];

    return azharIndicators.filter(Boolean).length >= 2;
  }

  // ===== إعداد الرسوم المتحركة الإسلامية =====
  setupIslamicAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const islamicObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateIslamicElement(entry.target);

          // تشغيل العدادات الأزهرية
          if (entry.target.classList.contains('stats-section')) {
            this.animateAzharStatistics();
          }

          // تحريك بطاقات الكتب الأزهرية
          if (entry.target.classList.contains('book-card')) {
            this.animateAzharBookCard(entry.target);
          }
        }
      });
    }, observerOptions);

    // مراقبة العناصر مع طابع إسلامي
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      islamicObserver.observe(el);
    });
  }

  // ===== تحريك العناصر بطابع إسلامي =====
  animateIslamicElement(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    element.classList.add('animate');

    // إضافة تأثيرات خاصة بالتصميم الأزهري
    if (element.classList.contains('book-info')) {
      element.style.animation = 'islamicSlideIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }

    // تأثير الذهب الأزهري
    if (element.querySelector('.stat-number')) {
      this.addGoldenGlow(element);
    }
  }

  // ===== إضافة توهج ذهبي =====
  addGoldenGlow(element) {
    const statNumbers = element.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      stat.style.textShadow = '0 0 20px rgba(255, 215, 0, 0.5)';
      stat.style.animation = 'goldenPulse 2s ease-in-out infinite';
    });
  }

  // ===== تحريك الإحصائيات الأزهرية =====
  animateAzharStatistics() {
    const statElements = document.querySelectorAll('.stat-number');

    statElements.forEach((stat, index) => {
      const target = parseInt(stat.getAttribute('data-target'));

      // تأخير تدريجي للتأثير البصري
      setTimeout(() => {
        this.animateAzharCounter(stat, 0, target, 2500);
      }, index * 200);
    });

    // إضافة تأثير صوتي بصري للإحصائيات
    this.addStatisticsEffects();
  }

  // ===== عداد أزهري متحرك =====
  animateAzharCounter(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;

    const updateAzharCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // منحنى تسارع إسلامي (مستوحى من فن العمارة الإسلامية)
      const easedProgress = this.islamicEasing(progress);
      const current = start + (range * easedProgress);

      // تنسيق الأرقام العربية
      if (element.classList.contains('stat-number')) {
        element.textContent = this.formatArabicNumber(Math.floor(current));
      } else {
        element.textContent = Math.floor(current);
      }

      if (progress < 1) {
        requestAnimationFrame(updateAzharCounter);
      } else {
        element.textContent = this.formatArabicNumber(end);
        this.celebrateCounterCompletion(element);
      }
    };

    requestAnimationFrame(updateAzharCounter);
  }

  // ===== منحنى التسارع الإسلامي =====
  islamicEasing(t) {
    // منحنى مستوحى من الأشكال الهندسية الإسلامية
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  // ===== تنسيق الأرقام العربية =====
  formatArabicNumber(number) {
    return number.toLocaleString('ar-EG');
  }

  // ===== احتفال بإكمال العداد =====
  celebrateCounterCompletion(element) {
    element.style.transform = 'scale(1.1)';
    element.style.color = this.azharTheme.goldColor;

    setTimeout(() => {
      element.style.transform = 'scale(1)';
      element.style.color = '';
    }, 300);
  }

  // ===== إضافة تأثيرات الإحصائيات =====
  addStatisticsEffects() {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      // إضافة جسيمات ذهبية
      this.createGoldenParticles(statsSection);
    }
  }

  // ===== إنشاء جسيمات ذهبية =====
  createGoldenParticles(container) {
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: ${this.azharTheme.goldColor};
                border-radius: 50%;
                pointer-events: none;
                animation: goldenFloat ${3 + Math.random() * 2}s ease-in-out infinite;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                opacity: 0.7;
            `;
      container.appendChild(particle);

      // إزالة الجسيم بعد انتهاء الحركة
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 5000);
    }
  }

  // ===== تأثيرات التمرير الأزهرية =====
  setupAzharScrollEffects() {
    let ticking = false;

    const updateAzharScroll = () => {
      const scrolled = window.pageYOffset;

      // تأثيرات الخط العربي أثناء التمرير
      this.updateArabicCalligraphy(scrolled);

      // تأثيرات الأنماط الإسلامية
      this.updateIslamicPatterns(scrolled);

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      this.trackAzharScrollDepth();

      if (!ticking) {
        requestAnimationFrame(updateAzharScroll);
        ticking = true;
      }
    });
  }

  // ===== تتبع عمق التمرير الأزهري =====
  trackAzharScrollDepth() {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollDepth = Math.round((scrollTop / documentHeight) * 100);

    this.userInteractions.scrollDepth = Math.max(this.userInteractions.scrollDepth, scrollDepth);

    // حفظ عمق التمرير الأزهري
    localStorage.setItem('azharMaxScrollDepth', this.userInteractions.scrollDepth);

    // تفعيل مؤثرات خاصة عند نقاط معينة
    if (scrollDepth === 25) {
      console.log('🌙 ربع الصفحة - بارك الله فيك');
    } else if (scrollDepth === 50) {
      console.log('🕌 نصف الصفحة - واصل القراءة');
    } else if (scrollDepth === 75) {
      console.log('📿 ثلاثة أرباع - قريب من النهاية');
    } else if (scrollDepth === 100) {
      console.log('✨ تم الإنتهاء - جزاك الله خيراً');
      this.showCompletionBlessings();
    }
  }

  // ===== إظهار البركات عند الإكمال =====
  showCompletionBlessings() {
    const blessings = [
      'بارك الله في علمك 🤲',
      'وفقك الله لما يحبه ويرضاه 🌙',
      'زادك الله علماً وتقوى 📿',
      'أثابك الله خير الثواب ✨'
    ];

    const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
    this.showAzharAlert('blessing', randomBlessing);
  }

  // ===== تحديث الخط العربي =====
  updateArabicCalligraphy(scrolled) {
    const calligraphyElements = document.querySelectorAll('.hero-title, .section-title');
    calligraphyElements.forEach(element => {
      const speed = 0.5;
      const yPos = scrolled * speed;
      element.style.textShadow = `0 ${yPos * 0.1}px 20px rgba(0, 0, 0, 0.3)`;
    });
  }

  // ===== تحديث الأنماط الإسلامية =====
  updateIslamicPatterns(scrolled) {
    const patterns = document.querySelectorAll('.hero::before');
    patterns.forEach(pattern => {
      const speed = 0.2;
      const yPos = scrolled * speed;
      pattern.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
  }

  // ===== إعداد الأنماط الإسلامية =====
  setupIslamicPatterns() {
    // إضافة CSS للأنماط الهندسية الإسلامية
    const style = document.createElement('style');
    style.textContent = `
            @keyframes islamicSlideIn {
                from {
                    opacity: 0;
                    transform: translateX(-30px) rotate(-2deg);
                }
                to {
                    opacity: 1;
                    transform: translateX(0) rotate(0deg);
                }
            }
            
            @keyframes goldenPulse {
                0%, 100% {
                    text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
                }
                50% {
                    text-shadow: 0 0 25px rgba(255, 215, 0, 0.7);
                }
            }
            
            @keyframes goldenFloat {
                0%, 100% {
                    transform: translateY(0px) rotate(0deg);
                    opacity: 0.4;
                }
                50% {
                    transform: translateY(-15px) rotate(180deg);
                    opacity: 1;
                }
            }
        `;
    document.head.appendChild(style);
  }

  // ===== التنقل بالكيبورد الأزهري =====
  setupAzharKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ب': // حرف الباء لـ "بيان"
          if (e.ctrlKey) {
            e.preventDefault();
            this.downloadAzharBook();
          }
          break;

        case 'م': // حرف الميم لـ "مشاركة"
          if (e.ctrlKey) {
            e.preventDefault();
            this.shareAzharBook();
          }
          break;

        case 'ت': // حرف التاء لـ "تقييم"
          if (e.ctrlKey) {
            e.preventDefault();
            this.rateAzharBook();
          }
          break;

        case 'Escape':
          this.closeAllAzharModals();
          break;
      }
    });
  }

  // ===== تحميل تفضيلات الأزهر =====
  loadAzharPreferences() {
    const azharPreferences = JSON.parse(localStorage.getItem('azharPreferences') || '{}');

    // تطبيق الثيم الأزهري
    if (azharPreferences.azharTheme) {
      document.body.classList.add('azhar-theme');
    }

    // تطبيق التقويم الهجري
    if (azharPreferences.hijriCalendar) {
      this.displayHijriDate();
    }

    // استعادة تقييم الكتاب الأزهري
    if (azharPreferences.azharBookRating) {
      this.displayPreviousAzharRating(azharPreferences.azharBookRating);
    }
  }

  // ===== عرض التاريخ الهجري =====
  displayHijriDate() {
    const hijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date());

    console.log(`📅 التاريخ الهجري: ${hijriDate}`);
  }

  // ===== تهيئة العدادات الأزهرية =====
  initializeAzharCounters() {
    const savedAzharDownloads = localStorage.getItem('azharTotalDownloads');
    if (savedAzharDownloads) {
      this.bookData.totalDownloads = parseInt(savedAzharDownloads);
    }

    this.updateAzharCounterDisplays();
  }

  // ===== تحديث عرض العدادات الأزهرية =====
  updateAzharCounterDisplays() {
    const downloadsElement = document.querySelector('[data-target="8534"]');
    if (downloadsElement) {
      downloadsElement.setAttribute('data-target', this.bookData.totalDownloads);
    }
  }

  // ===== تحميل الكتاب الأزهري =====
  downloadAzharBook() {
    this.userInteractions.buttonClicks++;

    console.log('📊 تم تتبع طلب تحميل كتاب البيان الأزهري');

    // تحديث عداد التحميلات الأزهرية
    this.bookData.totalDownloads++;
    localStorage.setItem('azharTotalDownloads', this.bookData.totalDownloads);

    // إضافة تأثير بصري أزهري
    const downloadBtn = document.querySelector('.btn-download');
    if (downloadBtn) {
      downloadBtn.innerHTML = '<i class="fas fa-moon fa-spin"></i> جاري التحضير...';
      downloadBtn.style.pointerEvents = 'none';
      downloadBtn.style.background = `linear-gradient(135deg, ${this.azharTheme.primaryColor}, ${this.azharTheme.secondaryColor})`;

      setTimeout(() => {
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> تحميل الكتاب مجاناً';
        downloadBtn.style.pointerEvents = 'auto';

        // إرسال بركة أزهرية
        this.showAzharAlert('download');

        // فتح الرابط
        window.open(this.bookData.downloadLink, '_blank');
      }, 1500);
    }

    // حفظ وقت التحميل الأزهري
    localStorage.setItem('lastAzharDownloadTime', Date.now());

    // تسجيل كطالب أزهري
    localStorage.setItem('azharStudentHistory', 'true');
  }

  // ===== مشاركة الكتاب الأزهري =====
  async shareAzharBook() {
    this.userInteractions.buttonClicks++;

    const azharShareData = {
      title: `${this.bookData.title} - ${this.bookData.institution}`,
      text: `كتاب البيان في اللغة العربية للصف الأول الإعدادي الأزهري - منهج معتمد من الأزهر الشريف - تحميل مجاني من موقع المتميزون`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare(azharShareData)) {
        await navigator.share(azharShareData);
        console.log('✅ تم مشاركة كتاب البيان الأزهري بنجاح');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        this.showAzharAlert('share');
      }
    } catch (error) {
      console.error('❌ خطأ في مشاركة الكتاب الأزهري:', error);
      this.showAzharAlert('error');
    }
  }

  // ===== تقييم الكتاب الأزهري =====
  rateAzharBook() {
    this.userInteractions.buttonClicks++;

    const azharModal = this.createAzharRatingModal();
    document.body.appendChild(azharModal);

    // تأثير ظهور أزهري
    setTimeout(() => {
      azharModal.style.opacity = '1';
      azharModal.querySelector('.azhar-rating-modal').style.transform = 'scale(1)';
    }, 10);
  }

  // ===== إنشاء مودال التقييم الأزهري =====
  createAzharRatingModal() {
    const modal = document.createElement('div');
    modal.className = 'azhar-rating-modal-overlay';
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
            <div class="azhar-rating-modal" style="
                background: white;
                border-radius: 20px;
                padding: 40px;
                max-width: 450px;
                width: 90%;
                text-align: center;
                transform: scale(0.7);
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                border-top: 5px solid ${this.azharTheme.primaryColor};
            ">
                <div style="
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, ${this.azharTheme.primaryColor}, ${this.azharTheme.secondaryColor});
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    color: white;
                    font-size: 1.5rem;
                ">
                    <i class="fas fa-moon"></i>
                </div>
                
                <h3 style="color: #333; margin-bottom: 10px; font-size: 1.5rem;">قيم كتاب البيان</h3>
                <p style="color: ${this.azharTheme.primaryColor}; margin-bottom: 5px; font-weight: 600;">الأزهر الشريف</p>
                <p style="color: #666; margin-bottom: 30px;">ساعدنا في تحسين المحتوى التعليمي الأزهري</p>
                
                <div class="azhar-star-rating" style="margin-bottom: 30px;">
                    ${[1, 2, 3, 4, 5].map(num => `
                        <i class="fas fa-star azhar-rating-star" data-rating="${num}" style="
                            font-size: 2rem;
                            color: #ddd;
                            cursor: pointer;
                            margin: 0 5px;
                            transition: all 0.3s ease;
                        "></i>
                    `).join('')}
                </div>
                
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button onclick="this.closest('.azhar-rating-modal-overlay').remove()" style="
                        background: #6c757d;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: background 0.3s ease;
                    ">إلغاء</button>
                    
                    <button class="submit-azhar-rating" style="
                        background: ${this.azharTheme.primaryColor};
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

    this.setupAzharRatingInteraction(modal);
    return modal;
  }

  // ===== إعداد تفاعل التقييم الأزهري =====
  setupAzharRatingInteraction(modal) {
    const stars = modal.querySelectorAll('.azhar-rating-star');
    const submitBtn = modal.querySelector('.submit-azhar-rating');
    let selectedRating = 0;

    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const rating = parseInt(star.dataset.rating);
        this.highlightAzharStars(stars, rating);
      });

      star.addEventListener('mouseleave', () => {
        this.highlightAzharStars(stars, selectedRating);
      });

      star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.rating);
        this.highlightAzharStars(stars, selectedRating);

        submitBtn.style.opacity = '1';
        submitBtn.style.pointerEvents = 'auto';
        submitBtn.style.background = this.azharTheme.secondaryColor;
      });
    });

    submitBtn.addEventListener('click', () => {
      this.submitAzharRating(selectedRating);
      modal.remove();
    });

    // إغلاق عند النقر خارج المودال
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  // ===== تمييز النجوم الأزهرية =====
  highlightAzharStars(stars, rating) {
    stars.forEach((star, index) => {
      if (index < rating) {
        star.style.color = this.azharTheme.goldColor;
        star.style.transform = 'scale(1.1)';
        star.style.textShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
      } else {
        star.style.color = '#ddd';
        star.style.transform = 'scale(1)';
        star.style.textShadow = 'none';
      }
    });
  }

  // ===== إرسال التقييم الأزهري =====
  submitAzharRating(rating) {
    const azharPreferences = JSON.parse(localStorage.getItem('azharPreferences') || '{}');
    azharPreferences.azharBookRating = rating;
    azharPreferences.azharRatingDate = Date.now();
    azharPreferences.azharStudent = true;
    localStorage.setItem('azharPreferences', JSON.stringify(azharPreferences));

    this.showAzharAlert('rating', rating);
    console.log(`⭐ تم تقييم كتاب البيان الأزهري: ${rating}/5`);
  }

  // ===== عرض التنبيهات الأزهرية =====
  showAzharAlert(type, extra = null) {
    const azharAlerts = {
      download: {
        icon: '🌙',
        title: 'بارك الله فيك!',
        message: 'سيتم توجيهك لرابط التحميل.\nوفقك الله في دراستك الأزهرية المباركة.'
      },
      share: {
        icon: '📿',
        title: 'جزاك الله خيراً!',
        message: 'تم نسخ الرابط بنجاح.\nانشر العلم لتؤجر عليه.'
      },
      rating: {
        icon: '⭐',
        title: 'أثابك الله!',
        message: `تقييمك ${extra}/5 يساعد إخوانك الطلاب.\nبارك الله في علمك.`
      },
      error: {
        icon: '🤲',
        title: 'لا بأس!',
        message: 'حدث خطأ بسيط. حاول مرة أخرى.\nوالله المستعان.'
      },
      blessing: {
        icon: '✨',
        title: 'أحسن الله إليك!',
        message: extra || 'بارك الله في وقتك وعلمك.'
      }
    };

    const alertData = azharAlerts[type];
    const alertEl = this.createAzharAlertElement(alertData);
    document.body.appendChild(alertEl);

    // إزالة تلقائية بعد 6 ثوان (أطول قليلاً للبركات)
    setTimeout(() => {
      alertEl.remove();
    }, 6000);
  }

  // ===== إنشاء عنصر التنبيه الأزهري =====
  createAzharAlertElement(data) {
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
            max-width: 400px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border-left: 4px solid ${this.azharTheme.primaryColor};
            border-top: 2px solid ${this.azharTheme.goldColor};
        `;

    alert.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <span style="font-size: 2rem;">${data.icon}</span>
                <div>
                    <h4 style="margin: 0 0 5px 0; color: ${this.azharTheme.primaryColor}; font-weight: 700;">${data.title}</h4>
                    <p style="margin: 0; color: #666; line-height: 1.4; font-size: 14px;">${data.message}</p>
                </div>
                <button onclick="this.closest('div').remove()" style="
                    background: none;
                    border: none;
                    font-size: 1.2rem;
                    cursor: pointer;
                    color: #999;
                    margin-right: auto;
                    border-radius: 50%;
                    width: 25px;
                    height: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">×</button>
            </div>
        `;

    // تأثير الظهور الأزهري
    setTimeout(() => {
      alert.style.opacity = '1';
      alert.style.transform = 'translateX(0)';
    }, 10);

    return alert;
  }

  // ===== إغلاق جميع المودالز الأزهرية =====
  closeAllAzharModals() {
    document.querySelectorAll('.azhar-rating-modal-overlay').forEach(modal => {
      modal.remove();
    });
  }

  // ===== عرض التقييم السابق =====
  displayPreviousAzharRating(rating) {
    console.log(`⭐ تقييم كتاب البيان الأزهري السابق: ${rating}/5`);
  }

  // ===== معاينة الكتاب الأزهري =====
  previewAzharBook() {
    this.showAzharAlert('error');
    console.log('📖 معاينة كتاب البيان الأزهري - قيد التطوير');
  }

  // ===== الانتقال للأعلى =====
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // ===== تقرير الإحصائيات الأزهرية =====
  getAzharAnalyticsReport() {
    return {
      pageViews: this.userInteractions.pageViews,
      timeSpent: Date.now() - this.userInteractions.startTime,
      scrollDepth: this.userInteractions.scrollDepth,
      buttonClicks: this.userInteractions.buttonClicks,
      totalDownloads: this.bookData.totalDownloads,
      azharStudent: this.userInteractions.azharStudentFlag,
      institution: this.bookData.institution
    };
  }
}

// ===== GLOBAL FUNCTIONS =====
let azharBayanPageInstance;

// تهيئة صفحة الكتاب الأزهري
document.addEventListener('DOMContentLoaded', function () {
  azharBayanPageInstance = new AzharBayanBookPage();

  // تسجيل الوظائف العامة
  window.downloadBook = () => azharBayanPageInstance.downloadAzharBook();
  window.shareBook = () => azharBayanPageInstance.shareAzharBook();
  window.rateBook = () => azharBayanPageInstance.rateAzharBook();
  window.previewBook = () => azharBayanPageInstance.previewAzharBook();
  window.scrollToTop = () => azharBayanPageInstance.scrollToTop();
  window.trackDownload = () => azharBayanPageInstance.downloadAzharBook();

  // إضافة التحية الأزهرية
  console.log('🕌 أهلاً وسهلاً بطلاب الأزهر الشريف');
  console.log('📿 نسأل الله أن ينفعكم بهذا العلم');
});

// ===== SERVICE WORKER للكتب الأزهرية =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/azhar-sw.js')
      .then(registration => {
        console.log('✅ Service Worker الأزهري مسجل بنجاح');
      })
      .catch(error => {
        console.log('📱 Service Worker غير متاح');
      });
  });
}

// ===== معالج الأخطاء الأزهري =====
window.addEventListener('error', function (e) {
  console.error('❌ خطأ في صفحة الكتاب الأزهري:', e.error);
  console.log('🤲 نستغفر الله ونسأله التوفيق');
});

// ===== مراقبة الأداء الأزهري =====
window.addEventListener('load', function () {
  const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
  console.log(`⚡ وقت تحميل صفحة كتاب البيان: ${loadTime}ms`);

  if (loadTime > 3000) {
    console.warn('⚠️ الصفحة تستغرق وقتاً أطول من المعتاد');
    console.log('🤲 نسأل الله الصبر والتيسير');
  } else {
    console.log('✅ تم التحميل بسرعة ممتازة - بارك الله فيكم');
  }
});

console.log('🌙 Azhar Bayan Book Script Loaded Successfully!');
console.log('🕌 بسم الله نبدأ - وبالله نستعين');