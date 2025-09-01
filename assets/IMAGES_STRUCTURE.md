# 🗂️ هيكل مجلدات الصور - موقع المتميزون

## 📁 المجلدات الرئيسية

```
📂 assets/
├── 📂 images/
│   ├── 📂 homepage/           # صور الصفحة الرئيسية
│   │   ├── hero-bg.jpg        # خلفية القسم الرئيسي
│   │   ├── hero-pattern.svg   # نمط الخلفية
│   │   ├── about-section.jpg  # صورة قسم من نحن
│   │   ├── features-bg.jpg    # خلفية قسم المميزات
│   │   ├── testimonials-bg.jpg # خلفية آراء الطلاب
│   │   └── cta-bg.jpg         # خلفية دعوة العمل
│   │
│   ├── 📂 grades/             # صور المراحل الدراسية
│   │   ├── grade-1-prep.jpg   # الأول الإعدادي
│   │   ├── grade-2-prep.jpg   # الثاني الإعدادي
│   │   ├── grade-3-prep.jpg   # الثالث الإعدادي
│   │   ├── grade-1-sec.jpg    # الأول الثانوي
│   │   ├── grade-2-sec.jpg    # الثاني الثانوي
│   │   └── grade-3-sec.jpg    # الثالث الثانوي
│   │
│   └── 📂 ui/                 # عناصر واجهة المستخدم
│       ├── logo-main.png      # الشعار الرئيسي
│       ├── logo-white.png     # الشعار الأبيض
│       ├── patterns/          # أنماط الخلفيات
│       ├── icons/             # أيقونات مخصصة
│       └── decorations/       # عناصر تزيينية
│
├── 📂 book-covers/            # أغلفة الكتب (صفحات فرعية)
│   ├── arabic-exam-grade1-2026.jpg
│   ├── math-grade1-prep.jpg
│   ├── science-grade1-prep.jpg
│   ├── english-grade1-prep.jpg
│   └── [المزيد من أغلفة الكتب...]
│
└── 📂 favicon/                # أيقونات الموقع
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── apple-touch-icon-180x180.png
    ├── android-chrome-192x192.png
    └── android-chrome-512x512.png
```

## 📝 إرشادات الصور

### 🖼️ أحجام الصور المطلوبة:

#### صور الصفحة الرئيسية:
- **hero-bg.jpg**: 1920x1080 (خلفية القسم الرئيسي)
- **about-section.jpg**: 800x600 (قسم من نحن)
- **features-bg.jpg**: 1200x800 (خلفية المميزات)

#### صور المراحل الدراسية:
- **grade-*.jpg**: 400x300 (كروت المراحل)

#### أغلفة الكتب:
- **book-covers/*.jpg**: 300x400 (نسبة 3:4 - نسبة الكتاب الطبيعية)

### 🎨 مواصفات الجودة:
- **الدقة**: عالية (300 DPI للطباعة، 72 DPI للويب)
- **التنسيق**: JPG للصور، PNG للشفافية، SVG للأيقونات
- **الحجم**: أقل من 500KB لكل صورة (محسنة للويب)
- **الألوان**: متناسقة مع ألوان الموقع (#667eea, #764ba2)

## 🚀 التحسينات التقنية:

### Lazy Loading (التحميل الكسول):
```html
<img data-src="assets/images/homepage/hero-bg.jpg" 
     alt="خلفية الصفحة الرئيسية" 
     class="lazy-load">
```

### Responsive Images (صور متجاوبة):
```html
<picture>
  <source media="(max-width: 768px)" srcset="image-mobile.jpg">
  <source media="(max-width: 1200px)" srcset="image-tablet.jpg">
  <img src="image-desktop.jpg" alt="وصف الصورة">
</picture>
```

### WebP Support (دعم تنسيق WebP):
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="وصف الصورة">
</picture>
```