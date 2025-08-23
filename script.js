// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or default to system preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList.toggle('dark', currentTheme === 'dark');
    document.body.classList.toggle('light', currentTheme === 'light');
}

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    
    if (isDark) {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        localStorage.setItem('theme', 'light');
    } else if (document.body.classList.contains('light')) {
        document.body.classList.remove('light');
        localStorage.removeItem('theme');
    } else {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Countdown Timer
function updateCountdown() {
    const launchDate = new Date();
    launchDate.setHours(launchDate.getHours() + 12); // Launch in 12 hours from now
    
    const now = new Date();
    const diff = launchDate - now;
    
    if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        document.getElementById('countdown').innerHTML = '<span class="timer-value">Available Now!</span>';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Mobile Preview Demo Rotation
const demos = ['demo-chat', 'demo-image', 'demo-presentation', 'demo-themes'];
let currentDemoIndex = 0;

function showDemo(demoId) {
    document.querySelectorAll('.demo-content').forEach(demo => {
        demo.classList.remove('active');
    });
    document.getElementById(demoId).classList.add('active');
}

function rotateDemo() {
    currentDemoIndex = (currentDemoIndex + 1) % demos.length;
    showDemo(demos[currentDemoIndex]);
}

// Auto-rotate demos every 4 seconds
let demoInterval = setInterval(rotateDemo, 4000);

// Feature cards click to show demo
document.querySelectorAll('.feature-card[data-demo]').forEach(card => {
    card.addEventListener('click', () => {
        const demoId = card.getAttribute('data-demo');
        showDemo(demoId);
        // Reset auto-rotation
        clearInterval(demoInterval);
        demoInterval = setInterval(rotateDemo, 4000);
        // Update current index
        currentDemoIndex = demos.indexOf(demoId);
    });
});

// Smooth Scrolling
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

// Showcase Tabs
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        button.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// Download Button Handler
document.getElementById('downloadBtn').addEventListener('click', (e) => {
    e.preventDefault();
    // You can replace this with actual download link when app is ready
    showNotification('App launching soon! Get ready for the ultimate AI experience.');
});

document.getElementById('ctaDownload').addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('Join the waitlist! We\'ll notify you as soon as AhamAI launches.');
});

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
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
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax Effect on Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Animate on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and model cards
document.querySelectorAll('.feature-card, .model-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Add fadeInUp animation
const fadeInUpStyle = document.createElement('style');
fadeInUpStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInUpStyle);

// Interactive hover effects for model cards
document.querySelectorAll('.model-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing animation for chat messages
function typeMessage(element, text, speed = 30) {
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

// Animate chat messages when demo is shown
let chatAnimated = false;
const chatObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.classList.contains('active') && mutation.target.id === 'demo-chat' && !chatAnimated) {
            chatAnimated = true;
            const messages = document.querySelectorAll('#demo-chat .message.ai p');
            messages.forEach((msg, index) => {
                setTimeout(() => {
                    const originalText = msg.textContent;
                    typeMessage(msg, originalText, 20);
                }, index * 800);
            });
        }
    });
});

document.querySelectorAll('.demo-content').forEach(demo => {
    chatObserver.observe(demo, { attributes: true, attributeFilter: ['class'] });
});

// Theme Cards Interactive Effects
document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', function() {
        // Visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        }, 100);
        
        showNotification(`${this.textContent} theme will be available in the app!`);
    });
});

// Chart animation
function animateChart() {
    const bars = document.querySelectorAll('.chart-preview .bar');
    bars.forEach((bar, index) => {
        const height = bar.style.height;
        bar.style.height = '0';
        setTimeout(() => {
            bar.style.height = height;
        }, index * 100);
    });
}

// Trigger chart animation when generation tab is shown
document.querySelector('[data-tab="generation"]').addEventListener('click', animateChart);

// Loading animation for image placeholders
setInterval(() => {
    document.querySelectorAll('.image-loading').forEach(loader => {
        loader.style.animationDuration = Math.random() * 2 + 1 + 's';
    });
}, 2000);

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Show first demo
    showDemo('demo-chat');
    
    // Start countdown
    updateCountdown();
    
    // Add loading complete class
    document.body.classList.add('loaded');
});

// Performance optimization - Debounce scroll events
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

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}, 10);

window.addEventListener('scroll', debouncedScroll, { passive: true });