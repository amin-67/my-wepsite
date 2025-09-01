/**
 * ARABIC EBDAA BOOK ENHANCED SCRIPT - BEAST MODE 🔥✒️
 * سكريبت متقدم لصفحة كتاب الإبداع في اللغة العربية
 * تصميم أدبي أنيق مع وظائف تفاعلية متطورة
 */

// ===== GLOBAL VARIABLES =====
let downloadCount = 11250;
let rating = 4.9;
let successRate = 98;
let totalPages = 450;

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', function () {
  console.log('🚀 Arabic Ebdaa Book Page Loaded - BEAST MODE ACTIVATED! ✒️');

  // Initialize all functions
  initializeAnimations();
  initializeCounters();
  initializeScrollEffects();
  initializeModals();
  initializeClickTracking();

  console.log('✅ All literary features activated successfully!');
});

// ===== SCROLL ANIMATIONS =====
function initializeAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');

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
  // Triggered by scroll observer
}

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach((counter, index) => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const duration = 2000 + (index * 200);

    animateCounterValue(counter, 0, target, duration);
  });
}

function animateCounterValue(element, start, end, duration) {
  const startTime = performance.now();
  const range = end - start;

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const current = start + (range * easeOutCubic);

    if (Number.isInteger(end)) {
      element.textContent = Math.floor(current).toLocaleString('ar-EG');
    } else {
      element.textContent = current.toFixed(1);
    }

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      if (Number.isInteger(end)) {
        element.textContent = end.toLocaleString('ar-EG');
      } else {
        element.textContent = end.toFixed(1);
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

    if (scrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }

    if (scrollY > 500) {
      scrollToTopBtn.style.display = 'flex';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });
}

// ===== MODAL FUNCTIONALITY =====
function initializeModals() {
  if (!document.getElementById('arabic-modal')) {
    createArabicModal();
  }
}

function createArabicModal() {
  const modalHTML = `
        <div id="arabic-modal" class="arabic-modal">
            <div class="modal-backdrop" onclick="closeArabicModal()"></div>
            <div class="modal-container">
                <div class="modal-header">
                    <h3 id="modal-title">عنوان</h3>
                    <button class="modal-close" onclick="closeArabicModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="modal-body">
                    <p>المحتوى</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeArabicModal()">إغلاق</button>
                </div>
            </div>
        </div>
    `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modalStyles = `
        <style>
            .arabic-modal {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(10px);
                display: none; align-items: center; justify-content: center;
                z-index: 10000; opacity: 0; transition: all 0.3s ease;
            }
            .arabic-modal.active { display: flex; opacity: 1; }
            .modal-container {
                background: white; border-radius: 20px; max-width: 500px;
                width: 90%; max-height: 80vh; overflow-y: auto;
                position: relative; transform: scale(0.7); transition: transform 0.3s ease;
            }
            .arabic-modal.active .modal-container { transform: scale(1); }
            .modal-header {
                padding: 25px 30px 20px; border-bottom: 1px solid #eee;
                display: flex; justify-content: space-between; align-items: center;
                background: var(--arabic-gradient); color: white;
                border-radius: 20px 20px 0 0;
            }
            .modal-close {
                background: rgba(255, 255, 255, 0.2); border: none; color: white;
                width: 35px; height: 35px; border-radius: 50%; cursor: pointer;
                display: flex; align-items: center; justify-content: center;
                transition: all 0.3s ease;
            }
            .modal-close:hover { background: rgba(255, 255, 255, 0.3); transform: rotate(90deg); }
            .modal-body { padding: 30px; text-align: center; }
            .modal-footer { padding: 20px 30px; border-top: 1px solid #eee; text-align: center; }
            .rating-stars { display: flex; justify-content: center; gap: 10px; margin: 20px 0; }
            .star { font-size: 2rem; color: #ddd; cursor: pointer; transition: all 0.3s ease; }
            .star:hover, .star.active { color: var(--arabic-accent); transform: scale(1.2); }
            .share-options { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0; }
            .share-btn {
                padding: 15px; border: none; border-radius: 10px; cursor: pointer;
                display: flex; align-items: center; justify-content: center;
                gap: 10px; font-weight: 600; transition: all 0.3s ease;
            }
            .share-telegram { background: #0088cc; color: white; }
            .share-whatsapp { background: #25d366; color: white; }
            .share-facebook { background: #1877f2; color: white; }
            .share-copy { background: var(--arabic-primary); color: white; }
            .share-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); }
        </style>
    `;

  document.head.insertAdjacentHTML('beforeend', modalStyles);
}

