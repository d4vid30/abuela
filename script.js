/* script.js */
window.addEventListener('DOMContentLoaded', () => {
  const starsContainer = document.getElementById('stars');
  const message = document.getElementById('message');
  const audio = document.getElementById('birthday-audio');
  const emojiContainer = document.getElementById('emoji-container');
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeModal = document.querySelector('.modal .close');

  // Crear estrellas por toda la página
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 5 + 's';
    star.style.width = star.style.height = Math.random() * 3 + 'px';
    starsContainer.appendChild(star);
  }

  // Intersection Observer para revelar mensaje
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        audio.play();
      }
    });
  }, { threshold: 0.5 });
  observer.observe(message);

  // Emoji en movimiento por toda la página (mejorado)
  document.addEventListener('mousemove', e => {
    const emojis = ['🎂'];
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = `${e.pageX}px`;
    emoji.style.top = `${e.pageY}px`;
    emojiContainer.appendChild(emoji);
    setTimeout(() => emoji.remove(), 2000);
  });

  // Mostrar imagen ampliada
  document.querySelectorAll('.zoomable').forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImg.src = img.src;
    });
  });

  // Cerrar modal
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Cerrar con ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') modal.style.display = 'none';
  });
});