﻿﻿﻿﻿// DesignVerse - Shared Components

function renderNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  nav.innerHTML = `
    <a href="index.html" class="nav-logo">Design<span>Verse</span></a>
    <nav class="nav-links">
      <a href="index.html">Home</a>
      <a href="courses.html">Courses</a>
      <a href="design-library.html">Library</a>
      <a href="artists.html">Artists</a>
      <a href="community.html">Community</a>
      <a href="revenue.html">Pricing</a>
      <a href="contact.html">Contact</a>
    </nav>
    <div class="nav-actions">
      <a href="auth.html" class="btn-nav-login">Login</a>
      <a href="auth.html" class="btn-nav-cta">Get Started</a>
    </div>
    <div class="hamburger" id="hamburger">
      <span></span><span></span><span></span>
    </div>
  `;
}

function renderMobileMenu() {
  const mm = document.getElementById('mobile-menu');
  if (!mm) return;
  mm.innerHTML = `
    <a href="index.html">Home</a>
    <a href="courses.html">Courses</a>
    <a href="design-library.html">Library</a>
    <a href="artists.html">Artists</a>
    <a href="community.html">Community</a>
    <a href="revenue.html">Pricing</a>
    <a href="contact.html">Contact</a>
    <a href="auth.html">Login / Sign Up</a>
    <a href="dashboard.html">Dashboard</a>
  `;
}

function renderFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <span class="nav-logo">Design<span style="color:var(--accent-pink);-webkit-text-fill-color:var(--accent-pink)">Verse</span></span>
          <p>The ultimate e-learning platform for designers. Master UI/UX, graphic design, and art styles with world-class instructors.</p>
          <div class="footer-social">
            <div class="social-icon">𝕏</div>
            <div class="social-icon">in</div>
            <div class="social-icon">▶</div>
            <div class="social-icon">📸</div>
          </div>
        </div>
        <div class="footer-col">
          <h4>Platform</h4>
          <ul>
            <li><a href="courses.html">All Courses</a></li>
            <li><a href="design-library.html">Design Library</a></li>
            <li><a href="artists.html">Artists</a></li>
            <li><a href="community.html">Community</a></li>
            <li><a href="dashboard.html">Dashboard</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="revenue.html">Pricing</a></li>
            <li><a href="marketing.html">Partners</a></li>
            <li><a href="security.html">Privacy &amp; Terms</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 DesignVerse. All rights reserved.</p>
        <p>Made with 💜 for designers worldwide</p>
      </div>
    </div>
  `;
}

// Sample course data
const COURSES = [
  { id: 1, title: 'UI/UX Design Fundamentals', instructor: 'Priya Sharma', rating: 4.9, reviews: 2341, price: 999, original: 2999, level: 'Beginner', category: 'uiux', tag: 'UI/UX', tagClass: 'tag-uiux', emoji: '🎨', duration: '24h', students: '12.4k' },
  { id: 2, title: 'Advanced Figma Mastery', instructor: 'Arjun Mehta', rating: 4.8, reviews: 1876, price: 1499, original: 3999, level: 'Advanced', category: 'uiux', tag: 'UI/UX', tagClass: 'tag-uiux', emoji: '✏️', duration: '32h', students: '8.7k' },
  { id: 3, title: 'Graphic Design Bootcamp', instructor: 'Sneha Patel', rating: 4.7, reviews: 3102, price: 799, original: 1999, level: 'Beginner', category: 'graphic', tag: 'Graphic', tagClass: 'tag-graphic', emoji: '🖼️', duration: '18h', students: '15.2k' },
  { id: 4, title: 'Design Patterns & Systems', instructor: 'Rahul Verma', rating: 4.9, reviews: 987, price: 1999, original: 4999, level: 'Intermediate', category: 'pattern', tag: 'Patterns', tagClass: 'tag-pattern', emoji: '🔷', duration: '28h', students: '5.1k' },
  { id: 5, title: 'Art Styles: From Minimal to Brutalism', instructor: 'Kavya Nair', rating: 4.6, reviews: 1543, price: 699, original: 1499, level: 'Beginner', category: 'art', tag: 'Art Styles', tagClass: 'tag-art', emoji: '🎭', duration: '15h', students: '9.8k' },
  { id: 6, title: 'Brand Identity Design', instructor: 'Dev Kapoor', rating: 4.8, reviews: 2210, price: 1299, original: 2999, level: 'Intermediate', category: 'graphic', tag: 'Graphic', tagClass: 'tag-graphic', emoji: '💼', duration: '22h', students: '7.3k' },
  { id: 7, title: 'Motion Design & Micro-interactions', instructor: 'Ananya Singh', rating: 4.7, reviews: 1120, price: 1799, original: 3999, level: 'Advanced', category: 'uiux', tag: 'UI/UX', tagClass: 'tag-uiux', emoji: '✨', duration: '30h', students: '4.6k' },
  { id: 8, title: 'Color Theory Masterclass', instructor: 'Vikram Joshi', rating: 4.9, reviews: 4521, price: 499, original: 999, level: 'Beginner', category: 'art', tag: 'Art Styles', tagClass: 'tag-art', emoji: '🌈', duration: '10h', students: '22.1k' },
];

function renderCourseCard(course, showEnroll = false) {
  return `
    <div class="card" onclick="window.location.href='course-detail.html?id=${course.id}'" style="cursor:pointer">
      <div class="card-img-placeholder" style="background:linear-gradient(135deg,var(--bg-card),var(--bg-card-hover))">
        <span style="font-size:3.5rem">${course.emoji}</span>
      </div>
      <div class="card-body">
        <span class="card-tag ${course.tagClass}">${course.tag}</span>
        <div class="card-title">${course.title}</div>
        <div class="card-meta">
          <span>👤 ${course.instructor}</span>
          <span>⏱ ${course.duration}</span>
          <span class="badge badge-${course.level === 'Beginner' ? 'success' : course.level === 'Intermediate' ? 'warning' : 'info'}">${course.level}</span>
        </div>
        <div class="card-rating">
          ${'★'.repeat(Math.floor(course.rating))}${'☆'.repeat(5-Math.floor(course.rating))}
          <span style="color:var(--text-secondary);font-weight:400">${course.rating} (${course.reviews.toLocaleString()})</span>
        </div>
      </div>
      <div class="card-footer">
        <div>
          <span class="card-price">₹${course.price.toLocaleString()}</span>
          <span class="card-price-original">₹${course.original.toLocaleString()}</span>
        </div>
        <span style="font-size:0.8rem;color:var(--text-muted)">👥 ${course.students}</span>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', function() {
  renderNavbar();
  renderMobileMenu();
  renderFooter();

  // MUST run after renderNavbar() so .nav-actions exists in DOM
  if (typeof updateNavAuth === 'function') updateNavAuth();
  if (typeof setActiveNav === 'function') setActiveNav();

  // Re-init hamburger after render
  var hb = document.getElementById('hamburger');
  var mm = document.getElementById('mobile-menu');
  if (hb && mm) {
    hb.addEventListener('click', function() {
      mm.classList.toggle('open');
      var spans = hb.querySelectorAll('span');
      var open = mm.classList.contains('open');
      spans[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity = open ? '0' : '1';
      spans[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });
  }
});