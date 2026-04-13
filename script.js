function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
        || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

function isWindows() {
    return /Windows/i.test(navigator.userAgent);
}

// App / Play Store: native store on phones; on desktop open the store listing in the browser
// (smooth-scroll to the same card was a no-op because the link lives inside that card).
document.querySelectorAll('.smart-store-link').forEach(link => {
    link.addEventListener('click', function (e) {
        const iosUrl = link.getAttribute('data-ios-url');
        const androidUrl = link.getAttribute('data-android-url');

        if (isIOS() && iosUrl) {
            e.preventDefault();
            window.location.assign(iosUrl);
            return;
        }
        if (isAndroid() && androidUrl) {
            e.preventDefault();
            window.location.assign(androidUrl);
            return;
        }

        e.preventDefault();
        const desktopUrl =
            isWindows() && androidUrl ? androidUrl : (iosUrl || androidUrl);
        if (desktopUrl) {
            window.location.assign(desktopUrl);
            return;
        }

        const href = link.getAttribute('href');
        const id = href && href.startsWith('#') ? href.slice(1) : '';
        const target = id ? document.getElementById(id) : null;
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
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