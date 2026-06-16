// typing animation
const words = [
    "Quant Developer",
    "HFT Systems Engineer", 
    "ML Engineer",
    "OCaml Programmer",
    "Algo Trader"
  ];
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedEl = document.querySelector('.typed');
  
  function type() {
    const current = words[wordIndex];
  
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }
  
    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  
    setTimeout(type, isDeleting ? 60 : 100);
  }
  
  type();
  
  // smooth navbar hide on scroll
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > lastScroll && current > 100) {
      navbar.style.transform = 'translateY(-100%)';
      navbar.style.transition = 'transform 0.3s ease';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    lastScroll = current;
  });
  
  // active nav link on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 200)
        current = section.getAttribute('id');
    });
  
    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`)
        link.style.color = '#818cf8';
    });
  });
  
  // fade in cards on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.project-card, .achievement-card, .skill-category')
    .forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });