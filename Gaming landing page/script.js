// Form validation
function validateForm(event) {
    event.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (name.value === '' || email.value === '') {
        alert('Please fill in all fields');
        return false;
    }

    if (!email.value.match(emailPattern)) {
        alert('Please enter a valid email address');
        return false;
    }

    alert('Thank you for signing up! Welcome to the movement.');
    return true;
}

// Navbar Hide on Scroll Down, Show on Scroll Up
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scroll Down: Hide Navbar
        navbar.style.top = '-80px';
    } else {
        // Scroll Up: Show Navbar
        navbar.style.top = '0';
    }
    
    lastScrollTop = scrollTop;
});

// Smooth scroll for navbar links
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic Hero Section (Rotate Hero Text)
const heroTexts = [
    { title: 'Welcome to the Shadows', subtitle: 'A world where every street tells a story' },
    { title: 'Survive the Dark', subtitle: 'Control your destiny in a world of chaos' },
    { title: 'Fight for Glory', subtitle: 'Become a legend in the underworld' }
];

let heroIndex = 0;
const heroTitleElement = document.getElementById('hero-title');
const heroSubtitleElement = document.getElementById('hero-subtitle');

function rotateHeroText() {
    heroIndex = (heroIndex + 1) % heroTexts.length;
    heroTitleElement.textContent = heroTexts[heroIndex].title;
    heroSubtitleElement.textContent = heroTexts[heroIndex].subtitle;
}

setInterval(rotateHeroText, 5000); // Rotate text every 5 seconds
const bioParts = document.querySelectorAll('.bio-part');

function revealOnScroll() {
    bioParts.forEach(bioPart => {
        const windowHeight = window.innerHeight;
        const elementTop = bioPart.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            bioPart.classList.add('show');
        } else {
            bioPart.classList.remove('show');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);


// Dynamic Testimonials (Carousel)
const testimonials = [
    { text: '"EpicRose drops you in a world that feels alive, gritty, and full of surprises. Every corner hides a new challenge."', author: '— Ash R., Cybernetic Mercenary' },
    { text: '"This game is everything I dreamed of in a dystopian setting. Every fight, every decision matters."', author: '— Sarah K., Cyberpunk Enthusiast' },
    { text: '"The multiplayer mode is top-notch. The world is dangerous, but that makes every victory sweeter."', author: '— Jordan T., Competitive Player' }
];

let testimonialIndex = 0;
const testimonialText = document.getElementById('testimonial');
const testimonialAuthor = document.getElementById('testimonial-author');

function showTestimonial(index) {
    testimonialText.innerHTML = testimonials[index].text;
    testimonialAuthor.innerHTML = testimonials[index].author;
}

function nextTestimonial() {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
}

function prevTestimonial() {
    testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(testimonialIndex);
}

// Automatically cycle through testimonials every 5 seconds
setInterval(nextTestimonial, 5000);
