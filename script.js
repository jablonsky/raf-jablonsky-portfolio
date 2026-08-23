document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
  const toggleBackToTop = () => {
    backToTopButton.classList.toggle('is-visible', window.scrollY > 420);
  };

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();
}

const contactForm = document.querySelector('#contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('#contactName').value.trim();
    const email = document.querySelector('#contactEmail').value.trim();
    const message = document.querySelector('#contactMessage').value.trim();

    const subject = encodeURIComponent('Portfolio contact');
    const body = encodeURIComponent(
      `Name: ${name}
Email: ${email}

Message:
${message}`
    );

    window.location.href = `mailto:email.jablonsky@gmail.com?subject=${subject}&body=${body}`;
  });
}
