// First, define the Axolotl class and all its methods
class Axolotl {
    static COLORS = {
        'pastel pink': '#FFB6C1',
        'lavender': '#E6E6FA',
        'mint green': '#98FF98',
        'baby blue': '#89CFF0',
        'coral': '#FF7F50'
    };

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.color = '#FFB6C1';
        this.hasGills = true;
        this.accessories = [];
        this.gillStyle = 'normal';
        this.background = 'none';
        this.currentHairStyle = 'none';
    }

    draw() {
        console.log('Drawing started...');
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        if (this.background !== 'none') {
            this.drawBackground();
        }
        
        // Draw in correct order
        this.drawTail();
        this.drawBody();  // This now includes legs and hands
        
        if (this.hasGills) {
            this.drawGills();
        }

        this.drawFace();
        
        if (this.currentHairStyle && this.currentHairStyle !== 'none') {
            this.drawHair(this.currentHairStyle);
        }

        if (this.accessories.length > 0) {
            this.drawAccessories();
        }
    }

    drawBody() {
        // Add shadow
        this.ctx.save();
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        this.ctx.shadowBlur = 15;
        this.ctx.shadowOffsetX = 5;
        this.ctx.shadowOffsetY = 5;
        
        this.ctx.fillStyle = this.color;
        
        // Body with shadow
        this.ctx.beginPath();
        this.ctx.ellipse(
            this.width/2, 
            this.height/2, 
            80,
            120,
            0, 
            0, 
            2 * Math.PI
        );
        this.ctx.fill();
        
        // Head with shadow
        this.ctx.beginPath();
        this.ctx.ellipse(
            this.width/2,
            this.height/2 - 90,
            60,
            50,
            0,
            0,
            2 * Math.PI
        );
        this.ctx.fill();

        // Reset shadow before drawing details
        this.ctx.restore();

        // Draw tail and limbs without shadow
        this.drawTail();
        this.drawLegsAndHands();
    }

    drawLegsAndHands() {
        this.ctx.fillStyle = this.color;
        
        const limbWidth = 15;
        const limbHeight = 30;

        // Add subtle shadow for limbs
        this.ctx.save();
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetX = 3;
        this.ctx.shadowOffsetY = 3;

        // Front hands
        // Left hand
        this.drawLimb(
            this.width/2 - 65,
            this.height/2 - 20,
            limbWidth,
            limbHeight,
            -0.2
        );
        
        // Right hand
        this.drawLimb(
            this.width/2 + 65,
            this.height/2 - 20,
            limbWidth,
            limbHeight,
            0.2
        );

        // Back legs
        // Left leg
        this.drawLimb(
            this.width/2 - 70,
            this.height/2 + 70,
            limbWidth,
            limbHeight,
            -0.2
        );
        
        // Right leg
        this.drawLimb(
            this.width/2 + 70,
            this.height/2 + 70,
            limbWidth,
            limbHeight,
            0.2
        );

        this.ctx.restore();

        // Add digits without shadow
        this.drawDigits();
    }

    drawLimb(x, y, width, height, angle) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);
        
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, width, height, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.restore();
    }

    drawDigits() {
        this.ctx.fillStyle = this.color;
        const digitSize = 4;

        // Front hands digits
        this.drawDigitsSet(this.width/2 - 75, this.height/2 - 15, -0.2, digitSize);
        this.drawDigitsSet(this.width/2 + 75, this.height/2 - 15, 0.2, digitSize);

        // Back legs digits
        this.drawDigitsSet(this.width/2 - 80, this.height/2 + 85, -0.2, digitSize);
        this.drawDigitsSet(this.width/2 + 80, this.height/2 + 85, 0.2, digitSize);
    }

    drawDigitsSet(x, y, angle, size) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);

        for(let i = -1; i <= 1; i++) {
            this.ctx.beginPath();
            this.ctx.arc(i * 6, 0, size, 0, Math.PI * 2);
            this.ctx.fill();
        }

        this.ctx.restore();
    }

    drawTail() {
        // Add subtle shadow for tail
        this.ctx.save();
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetX = 3;
        this.ctx.shadowOffsetY = 3;
        
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(this.width/2, this.height/2 + 100);
        
        this.ctx.bezierCurveTo(
            this.width/2 + 40, this.height/2 + 130,
            this.width/2 + 20, this.height/2 + 160,
            this.width/2, this.height/2 + 180
        );
        
        this.ctx.bezierCurveTo(
            this.width/2 - 20, this.height/2 + 160,
            this.width/2 - 40, this.height/2 + 130,
            this.width/2, this.height/2 + 100
        );
        
        this.ctx.fill();
        
        this.ctx.restore();
    }

    drawFace() {
        // Eyes
        this.ctx.fillStyle = 'black';
        this.ctx.beginPath();
        this.ctx.arc(this.width/2 - 20, this.height/2 - 100, 5, 0, Math.PI * 2);
        this.ctx.arc(this.width/2 + 20, this.height/2 - 100, 5, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Smile
        this.ctx.beginPath();
        this.ctx.arc(this.width/2, this.height/2 - 90, 20, 0.1 * Math.PI, 0.9 * Math.PI);
        this.ctx.stroke();
    }

    drawGills() {
        this.ctx.fillStyle = '#FF8FAB';
        
        // Left gills
        for(let i = 0; i < 3; i++) {
            this.ctx.beginPath();
            this.ctx.ellipse(
                this.width/2 - 50,
                this.height/2 - 110 + (i * 15),
                15,
                8,
                0.3,
                0,
                Math.PI * 2
            );
            this.ctx.fill();
        }
        
        // Right gills
        for(let i = 0; i < 3; i++) {
            this.ctx.beginPath();
            this.ctx.ellipse(
                this.width/2 + 50,
                this.height/2 - 110 + (i * 15),
                15,
                8,
                -0.3,
                0,
                Math.PI * 2
            );
            this.ctx.fill();
        }
    }

    changeColor(newColor) {
        this.color = newColor;
        this.draw();
    }

    setBackground(pattern) {
        this.background = pattern;
        this.draw();
    }

    addAccessory(accessory) {
        if (!this.accessories.includes(accessory)) {
            this.accessories = [accessory]; // Only one accessory at a time
            this.draw();
        }
    }

    setHairStyle(style) {
        this.currentHairStyle = style;
        this.draw();
    }

    drawHair(style) {
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = 4;
        
        switch(style) {
            case 'straight':
                this.drawStraightHair();
                break;
            case 'curly':
                this.drawCurlyHair();
                break;
            case 'mohawk':
                this.drawMohawkHair();
                break;
            case 'pigtails':
                this.drawPigtails();
                break;
        }
    }

    drawStraightHair() {
        // Side bangs
        this.ctx.beginPath();
        // Left side
        this.ctx.moveTo(this.width/2 - 60, this.height/2 - 120);
        this.ctx.quadraticCurveTo(
            this.width/2 - 50, 
            this.height/2 - 80,
            this.width/2 - 40, 
            this.height/2 - 70
        );
        // Right side
        this.ctx.moveTo(this.width/2 + 60, this.height/2 - 120);
        this.ctx.quadraticCurveTo(
            this.width/2 + 50, 
            this.height/2 - 80,
            this.width/2 + 40, 
            this.height/2 - 70
        );
        this.ctx.stroke();
    }

    drawCurlyHair() {
        // Curly top
        for(let i = -40; i <= 40; i += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.width/2 + i, this.height/2 - 140);
            
            let x = this.width/2 + i;
            let y = this.height/2 - 140;
            
            for(let j = 0; j < 3; j++) {
                x += 10;
                y += 15;
                this.ctx.quadraticCurveTo(
                    x - 15,
                    y - 5,
                    x - 10,
                    y
                );
            }
            this.ctx.stroke();
        }
    }

    drawMohawkHair() {
        this.ctx.beginPath();
        // Create spiky mohawk
        this.ctx.moveTo(this.width/2, this.height/2 - 90);
        
        for(let i = -20; i <= 20; i += 10) {
            this.ctx.lineTo(this.width/2 + i, this.height/2 - 160);
            this.ctx.lineTo(this.width/2 + i + 5, this.height/2 - 140);
        }
        
        this.ctx.fill();
    }

    drawPigtails() {
        // Left pigtail
        this.ctx.beginPath();
        this.ctx.moveTo(this.width/2 - 60, this.height/2 - 110);
        this.ctx.bezierCurveTo(
            this.width/2 - 80, this.height/2 - 100,
            this.width/2 - 80, this.height/2 - 70,
            this.width/2 - 60, this.height/2 - 60
        );
        this.ctx.bezierCurveTo(
            this.width/2 - 40, this.height/2 - 70,
            this.width/2 - 40, this.height/2 - 100,
            this.width/2 - 60, this.height/2 - 110
        );
        this.ctx.fill();

        // Right pigtail
        this.ctx.beginPath();
        this.ctx.moveTo(this.width/2 + 60, this.height/2 - 110);
        this.ctx.bezierCurveTo(
            this.width/2 + 80, this.height/2 - 100,
            this.width/2 + 80, this.height/2 - 70,
            this.width/2 + 60, this.height/2 - 60
        );
        this.ctx.bezierCurveTo(
            this.width/2 + 40, this.height/2 - 70,
            this.width/2 + 40, this.height/2 - 100,
            this.width/2 + 60, this.height/2 - 110
        );
        this.ctx.fill();
    }

    drawAccessories() {
        this.accessories.forEach(accessory => {
            switch(accessory) {
                case 'bow':
                    this.drawBow();
                    break;
                case 'hat':
                    this.drawHat();
                    break;
                case 'glasses':
                    this.drawGlasses();
                    break;
                case 'crown':
                    this.drawCrown();
                    break;
                case 'monocle':
                    this.drawMonocle();
                    break;
            }
        });
    }

    drawBow() {
        this.ctx.fillStyle = '#FF69B4';
        // Center bow
        this.ctx.beginPath();
        this.ctx.arc(this.width/2, this.height/2 - 130, 10, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Left loop
        this.ctx.beginPath();
        this.ctx.ellipse(this.width/2 - 15, this.height/2 - 130, 10, 15, Math.PI/4, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Right loop
        this.ctx.beginPath();
        this.ctx.ellipse(this.width/2 + 15, this.height/2 - 130, 10, 15, -Math.PI/4, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawHat() {
        this.ctx.fillStyle = '#8B4513';
        this.ctx.beginPath();
        this.ctx.ellipse(this.width/2, this.height/2 - 120, 50, 15, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.ellipse(this.width/2, this.height/2 - 140, 30, 30, 0, Math.PI, Math.PI * 2);
        this.ctx.fill();
    }

    drawGlasses() {
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        
        // Left lens
        this.ctx.beginPath();
        this.ctx.arc(this.width/2 - 20, this.height/2 - 100, 15, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Right lens
        this.ctx.beginPath();
        this.ctx.arc(this.width/2 + 20, this.height/2 - 100, 15, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Bridge
        this.ctx.beginPath();
        this.ctx.moveTo(this.width/2 - 5, this.height/2 - 100);
        this.ctx.lineTo(this.width/2 + 5, this.height/2 - 100);
        this.ctx.stroke();
    }

    drawCrown() {
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.moveTo(this.width/2 - 30, this.height/2 - 120);
        this.ctx.lineTo(this.width/2 - 20, this.height/2 - 140);
        this.ctx.lineTo(this.width/2 - 10, this.height/2 - 120);
        this.ctx.lineTo(this.width/2, this.height/2 - 140);
        this.ctx.lineTo(this.width/2 + 10, this.height/2 - 120);
        this.ctx.lineTo(this.width/2 + 20, this.height/2 - 140);
        this.ctx.lineTo(this.width/2 + 30, this.height/2 - 120);
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawMonocle() {
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        
        // Monocle circle
        this.ctx.beginPath();
        this.ctx.arc(this.width/2 + 20, this.height/2 - 100, 15, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Chain
        this.ctx.beginPath();
        this.ctx.moveTo(this.width/2 + 35, this.height/2 - 100);
        this.ctx.quadraticCurveTo(
            this.width/2 + 45,
            this.height/2 - 90,
            this.width/2 + 40,
            this.height/2 - 80
        );
        this.ctx.stroke();
    }

    drawBackground() {
        switch(this.background) {
            case 'bubbles':
                this.drawBubblePattern();
                break;
            case 'stars':
                this.drawStarPattern();
                break;
            case 'hearts':
                this.drawHeartPattern();
                break;
            case 'dots':
                this.drawDotPattern();
                break;
        }
    }

    drawBubblePattern() {
        // Light blue background
        this.ctx.fillStyle = '#E3F2FD';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw bubbles
        this.ctx.strokeStyle = '#90CAF9';
        for(let i = 0; i < 50; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            const radius = Math.random() * 10 + 5;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.stroke();
        }
    }

    drawStarPattern() {
        // Light purple background
        this.ctx.fillStyle = '#F3E5F5';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw stars
        this.ctx.fillStyle = '#CE93D8';
        for(let i = 0; i < 50; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            const size = Math.random() * 10 + 5;
            
            this.drawStar(x, y, size);
        }
    }

    drawStar(x, y, size) {
        this.ctx.beginPath();
        for(let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5;
            const px = x + size * Math.cos(angle);
            const py = y + size * Math.sin(angle);
            
            if(i === 0) {
                this.ctx.moveTo(px, py);
            } else {
                this.ctx.lineTo(px, py);
            }
        }
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawHeartPattern() {
        // Light pink background
        this.ctx.fillStyle = '#FFEAEE';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw hearts
        this.ctx.fillStyle = '#FF80AB';
        for(let i = 0; i < 40; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            const size = Math.random() * 10 + 5;
            
            this.drawHeart(x, y, size);
        }
    }

    drawHeart(x, y, size) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + size);
        
        // Left curve
        this.ctx.bezierCurveTo(
            x - size, y, 
            x - size, y - size, 
            x, y - size
        );
        
        // Right curve
        this.ctx.bezierCurveTo(
            x + size, y - size, 
            x + size, y, 
            x, y + size
        );
        
        this.ctx.fill();
    }

    drawDotPattern() {
        // Light gray background
        this.ctx.fillStyle = '#F5F5F5';
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Draw dots
        this.ctx.fillStyle = '#BDBDBD';
        for(let i = 0; i < 100; i++) {
            const x = Math.random() * this.width;
            const y = Math.random() * this.height;
            const radius = Math.random() * 3 + 2;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('axolotlCanvas');
    canvas.width = 500;
    canvas.height = 500;
    window.axolotl = new Axolotl(canvas);
    axolotl.draw();

    // Add event listeners for all buttons
    // Color buttons
    document.querySelectorAll('.color-option').forEach(button => {
        button.addEventListener('click', function() {
            const color = this.dataset.color;
            if (color && window.axolotl) {
                axolotl.changeColor(Axolotl.COLORS[color]);
                // Update active state
                document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Random color button
    document.querySelector('.random-color')?.addEventListener('click', function() {
        const colors = Object.values(Axolotl.COLORS);
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        if (window.axolotl) {
            axolotl.changeColor(randomColor);
        }
    });

    // Hair style buttons
    document.querySelectorAll('[data-hair]').forEach(button => {
        button.addEventListener('click', function() {
            const style = this.dataset.hair;
            if (window.axolotl) {
                axolotl.setHairStyle(style);
                // Update active state
                document.querySelectorAll('[data-hair]').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Accessory buttons
    document.querySelectorAll('[data-accessory]').forEach(button => {
        button.addEventListener('click', function() {
            const accessory = this.dataset.accessory;
            if (window.axolotl) {
                axolotl.addAccessory(accessory);
                // Update active state
                document.querySelectorAll('[data-accessory]').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Background buttons
    document.querySelectorAll('[data-background]').forEach(button => {
        button.addEventListener('click', function() {
            const pattern = this.dataset.background;
            if (window.axolotl) {
                axolotl.setBackground(pattern);
                // Update active state
                document.querySelectorAll('[data-background]').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Initialize share link
    const linkInput = document.getElementById('shareLink');
    if (linkInput) {
        linkInput.value = window.location.href;
    }
});

// Share functionality
function copyShareLink() {
    const linkInput = document.getElementById('shareLink');
    if (!linkInput) return;
    
    // Create state object
    const state = {
        color: window.axolotl.color,
        hairStyle: window.axolotl.currentHairStyle,
        accessories: window.axolotl.accessories,
        background: window.axolotl.background
    };
    
    // Create URL with state
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(state)) {
        params.set(key, JSON.stringify(value));
    }
    
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    linkInput.value = shareUrl;
    
    // Copy to clipboard
    linkInput.select();
    document.execCommand('copy');
    
    // Show feedback
    const copyButton = document.querySelector('.share-container button');
    if (copyButton) {
        const originalHTML = copyButton.innerHTML;
        copyButton.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            copyButton.innerHTML = originalHTML;
        }, 2000);
    }
}

// Load state from URL if present
const params = new URLSearchParams(window.location.search);
if (params.has('color')) {
    const state = {};
    for (const [key, value] of params.entries()) {
        try {
            state[key] = JSON.parse(value);
        } catch {
            state[key] = value;
        }
    }
    // Apply state after axolotl is initialized
    document.addEventListener('DOMContentLoaded', () => {
        if (window.axolotl) {
            if (state.color) axolotl.changeColor(state.color);
            if (state.hairStyle) axolotl.setHairStyle(state.hairStyle);
            if (state.accessories) state.accessories.forEach(acc => axolotl.addAccessory(acc));
            if (state.background) axolotl.setBackground(state.background);
        }
    });
} 