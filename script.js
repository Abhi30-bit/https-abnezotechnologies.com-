
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      document.body.style.overflow = open ? 'hidden' : '';
      menuBtn.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
      if (window.lucide) lucide.createIcons();
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }));
  }

  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('.reveal').forEach(el => {
      gsap.fromTo(el, {y:45, opacity:0}, {
        y:0, opacity:1, duration:.85, ease:'power3.out',
        scrollTrigger:{trigger:el, start:'top 84%', once:true}
      });
    });

    if (document.querySelector('.hero')) {
      const tl = gsap.timeline({defaults:{ease:'power4.out'}});
      tl.from('.hero-kicker',{y:25,opacity:0,duration:.6})
        .from('.hero-title-line',{y:100,opacity:0,duration:1,stagger:.12},'-.3')
        .from('.hero-copy, .hero-actions',{y:25,opacity:0,duration:.65},'-.55')
        .from('.hero-core',{scale:.5,opacity:0,duration:1.1},'-.7')
        .from('.market-orbit, .hero-info-card, .hero-laptop',{scale:.8,opacity:0,duration:.7,stagger:.05},'-.6');
      gsap.to('.hero-core',{y:-10,duration:3.5,repeat:-1,yoyo:true,ease:'sine.inOut'});
      gsap.to('.hero-rings',{rotation:360,duration:30,repeat:-1,ease:'none'});
      gsap.to('.grid-glow',{rotation:360,duration:30,repeat:-1,ease:'none'});
    }
    const pageEnter = document.querySelector('.page-enter');
    if (pageEnter) gsap.fromTo(pageEnter,{opacity:0,y:18},{opacity:1,y:0,duration:.65,ease:'power3.out'});
  }

  document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());

  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const status = document.querySelector('#formStatus');
      const btn = contactForm.querySelector('button[type="submit"]');
      const payload = Object.fromEntries(new FormData(contactForm).entries());
      status.style.display = 'flex';
      status.className = 'form-success full';
      status.textContent = 'Sending...';
      btn.disabled = true;
      try {
        const api = contactForm.dataset.api || 'http://localhost:5000';
        const r = await fetch(`${api}/api/contact`, {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(payload)
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(data.message || 'Something went wrong. Please try again.');
        status.innerHTML = '<i data-lucide="check-circle-2"></i> Enquiry sent successfully. We’ll be in touch.';
        contactForm.reset();
        if (window.lucide) lucide.createIcons();
      } catch(err) {
        status.className = 'form-error full';
        status.textContent = err.message || 'Something went wrong. Please try again.';
      } finally { btn.disabled = false; }
    });
  }
});
