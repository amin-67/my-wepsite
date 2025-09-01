/**
 * MAIN WEBSITE SCRIPT - ENHANCED VERSION
 * نسخة محسنة من سكريبت الموقع الرئيسي
 * مع ربط الصفحات الفرعية الجديدة
 */

// ===== بيانات الكتب المحدثة =====
const booksData = {
  'grade-1-prep': [
    {
      id: 1,
      title: 'كتاب الامتحان - اللغة العربية',
      subject: 'اللغة العربية',
      grade: 'الصف الأول الإعدادي',
      year: '2026',
      cover: 'assets/images/books/arabic-exam.jpg',
      downloadLink: 'https://t.me/G5_Y5/12243?single',
      pageLink: 'pages/arabic-exam-book.html',
      size: '45 MB',
      downloads: 15847,
      rating: 4.9,
      description: 'أفضل كتاب خارجي في اللغة العربية للصف الأول الإعدادي',
      type: 'external',
      featured: true
    },
    {
      id: 2,
      title: 'كتاب البيان - اللغة العربية',
      subject: 'اللغة العربية',
      grade: 'الصف الأول الإعدادي الأزهري',
      year: '2026',
      cover: 'assets/images/books/azhar-bayan.jpg',
      downloadLink: 'https://t.me/G5_Y5/12611',
      pageLink: 'pages/azhar-bayan-book.html',
      size: '38 MB',
      downloads: 8534,
      rating: 4.9,
      description: 'كتاب البيان في اللغة العربية للصف الأول الإعدادي الأزهري - منهج معتمد من الأزهر الشريف',
      type: 'azhar',
      institution: 'الأزهر الشريف',
      term: 'الفصل الدراسي الأول',
      featured: true
    },
    {
      id: 3,
      title: 'كتاب الفائز - الحاسب الآلي',
      subject: 'الحاسب الآلي',
      grade: 'الصف الأول الإعدادي',
      year: '2026',
      cover: 'assets/images/books/computer-faez.jpg',
      downloadLink: 'https://t.me/G5_Y5/12762',
      pageLink: 'pages/computer-faez-book.html',
      size: '42 MB',
      downloads: 6247,
      rating: 4.8,
      description: 'أفضل كتاب في الحاسب الآلي للصف الأول الإعدادي - شرح شامل ومبسط للتكنولوجيا الحديثة',
      type: 'computer',
      institution: 'تقني متخصص',
      term: 'الفصل الدراسي الأول',
      featured: true
    }
  ],
  'grade-2-prep': [],
  'grade-3-prep': [],
  'grade-1-sec': [],
  'grade-2-sec': [],
  'grade-3-sec': []
};

// ===== إحصائيات المراحل المحدثة =====
const gradesStats = {
  'grade-1-prep': {
    booksCount: 3,
    downloadCount: '30.6K',
    status: 'available'
  },
  'grade-2-prep': {
    booksCount: 0,
    downloadCount: 'قريباً',
    status: 'coming-soon'
  },
  'grade-3-prep': {
    booksCount: 0,
    downloadCount: 'قريباً',
    status: 'coming-soon'
  },
  'grade-1-sec': {
    booksCount: 0,
    downloadCount: 'قريباً',
    status: 'coming-soon'
  },
  'grade-2-sec': {
    booksCount: 0,
    downloadCount: 'قريباً',
    status: 'coming-soon'
  },
  'grade-3-sec': {
    booksCount: 0,
    downloadCount: 'قريباً',
    status: 'coming-soon'
  }
};

// ===== تحديث عرض عدادات المراحل =====
function updateGradeCounters() {
  Object.keys(gradesStats).forEach(gradeId => {
    const stats = gradesStats[gradeId];

    // تحديث عداد الكتب
    const booksCountElement = document.getElementById(`books-count-${gradeId}`);
    if (booksCountElement) {
      booksCountElement.textContent = stats.booksCount;
    }

    // تحديث عداد التحميلات
    const downloadElements = document.querySelectorAll(`[data-grade="${gradeId}"] .stat span`);
    if (downloadElements.length > 3) {
      downloadElements[3].textContent = stats.downloadCount;
    }
  });
}