// ===== CLICK TRACKING =====
function initializeClickTracking() {
  document.addEventListener('click', (e) => {
    if (e.target.matches('.btn') || e.target.closest('.btn')) {
      const btn = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
      const action = btn.textContent.trim();
      console.log(`📊 Button clicked: ${action}`);
    }
  });
}

// ===== MAIN FUNCTIONS =====
function trackDownload() {
  downloadCount++;
  const downloadStat = document.querySelector('.stat-number[data-target="11250"]');
  if (downloadStat) {
    downloadStat.textContent = downloadCount.toLocaleString('ar-EG');
    downloadStat.setAttribute('data-target', downloadCount);
  }
  showArabicNotification('بدأ التحميل!', 'سيتم توجيهك لرابط التحميل. بالتوفيق في رحلتك الأدبية! ✒️', 'success');
}

function previewBook() {
  const modal = document.getElementById('arabic-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  title.textContent = 'معاينة الكتاب';
  body.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-feather-alt" style="font-size: 4rem; color: var(--arabic-primary); margin-bottom: 20px;"></i>
            <h3 style="color: #333; margin-bottom: 15px;">كتاب الإبداع - اللغة العربية</h3>
            <p style="color: #666; margin-bottom: 20px;">استكشف محتوى الكتاب الشامل في الأدب والبلاغة والنحو</p>
            <div style="background: #fdf5e6; padding: 20px; border-radius: 10px; margin: 20px 0;">
                <h4 style="color: var(--arabic-primary); margin-bottom: 15px;">فروع الكتاب:</h4>
                <ul style="text-align: right; color: #555; line-height: 1.8;">
                    <li>📖 الأدب وتاريخه</li>
                    <li>✒️ النصوص والبلاغة</li>
                    <li>📝 النحو والصرف</li>
                    <li>🗣️ التعبير والقراءة</li>
                    <li>❓ بنك الأسئلة والتدريبات</li>
                </ul>
            </div>
            <p style="color: #666; font-size: 14px;">
                <i class="fas fa-info-circle" style="color: var(--arabic-secondary);"></i>
                هذا الكتاب يحتوي على ${totalPages} صفحة من المحتوى الأدبي المميز
            </p>
        </div>
    `;

  showArabicModal();
}

function shareBook() {
  const modal = document.getElementById('arabic-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  const bookUrl = window.location.href;
  const bookTitle = 'كتاب الإبداع - اللغة العربية | الصف الثالث الثانوي 2026';

  title.textContent = 'مشاركة الكتاب';
  body.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-share-alt" style="font-size: 3rem; color: var(--arabic-secondary); margin-bottom: 20px;"></i>
            <h3 style="color: #333; margin-bottom: 10px;">شارك هذا الكنز الأدبي</h3>
            <p style="color: #666; margin-bottom: 25px;">ساعد زملاءك في الحصول على أفضل المصادر التعليمية</p>
            <div class="share-options">
                <button class="share-btn share-telegram" onclick="shareToTelegram('${bookTitle}', '${bookUrl}')"><i class="fab fa-telegram"></i><span>تليجرام</span></button>
                <button class="share-btn share-whatsapp" onclick="shareToWhatsApp('${bookTitle}', '${bookUrl}')"><i class="fab fa-whatsapp"></i><span>واتساب</span></button>
                <button class="share-btn share-facebook" onclick="shareToFacebook('${bookTitle}', '${bookUrl}')"><i class="fab fa-facebook"></i><span>فيسبوك</span></button>
                <button class="share-btn share-copy" onclick="copyBookLink('${bookUrl}')"><i class="fas fa-copy"></i><span>نسخ الرابط</span></button>
            </div>
        </div>
    `;

  showArabicModal();
}

function rateBook() {
  const modal = document.getElementById('arabic-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  title.textContent = 'تقييم الكتاب';
  body.innerHTML = `
        <div style="text-align: center;">
            <i class="fas fa-star" style="font-size: 3rem; color: var(--arabic-accent); margin-bottom: 20px;"></i>
            <h3 style="color: #333; margin-bottom: 10px;">ما رأيك في الكتاب؟</h3>
            <p style="color: #666; margin-bottom: 25px;">تقييمك يساعد الطلاب الآخرين في اختيار أفضل المصادر</p>
            <div class="rating-stars">
                <i class="fas fa-star star" data-rating="1"></i><i class="fas fa-star star" data-rating="2"></i>
                <i class="fas fa-star star" data-rating="3"></i><i class="fas fa-star star" data-rating="4"></i>
                <i class="fas fa-star star" data-rating="5"></i>
            </div>
            <p id="rating-text" style="color: #666; margin: 15px 0; font-weight: 600;">اختر تقييمك</p>
            <button id="submit-rating" class="btn btn-primary" style="margin-top: 15px;" disabled onclick="submitRating()">
                <i class="fas fa-paper-plane"></i><span>إرسال التقييم</span>
            </button>
        </div>
    `;

  showArabicModal();

  const stars = document.querySelectorAll('.star');
  const ratingText = document.getElementById('rating-text');
  const submitBtn = document.getElementById('submit-rating');
  let selectedRating = 0;

  stars.forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.getAttribute('data-rating'));
      stars.forEach((s, i) => s.classList.toggle('active', i < selectedRating));
      ratingText.textContent = `تقييمك: ${selectedRating} نجوم`;
      submitBtn.disabled = false;
    });
  });
}

