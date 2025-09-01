document.addEventListener('DOMContentLoaded', () => {
    // --- FIREWORKS SCRIPT START ---

    // === CONFIGURATION ===
    const FIREWORK_ACCELERATION = 1.05;
    const FIREWORK_BRIGHTNESS_MIN = 50;
    const FIREWORK_BRIGHTNESS_MAX = 70;
    const FIREWORK_SPEED = 5;
    const FIREWORK_TRAIL_LENGTH = 3;
    const FIREWORK_TARGET_INDICATOR_ENABLED = false; // Disabled this
    const PARTICLE_BRIGHTNESS_MIN = 50;
    const PARTICLE_BRIGHTNESS_MAX = 80;
    const PARTICLE_COUNT = 80;
    const PARTICLE_DECAY_MIN = 0.015;
    const PARTICLE_DECAY_MAX = 0.03;
    const PARTICLE_FRICTION = 0.95;
    const PARTICLE_GRAVITY = 0.7;
    const PARTICLE_HUE_VARIANCE = 20;
    const PARTICLE_TRANSPARENCY = 1;
    const PARTICLE_SPEED_MIN = 1;
    const PARTICLE_SPEED_MAX = 10;
    const PARTICLE_TRAIL_LENGTH = 5;
    const CANVAS_CLEANUP_ALPHA = 0.15; // Made trails last longer
    const HUE_STEP_INCREASE = 0.5;
    const TICKS_PER_FIREWORK_MIN = 5;
    const TICKS_PER_FIREWORK_AUTOMATED_MIN = 20;
    const TICKS_PER_FIREWORK_AUTOMATED_MAX = 80;

    // === LOCAL VARS ===
    let canvas = document.getElementById('canvas');
    // If canvas isn't found, stop here
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let context = canvas.getContext('2d');
    let fireworks = [], particles = [];
    let mouseX, mouseY;
    let isMouseDown = false;
    let hue = 120;
    let ticksSinceFireworkAutomated = 0;
    let ticksSinceFirework = 0;

    // === HELPERS ===
    window.requestAnimFrame = (() => {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function calculateDistance(aX, aY, bX, bY) {
        let xDistance = aX - bX;
        let yDistance = aY - bY;
        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }

    // === EVENT LISTENERS ===
    canvas.addEventListener('mousemove', (e) => {
        mouseX = e.pageX - canvas.offsetLeft;
        mouseY = e.pageY - canvas.offsetTop;
    });

    canvas.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isMouseDown = true;
    });

    canvas.addEventListener('mouseup', (e) => {
        e.preventDefault();
        isMouseDown = false;
    });

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // === PROTOTYPING ===
    function Firework(startX, startY, endX, endY) {
        this.x = startX;
        this.y = startY;
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.distanceToEnd = calculateDistance(startX, startY, endX, endY);
        this.distanceTraveled = 0;
        this.trail = [];
        this.trailLength = FIREWORK_TRAIL_LENGTH;
        while (this.trailLength--) {
            this.trail.push([this.x, this.y]);
        }
        this.angle = Math.atan2(endY - startY, endX - startX);
        this.speed = FIREWORK_SPEED;
        this.acceleration = FIREWORK_ACCELERATION;
        this.brightness = random(FIREWORK_BRIGHTNESS_MIN, FIREWORK_BRIGHTNESS_MAX);
        this.targetRadius = 2.5;
    }

    Firework.prototype.update = function (index) {
        this.trail.pop();
        this.trail.unshift([this.x, this.y]);
        if (FIREWORK_TARGET_INDICATOR_ENABLED) {
            if (this.targetRadius < 8) {
                this.targetRadius += 0.3;
            } else {
                this.targetRadius = 1;
            }
        }
        this.speed *= this.acceleration;
        let xVelocity = Math.cos(this.angle) * this.speed;
        let yVelocity = Math.sin(this.angle) * this.speed;
        this.distanceTraveled = calculateDistance(this.startX, this.startY, this.x + xVelocity, this.y + yVelocity);
        if (this.distanceTraveled >= this.distanceToEnd) {
            fireworks.splice(index, 1);
            createParticles(this.endX, this.endY);
        } else {
            this.x += xVelocity;
            this.y += yVelocity;
        }
    };

    Firework.prototype.draw = function () {
        context.beginPath();
        let trailEndX = this.trail[this.trail.length - 1][0];
        let trailEndY = this.trail[this.trail.length - 1][1];
        context.moveTo(trailEndX, trailEndY);
        context.lineTo(this.x, this.y);
        context.strokeStyle = `hsl(${hue}, 100%, ${this.brightness}%)`;
        context.stroke();
        if (FIREWORK_TARGET_INDICATOR_ENABLED) {
            context.beginPath();
            context.arc(this.endX, this.endY, this.targetRadius, 0, Math.PI * 2);
            context.stroke();
        }
    };

    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.angle = random(0, Math.PI * 2);
        this.friction = PARTICLE_FRICTION;
        this.gravity = PARTICLE_GRAVITY;
        this.hue = random(hue - PARTICLE_HUE_VARIANCE, hue + PARTICLE_HUE_VARIANCE);
        this.brightness = random(PARTICLE_BRIGHTNESS_MIN, PARTICLE_BRIGHTNESS_MAX);
        this.decay = random(PARTICLE_DECAY_MIN, PARTICLE_DECAY_MAX);
        this.speed = random(PARTICLE_SPEED_MIN, PARTICLE_SPEED_MAX);
        this.trail = [];
        this.trailLength = PARTICLE_TRAIL_LENGTH;
        while (this.trailLength--) {
            this.trail.push([this.x, this.y]);
        }
        this.transparency = PARTICLE_TRANSPARENCY;
    }

    Particle.prototype.update = function (index) {
        this.trail.pop();
        this.trail.unshift([this.x, this.y]);
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.transparency -= this.decay;
        if (this.transparency <= this.decay) {
            particles.splice(index, 1);
        }
    };

    Particle.prototype.draw = function () {
        context.beginPath();
        let trailEndX = this.trail[this.trail.length - 1][0];
        let trailEndY = this.trail[this.trail.length - 1][1];
        context.moveTo(trailEndX, trailEndY);
        context.lineTo(this.x, this.y);
        context.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.transparency})`;
        context.stroke();
    };

    // === APP HELPERS ===
    function cleanCanvas() {
        context.globalCompositeOperation = 'destination-out';
        context.fillStyle = `rgba(0, 0, 0, ${CANVAS_CLEANUP_ALPHA})`;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.globalCompositeOperation = 'lighter';
    }

    function createParticles(x, y) {
        let particleCount = PARTICLE_COUNT;
        while (particleCount--) {
            particles.push(new Particle(x, y));
        }
    }

    function launchAutomatedFirework() {
        if (ticksSinceFireworkAutomated >= random(TICKS_PER_FIREWORK_AUTOMATED_MIN, TICKS_PER_FIREWORK_AUTOMATED_MAX)) {
            if (!isMouseDown) {
                let startX = canvas.width / 2;
                let startY = canvas.height;
                let endX = random(0, canvas.width);
                let endY = random(0, canvas.height / 2);
                fireworks.push(new Firework(startX, startY, endX, endY));
                ticksSinceFireworkAutomated = 0;
            }
        } else {
            ticksSinceFireworkAutomated++;
        }
    }

    function launchManualFirework() {
        if (ticksSinceFirework >= TICKS_PER_FIREWORK_MIN) {
            if (isMouseDown) {
                let startX = canvas.width / 2;
                let startY = canvas.height;
                let endX = mouseX;
                let endY = mouseY;
                fireworks.push(new Firework(startX, startY, endX, endY));
                ticksSinceFirework = 0;
            }
        } else {
            ticksSinceFirework++;
        }
    }

    function updateFireworks() {
        for (let i = fireworks.length - 1; i >= 0; --i) {
            fireworks[i].draw();
            fireworks[i].update(i);
        }
    }

    function updateParticles() {
        for (let i = particles.length - 1; i >= 0; --i) {
            particles[i].draw();
            particles[i].update(i);
        }
    }

    // === MAIN LOOP ===
    function loop() {
        requestAnimFrame(loop);
        hue += HUE_STEP_INCREASE;
        cleanCanvas();
        updateFireworks();
        updateParticles();
        launchAutomatedFirework();
        launchManualFirework();
    }

    // Start the loop
    loop();

    // --- FIREWORKS SCRIPT END ---
});
