/* script.js */
window.addEventListener('DOMContentLoaded', () => {
  const starsContainer = document.getElementById('stars');
  const message = document.getElementById('message');
  const audio = document.getElementById('birthday-audio');
  const emojiContainer = document.getElementById('emoji-container');
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeModal = document.querySelector('.modal .close');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');

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
    const emojis = ['🎉'];
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = `${e.pageX}px`;
    emoji.style.top = `${e.pageY}px`;
    emojiContainer.appendChild(emoji);
    setTimeout(() => emoji.remove(), 2000);
  });

  // Mostrar imagen ampliada y navegación
  const zoomables = Array.from(document.querySelectorAll('.zoomable'));
  let currentIndex = -1;

  function showModal(index) {
    modal.style.display = 'flex';
    // Si es imagen
    if (zoomables[index].tagName === 'IMG') {
      modalImg.style.display = 'block';
      modalImg.src = zoomables[index].src;
    } else if (zoomables[index].tagName === 'VIDEO') {
      // Si es video, mostrar el video en el modal
      modalImg.style.display = 'none';
      if (!document.getElementById('modal-video')) {
        const video = zoomables[index].cloneNode(true);
        video.id = 'modal-video';
        video.style.maxWidth = '90vw';
        video.style.maxHeight = '80vh';
        video.style.borderRadius = '12px';
        video.style.display = 'block';
        modal.appendChild(video);
      }
    }
    // Eliminar video anterior si no es video
    if (zoomables[index].tagName !== 'VIDEO') {
      const oldVideo = document.getElementById('modal-video');
      if (oldVideo) oldVideo.remove();
    }
    currentIndex = index;
  }

  leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + zoomables.length) % zoomables.length;
    showModal(currentIndex);
  });
  rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % zoomables.length;
    showModal(currentIndex);
  });

  zoomables.forEach((img, idx) => {
    img.addEventListener('click', () => {
      showModal(idx);
    });
  });

  // Navegar con flechas del teclado
  document.addEventListener('keydown', e => {
    if (modal.style.display === 'flex') {
      if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % zoomables.length;
        showModal(currentIndex);
      }
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + zoomables.length) % zoomables.length;
        showModal(currentIndex);
      }
      if (e.key === 'Escape') modal.style.display = 'none';
    }
  });

  // Cerrar modal
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    const oldVideo = document.getElementById('modal-video');
    if (oldVideo) oldVideo.remove();
  });

  // Cerrar con ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') modal.style.display = 'none';
  });
});