// ===== عرض كتب المرحلة مع التحسينات =====
function showGradeBooks(gradeId) {
  const books = booksData[gradeId] || [];
  const gradeNames = {
    'grade-1-prep': 'الصف الأول الإعدادي',
    'grade-2-prep': 'الصف الثاني الإعدادي',
    'grade-3-prep': 'الصف الثالث الإعدادي',
    'grade-1-sec': 'الصف الأول الثانوي',
    'grade-2-sec': 'الصف الثاني الثانوي',
    'grade-3-sec': 'الصف الثالث الثانوي'
  };

  // تحديث عنوان المودال
  const modalTitle = document.getElementById('modal-title');
  if (modalTitle) {
    modalTitle.textContent = `كتب ${gradeNames[gradeId]}`;
  }

  // إنشاء شبكة الكتب
  const booksGrid = document.getElementById('books-grid');
  if (!booksGrid) return;

  if (books.length === 0) {
    booksGrid.innerHTML = `
      <div class="no-books-message">
        <div class="no-books-icon">
          <i class="fas fa-book-open"></i>
        </div>
        <h3>قريباً جداً!</h3>
        <p>كتب ${gradeNames[gradeId]} ستكون متاحة قريباً</p>
        <div class="coming-soon-badge">
          <i class="fas fa-clock"></i>
          <span>قيد التحضير</span>
        </div>
      </div>
    `;
  } else {
    booksGrid.innerHTML = books.map(book => createEnhancedBookCard(book)).join('');
  }

  // إظهار المودال مع تأثيرات محسنة
  const modal = document.getElementById('books-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // تأثير تدريجي للكتب
    setTimeout(() => {
      const bookCards = modal.querySelectorAll('.book-card');
      bookCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }, 100);
  }

  // تتبع الإحصائيات
  console.log(`📊 تم عرض كتب ${gradeNames[gradeId]} - عدد الكتب: ${books.length}`);
}

// ===== إنشاء بطاقة كتاب محسنة =====
function createEnhancedBookCard(book) {
  const institutionBadge = book.type === 'azhar' ?
    `<div class="institution-badge azhar-badge">
      <i class="fas fa-moon"></i>
      <span>الأزهر الشريف</span>
    </div>` :
    book.type === 'computer' ?
      `<div class="institution-badge tech-badge">
      <i class="fas fa-laptop-code"></i>
      <span>تقني متخصص</span>
    </div>` : '';

  const featuredBadge = book.featured ?
    `<div class="featured-badge">
      <i class="fas fa-star"></i>
      <span>مميز</span>
    </div>` : '';

  const typeClass = book.type === 'azhar' ? 'azhar-book' :
    book.type === 'computer' ? 'computer-book' : 'regular-book';

  const sealElement = book.type === 'azhar' ?
    '<div class="azhar-seal"><i class="fas fa-moon"></i></div>' :
    book.type === 'computer' ?
      '<div class="tech-seal"><i class="fas fa-microchip"></i></div>' : '';

  return `
    <div class="book-card enhanced-book-card ${typeClass}" data-book-id="${book.id}">
      ${featuredBadge}
      ${institutionBadge}
      
      <div class="book-cover-container">
        <div class="book-cover" style="background: ${getBookCoverGradient(book.type)}">
          <div class="book-cover-content">
            <i class="fas fa-book-open book-icon"></i>
            <div class="book-title-short">${book.title.split(' - ')[0]}</div>
            <div class="book-subject">${book.subject}</div>
          </div>
          ${sealElement}
        </div>
      </div>

      <div class="book-info">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-description">${book.description}</p>
        
        <div class="book-meta">
          <div class="meta-row">
            <span class="meta-label">المرحلة:</span>
            <span class="meta-value">${book.grade}</span>
          </div>
          <div class="meta-row">
            <span class="meta-label">السنة:</span>
            <span class="meta-value">${book.year}</span>
          </div>
          ${book.term ? `
            <div class="meta-row">
              <span class="meta-label">الفصل:</span>
              <span class="meta-value">${book.term}</span>
            </div>
          ` : ''}
        </div>

        <div class="book-stats">
          <div class="stat-item">
            <i class="fas fa-download"></i>
            <span>${book.downloads.toLocaleString('ar-EG')}</span>
          </div>
          <div class="stat-item">
            <i class="fas fa-star"></i>
            <span>${book.rating}/5</span>
          </div>
          <div class="stat-item">
            <i class="fas fa-file-pdf"></i>
            <span>${book.size}</span>
          </div>
        </div>

        <div class="book-actions">
          <a href="${book.pageLink}" class="btn btn-primary btn-page-link">
            <i class="fas fa-eye"></i>
            <span>عرض التفاصيل</span>
          </a>
          <a href="${book.downloadLink}" target="_blank" class="btn btn-outline btn-download-direct" onclick="trackDirectDownload('${book.title}')">
            <i class="fas fa-download"></i>
            <span>تحميل مباشر</span>
          </a>
        </div>
      </div>
    </div>
  `;
}// ===== الحصول على تدرج لوني حسب نوع الكتاب =====
function getBookCoverGradient(type) {
  const gradients = {
    'azhar': 'linear-gradient(135deg, #1e7e34 0%, #28a745 50%, #1e7e34 100%)',
    'external': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
    'computer': 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%)',
    'default': 'linear-gradient(135deg, #6c757d 0%, #495057 50%, #6c757d 100%)'
  };

  return gradients[type] || gradients.default;
}// ===== تتبع التحميل المباشر =====
function trackDirectDownload(bookTitle) {
  console.log(`📥 تم تتبع تحميل مباشر: ${bookTitle}`);

  // حفظ في التخزين المحلي
  const downloads = JSON.parse(localStorage.getItem('userDownloads') || '[]');
  downloads.push({
    title: bookTitle,
    timestamp: Date.now(),
    type: 'direct'
  });
  localStorage.setItem('userDownloads', JSON.stringify(downloads));
}

