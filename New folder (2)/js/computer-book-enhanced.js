/**
 * COMPUTER BOOK ENHANCED SCRIPT - BEAST MODE 🔥💻
 * سكريبت متقدم لصفحة كتاب الفائز كمبيوتر
 * تصميم تقني مبهر مع وظائف تفاعلية
 */

// ===== GLOBAL VARIABLES =====
let downloadCount = 6247;
let rating = 4.8;
let successRate = 96;
let totalPages = 160;

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function () {
  console.log('🚀 Computer Book Page Loaded - BEAST MODE ACTIVATED! 💻');

  // Initialize all functions
  initializeAnimations();
  initializeCounters();
  initializeScrollEffects();
  initializeModals();
  initializeClickTracking();

  console.log('✅ All tech features activated successfully!');
});

// ===== SCROLL ANIMATIONS =====
function initializeAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');

        // Trigger counter animation for stats
        if (entry.target.classList.contains('stats-section')) {
          animateCounters();
        }
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// ===== COUNTER ANIMATIONS =====
function initializeCounters() {
  // Will be triggered by scroll observer
}

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach((counter, index) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000 + (index * 200); // Staggered animation

    animateCounterValue(counter, 0, target, duration);
  });
}

function animateCounterValue(element, start, end, duration) {
  const startTime = performance.now();
  const range = end - start;

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const current = start + (range * easeOutCubic);

    if (end === 4.8) {
      element.textContent = current.toFixed(1);
    } else {
      element.textContent = Math.floor(current).toLocaleString('ar-EG');
    }

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      if (end === 4.8) {
        element.textContent = end.toFixed(1);
      } else {
        element.textContent = end.toLocaleString('ar-EG');
      }
    }
  }

  requestAnimationFrame(updateCounter);
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
  const navbar = document.querySelector('.navbar');
  const scrollToTopBtn = document.querySelector('.scroll-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar background effect
    if (scrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }

    // Scroll to top button
    if (scrollY > 500) {
      scrollToTopBtn.style.display = 'flex';
    } else {
      scrollToTopBtn.style.display = 'none';
    }

    // Parallax effect for hero particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      const speed = (index + 1) * 0.5;
      particle.style.transform = `translateY(${scrollY * speed * 0.1}px)`;
    });
  });
}

// ===== MODAL FUNCTIONALITY =====
function initializeModals() {
  // Create modal structure if it doesn't exist
  if (!document.getElementById('tech-modal')) {
    createTechModal();
  }
}

