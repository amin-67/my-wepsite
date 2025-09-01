// ========================================
//     نظام إدارة الكتب المتطور
// ========================================

class BooksManager {
  constructor() {
    this.realBooks = [
      // الكتب الحقيقية الموجودة فعلاً
      {
        id: 'arabic-exam-grade1-2026',
        title: 'كتاب الامتحان في اللغة العربية',
        subtitle: 'الصف الأول الإعدادي - 2026',
        description: 'أفضل كتاب خارجي لتمارين وامتحانات اللغة العربية',
        grade: 'grade-1-prep',
        subject: 'اللغة العربية',
        cover: 'assets/book-covers/arabic-exam-grade1-2026.jpg',
        url: 'books/book-arabic-exam-grade1-2026.html',
        rating: 4.9,
        downloads: '15.2K',
        size: '45MB',
        pages: 248,
        tags: ['عربي', 'امتحان', 'أولى إعدادي', 'نحو', 'تعبير'],
        featured: true,
        available: true
      }
      // سيتم إضافة المزيد من الكتب هنا عندما تصبح متاحة
    ];

    this.init();
  }

  init() {
    this.updateBookCounts();
    this.bindEvents();
    console.log('📚 Books Manager initialized with', this.realBooks.length, 'real books');
  }

  // تحديث عدد الكتب لكل مرحلة
  updateBookCounts() {
    const grades = {
      'grade-1-prep': 0,
      'grade-2-prep': 0,
      'grade-3-prep': 0,
      'grade-1-sec': 0,
      'grade-2-sec': 0,
      'grade-3-sec': 0
    };

    this.realBooks.forEach(book => {
      if (book.available) {
        grades[book.grade]++;
      }
    });

    // تحديث العداد في الواجهة
    Object.keys(grades).forEach(gradeId => {
      const countElement = document.getElementById(`books-count-${gradeId.replace('-', '-')}`);
      if (countElement) {
        countElement.textContent = grades[gradeId];
      }
    });
  }

  // عرض كتب مرحلة معينة
  showGradeBooks(gradeId) {
    const books = this.realBooks.filter(book =>
      book.grade === gradeId && book.available
    );

    const modal = document.getElementById('books-modal');
    const modalTitle = document.getElementById('modal-title');
    const booksGrid = document.getElementById('books-grid');

    // تحديد اسم المرحلة
    const gradeNames = {
      'grade-1-prep': 'الصف الأول الإعدادي',
      'grade-2-prep': 'الصف الثاني الإعدادي',
      'grade-3-prep': 'الصف الثالث الإعدادي',
      'grade-1-sec': 'الصف الأول الثانوي',
      'grade-2-sec': 'الصف الثاني الثانوي',
      'grade-3-sec': 'الصف الثالث الثانوي'
    };

    modalTitle.textContent = `كتب ${gradeNames[gradeId]}`;

    if (books.length === 0) {
      booksGrid.innerHTML = `
                <div class="no-books-message">
                    <div class="no-books-icon">
                        <i class="fas fa-book-open"></i>
                    </div>
                    <h3>لا توجد كتب متاحة حالياً</h3>
                    <p>نعمل على إضافة كتب هذه المرحلة قريباً</p>
                    <div class="coming-soon-badge">
                        <i class="fas fa-clock"></i>
                        <span>قريباً جداً</span>
                    </div>
                </div>
            `;
    } else {
      booksGrid.innerHTML = books.map(book => this.createBookCard(book)).join('');
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // إنشاء كارت كتاب
  createBookCard(book) {
    return `
            <div class="book-card" data-aos="zoom-in">
                <div class="book-cover-container">
                    <div class="book-cover">
                        <img src="${book.cover}" alt="${book.title}" loading="lazy">
                        <div class="book-overlay">
                            <div class="book-actions">
                                <a href="${book.url}" class="book-btn book-btn-primary">
                                    <i class="fas fa-eye"></i>
                                    <span>عرض التفاصيل</span>
                                </a>
                                <button class="book-btn book-btn-secondary" onclick="bookManager.downloadBook('${book.id}')">
                                    <i class="fas fa-download"></i>
                                    <span>تحميل مباشر</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    ${book.featured ? '<div class="book-badge featured">مميز</div>' : ''}
                    
                    <div class="book-rating">
                        <div class="stars">
                            ${this.generateStars(book.rating)}
                        </div>
                        <span class="rating-number">${book.rating}</span>
                    </div>
                </div>
                
                <div class="book-info">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-subtitle">${book.subtitle}</p>
                    <p class="book-description">${book.description}</p>
                    
                    <div class="book-meta">
                        <div class="book-stat">
                            <i class="fas fa-download"></i>
                            <span>${book.downloads}</span>
                        </div>
                        <div class="book-stat">
                            <i class="fas fa-file-pdf"></i>
                            <span>${book.pages} صفحة</span>
                        </div>
                        <div class="book-stat">
                            <i class="fas fa-weight"></i>
                            <span>${book.size}</span>
                        </div>
                    </div>
                    
                    <div class="book-tags">
                        ${book.tags.map(tag => `<span class="book-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
  }

  // توليد النجوم للتقييم
  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '';

    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    }

    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="far fa-star"></i>';
    }