// ===== إغلاق مودال الكتب مع تأثيرات =====
function closeBooksModal() {
  const modal = document.getElementById('books-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';

    // إخفاء الكتب تدريجياً
    const bookCards = modal.querySelectorAll('.book-card');
    bookCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
      }, index * 50);
    });
  }
}

// ===== تهيئة الموقع المحسنة =====
document.addEventListener('DOMContentLoaded', function () {
  console.log('🚀 تم تحميل الموقع الرئيسي مع التحسينات الجديدة');

  // تحديث عدادات المراحل
  updateGradeCounters();

  // إضافة مستمع للوحة المفاتيح للتنقل السريع
  document.addEventListener('keydown', function (e) {
    // ESC لإغلاق المودال
    if (e.key === 'Escape') {
      closeBooksModal();
    }

    // أرقام 1-6 لفتح مراحل مختلفة
    const gradeKeys = {
      '1': 'grade-1-prep',
      '2': 'grade-2-prep',
      '3': 'grade-3-prep',
      '4': 'grade-1-sec',
      '5': 'grade-2-sec',
      '6': 'grade-3-sec'
    };

    if (e.ctrlKey && gradeKeys[e.key]) {
      e.preventDefault();
      showGradeBooks(gradeKeys[e.key]);
    }
  });

  // تحسين تجربة البحث
  const searchInput = document.querySelector('.search-input-main');
  if (searchInput) {
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        performEnhancedSearch(this.value);
      }
    });
  }

  // إضافة تأثيرات عند الحركة
  const gradeCards = document.querySelectorAll('.grade-card');
  gradeCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  console.log('✅ تم ربط صفحات الكتب الفرعية بنجاح');
  console.log('📚 الكتب المتاحة:');
  console.log('  - كتاب الامتحان (عام)');
  console.log('  - كتاب البيان (أزهري)');
});

// ===== البحث المحسن =====
function performEnhancedSearch(query) {
  if (!query.trim()) return;

  console.log(`🔍 بحث محسن: ${query}`);

  // البحث في جميع الكتب
  const allBooks = Object.values(booksData).flat();
  const results = allBooks.filter(book =>
    book.title.toLowerCase().includes(query.toLowerCase()) ||
    book.subject.toLowerCase().includes(query.toLowerCase()) ||
    book.description.toLowerCase().includes(query.toLowerCase())
  );

  if (results.length > 0) {
    console.log(`✅ تم العثور على ${results.length} نتيجة`);
    // يمكن إضافة عرض النتائج هنا
  } else {
    console.log('❌ لم يتم العثور على نتائج');
  }
}

// ===== تحديث إحصائيات الصفحة الرئيسية =====
function updateMainPageStats() {
  // إجمالي الكتب
  const totalBooks = Object.values(booksData).flat().length;

  // إجمالي التحميلات
  const totalDownloads = Object.values(booksData).flat()
    .reduce((sum, book) => sum + book.downloads, 0);

  // تحديث العدادات في الصفحة
  const statsElements = document.querySelectorAll('.hero-stats .stat-number');
  if (statsElements.length >= 2) {
    // تحديث عدد الطلاب (محاكاة)
    animateCounter(statsElements[0], 0, 500000, 2000);

    // تحديث عدد الكتب
    animateCounter(statsElements[1], 0, totalBooks, 1500);

    // تحديث عدد المراحل
    if (statsElements[2]) {
      animateCounter(statsElements[2], 0, 6, 1000);
    }
  }

  console.log(`📊 إحصائيات محدثة - الكتب: ${totalBooks}, التحميلات: ${totalDownloads.toLocaleString('ar-EG')}`);
}

