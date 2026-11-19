// ========== MOBILE MENU ==========
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');

function setMenu(open) {
    navLinks.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

menuToggle.addEventListener('click', () => {
    setMenu(!navLinks.classList.contains('open'));
});

// Close the menu after tapping a link
navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
});

// Reset the menu if the window grows back to desktop width
window.addEventListener('resize', () => {
    if (window.innerWidth > 850) setMenu(false);
});


// ========== GALLERY LIGHTBOX ==========
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('figcaption');
const closeBtn = lightbox.querySelector('.lightbox-close');
const prevBtn = lightbox.querySelector('.lightbox-prev');
const nextBtn = lightbox.querySelector('.lightbox-next');
const items = Array.from(document.querySelectorAll('.portfolio-item'));

let current = 0;
let lastFocused = null;

function showPhoto(index) {
    // Wrap around at both ends
    current = (index + items.length) % items.length;
    const img = items[current].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = items[current].querySelector('h3').textContent;
}

function openLightbox(index) {
    lastFocused = document.activeElement;
    showPhoto(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    closeBtn.focus();
}

function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    if (lastFocused) lastFocused.focus();
}

// Make each gallery photo clickable and keyboard accessible
items.forEach((item, index) => {
    const img = item.querySelector('img');
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'View larger: ' + img.alt);

    img.addEventListener('click', () => openLightbox(index));
    img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(index);
        }
    });
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => showPhoto(current - 1));
nextBtn.addEventListener('click', () => showPhoto(current + 1));

// Clicking the dark backdrop closes the viewer
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard controls while the viewer is open
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPhoto(current - 1);
    if (e.key === 'ArrowRight') showPhoto(current + 1);

    // Keep Tab focus inside the viewer
    if (e.key === 'Tab') {
        const focusable = [closeBtn, prevBtn, nextBtn];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
});
const form = document.getElementById('booking-form');
const successMsg = document.getElementById('form-success');

// earliest selectable date = today
document.getElementById('date').min = new Date().toLocaleDateString('en-CA');

function setError(id, text) {
    document.getElementById(id + '-error').textContent = text;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    successMsg.textContent = '';
    form.querySelectorAll('.error').forEach(el => el.textContent = '');

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const venue = document.getElementById('venue').value.trim();
    const message = document.getElementById('message').value.trim();

    let valid = true;

    if (name.length < 2) {
        setError('name', 'Please enter your name.');
        valid = false;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
        setError('phone', 'Enter a valid 10-digit mobile number.');
        valid = false;
    }
    if (!service) {
        setError('service', 'Please choose a service.');
        valid = false;
    }
    if (!date) {
        setError('date', 'Please pick your event date.');
        valid = false;
    }

    if (!valid) return;

    const booking = { name, phone, service, date, venue, message };
    const submitBtn = form.querySelector('.submit-btn');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
        const res = await fetch('https://script.google.com/macros/s/AKfycbzfde-yl0GBrC_c7xmj_QGVvmp1nevclEr3XH2rU6QJR42OlVWfOlw505gqK0sdc0xE/exec', {
            method: 'POST',
            body: new URLSearchParams(booking)
        });
        const data = await res.json();
        if (data.result !== 'success') throw new Error('Failed');

        form.reset();
        successMsg.textContent = 'Thank you! Your request was received. We will contact you soon.';
    } catch (err) {
        successMsg.textContent = 'Sorry, something went wrong. Please try again, or message us on Instagram.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Request';
    }
});