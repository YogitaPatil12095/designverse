﻿// DesignVerse - Main JavaScript

// ================================
// Starry Night Background
// ================================
(function() {
  var canvas = document.createElement('canvas');
  canvas.id = 'starry-canvas';
  document.body.insertBefore(canvas, document.body.firstChild);

  var ctx = canvas.getContext('2d');
  var stars = [];
  var shootingStars = [];
  var W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function initStars() {
    stars = [];
    var count = Math.floor((W * H) / 4000);
    for (var i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: randomBetween(0.3, 1.6),
        alpha: randomBetween(0.3, 1),
        speed: randomBetween(0.002, 0.008),
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.85
          ? (Math.random() > 0.5 ? '#FF6B7A' : '#16A085')
          : '#ffffff'
      });
    }
  }

  function spawnShootingStar() {
    var fromLeft = Math.random() > 0.5;
    shootingStars.push({
      x: fromLeft ? randomBetween(0, W * 0.4) : randomBetween(W * 0.4, W),
      y: randomBetween(0, H * 0.5),
      len: randomBetween(80, 180),
      speed: randomBetween(6, 14),
      angle: randomBetween(20, 45) * Math.PI / 180,
      alpha: 1,
      trail: randomBetween(0.92, 0.97)
    });
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    // Twinkling stars
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var a = s.alpha * (0.6 + 0.4 * Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = a;
      ctx.fill();
    }

    // Shooting stars
    for (var j = shootingStars.length - 1; j >= 0; j--) {
      var ss = shootingStars[j];
      ctx.globalAlpha = ss.alpha;
      var grad = ctx.createLinearGradient(
        ss.x, ss.y,
        ss.x - Math.cos(ss.angle) * ss.len,
        ss.y - Math.sin(ss.angle) * ss.len
      );
      grad.addColorStop(0, 'rgba(255,255,255,0.9)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath();
      ctx.moveTo(ss.x, ss.y);
      ctx.lineTo(ss.x - Math.cos(ss.angle) * ss.len, ss.y - Math.sin(ss.angle) * ss.len);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;
      ss.alpha *= ss.trail;

      if (ss.alpha < 0.02) shootingStars.splice(j, 1);
    }

    ctx.globalAlpha = 1;
  }

  var lastShoot = 0;
  function loop(t) {
    draw(t);
    if (t - lastShoot > randomBetween(1800, 4000)) {
      spawnShootingStar();
      lastShoot = t;
    }
    requestAnimationFrame(loop);
  }

  resize();
  initStars();
  window.addEventListener('resize', function() { resize(); initStars(); });
  requestAnimationFrame(loop);
})();


// Razorpay config (replace with your test key from .env)
var RAZORPAY_KEY = 'rzp_test_SSo7vWRfJAnUHn'; // From .env file

// ================================
// Theme Toggle (dark / light)
// ================================
(function() {
  var saved = localStorage.getItem('dv_theme');
  if (saved === 'light') document.body.classList.add('light-mode');

  document.addEventListener('click', function(e) {
    var btn = e.target.closest('#theme-toggle');
    if (!btn) return;
    var isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('dv_theme', isLight ? 'light' : 'dark');
    btn.textContent = isLight ? '☀️' : '🌙';
  });

  // Sync icon after navbar renders
  document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
  });
})();

// ================================
// Button ripple effect
// ================================
document.addEventListener('click', function(e) {
  var btn = e.target.closest('.btn, .btn-nav-cta, .btn-nav-login');
  if (!btn) return;
  var rect = btn.getBoundingClientRect();
  btn.style.setProperty('--rx', (e.clientX - rect.left) + 'px');
  btn.style.setProperty('--ry', (e.clientY - rect.top) + 'px');
  btn.classList.remove('rippling');
  void btn.offsetWidth; // reflow to restart animation
  btn.classList.add('rippling');
  btn.addEventListener('animationend', function() { btn.classList.remove('rippling'); }, { once: true });
});

