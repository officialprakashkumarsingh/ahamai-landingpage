// Countdown Timer
function updateCountdown() {
    const launchDate = new Date();
    launchDate.setHours(launchDate.getHours() + 8); // Launch in 8 hours
    
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
        document.getElementById('countdown').innerHTML = '<span class="countdown-value">🎉 Available Now!</span>';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Demo Cards Interaction
const demoCards = document.querySelectorAll('.demo-card');
let currentActiveDemo = 0;

function activateDemo(index) {
    demoCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
}

// Auto-rotate demos
function rotateDemos() {
    currentActiveDemo = (currentActiveDemo + 1) % demoCards.length;
    activateDemo(currentActiveDemo);
}

let demoInterval = setInterval(rotateDemos, 3000);

// Click to activate specific demo
demoCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        clearInterval(demoInterval);
        activateDemo(index);
        currentActiveDemo = index;
        // Restart auto-rotation after 10 seconds
        setTimeout(() => {
            demoInterval = setInterval(rotateDemos, 3000);
        }, 10000);
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Navbar height
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Notification System
function showNotification(message, type = 'success') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Download Button Handler
document.getElementById('downloadBtn').addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('🚀 अहम्AI launching soon! 100% Free Forever - No hidden costs!');
});

// CTA Button Handler
document.getElementById('ctaBtn').addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('✨ You\'re on the early access list! Get ready for the FREE AI revolution!');
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

// Navbar Hide/Show on Scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Animate Stats on View
const stats = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const value = target.textContent;
            
            if (value !== '∞' && !value.includes('x')) {
                const num = parseInt(value);
                let current = 0;
                const increment = num / 30;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= num) {
                        target.textContent = value;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + '+';
                    }
                }, 50);
            }
            
            statsObserver.unobserve(target);
        }
    });
});

stats.forEach(stat => statsObserver.observe(stat));

// Typing Effect for Demo Messages
function typeText(element, text, speed = 30) {
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

// Apply typing effect to AI messages when they become visible
const messageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const messages = entry.target.querySelectorAll('.ai-message p');
            messages.forEach((msg, index) => {
                setTimeout(() => {
                    const text = msg.textContent;
                    typeText(msg, text, 20);
                }, index * 500);
            });
            messageObserver.unobserve(entry.target);
        }
    });
});

const chatDemo = document.querySelector('.chat-demo');
if (chatDemo) {
    messageObserver.observe(chatDemo);
}

// Chart Animation
const chartBars = document.querySelectorAll('.chart-bars');
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.animation = 'none';
                    setTimeout(() => {
                        bar.style.animation = 'growBar 1s ease-out';
                    }, 10);
                }, index * 100);
            });
            chartObserver.unobserve(entry.target);
        }
    });
});

chartBars.forEach(chart => chartObserver.observe(chart));

// Speed Comparison Animation
const speedComparison = document.querySelector('.speed-comparison');
if (speedComparison) {
    const speedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.comparison-bar::after');
                // Trigger reflow to restart animations
                entry.target.style.display = 'none';
                entry.target.offsetHeight; // Trigger reflow
                entry.target.style.display = '';
                speedObserver.unobserve(entry.target);
            }
        });
    });
    speedObserver.observe(speedComparison);
}

// Add slide out animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');
`;
document.head.appendChild(style);

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active demo
    activateDemo(0);
    
    // Start animations
    document.body.classList.add('loaded');
});

// Performance optimization - Debounce scroll
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
    // Any additional scroll-based logic here
}, 10);

window.addEventListener('scroll', debouncedScroll, { passive: true });