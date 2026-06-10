document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Initialize VanillaTilt for 3D elements
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".pdf-box, .stat-item, .snap-box, .vs-card"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.1
        });
    }

    // ROI Calculator Logic
    const salesSlider = document.getElementById('salesSlider');
    const salesValue = document.getElementById('salesValue');
    const calcMonthly = document.getElementById('calcMonthly');
    const calcProfit = document.getElementById('calcProfit');

    if (salesSlider) {
        salesSlider.addEventListener('input', (e) => {
            const daily = parseInt(e.target.value);
            const monthly = daily * 30;
            const profit = monthly * 0.30; // 30% net profit margin assumption

            salesValue.textContent = '₹' + daily.toLocaleString('en-IN');
            calcMonthly.textContent = '₹' + monthly.toLocaleString('en-IN');
            calcProfit.textContent = '₹' + profit.toLocaleString('en-IN');
        });
    }

    // Magnetic Buttons
    const magnets = document.querySelectorAll('.btn-primary, .btn-outline');
    magnets.forEach(magnet => {
        magnet.style.transition = 'transform 0.1s ease';
        magnet.addEventListener('mousemove', function(e) {
            const position = magnet.getBoundingClientRect();
            // Need to account for scroll offset
            const x = (e.clientX - position.left) - position.width / 2;
            const y = (e.clientY - position.top) - position.height / 2;
            
            magnet.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        magnet.addEventListener('mouseout', function() {
            magnet.style.transform = `translate(0px, 0px)`;
        });
    });

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Form submission
    const form = document.getElementById('franchiseForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Application submitted successfully! Our team will contact you soon.');
            closeModal();
            form.reset();
        });
    }
});

// Modal Logic
const modal = document.getElementById('franchiseModal');

function openModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// VS Toggle Logic
window.switchVs = function(view) {
    const btnTrad = document.getElementById('btnTraditional');
    const btnTom = document.getElementById('btnTom');
    const viewTrad = document.getElementById('viewTraditional');
    const viewTom = document.getElementById('viewTom');

    if (view === 'traditional') {
        btnTrad.classList.add('active');
        btnTom.classList.remove('active');
        viewTrad.style.display = 'block';
        viewTom.style.display = 'none';
    } else {
        btnTom.classList.add('active');
        btnTrad.classList.remove('active');
        viewTom.style.display = 'block';
        viewTrad.style.display = 'none';
    }
};