function createTechModal() {
  const modalHTML = `
        <div id="tech-modal" class="tech-modal">
            <div class="modal-backdrop" onclick="closeTechModal()"></div>
            <div class="modal-container">
                <div class="modal-header">
                    <h3 id="modal-title">عنوان</h3>
                    <button class="modal-close" onclick="closeTechModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="modal-body">
                    <p>المحتوى</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeTechModal()">إغلاق</button>
                </div>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Add modal styles
  const modalStyles = `
        <style>
            .tech-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .tech-modal.active {
                display: flex;
                opacity: 1;
            }
            
            .modal-container {
                background: white;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                transform: scale(0.7);
                transition: transform 0.3s ease;
            }
            
            .tech-modal.active .modal-container {
                transform: scale(1);
            }
            
            .modal-header {
                padding: 25px 30px 20px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: var(--computer-gradient);
                color: white;
                border-radius: 20px 20px 0 0;
            }
            
            .modal-close {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .modal-close:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: rotate(90deg);
            }
            
            .modal-body {
                padding: 30px;
                text-align: center;
            }
            
            .modal-footer {
                padding: 20px 30px;
                border-top: 1px solid #eee;
                text-align: center;
            }
            
            .rating-stars {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin: 20px 0;
            }
            
            .star {
                font-size: 2rem;
                color: #ddd;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .star:hover,
            .star.active {
                color: #ffd700;
                transform: scale(1.2);
            }
            
            .share-options {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
                margin: 20px 0;
            }
            
            .share-btn {
                padding: 15px;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            
            .share-telegram {
                background: #0088cc;
                color: white;
            }
            
            .share-whatsapp {
                background: #25d366;
                color: white;
            }
            
            .share-facebook {
                background: #1877f2;
                color: white;
            }
            
            .share-copy {
                background: var(--computer-primary);
                color: white;
            }
            
            .share-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            
            @media (max-width: 480px) {
                .modal-container {
                    margin: 20px;
                    width: calc(100% - 40px);
                }
                
                .modal-header,
                .modal-body,
                .modal-footer {
                    padding: 20px;
                }
                
                .share-options {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    `;

  document.head.insertAdjacentHTML('beforeend', modalStyles);
}

// ===== CLICK TRACKING =====
function initializeClickTracking() {
  // Track all button clicks for analytics
  document.addEventListener('click', (e) => {
    if (e.target.matches('.btn') || e.target.closest('.btn')) {
      const btn = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
      const action = btn.textContent.trim();
      console.log(`📊 Button clicked: ${action}`);

      // Store in localStorage for analytics
      const clicks = JSON.parse(localStorage.getItem('computerBookClicks') || '[]');
      clicks.push({
        action: action,
        timestamp: Date.now(),
        page: 'computer-faez-book'
      });
      localStorage.setItem('computerBookClicks', JSON.stringify(clicks));
    }
  });
}

// ===== MAIN FUNCTIONS =====

// Download tracking
function trackDownload() {
  downloadCount++;

  // Update counter on page
  const downloadStat = document.querySelector('.stat-number[data-target="6247"]');
  if (downloadStat) {
    downloadStat.textContent = downloadCount.toLocaleString('ar-EG');
    downloadStat.setAttribute('data-target', downloadCount);
  }

  // Show success message
  showTechNotification('بدأ التحميل!', 'سيتم توجيهك لرابط التحميل. استمتع بالتعلم! 💻', 'success');

  // Save to localStorage
  const downloads = JSON.parse(localStorage.getItem('userDownloads') || '[]');
  downloads.push({
    book: 'كتاب الفائز - الحاسب الآلي',
    timestamp: Date.now(),
    grade: 'الصف الأول الإعدادي'
  });
  localStorage.setItem('userDownloads', JSON.stringify(downloads));

  console.log('📥 Download tracked for Computer Book');
}

// Book preview
function previewBook() {
  const modal = document.getElementById('tech-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  title.textContent = 'معاينة الكتاب';
  body.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-laptop-code" style="font-size: 4rem; color: var(--computer-primary); margin-bottom: 20px;"></i>
            <h3 style="color: #333; margin-bottom: 15px;">كتاب الفائز - الحاسب الآلي</h3>
            <p style="color: #666; margin-bottom: 20px;">استكشف محتوى الكتاب الشامل في تكنولوجيا المعلومات</p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h4 style="color: var(--computer-primary); margin-bottom: 15px;">محتويات الكتاب:</h4>
                <ul style="text-align: right; color: #555; line-height: 1.8;">
                    <li>🖥️ مقدمة في الحاسوب ومكوناته</li>
                    <li>💻 أنظمة التشغيل والبرمجيات</li>
                    <li>🌐 الإنترنت والتصفح الآمن</li>
                    <li>📝 معالج النصوص Microsoft Word</li>
                    <li>📊 جداول البيانات Excel</li>
                    <li>🎨 العروض التقديمية PowerPoint</li>
                    <li>🔧 صيانة الحاسوب الأساسية</li>
                    <li>🛡️ الأمان والحماية الرقمية</li>
                </ul>
            </div>
            
            <p style="color: #666; font-size: 14px;">
                <i class="fas fa-info-circle" style="color: var(--computer-secondary);"></i>
                هذا الكتاب يحتوي على ${totalPages} صفحة من المحتوى التقني المميز
            </p>
        </div>
    `;

  showTechModal();
}

// Share functionality
function shareBook() {
  const modal = document.getElementById('tech-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  const bookUrl = window.location.href;
  const bookTitle = 'كتاب الفائز - الحاسب الآلي | الصف الأول الإعدادي 2026';
  const bookDescription = 'احصل على أفضل كتاب في الحاسب الآلي مجاناً من موقع المتميزون';

  title.textContent = 'مشاركة الكتاب';
  body.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-share-alt" style="font-size: 3rem; color: var(--computer-secondary); margin-bottom: 20px;"></i>
            <h3 style="color: #333; margin-bottom: 10px;">شارك هذا الكتاب المفيد</h3>
            <p style="color: #666; margin-bottom: 25px;">ساعد زملاءك في الحصول على أفضل المصادر التعليمية</p>
            
            <div class="share-options">
                <button class="share-btn share-telegram" onclick="shareToTelegram('${bookTitle}', '${bookUrl}')">
                    <i class="fab fa-telegram"></i>
                    <span>تليجرام</span>
                </button>
                
                <button class="share-btn share-whatsapp" onclick="shareToWhatsApp('${bookTitle}', '${bookUrl}')">
                    <i class="fab fa-whatsapp"></i>
                    <span>واتساب</span>
                </button>
                
                <button class="share-btn share-facebook" onclick="shareToFacebook('${bookTitle}', '${bookUrl}')">
                    <i class="fab fa-facebook"></i>
                    <span>فيسبوك</span>
                </button>
                
                <button class="share-btn share-copy" onclick="copyBookLink('${bookUrl}')">
                    <i class="fas fa-copy"></i>
                    <span>نسخ الرابط</span>
                </button>
            </div>
            
            <div style="background: #f8fafc; padding: 15px; border-radius: 10px; margin-top: 20px;">
                <p style="color: #666; font-size: 14px; margin: 0;">
                    <i class="fas fa-heart" style="color: #e74c3c;"></i>
                    شكراً لك على نشر العلم والمعرفة!
                </p>
            </div>
        </div>
    `;

  showTechModal();
}

// Rating functionality
function rateBook() {
  const modal = document.getElementById('tech-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  title.textContent = 'تقييم الكتاب';
  body.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-star" style="font-size: 3rem; color: #ffd700; margin-bottom: 20px;"></i>
            <h3 style="color: #333; margin-bottom: 10px;">ما رأيك في الكتاب؟</h3>
            <p style="color: #666; margin-bottom: 25px;">تقييمك يساعد الطلاب الآخرين في اختيار أفضل المصادر</p>
            
            <div class="rating-stars">
                <i class="fas fa-star star" data-rating="1"></i>
                <i class="fas fa-star star" data-rating="2"></i>
                <i class="fas fa-star star" data-rating="3"></i>
                <i class="fas fa-star star" data-rating="4"></i>
                <i class="fas fa-star star" data-rating="5"></i>
            </div>
            
            <p id="rating-text" style="color: #666; margin: 15px 0; font-weight: 600;">اختر تقييمك</p>
            
            <div style="margin: 25px 0;">
                <textarea id="rating-comment" placeholder="اكتب تعليقك (اختياري)" 
                    style="width: 100%; height: 80px; padding: 15px; border: 2px solid #e5e7eb; border-radius: 10px; font-family: 'Cairo', sans-serif; resize: vertical;"></textarea>
            </div>
            
            <button id="submit-rating" class="btn btn-primary" style="margin-top: 15px;" disabled onclick="submitRating()">
                <i class="fas fa-paper-plane"></i>
                <span>إرسال التقييم</span>
            </button>
            
            <div style="background: var(--computer-light); padding: 15px; border-radius: 10px; margin-top: 20px;">
                <p style="color: var(--computer-dark); font-size: 14px; margin: 0;">
                    <i class="fas fa-users" style="color: var(--computer-primary);"></i>
                    التقييم الحالي: <strong>${rating}/5</strong> من ${downloadCount} طالب
                </p>
            </div>
        </div>
    `;

  showTechModal();

  // Add rating interaction
  const stars = document.querySelectorAll('.star');
  const ratingText = document.getElementById('rating-text');
  const submitBtn = document.getElementById('submit-rating');
  let selectedRating = 0;

  const ratingTexts = {
    1: 'ضعيف 😞',
    2: 'مقبول 😐',
    3: 'جيد 🙂',
    4: 'ممتاز 😊',
    5: 'رائع جداً 🤩'
  };

  stars.forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.getAttribute('data-rating'));

      stars.forEach((s, index) => {
        if (index < selectedRating) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });

      ratingText.textContent = ratingTexts[selectedRating];
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    });

    star.addEventListener('mouseenter', () => {
      const hoverRating = parseInt(star.getAttribute('data-rating'));
      stars.forEach((s, index) => {
        if (index < hoverRating) {
          s.style.color = '#ffd700';
        } else {
          s.style.color = '#ddd';
        }
      });
    });
  });

  document.querySelector('.rating-stars').addEventListener('mouseleave', () => {
    stars.forEach((s, index) => {
      if (index < selectedRating) {
        s.style.color = '#ffd700';
      } else {
        s.style.color = '#ddd';
      }
    });
  });
}