    return stars;
  }

  // تحميل كتاب
  downloadBook(bookId) {
    const book = this.realBooks.find(b => b.id === bookId);
    if (book && book.url) {
      // فتح صفحة الكتاب في نافذة جديدة
      window.open(book.url, '_blank');

      // تتبع التحميل
      this.trackDownload(bookId);
    }
  }

  // تتبع التحميلات
  trackDownload(bookId) {
    const downloads = JSON.parse(localStorage.getItem('downloads') || '[]');
    downloads.push({
      bookId,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('downloads', JSON.stringify(downloads));

    console.log('📊 Download tracked for book:', bookId);
  }

  // إغلاق مودال الكتب
  closeBooksModal() {
    const modal = document.getElementById('books-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ربط الأحداث
  bindEvents() {
    // ربط أزرار المراحل
    document.querySelectorAll('.grade-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const gradeId = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
        this.showGradeBooks(gradeId);
      });
    });

    // إغلاق المودال عند النقر خارجه
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop')) {
        this.closeBooksModal();
      }
    });

    // مفاتيح الاختصار
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeBooksModal();
      }
    });
  }

  // إضافة كتاب جديد (للمطورين)
  addBook(bookData) {
    const newBook = {
      id: bookData.id || 'book-' + Date.now(),
      title: bookData.title,
      subtitle: bookData.subtitle || '',
      description: bookData.description || '',
      grade: bookData.grade,
      subject: bookData.subject || '',
      cover: bookData.cover || 'assets/book-covers/default.jpg',
      url: bookData.url,
      rating: bookData.rating || 0,
      downloads: bookData.downloads || '0',
      size: bookData.size || '0MB',
      pages: bookData.pages || 0,
      tags: bookData.tags || [],
      featured: bookData.featured || false,
      available: bookData.available !== false
    };

    this.realBooks.push(newBook);
    this.updateBookCounts();

    console.log('📚 New book added:', newBook.title);
    return newBook;
  }

  // البحث في الكتب
  searchBooks(query) {
    const searchTerms = query.toLowerCase().split(' ');

    return this.realBooks.filter(book => {
      const searchableText = [
        book.title,
        book.subtitle,
        book.description,
        book.subject,
        ...book.tags
      ].join(' ').toLowerCase();

      return searchTerms.some(term => searchableText.includes(term));
    });
  }

  // الحصول على الكتب المميزة
  getFeaturedBooks() {
    return this.realBooks.filter(book => book.featured && book.available);
  }

  // الحصول على آخر الكتب المضافة
  getLatestBooks(limit = 5) {
    return this.realBooks
      .filter(book => book.available)
      .slice(-limit)
      .reverse();
  }
}

// إنشاء مدير الكتب العالمي
let bookManager;

// تشغيل النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  bookManager = new BooksManager();

  // ربط الدوال العامة
  window.showGradeBooks = (gradeId) => bookManager.showGradeBooks(gradeId);
  window.closeBooksModal = () => bookManager.closeBooksModal();

  console.log('📚 Books system fully loaded');
});

// دوال مساعدة للمطورين
window.addNewBook = function (bookData) {
  if (bookManager) {
    return bookManager.addBook(bookData);
  }
};

window.searchBooks = function (query) {
  if (bookManager) {
    return bookManager.searchBooks(query);
  }
};

// مثال على إضافة كتاب جديد:
/*
window.addNewBook({
    title: 'كتاب الرياضيات',
    subtitle: 'الصف الثاني الإعدادي - 2026',
    description: 'منهج الرياضيات الجديد والمطور',
    grade: 'grade-2-prep',
    subject: 'الرياضيات',
    cover: 'assets/book-covers/math-grade2-2026.jpg',
    url: 'books/book-math-grade2-2026.html',
    rating: 4.7,
    downloads: '8.5K',
    size: '35MB',
    pages: 180,
    tags: ['رياضيات', 'ثاني إعدادي', 'جبر', 'هندسة'],
    featured: true
});
*/