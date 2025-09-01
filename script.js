// Responsive navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Nav
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if(navToggle) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
  }

  // Animate sections on scroll
  function animateOnScroll() {
    document.querySelectorAll('.animated').forEach(el=>{
      const rect = el.getBoundingClientRect();
      if(rect.top < window.innerHeight-80) el.classList.add('fadeIn');
    });
  }
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // Animated numbers (stats)
  let statsAnimated = false;
  function animateStats() {
    if(statsAnimated) return;
    document.querySelectorAll('.stat-number').forEach(el => {
      const target = +el.getAttribute('data-target');
      let count = 0;
      const increment = Math.ceil(target / 80);
      function update() {
        count += increment;
        if(count < target) {
          el.textContent = count;
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
        }
      }
      update();
    });
    statsAnimated = true;
  }
  window.addEventListener('scroll', function() {
    const statsSection = document.querySelector('.stats-section');
    if(statsSection) {
      const rect = statsSection.getBoundingClientRect();
      if(rect.top < window.innerHeight && !statsAnimated) animateStats();
    }
  });

  // FAQ Accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.onclick = function() {
      const item = btn.parentElement;
      item.classList.toggle('active');
      document.querySelectorAll('.faq-item').forEach(other=>{
        if(other!==item) other.classList.remove('active');
      });
    }
  });

  // Lightbox for gallery
  const lightbox = document.getElementById('lightbox');
  if(lightbox) {
    const imgs = document.querySelectorAll('.gallery-img');
    const lightboxImg = document.getElementById('lightbox-img');
    imgs.forEach(img=>{
      img.onclick = ()=>{
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      }
    });
    lightbox.querySelector('.close').onclick = ()=>{ lightbox.style.display = "none";}
    lightbox.onclick = (e)=>{ if(e.target==lightbox) lightbox.style.display='none'; }
  }

  // Back to Top
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function() {
    if(window.scrollY>200) backToTop.style.display='block';
    else backToTop.style.display='none';
  });
  if(backToTop) backToTop.onclick = ()=>window.scrollTo({top:0, behavior:'smooth'});

  // Contact form simple validation and feedback
  const contactForm = document.getElementById('contactForm');
  if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      document.getElementById('formMsg').textContent = "Thank you for reaching out! We'll get back to you soon.";
      contactForm.reset();
    });
  }
});