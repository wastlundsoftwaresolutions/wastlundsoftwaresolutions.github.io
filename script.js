// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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