// Submit rating
function submitRating() {
  const selectedRating = document.querySelectorAll('.star.active').length;
  const comment = document.getElementById('rating-comment').value;

  if (selectedRating === 0) {
    showTechNotification('خطأ', 'يرجى اختيار تقييم أولاً', 'error');
    return;
  }

  // Save rating to localStorage
  const ratings = JSON.parse(localStorage.getItem('bookRatings') || '[]');
  ratings.push({
    book: 'computer-faez-book',
    rating: selectedRating,
    comment: comment,
    timestamp: Date.now()
  });
  localStorage.setItem('bookRatings', JSON.stringify(ratings));

  // Update average rating (simplified calculation)
  const totalRatings = ratings.filter(r => r.book === 'computer-faez-book');
  const avgRating = totalRatings.reduce((sum, r) => sum + r.rating, 0) / totalRatings.length;
  rating = Math.round(avgRating * 10) / 10;

  // Update rating display
  const ratingElements = document.querySelectorAll('[data-target="4.8"]');
  ratingElements.forEach(el => {
    el.textContent = rating.toFixed(1);
    el.setAttribute('data-target', rating.toFixed(1));
  });

  closeTechModal();
  showTechNotification('شكراً لك!', `تم إرسال تقييمك (${selectedRating} نجوم) بنجاح. رأيك مهم جداً لنا! 🌟`, 'success');
}

