function createSnow() {
    const snowContainer = document.getElementById('snowContainer');
    const snowflakes = ['❄'];
    
    for (let i = 0; i < 50; i++) {
        const snow = document.createElement('div');
        snow.className = 'snow';
        snow.innerHTML = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        snow.style.left = Math.random() * 100 + '%';
        snow.style.animationDuration = (Math.random() * 3 + 5) + 's';
        snow.style.animationDelay = Math.random() * 5 + 's';
        snow.style.fontSize = (Math.random() * 1 + 0.5) + 'em';
        snowContainer.appendChild(snow);
    }
}

function createBalloons() {
    const balloonContainer = document.getElementById('balloonContainer');
    
    for (let i = 0; i < 30; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 100 + '%';
        balloon.style.width = (Math.random() * 20 + 10) + 'px';
        balloon.style.height = balloon.style.width;
        balloon.style.animationDelay = (Math.random() * 2) + 's';
        balloonContainer.appendChild(balloon);
    }
}

window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const loadingPercentage = document.getElementById('loadingPercentage');
    const progressBar = document.getElementById('progressBar');
    
    let currentPercentage = 0;
    const loadingDuration = 5000;
    const intervalTime = 50;
    const increment = 100 / (loadingDuration / intervalTime);
    
    const loadingInterval = setInterval(() => {
        currentPercentage += increment;
        
        if (currentPercentage >= 100) {
            currentPercentage = 100;
            clearInterval(loadingInterval);
            
            createBalloons();
            
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                if (mainContent) mainContent.classList.add('show');
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    createSnow();
                }, 500);
            }, 5000);
        }
        
        if (loadingPercentage) {
            loadingPercentage.textContent = Math.floor(currentPercentage) + '%';
        }
        if (progressBar) {
            progressBar.style.width = currentPercentage + '%';
        }
    }, intervalTime);
});

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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${parallax}px)`;
    }
});

// Mouse move effect for floating elements
document.addEventListener('mousemove', (e) => {
    const floatingBalls = document.querySelectorAll('.floating-ball');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    floatingBalls.forEach((ball, index) => {
        const speed = (index + 1) * 0.5;
        const x = mouseX * 50 * speed;
        const y = mouseY * 50 * speed;
        
        ball.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    if (!name || !email || !message) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }
    
    alert('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.');
    this.reset();
});

// Add scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: ${scrollProgress}%;
        height: 4px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 1000;
    `;
});

// Initialize floating elements
const floatingElements = document.createElement('div');
floatingElements.className = 'floating-elements';
document.body.appendChild(floatingElements);

for (let i = 0; i < 3; i++) {
    const ball = document.createElement('div');
    ball.className = 'floating-ball';
    floatingElements.appendChild(ball);
} 