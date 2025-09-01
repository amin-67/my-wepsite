/**
 * SIMPLE FALLBACK SCRIPT - نسخة احتياطية مبسطة
 * لضمان عمل الموقع حتى لو فشل السكريبت الرئيسي
 */

// ===== إخفاء شاشة التحميل - مبسط =====
function hideLoadingScreenSimple() {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 300);
    }, 1000);
  }
}

// ===== بيانات الكتب البسيطة =====
const simpleBooksData = {
  'grade-1-prep': [
    {
      title: 'كتاب الامتحان - اللغة العربية',
      pageLink: 'pages/arabic-exam-book.html',
      downloadLink: 'https://t.me/G5_Y5/12243?single',
      type: 'external'
    },
    {
      title: 'كتاب البيان - اللغة العربية',
      pageLink: 'pages/azhar-bayan-book.html',
      downloadLink: 'https://t.me/G5_Y5/12611',
      type: 'azhar'
    },
    {
      title: 'كتاب الفائز - الحاسب الآلي',
      pageLink: 'pages/computer-faez-book.html',
      downloadLink: 'https://t.me/G5_Y5/12762',
      type: 'computer'
    }
  ]
};

// ===== عرض الكتب - مبسط =====
function showGradeBooksSimple(gradeId) {
  const books = simpleBooksData[gradeId] || [];
  const modal = document.getElementById('books-modal');
  const booksGrid = document.getElementById('books-grid');
  const modalTitle = document.getElementById('modal-title');

  if (!modal || !booksGrid) return;

  // تحديث عنوان المودال
  const gradeNames = {
    'grade-1-prep': 'الصف الأول الإعدادي',
    'grade-2-prep': 'الصف الثاني الإعدادي',
    'grade-3-prep': 'الصف الثالث الإعدادي'
  };

  if (modalTitle) {
    modalTitle.textContent = `كتب ${gradeNames[gradeId]} (${books.length} كتاب متاح)`;
  }

  if (books.length === 0) {
    booksGrid.innerHTML = '<div style="text-align:center; padding:40px; color:#666;"><h3>قريباً جداً!</h3><p>الكتب ستكون متاحة قريباً</p></div>';
  } else {
    booksGrid.innerHTML = books.map(book => {
      const bgColor = book.type === 'azhar' ? '#1e7e34' :
        book.type === 'computer' ? '#1e40af' : '#667eea';
      const icon = book.type === 'azhar' ? 'fas fa-moon' :
        book.type === 'computer' ? 'fas fa-laptop-code' : 'fas fa-book';
      const badge = book.type === 'azhar' ? '<span style="background:#1e7e34; color:white; padding:4px 8px; border-radius:12px; font-size:10px; position:absolute; top:10px; right:10px;">🌙 أزهري</span>' :
        book.type === 'computer' ? '<span style="background:#1e40af; color:white; padding:4px 8px; border-radius:12px; font-size:10px; position:absolute; top:10px; right:10px;">💻 تقني</span>' :
          '<span style="background:#667eea; color:white; padding:4px 8px; border-radius:12px; font-size:10px; position:absolute; top:10px; right:10px;">⭐ مميز</span>';

      return `
        <div style="background:white; padding:20px; border-radius:15px; margin:10px; box-shadow:0 8px 25px rgba(0,0,0,0.1); position:relative; transition:all 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
          ${badge}
          <div style="width:80px; height:100px; background:${bgColor}; border-radius:8px; margin:0 auto 15px; display:flex; align-items:center; justify-content:center; color:white; font-size:1.5rem; box-shadow:0 4px 15px rgba(0,0,0,0.2);">
            <i class="${icon}"></i>
          </div>
          <h3 style="color:#333; margin-bottom:10px; font-size:1.1rem; text-align:center;">${book.title}</h3>
          <p style="color:#666; text-align:center; margin-bottom:20px; font-size:13px;">الصف الأول الإعدادي • 2026</p>
          <div style="display:flex; gap:8px; margin-top:15px;">
            <a href="${book.pageLink}" style="flex:1; background:${bgColor}; color:white; padding:10px; text-align:center; text-decoration:none; border-radius:8px; font-size:12px; font-weight:600; transition:all 0.3s ease;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
              <i class="fas fa-eye"></i> عرض التفاصيل
            </a>
            <a href="${book.downloadLink}" target="_blank" style="flex:1; background:transparent; color:${bgColor}; border:2px solid ${bgColor}; padding:10px; text-align:center; text-decoration:none; border-radius:8px; font-size:12px; font-weight:600; transition:all 0.3s ease;" onmouseover="this.style.background='${bgColor}'; this.style.color='white'" onmouseout="this.style.background='transparent'; this.style.color='${bgColor}'">
              <i class="fas fa-download"></i> تحميل
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  modal.style.display = 'flex';
  console.log('🔥 Computer Book BEAST MODE script loaded successfully! 💻✨');

  // ===== دالة تشخيص وإصلاح عرض الكتب =====
  function debugAndShowBooks(gradeId) {
    console.log('🔍 بدء تشخيص عرض الكتب لـ:', gradeId);

    const books = simpleBooksData[gradeId] || [];
    console.log('📚 عدد الكتب المتاحة:', books.length);
    console.log('📖 قائمة الكتب:', books);

    const modal = document.getElementById('books-modal');
    const booksGrid = document.getElementById('books-grid');
    const modalTitle = document.getElementById('modal-title');

    console.log('🎯 عناصر المودال:', {
      modal: !!modal,
      booksGrid: !!booksGrid,
      modalTitle: !!modalTitle
    });

    if (!modal || !booksGrid) {
      console.error('❌ عناصر المودال غير موجودة!');
      return;
    }

    // إنشاء HTML للكتب
    const booksHTML = books.map((book, index) => {
      const bgColor = book.type === 'azhar' ? '#1e7e34' :
        book.type === 'computer' ? '#1e40af' : '#667eea';
      const icon = book.type === 'azhar' ? 'fas fa-moon' :
        book.type === 'computer' ? 'fas fa-laptop-code' : 'fas fa-book';
      const badge = book.type === 'azhar' ? '🌙 أزهري' :
        book.type === 'computer' ? '💻 تقني' : '⭐ مميز';

      console.log(`📚 إنشاء بطاقة للكتاب ${index + 1}:`, book.title);

      return `
      <div class="book-card-simple" style="background:white; padding:25px; border-radius:15px; margin:10px; box-shadow:0 8px 25px rgba(0,0,0,0.1); position:relative; transition:all 0.3s ease; border-top: 4px solid ${bgColor};" onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 15px 40px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.1)'">
        
        <!-- شارة النوع -->
        <div style="position:absolute; top:15px; right:15px; background:${bgColor}; color:white; padding:6px 12px; border-radius:15px; font-size:11px; font-weight:600;">
          ${badge}
        </div>
        
        <!-- غلاف الكتاب -->
        <div style="width:100px; height:130px; background:${bgColor}; border-radius:10px; margin:0 auto 20px; display:flex; align-items:center; justify-content:center; color:white; font-size:2rem; box-shadow:0 6px 20px rgba(0,0,0,0.2); cursor:pointer;" onclick="window.open('${book.pageLink}', '_self')">
          <i class="${icon}"></i>
        </div>
        
        <!-- معلومات الكتاب -->
        <div style="text-align:center;">
          <h3 style="color:#333; margin-bottom:10px; font-size:1.2rem; font-weight:700; line-height:1.3;">${book.title}</h3>
          <p style="color:#666; margin-bottom:20px; font-size:14px;">الصف الأول الإعدادي • الفصل الأول • 2026</p>
          
          <!-- إحصائيات الكتاب -->
          <div style="display:flex; justify-content:center; gap:15px; margin-bottom:20px; font-size:12px; color:#777;">
            <span><i class="fas fa-download" style="color:${bgColor};"></i> ${book.type === 'computer' ? '6.2K' : book.type === 'azhar' ? '8.5K' : '15.8K'}</span>
            <span><i class="fas fa-star" style="color:#ffd700;"></i> ${book.type === 'computer' ? '4.8' : '4.9'}</span>
            <span><i class="fas fa-file-pdf" style="color:${bgColor};"></i> PDF</span>
          </div>
          
          <!-- أزرار الإجراءات -->
          <div style="display:flex; gap:10px; margin-top:20px;">
            <a href="${book.pageLink}" style="flex:1; background:${bgColor}; color:white; padding:12px 16px; text-align:center; text-decoration:none; border-radius:8px; font-size:13px; font-weight:600; transition:all 0.3s ease; display:flex; align-items:center; justify-content:center; gap:6px;" onmouseover="this.style.opacity='0.9'; this.style.transform='translateY(-2px)'" onmouseout="this.style.opacity='1'; this.style.transform='translateY(0)'">
              <i class="fas fa-eye"></i> عرض التفاصيل
            </a>
            <a href="${book.downloadLink}" target="_blank" style="flex:1; background:transparent; color:${bgColor}; border:2px solid ${bgColor}; padding:12px 16px; text-align:center; text-decoration:none; border-radius:8px; font-size:13px; font-weight:600; transition:all 0.3s ease; display:flex; align-items:center; justify-content:center; gap:6px;" onmouseover="this.style.background='${bgColor}'; this.style.color='white'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='transparent'; this.style.color='${bgColor}'; this.style.transform='translateY(0)'">
              <i class="fas fa-download"></i> تحميل مباشر
            </a>
          </div>
        </div>
      </div>
    `;
    }).join('');

    // تحديث المحتوى
    if (modalTitle) {
      modalTitle.textContent = `كتب الصف الأول الإعدادي (${books.length} كتاب متاح)`;
    }

    booksGrid.innerHTML = booksHTML;
    modal.style.display = 'flex';

    console.log('✅ تم عرض الكتب بنجاح!');
    console.log('📊 تم إنشاء', books.length, 'بطاقة كتاب');
  }

  // تحديث الدالة الرئيسية
  function showGradeBooksSimple(gradeId) {
    console.log('🚀 تم استدعاء showGradeBooksSimple مع:', gradeId);
    debugAndShowBooks(gradeId);
  }
}// ===== إغلاق المودال - مبسط =====
function closeBooksModalSimple() {
  const modal = document.getElementById('books-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// ===== تفعيل الوظائف الأساسية =====
document.addEventListener('DOMContentLoaded', function () {
  // إخفاء شاشة التحميل
  hideLoadingScreenSimple();

  // تعيين الوظائف العامة
  window.showGradeBooks = showGradeBooksSimple;
  window.closeBooksModal = closeBooksModalSimple;

  // زر التمرير للأعلى
  const scrollBtn = document.getElementById('scroll-to-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // إغلاق المودال عند النقر خارجه
  const modal = document.getElementById('books-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
        closeBooksModalSimple();
      }
    });
  }

  console.log('✅ تم تحميل النسخة المبسطة بنجاح');
});

// تأكيد إخفاء شاشة التحميل عند اكتمال التحميل
window.addEventListener('load', hideLoadingScreenSimple);

// ===== تهيئة محسنة للموقع =====
document.addEventListener('DOMContentLoaded', function () {
  console.log('🚀 بدء تهيئة الموقع...');

  // إخفاء شاشة التحميل
  hideLoadingScreenSimple();

  // تعيين الوظائف العامة
  window.showGradeBooks = showGradeBooksSimple;
  window.closeBooksModal = closeBooksModalSimple;

  console.log('✅ تم تحميل النسخة البسيطة بنجاح');
  console.log('📚 الكتب المتاحة في أولى إعدادي:', simpleBooksData['grade-1-prep'].length);
  console.log('📖 أسماء الكتب:', simpleBooksData['grade-1-prep'].map(book => book.title));

  // إعداد زر التمرير للأعلى
  const scrollBtn = document.getElementById('scroll-to-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // إعداد إغلاق المودال
  const modal = document.getElementById('books-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
        closeBooksModalSimple();
      }
    });
  }

  // إضافة مستمع للوحة المفاتيح
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBooksModalSimple();
    }
  });

  console.log('🎯 تمت تهيئة جميع المستمعات والوظائف');

  // اختبار سريع بعد 3 ثوان
  setTimeout(() => {
    console.log('🔍 اختبار سريع للتأكد من جاهزية النظام...');
    const testModal = document.getElementById('books-modal');
    const testGrid = document.getElementById('books-grid');
    console.log('📊 حالة العناصر:', {
      modal: !!testModal,
      grid: !!testGrid,
      booksCount: simpleBooksData['grade-1-prep'].length
    });
  }, 3000);
});