// ===== SHARING FUNCTIONS =====
function shareToTelegram(title, url) {
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  window.open(telegramUrl, '_blank');
  closeTechModal();
  showTechNotification('تم المشاركة!', 'تم فتح تليجرام للمشاركة 📱', 'success');
}

function shareToWhatsApp(title, url) {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(title + ' - ' + url)}`;
  window.open(whatsappUrl, '_blank');
  closeTechModal();
  showTechNotification('تم المشاركة!', 'تم فتح واتساب للمشاركة 📱', 'success');
}

function shareToFacebook(title, url) {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(facebookUrl, '_blank');
  closeTechModal();
  showTechNotification('تم المشاركة!', 'تم فتح فيسبوك للمشاركة 📱', 'success');
}

function copyBookLink(url) {
  navigator.clipboard.writeText(url).then(() => {
    closeTechModal();
    showTechNotification('تم النسخ!', 'تم نسخ رابط الكتاب إلى الحافظة 📋', 'success');
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    closeTechModal();
    showTechNotification('تم النسخ!', 'تم نسخ رابط الكتاب إلى الحافظة 📋', 'success');
  });
}

// ===== MODAL CONTROLS =====
function showTechModal() {
  const modal = document.getElementById('tech-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeTechModal() {
  const modal = document.getElementById('tech-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ===== NOTIFICATIONS =====
function showTechNotification(title, message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.tech-notification');
  existingNotifications.forEach(notif => notif.remove());

  const notification = document.createElement('div');
  notification.className = `tech-notification tech-notification-${type}`;

  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-times-circle',
    info: 'fas fa-info-circle',
    warning: 'fas fa-exclamation-triangle'
  };

  const colors = {
    success: '#10b981',
    error: '#ef4444',
    info: '#3b82f6',
    warning: '#f59e0b'
  };

  notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <i class="${icons[type]}" style="color: ${colors[type]}; font-size: 1.2rem;"></i>
            <div>
                <div style="font-weight: 700; margin-bottom: 5px;">${title}</div>
                <div style="font-size: 14px; opacity: 0.9;">${message}</div>
            </div>
        </div>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: #666; cursor: pointer; padding: 5px;">
            <i class="fas fa-times"></i>
        </button>
    `;

  notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: white;
        border: 1px solid ${colors[type]};
        border-radius: 12px;
        padding: 15px 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        z-index: 10001;
        max-width: 400px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation: slideInRight 0.4s ease;
        backdrop-filter: blur(10px);
    `;

  // Add slide animation
  if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @media (max-width: 480px) {
                .tech-notification {
                    right: 10px !important;
                    left: 10px !important;
                    max-width: none !important;
                }
            }
        `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideInRight 0.4s ease reverse';
      setTimeout(() => notification.remove(), 400);
    }
  }, 5000);
}

// ===== UTILITY FUNCTIONS =====
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (navLinks && mobileMenu) {
    navLinks.classList.toggle('mobile-active');
    mobileMenu.classList.toggle('active');
  }
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  // ESC to close modal
  if (e.key === 'Escape') {
    closeTechModal();
  }

  // Ctrl + D to download
  if (e.ctrlKey && e.key === 'd') {
    e.preventDefault();
    trackDownload();
    window.open('https://t.me/G5_Y5/12762', '_blank');
  }

  // Ctrl + S to share
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    shareBook();
  }

  // Ctrl + R to rate
  if (e.ctrlKey && e.key === 'r') {
    e.preventDefault();
    rateBook();
  }
});

// ===== ANALYTICS TRACKING =====
function trackPageView() {
  const views = JSON.parse(localStorage.getItem('pageViews') || '{}');
  views['computer-faez-book'] = (views['computer-faez-book'] || 0) + 1;
  localStorage.setItem('pageViews', JSON.stringify(views));

  console.log(`📊 Page view tracked: ${views['computer-faez-book']}`);
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('🚨 JavaScript Error:', e.error);
  showTechNotification('خطأ تقني', 'حدث خطأ غير متوقع. يرجى إعادة تحميل الصفحة.', 'error');
});

// ===== INITIALIZATION =====
// Track page view on load
trackPageView();

// Add CSS for mobile navigation
const mobileNavStyles = `
    <style>
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 70px;
                right: -100%;
                background: white;
                width: 80%;
                height: calc(100vh - 70px);
                flex-direction: column;
                padding: 30px;
                box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
                transition: right 0.3s ease;
                z-index: 999;
            }
            
            .nav-links.mobile-active {
                right: 0;
            }
            
            .mobile-menu.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', mobileNavStyles);

console.log('🔥 Computer Book BEAST MODE script loaded successfully! 💻✨');