// Loading Screen
window.addEventListener('load', function() {
  setTimeout(function() {
    var loader = document.getElementById('loading-screen');
    if (loader) loader.classList.add('hidden');
  }, 1500);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
  var navbar = document.querySelector('.navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Auth state management
var Auth = {
  isLoggedIn: function() { return !!localStorage.getItem('dv_user'); },
  getUser: function() { return JSON.parse(localStorage.getItem('dv_user') || 'null'); },
  isAdmin: function() { var u = JSON.parse(localStorage.getItem('dv_user') || 'null'); return u && u.role === 'admin'; },
  login: function(email, name, role) {
    localStorage.setItem('dv_user', JSON.stringify({ email: email, name: name, role: role || 'user', loginTime: Date.now() }));
  },
  logout: function() {
    localStorage.removeItem('dv_user');
    window.location.href = 'auth.html';
  }
};

// Toast notifications
function showToast(message, type) {
  type = type || 'info';
  var container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  var icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  var toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.innerHTML = '<span class="toast-icon">' + (icons[type] || icons.info) + '</span><span class="toast-msg">' + message + '</span>';
  container.appendChild(toast);
  setTimeout(function() {
    toast.style.animation = 'slideOutRight 0.3s ease forwards';
    setTimeout(function() { toast.remove(); }, 300);
  }, 3500);
}

// Notification panel
function toggleNotifPanel() {
  showToast('You have 3 new notifications', 'info');
}

// User dropdown panel
function toggleUserPanel() {
  var existing = document.getElementById('user-dropdown');
  if (existing) { existing.remove(); return; }
  var user = Auth.getUser();
  if (!user) return;
  var initials = user.name ? user.name.split(' ').map(function(n){return n[0];}).join('').toUpperCase().slice(0,2) : 'U';
  var panel = document.createElement('div');
  panel.id = 'user-dropdown';
  panel.style.cssText = 'position:fixed;top:74px;right:1.5rem;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-xl);padding:1.25rem;min-width:260px;z-index:1100;box-shadow:var(--shadow-lg)';
  panel.innerHTML =
    '<div style="display:flex;align-items:center;gap:.75rem;padding-bottom:1rem;border-bottom:1px solid var(--border);margin-bottom:1rem">' +
      '<div style="width:48px;height:48px;border-radius:50%;background:var(--gradient-primary);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.1rem;flex-shrink:0">' + initials + '</div>' +
      '<div><div style="font-weight:700;font-size:.95rem">' + user.name + '</div>' +
      '<div style="font-size:.75rem;color:var(--text-muted)">' + user.email + '</div>' +
      '<div style="font-size:.72rem;margin-top:.2rem;color:var(--accent-secondary);font-weight:600">' + (user.role === 'admin' ? '🔐 Admin' : '🎓 Pro Learner') + '</div></div>' +
    '</div>' +
    '<div style="display:flex;flex-direction:column;gap:.25rem">' +
      '<a href="dashboard.html" style="display:flex;align-items:center;gap:.6rem;padding:.6rem .75rem;border-radius:var(--radius-sm);color:var(--text-secondary);font-size:.875rem;transition:var(--transition)" onmouseover="this.style.background=\'rgba(124,58,237,.12)\'" onmouseout="this.style.background=\'\'">📊 Dashboard</a>' +
      '<a href="courses.html" style="display:flex;align-items:center;gap:.6rem;padding:.6rem .75rem;border-radius:var(--radius-sm);color:var(--text-secondary);font-size:.875rem;transition:var(--transition)" onmouseover="this.style.background=\'rgba(124,58,237,.12)\'" onmouseout="this.style.background=\'\'">📚 My Courses</a>' +
      '<a href="#" style="display:flex;align-items:center;gap:.6rem;padding:.6rem .75rem;border-radius:var(--radius-sm);color:var(--text-secondary);font-size:.875rem;transition:var(--transition)" onmouseover="this.style.background=\'rgba(124,58,237,.12)\'" onmouseout="this.style.background=\'\'">🏆 Certificates</a>' +
      '<a href="#" style="display:flex;align-items:center;gap:.6rem;padding:.6rem .75rem;border-radius:var(--radius-sm);color:var(--text-secondary);font-size:.875rem;transition:var(--transition)" onmouseover="this.style.background=\'rgba(124,58,237,.12)\'" onmouseout="this.style.background=\'\'">⚙️ Settings</a>' +
      '<div style="height:1px;background:var(--border);margin:.25rem 0"></div>' +
      '<a onclick="Auth.logout()" style="display:flex;align-items:center;gap:.6rem;padding:.6rem .75rem;border-radius:var(--radius-sm);color:#ef4444;font-size:.875rem;cursor:pointer;transition:var(--transition)" onmouseover="this.style.background=\'rgba(239,68,68,.08)\'" onmouseout="this.style.background=\'\'">🚪 Logout</a>' +
    '</div>';
  document.body.appendChild(panel);
  // Close on outside click
  setTimeout(function() {
    document.addEventListener('click', function handler(e) {
      if (!panel.contains(e.target) && !e.target.closest('.nav-avatar')) {
        panel.remove();
        document.removeEventListener('click', handler);
      }
    });
  }, 10);
}

// Update navbar based on auth state — called after renderNavbar()
function updateNavAuth() {
  var navActions = document.querySelector('.nav-actions');
  if (!navActions) return;
  var isLight = document.body.classList.contains('light-mode');
  var toggleBtn = '<button class="theme-toggle" id="theme-toggle" title="Toggle theme">' + (isLight ? '☀️' : '🌙') + '</button>';
  if (Auth.isLoggedIn()) {
    var user = Auth.getUser();
    var initials = user.name ? user.name.split(' ').map(function(n){return n[0];}).join('').toUpperCase().slice(0,2) : 'U';
    navActions.innerHTML = toggleBtn +
      '<div class="nav-notification" onclick="toggleNotifPanel()">&#128276;<span class="notif-badge"></span></div>' +
      '<div class="nav-avatar" onclick="toggleUserPanel()" title="' + user.name + '" style="cursor:pointer">' + initials + '</div>';
  } else {
    navActions.innerHTML = toggleBtn +
      '<a href="auth.html" class="nav-person-icon" title="Login" style="width:36px;height:36px;border-radius:50%;background:var(--bg-card);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:1.1rem;transition:var(--transition);text-decoration:none" onmouseover="this.style.borderColor=\'var(--accent-primary)\'" onmouseout="this.style.borderColor=\'var(--border)\'">&#128100;</a>' +
      '<a href="auth.html" class="btn-nav-cta">Get Started</a>';
  }
}

// Active nav link
function setActiveNav() {
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function(a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });
}

// Intersection Observer for animations
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .section-header, .animate-on-scroll').forEach(function(el) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Wishlist management
var Wishlist = {
  get: function() { return JSON.parse(localStorage.getItem('dv_wishlist') || '[]'); },
  add: function(id) {
    var list = Wishlist.get();
    if (!list.includes(id)) { list.push(id); localStorage.setItem('dv_wishlist', JSON.stringify(list)); }
  },
  remove: function(id) {
    var list = Wishlist.get().filter(function(i){ return i !== id; });
    localStorage.setItem('dv_wishlist', JSON.stringify(list));
  },
  toggle: function(id, btn) {
    var list = Wishlist.get();
    if (list.includes(id)) {
      Wishlist.remove(id);
      if (btn) btn.textContent = '🤍 Add to Wishlist';
      showToast('Removed from wishlist', 'info');
    } else {
      Wishlist.add(id);
      if (btn) btn.textContent = '❤️ Wishlisted';
      showToast('Added to wishlist!', 'success');
    }
  }
};

// Enrolled courses management
var Enrolled = {
  get: function() { return JSON.parse(localStorage.getItem('dv_enrolled') || '[]'); },
  add: function(course) {
    var list = Enrolled.get();
    if (!list.find(function(c){ return c.id === course.id; })) {
      list.push(Object.assign({}, course, { progress: 0, enrolledAt: Date.now() }));
      localStorage.setItem('dv_enrolled', JSON.stringify(list));
    }
  }
};

// Subscription management
var Subscription = {
  get: function() { return localStorage.getItem('dv_subscription') || null; },
  set: function(plan) { localStorage.setItem('dv_subscription', plan); },
  isPro: function() { return Subscription.get() === 'pro'; }
};

// Razorpay payment functions
function initiatePayment(options, successCallback) {
  var rzp = new Razorpay({
    key: RAZORPAY_KEY,
    amount: options.amount, // in paisa
    currency: options.currency || 'INR',
    name: 'DesignVerse',
    description: options.description,
    image: 'https://designverse.com/logo.png', // optional
    handler: function(response) {
      showToast('Payment successful!', 'success');
      successCallback(response);
    },
    prefill: {
      name: Auth.getUser() ? Auth.getUser().name : '',
      email: Auth.getUser() ? Auth.getUser().email : ''
    },
    theme: {
      color: '#7c3aed'
    }
  });
  rzp.open();
}