document.addEventListener('DOMContentLoaded', () => {
  // ===== Scroll de navbar con fondo al bajar =====
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ===== Menú hamburguesa funcional =====
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // ===== Animaciones al hacer scroll =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('skills')) animateBars();
        if (entry.target.classList.contains('counters')) animateCounters();
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ===== Modal Video =====
  const openModalBtn = document.getElementById('openModal');
const videoModal = document.getElementById('videoModal');
const closeModalBtn = document.getElementById('closeModal');
const videoFrame = document.getElementById('videoFrame');

const youtubeEmbedURL = "https://www.youtube.com/embed/NKJ-6zCSk2E?autoplay=1";

openModalBtn?.addEventListener('click', () => {
  videoFrame.src = youtubeEmbedURL;
  videoModal.style.display = 'flex';
});

closeModalBtn?.addEventListener('click', () => {
  videoModal.style.display = 'none';
  videoFrame.src = ""; // Limpia para detener el video
});

window.addEventListener('click', (e) => {
  if (e.target === videoModal) {
    videoModal.style.display = 'none';
    videoFrame.src = "";
  }
});

});

// === Carrusel de Portfolio ===
function iniciarCarrusel() {
  const track = document.getElementById('carouselTrack');
  const items = document.querySelectorAll('.carousel-item');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;
  let itemsPerView = 1;
  let totalSlides = 1;
  let autoSlide;

  function getItemsPerView() {
    const width = window.innerWidth;
    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  }

  function updateCarouselLayout() {
  itemsPerView = getItemsPerView();
  totalSlides = Math.ceil(items.length / itemsPerView);

  const itemWidthPercent = 100 / itemsPerView;

  // Establece el ancho total del track basado en el total de items
  track.style.width = `${itemWidthPercent * items.length}%`;

  // Aplica ancho a cada ítem
  items.forEach(item => {
    item.style.flex = `0 0 ${itemWidthPercent}%`;
  });

  // Reinicia la posición
  moveToSlide(0);
  currentIndex = 0;
}


  function moveToSlide(index) {
  const percent = (100 / items.length) * itemsPerView * index;
  track.style.transform = `translateX(-${percent}%)`;
}

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    moveToSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    moveToSlide(currentIndex);
  }

  function startAutoSlide() {
  const delay = itemsPerView === 1 ? 7000 : 5000;
  autoSlide = setInterval(nextSlide, delay);
}

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
  });

  window.addEventListener('resize', updateCarouselLayout);
  track.addEventListener('mouseenter', stopAutoSlide);
  track.addEventListener('mouseleave', startAutoSlide);

  updateCarouselLayout();
  startAutoSlide();
}

document.addEventListener('DOMContentLoaded', iniciarCarrusel);


// numeros rapidos y animados
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    counter.innerText = '0';
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const current = +counter.innerText;
      const increment = target / 100;
      if (current < target) {
        counter.innerText = `${Math.ceil(current + increment)}`;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

function animateBars() {
  const fills = document.querySelectorAll('.fill');
  fills.forEach(fill => {
    fill.style.width = fill.getAttribute('data-fill');
  });
}

const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = this.querySelector('input[placeholder="Name"]');
  const email = this.querySelector('input[placeholder="Email"]');
  const subject = this.querySelector('input[placeholder="Subject"]');
  const message = this.querySelector('textarea[placeholder="Message"]');

  let valid = true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Limpiar colores anteriores
  [name, email, subject, message].forEach(input => {
    input.style.borderColor = '#ccc';
  });

  // Validar Name
  if (name.value.trim() === '') {
    name.style.borderColor = 'red';
    valid = false;
  } else {
    name.style.borderColor = '#00aaff';
  }

  // Validar Email
  if (!emailRegex.test(email.value.trim())) {
    email.style.borderColor = 'red';
    valid = false;
  } else {
    email.style.borderColor = '#00aaff';
  }

  // Validar Subject
  if (subject.value.trim() === '') {
    subject.style.borderColor = 'red';
    valid = false;
  } else {
    subject.style.borderColor = '#00aaff';
  }

  // Validar Mensaje
  if (message.value.trim().length < 10) {
    message.style.borderColor = 'red';
    valid = false;
  } else {
    message.style.borderColor = '#00aaff';
  }

  if (valid) {
    alert('Formulario enviado correctamente (pongame 100)');
    contactForm.reset();

    // Limpiar bordes después de enviar
    [name, email, subject, message].forEach(input => {
      input.style.borderColor = '#ccc';
    });
  } else {
    alert('Por favor, corrige los campos marcados en verde.');
  }
});

//ancla
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
scrollBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