function submitRating() {
  const selectedRating = document.querySelectorAll('.star.active').length;
  closeArabicModal();
  showArabicNotification('شكراً لك!', `تم إرسال تقييمك (${selectedRating} نجوم) بنجاح. 🌟`, 'success');
}

// ===== SHARING FUNCTIONS =====
function shareToTelegram(title, url) { window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank'); }
function shareToWhatsApp(title, url) { window.open(`https://wa.me/?text=${encodeURIComponent(title + ' - ' + url)}`, '_blank'); }
function shareToFacebook(title, url) { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank'); }
function copyBookLink(url) { navigator.clipboard.writeText(url).then(() => showArabicNotification('تم النسخ!', 'تم نسخ رابط الكتاب إلى الحافظة 📋', 'success')); }

// ===== MODAL CONTROLS =====
function showArabicModal() {
  document.getElementById('arabic-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeArabicModal() {
  document.getElementById('arabic-modal').classList.remove('active');
  document.body.style.overflow = '';
}

// ===== NOTIFICATIONS =====
function showArabicNotification(title, message, type = 'info') {
  const existing = document.querySelector('.arabic-notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `arabic-notification arabic-notification-${type}`;

  const colors = { success: '#800020', error: '#dc3545', info: '#007bff' };

  notification.innerHTML = `<div><b>${title}</b><br>${message}</div>`;
  notification.style.cssText = `
        position: fixed; top: 90px; right: 20px; background: white;
        border-right: 5px solid ${colors[type]}; border-radius: 12px;
        padding: 15px 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        z-index: 10001; animation: slideInRight 0.4s ease;
    `;

  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 5000);
}

// ===== UTILITY FUNCTIONS =====
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
function toggleMobileMenu() { /* Logic for mobile menu */ }

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeArabicModal();
});

console.log('🔥 Arabic Ebdaa Book BEAST MODE script loaded successfully! ✒️✨');