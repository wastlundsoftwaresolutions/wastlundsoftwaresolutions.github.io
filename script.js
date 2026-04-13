function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
        || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

// App / Play Store: open the right store on phones; otherwise stay on the site (product section).
document.querySelectorAll('.smart-store-link').forEach(link => {
    link.addEventListener('click', function (e) {
        const iosUrl = link.getAttribute('data-ios-url');
        const androidUrl = link.getAttribute('data-android-url');
        if (isIOS() && iosUrl) {
            e.preventDefault();
            window.location.href = iosUrl;
            return;
        }
        if (isAndroid() && androidUrl) {
            e.preventDefault();
            window.location.href = androidUrl;
            return;
        }
        e.preventDefault();
        const href = link.getAttribute('href');
        const target = href ? document.querySelector(href) : null;
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Smooth scrolling for navigation links (excluding smart store links — handled above)
document.querySelectorAll('a[href^="#"]:not(.smart-store-link)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll behavior
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow and background opacity based on scroll position
    if (currentScroll > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        header.style.backgroundColor = 'rgba(17, 24, 39, 0.95)';
        header.style.backdropFilter = 'blur(12px)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
        header.style.backgroundColor = 'rgba(17, 24, 39, 0.8)';
        header.style.backdropFilter = 'blur(8px)';
    }
    
    lastScroll = currentScroll;
}); 