// ===== تحريك العدادات =====
function animateCounter(element, start, end, duration) {
  const startTime = performance.now();
  const range = end - start;

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = start + (range * easeOutCubic(progress));

    element.textContent = Math.floor(current).toLocaleString('ar-EG');

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = end.toLocaleString('ar-EG');
    }
  }

  requestAnimationFrame(updateCounter);
}

// ===== منحنى التسارع =====
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// ===== إضافة CSS للتحسينات =====
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
/* تحسينات بطاقات الكتب */
.enhanced-book-card {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.enhanced-book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
}

.institution-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255,255,255,0.95);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 4px;
}

.azhar-badge {
  background: rgba(30, 126, 52, 0.95);
  color: white;
}

.featured-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #333;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 4px;
}

.azhar-book .book-cover {
  background: linear-gradient(135deg, #1e7e34 0%, #28a745 50%, #1e7e34 100%) !important;
}

.azhar-seal {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
  background: rgba(255, 215, 0, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffd700;
  font-size: 12px;
  border: 1px solid rgba(255, 215, 0, 0.5);
}

.book-actions {
  display: flex;
  gap: 8px;
  margin-top: 15px;
}

.btn-page-link {
  flex: 1;
}

.btn-download-direct {
  flex: 1;
}

.no-books-message {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.no-books-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.5;
}

.coming-soon-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fff3cd;
  color: #856404;
  padding: 8px 16px;
  border-radius: 20px;
  margin-top: 15px;
  font-size: 14px;
}

/* تحسينات الانتقالات */
.book-card {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.books-modal.active .book-card {
  opacity: 1;
  transform: translateY(0);
}
`;

document.head.appendChild(enhancedStyles);

// تشغيل تحديث الإحصائيات عند التحميل
setTimeout(updateMainPageStats, 1000);

// ===== إخفاء شاشة التحميل =====
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    // انتظار قصير لضمان تحميل الموارد
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        document.body.classList.add('loaded');
      }, 300);
    }, 800); // انتظار أقل
  }
}

// ===== إعداد الوظائف الأساسية =====
function setupBasicFunctions() {
  // إخفاء شاشة التحميل
  hideLoadingScreen();

  // إعداد زر التمرير للأعلى
  setupScrollToTop();

  // إعداد البحث
  setupNavSearch();

  // إعداد التنقل للموبايل
  setupMobileNavigation();

  // تشغيل العدادات
  setTimeout(animateHeroCounters, 1500);
}

// ===== إعداد زر التمرير للأعلى =====
function setupScrollToTop() {
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

// ===== إعداد البحث في الشريط العلوي =====
function setupNavSearch() {
  const navSearchBtn = document.querySelector('.search-btn-nav');
  const navSearchInput = document.querySelector('.search-input-nav');

  if (navSearchBtn && navSearchInput) {
    navSearchBtn.addEventListener('click', () => {
      const query = navSearchInput.value.trim();
      if (query) {
        performEnhancedSearch(query);
      }
    });

    navSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = navSearchInput.value.trim();
        if (query) {
          performEnhancedSearch(query);
        }
      }
    });
  }
}

// ===== إعداد التنقل للموبايل =====
function setupMobileNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // إغلاق القائمة عند النقر على رابط
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

// ===== تحريك العدادات في Hero =====
function animateHeroCounters() {
  const counterElements = document.querySelectorAll('.hero-stats .stat-number');

  counterElements.forEach((element, index) => {
    const target = parseInt(element.getAttribute('data-target'));
    setTimeout(() => {
      animateCounter(element, 0, target, 2000);
    }, index * 200);
  });
}

// ===== تشغيل الوظائف عند التحميل =====
document.addEventListener('DOMContentLoaded', setupBasicFunctions);
window.addEventListener('load', () => {
  console.log('🎯 تم تحميل جميع العناصر بنجاح');
  hideLoadingScreen(); // ضمان إخفاء شاشة التحميل
});

console.log('🔗 تم ربط الصفحات الفرعية بالصفحة الرئيسية بنجاح!');