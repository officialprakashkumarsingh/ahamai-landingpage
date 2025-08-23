// Clean Minimalist JavaScript

// Countdown Timer
function updateCountdown() {
    const launchDate = new Date();
    launchDate.setHours(launchDate.getHours() + 3); // Launch in 3 hours
    
    const now = new Date();
    const diff = launchDate - now;
    
    if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    } else {
        document.querySelector('.launch-text').textContent = 'Available Now!';
    }
}

// Update countdown every minute
setInterval(updateCountdown, 60000);
updateCountdown();

// Download Button Handler
document.getElementById('downloadBtn').addEventListener('click', (e) => {
    e.preventDefault();
    showNotification('अहम्AI launching soon • 100% Free Forever');
});

// Simple Notification System
function showNotification(message) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 18px;">✨</span>
            <span>${message}</span>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Load Sanskrit font
const sanskritFont = document.createElement('link');
sanskritFont.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap';
sanskritFont.rel = 'stylesheet';
document.head.appendChild(sanskritFont);

// Simple fade-in animation on load
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.content-wrapper');
    wrapper.style.opacity = '0';
    wrapper.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        wrapper.style.transition = 'all 0.6s ease';
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'translateY(0)';
    }, 100);
});