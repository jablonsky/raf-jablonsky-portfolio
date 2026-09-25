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


const screenshotImages = document.querySelectorAll('.screenshot-card img');

if (screenshotImages.length) {
  const lightbox = document.createElement('dialog');
  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('aria-label', 'Expanded screenshot');
  lightbox.innerHTML = `
    <div class="image-lightbox__panel">
      <button class="image-lightbox__close" type="button" aria-label="Close expanded image">× <span>Close</span></button>
      <figure>
        <img class="image-lightbox__image" alt="">
        <figcaption class="image-lightbox__caption"></figcaption>
      </figure>
    </div>`;
  document.body.appendChild(lightbox);

  const expandedImage = lightbox.querySelector('.image-lightbox__image');
  const expandedCaption = lightbox.querySelector('.image-lightbox__caption');
  const closeButton = lightbox.querySelector('.image-lightbox__close');
  let lastTrigger = null;

  const closeLightbox = () => {
    if (lightbox.open) lightbox.close();
  };

  const openLightbox = (image) => {
    const figure = image.closest('figure');
    const caption = figure?.querySelector('figcaption');

    lastTrigger = image;
    expandedImage.src = image.currentSrc || image.src;
    expandedImage.alt = image.alt;
    expandedCaption.textContent = caption?.textContent.trim() || image.alt;
    lightbox.showModal();
    closeButton.focus();
  };

  screenshotImages.forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Open larger image: ${image.alt || 'project screenshot'}`);
    image.addEventListener('click', () => openLightbox(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  lightbox.addEventListener('close', () => {
    expandedImage.removeAttribute('src');
    lastTrigger?.focus();
  });
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
