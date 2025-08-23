// Minimalist JavaScript - iOS Style Animations

// Countdown Timer - Simplified
function updateCountdown() {
    const launchDate = new Date();
    launchDate.setHours(launchDate.getHours() + 6); // Launch in 6 hours
    
    const now = new Date();
    const diff = launchDate - now;
    
    if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    } else {
        document.querySelector('.coming-soon').textContent = 'Available Now!';
    }
}

// Update countdown every minute
setInterval(updateCountdown, 60000);
updateCountdown();

// Preview Tabs - iOS Style
const previewTabs = document.querySelectorAll('.preview-tab');
const previewPanels = document.querySelectorAll('.preview-panel');

previewTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetPreview = tab.getAttribute('data-preview');
        
        // Update tabs
        previewTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update panels with smooth transition
        previewPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === `preview-${targetPreview}`) {
                setTimeout(() => {
                    panel.classList.add('active');
                }, 50);
            }
        });
        
        // Trigger animations for specific panels
        if (targetPreview === 'analyze') {
            triggerChartAnimation();
        }
    });
});

// Chart Animation
function triggerChartAnimation() {
    const bars = document.querySelectorAll('.chart-bar');
    bars.forEach((bar, index) => {
        bar.style.animation = 'none';
        setTimeout(() => {
            bar.style.animation = `growBar 0.5s ease forwards`;
            bar.style.animationDelay = `${index * 0.1}s`;
        }, 10);
    });
}

// Smooth Scrolling - iOS Style
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 60;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Minimal Notification System
function showNotification(message) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // iOS style fade out
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Download Button
document.getElementById('downloadBtn').addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('अहम्AI launching soon • Free Forever');
});

// CTA Button
document.getElementById('ctaBtn').addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('You\'re on the early access list!');
});

// Intersection Observer - Subtle Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply to feature cards
document.querySelectorAll('.feature-card, .feature-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    fadeInObserver.observe(card);
});

// Navbar Behavior - iOS Style
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Hide/show navbar
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    // Add backdrop blur effect
    if (currentScroll > 10) {
        navbar.style.background = 'rgba(255, 255, 255, 0.72)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
    
    lastScroll = currentScroll;
}, { passive: true });

// Typing Effect for Chat Messages
function typeMessage(element, text, speed = 40) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Animate chat messages on first view
const chatObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const messages = entry.target.querySelectorAll('.chat-bubble.ai p');
            messages.forEach((msg, index) => {
                setTimeout(() => {
                    const text = msg.textContent;
                    typeMessage(msg, text, 30);
                }, index * 600);
            });
            chatObserver.unobserve(entry.target);
        }
    });
});

const chatInterface = document.querySelector('.chat-interface');
if (chatInterface) {
    chatObserver.observe(chatInterface);
}

// Load Sanskrit font
const sanskritFont = document.createElement('link');
sanskritFont.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600&display=swap';
sanskritFont.rel = 'stylesheet';
document.head.appendChild(sanskritFont);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set initial states
    document.body.style.opacity = '1';
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelector('.hero-badge').style.opacity = '1';
    }, 100);
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll
const debouncedScroll = debounce(() => {
    // Additional scroll logic if needed
}, 10);

window.addEventListener('scroll', debouncedScroll, { passive: true });