// DesignVerse - Home Page JS

// ================================
// Promo Banner Typewriter
// ================================
(function() {
  var messages = [
    '🎨  LIMITED OFFER — 70% OFF on all UI/UX courses this week only!',
    '🚀  NEW: Advanced Figma Mastery course just launched — Enroll now!',
    '🏆  Join 50,000+ designers. Get certified. Get hired.',
    '✨  FREE workshop this Saturday — Design Systems from Scratch. Register today!',
    '💜  Use code DESIGNVERSE at checkout for an extra 10% off!'
  ];
  var msgIndex = 0;
  var charIndex = 0;
  var el = document.getElementById('promo-text');
  if (!el) return;

  function typeMessage() {
    el.innerHTML = '';
    charIndex = 0;
    var msg = messages[msgIndex];

    function typeChar() {
      if (charIndex >= msg.length) {
        // pause then move to next message
        setTimeout(function() {
          msgIndex = (msgIndex + 1) % messages.length;
          typeMessage();
        }, 3000);
        return;
      }
      var span = document.createElement('span');
      span.className = 'promo-char';
      span.style.animationDelay = '0s';
      span.textContent = msg[charIndex] === ' ' ? '\u00A0' : msg[charIndex];
      el.appendChild(span);
      charIndex++;
      setTimeout(typeChar, msg[charIndex - 1] === ' ' ? 40 : 55);
    }
    typeChar();
  }

  // Start after loading screen hides
  setTimeout(typeMessage, 1600);
})();


// Render featured courses (first 4)
const featuredEl = document.getElementById('featured-courses');
if (featuredEl) {
  featuredEl.innerHTML = COURSES.slice(0, 4).map(c => renderCourseCard(c)).join('');
}

// Artists data
const ARTISTS = [
  { name: 'Priya Sharma', role: 'UI/UX Lead', emoji: '👩‍🎨', courses: 8, students: '12.4k', bg: 'rgba(124,58,237,0.2)' },
  { name: 'Arjun Mehta', role: 'Figma Expert', emoji: '👨‍💻', courses: 5, students: '8.7k', bg: 'rgba(236,72,153,0.2)' },
  { name: 'Sneha Patel', role: 'Graphic Designer', emoji: '👩‍🎨', courses: 6, students: '15.2k', bg: 'rgba(6,182,212,0.2)' },
  { name: 'Rahul Verma', role: 'Design Systems', emoji: '👨‍🎨', courses: 4, students: '5.1k', bg: 'rgba(245,158,11,0.2)' },
  { name: 'Kavya Nair', role: 'Art Director', emoji: '👩‍🎨', courses: 7, students: '9.8k', bg: 'rgba(16,185,129,0.2)' },
];

const artistsEl = document.getElementById('artists-row');
if (artistsEl) {
  artistsEl.innerHTML = ARTISTS.map(a => `
    <div class="artist-card animate-on-scroll" onclick="window.location.href='artists.html'">
      <div class="artist-avatar" style="background:${a.bg}">${a.emoji}</div>
      <div class="artist-name">${a.name}</div>
      <div class="artist-role">${a.role}</div>
      <div class="artist-stat">📚 ${a.courses} Courses • 👥 ${a.students}</div>
    </div>
  `).join('');
}

// Why DesignVerse
const WHY = [
  { icon: '🎓', title: 'Expert Instructors', desc: 'Learn from industry professionals with 10+ years of real-world design experience.' },
  { icon: '📱', title: 'Learn Anywhere', desc: 'Access courses on any device — mobile, tablet, or desktop — at your own pace.' },
  { icon: '🏆', title: 'Verified Certificates', desc: 'Earn industry-recognized certificates to boost your portfolio and career.' },
  { icon: '🔄', title: 'Lifetime Access', desc: 'Buy once, access forever. Including all future updates to the course content.' },
  { icon: '💬', title: 'Community Support', desc: 'Join a thriving community of 50,000+ designers for feedback and collaboration.' },
  { icon: '🎯', title: 'Project-Based Learning', desc: 'Build real projects with every course — not just theory, but hands-on practice.' },
];

const whyEl = document.getElementById('why-grid');
if (whyEl) {
  whyEl.innerHTML = WHY.map(w => `
    <div class="why-card animate-on-scroll">
      <div class="why-icon">${w.icon}</div>
      <h3>${w.title}</h3>
      <p>${w.desc}</p>
    </div>
  `).join('');
}

// Testimonials
const TESTIMONIALS = [
  { text: '"DesignVerse completely transformed my career. I went from zero design knowledge to landing a UI/UX role at a top startup in just 6 months."', name: 'Riya Kapoor', role: 'UI/UX Designer @ Zomato', stars: 5, initials: 'RK' },
  { text: '"The courses are incredibly well-structured. The instructors explain complex design concepts in a way that\'s easy to understand and apply."', name: 'Aditya Sharma', role: 'Graphic Designer @ Canva', stars: 5, initials: 'AS' },
  { text: '"I loved the project-based approach. Every module had a real-world project that helped me build a strong portfolio."', name: 'Meera Joshi', role: 'Freelance Designer', stars: 5, initials: 'MJ' },
  { text: '"The design library alone is worth the subscription. It\'s an incredible resource for inspiration and learning different art styles."', name: 'Karan Patel', role: 'Art Director @ Ogilvy', stars: 5, initials: 'KP' },
  { text: '"Best investment I made for my design career. The certificate helped me get a 40% salary hike at my current company."', name: 'Ananya Singh', role: 'Senior Designer @ Flipkart', stars: 5, initials: 'AN' },
  { text: '"The community is amazing. I got feedback on my projects from experienced designers which helped me improve rapidly."', name: 'Vikram Nair', role: 'Product Designer @ Swiggy', stars: 5, initials: 'VN' },
];

const testimonialsEl = document.getElementById('testimonials');
if (testimonialsEl) {
  testimonialsEl.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card animate-on-scroll">
      <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
      <p class="testimonial-text">${t.text}</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.initials}</div>
        <div>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-role">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// Re-trigger scroll animations after dynamic content
setTimeout(() => {
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
      });
    }, { threshold: 0.1 });
    obs.observe(el);
  });
}, 100);
