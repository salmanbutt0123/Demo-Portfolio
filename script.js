// Global variables
let visitorCount = 0;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
    }, 1500);

    // Initialize visitor tracking
    initializeVisitorTracking();

    // Initialize scroll animations
    initializeScrollAnimations();

    // Initialize smooth scrolling
    initializeSmoothScrolling();

    // Initialize contact form
    initializeContactForm();

    // Send visitor notification email
    sendVisitorNotification();
});

// Visitor tracking system
function initializeVisitorTracking() {
    // Get visitor count from localStorage (simulating a database)
    const storedCount = localStorage.getItem('salman-portfolio-visitors');
    visitorCount = storedCount ? parseInt(storedCount) + 1 : 1;
    
    // Update localStorage
    localStorage.setItem('salman-portfolio-visitors', visitorCount.toString());
    
    // Update display
    document.getElementById('visitorCount').textContent = visitorCount;

    // Track visitor info
    const visitorInfo = {
        count: visitorCount,
        timestamp: new Date().toLocaleString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'Direct visit',
        language: navigator.language,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    console.log('Visitor Info:', visitorInfo);
}

// Send visitor notification (simulated email)
function sendVisitorNotification() {
    // Simulate sending email notification
    const emailData = {
        to: 'salmanbutt0123sraja@gmail.com',
        subject: `New Visitor #${visitorCount} on Your Portfolio`,
        body: `
            Hi Salman,
            
            You have a new visitor on your portfolio website!
            
            Visitor Details:
            - Visitor Number: ${visitorCount}
            - Time: ${new Date().toLocaleString()}
            - Browser: ${navigator.userAgent}
            - Referrer: ${document.referrer || 'Direct visit'}
            - Language: ${navigator.language}
            - Screen: ${screen.width}x${screen.height}
            - Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}
            
            Best regards,
            Your Portfolio Website
        `
    };

    // For demonstration, we'll show a console log and notification
    console.log('Email notification would be sent:', emailData);
    
    // Show a brief notification to the user
    setTimeout(() => {
        showNotification(`Welcome! You are visitor #${visitorCount}`, 'success');
    }, 2000);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
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
}

// Contact form handling
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toLocaleString()
        };

        // Simulate sending email
        sendContactEmail(data);
    });
}
// Send contact email using EmailJS
function sendContactEmail(data) {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    emailjs.send("service_wwdb5sz", "template_ca9pnco", {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message
    }).then(() => {
        document.getElementById('contactForm').reset();
        showNotification("Message sent successfully! I'll get back to you soon.", "success");
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }).catch((error) => {
        console.error("EmailJS Error:", error);
        showNotification("Failed to send message. Please try again.", "error");
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}
// Show notifications
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;

    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Mobile menu toggle (placeholder for future enhancement)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Easter egg - typing animation for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            typeWriter(heroTitle, 'Muhammad Salman', 150);
        }
    }, 2000);
});

// Add dynamic background particles (optional enhancement)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: float 6s ease-in-out infinite;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 6}s;
    `;

    document.querySelector('.hero').appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 6000);
}

// Create particles periodically
setInterval(createParticle, 500);

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
        }
        50% {
            transform: translateY(-100px) rotate(180deg);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
