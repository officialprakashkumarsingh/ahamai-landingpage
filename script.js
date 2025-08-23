// Fresh Design JavaScript

// Countdown Timer
function updateCountdown() {
    const launchDate = new Date();
    launchDate.setHours(launchDate.getHours() + 4); // Launch in 4 hours
    
    const now = new Date();
    const diff = launchDate - now;
    
    if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    } else {
        document.querySelector('.timer-value').textContent = 'Available Now!';
    }
}

// Update countdown every minute
setInterval(updateCountdown, 60000);
updateCountdown();

// Preview Tabs
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.preview-panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetPreview = tab.getAttribute('data-preview');
        
        // Update tabs
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update panels
        panels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === `preview-${targetPreview}`) {
                setTimeout(() => {
                    panel.classList.add('active');
                    
                    // Trigger specific animations
                    if (targetPreview === 'analyze') {
                        triggerAnalyzeAnimation();
                    } else if (targetPreview === 'create') {
                        triggerCreateAnimation();
                    }
                }, 50);
            }
        });
    });
});

// Analyze Animation
function triggerAnalyzeAnimation() {
    const progressBars = document.querySelectorAll('.progress-bar');
    const nodes = document.querySelectorAll('.node');
    
    progressBars.forEach((bar, index) => {
        bar.style.animation = 'none';
        setTimeout(() => {
            bar.style.animation = `progressGrow 1s ease-out`;
        }, index * 150);
    });
    
    nodes.forEach((node, index) => {
        node.style.animation = 'none';
        setTimeout(() => {
            node.style.animation = `nodeFloat 3s ease-in-out infinite`;
            node.style.animationDelay = `${index * 0.5}s`;
        }, 100);
    });
}

// Create Animation
function triggerCreateAnimation() {
    const imageItems = document.querySelectorAll('.image-shimmer');
    imageItems.forEach((item, index) => {
        item.style.animation = 'none';
        setTimeout(() => {
            item.style.animation = `shimmer 2s infinite`;
            item.style.animationDelay = `${index * 0.2}s`;
        }, 100);
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Notification System
function showNotification(message) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 20px;">✨</span>
            <span>${message}</span>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Fade out
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Button Handlers
document.getElementById('downloadBtn').addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('अहम्AI launching soon • 100% Free Forever');
});

document.getElementById('ctaBtn').addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('Welcome to the early access list! 🎉');
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Feature Cards Animation
const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            featureObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    featureObserver.observe(card);
});

// Model Bubbles Animation
const modelObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bubbles = entry.target.querySelectorAll('.model-bubble');
            bubbles.forEach((bubble, index) => {
                setTimeout(() => {
                    bubble.style.opacity = '1';
                    bubble.style.transform = 'scale(1)';
                }, index * 50);
            });
            modelObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const modelsCloud = document.querySelector('.models-cloud');
if (modelsCloud) {
    modelsCloud.querySelectorAll('.model-bubble').forEach(bubble => {
        bubble.style.opacity = '0';
        bubble.style.transform = 'scale(0.8)';
        bubble.style.transition = 'all 0.4s ease';
    });
    modelObserver.observe(modelsCloud);
}

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 10) {
        navbar.style.boxShadow = '0 2px 20px rgba(255, 140, 60, 0.15)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
    }
    
    // Hide/show navbar
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
}, { passive: true });

// Typing Effect for Chat
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

// Chat Animation
const chatObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const messages = entry.target.querySelectorAll('.ai-content p');
            messages.forEach((msg, index) => {
                setTimeout(() => {
                    const text = msg.textContent;
                    typeMessage(msg, text, 25);
                }, index * 800);
            });
            chatObserver.unobserve(entry.target);
        }
    });
});

const chatContainer = document.querySelector('.chat-container');
if (chatContainer) {
    chatObserver.observe(chatContainer);
}

// Hero Features Counter Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const values = entry.target.querySelectorAll('.feature-value');
            values.forEach(value => {
                const text = value.textContent;
                if (text !== '∞' && !text.includes('%')) {
                    const num = parseInt(text);
                    let current = 0;
                    const increment = num / 30;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= num) {
                            value.textContent = text;
                            clearInterval(timer);
                        } else {
                            value.textContent = Math.floor(current) + '+';
                        }
                    }, 50);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
});

const heroFeatures = document.querySelector('.hero-features');
if (heroFeatures) {
    statsObserver.observe(heroFeatures);
}

// Load Sanskrit font
const sanskritFont = document.createElement('link');
sanskritFont.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap';
sanskritFont.rel = 'stylesheet';
document.head.appendChild(sanskritFont);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    document.body.style.opacity = '1';
    
    // Animate hero elements on load
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-actions, .hero-features');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
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

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Additional scroll logic if needed
}, 10);

window.addEventListener('scroll', debouncedScroll, { passive: true });