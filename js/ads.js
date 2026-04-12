// DesignVerse - Advertisement Engine

var AdsEngine = (function() {

  // Default ad store (simulates MongoDB documents)
  var DEFAULT_ADS = [
    {
      id: 'ad1', title: '🚀 Master UI/UX in 30 Days', body: 'Join 50,000+ designers. Get certified with India\'s top instructors.', cta: 'Enroll Now', ctaUrl: 'courses.html', image: '🎨', bg: 'linear-gradient(135deg,#E94560,#FF6B7A)', priority: 9,
      targeting: 'guest', startDate: '2025-01-01', endDate: '2026-12-31', active: true, impressionCount: 0, clickCount: 0
    },
    {
      id: 'ad2', title: '🎓 Free Figma Workshop', body: 'This Saturday — Design Systems from Scratch. Limited seats available!', cta: 'Register Free', ctaUrl: 'courses.html', image: '✏️', bg: 'linear-gradient(135deg,#16A085,#1abc9c)', priority: 8,
      targeting: 'all', startDate: '2025-01-01', endDate: '2026-12-31', active: true, impressionCount: 0, clickCount: 0
    },
    {
      id: 'ad3', title: '💜 Upgrade to Pro', body: 'Unlock 200+ courses, live workshops & certificates. 70% off this week!', cta: 'Get Pro', ctaUrl: 'revenue.html', image: '🏆', bg: 'linear-gradient(135deg,#1A1A2E,#2D2D4A)', priority: 7,
      targeting: 'signed_in', startDate: '2025-01-01', endDate: '2026-12-31', active: true, impressionCount: 0, clickCount: 0
    },
    {
      id: 'ad4', title: '🌈 Color Theory Masterclass', body: 'Learn the science of color. 22,000+ students enrolled. Start today!', cta: 'Start Learning', ctaUrl: 'courses.html', image: '🌈', bg: 'linear-gradient(135deg,#f59e0b,#ef4444)', priority: 6,
      targeting: 'all', startDate: '2025-01-01', endDate: '2026-12-31', active: true, impressionCount: 0, clickCount: 0
    },
    {
      id: 'ad5', title: '👥 Join the Community', body: 'Connect with designers on the same career path. Share, learn, grow.', cta: 'Join Now', ctaUrl: 'community.html', image: '👥', bg: 'linear-gradient(135deg,#E94560,#1A1A2E)', priority: 5,
      targeting: 'guest', startDate: '2025-01-01', endDate: '2026-12-31', active: true, impressionCount: 0, clickCount: 0
    }
  ];

  function loadAds() {
    var stored = localStorage.getItem('dv_ads');
    return stored ? JSON.parse(stored) : DEFAULT_ADS;
  }

  function saveAds(ads) {
    localStorage.setItem('dv_ads', JSON.stringify(ads));
  }

  function getEligibleAds() {
    var ads = loadAds();
    var now = new Date();
    var isLoggedIn = (typeof Auth !== 'undefined') && Auth.isLoggedIn();
    return ads
      .filter(function(ad) {
        if (!ad.active) return false;
        var start = new Date(ad.startDate);
        var end = new Date(ad.endDate);
        if (now < start || now > end) return false;
        if (ad.targeting === 'guest' && isLoggedIn) return false;
        if (ad.targeting === 'signed_in' && !isLoggedIn) return false;
        return true;
      })
      .sort(function(a, b) { return b.priority - a.priority; });
  }

  function trackImpression(id) {
    var ads = loadAds();
    var ad = ads.find(function(a) { return a.id === id; });
    if (ad) { ad.impressionCount++; saveAds(ads); }
  }

  function trackClick(id) {
    var ads = loadAds();
    var ad = ads.find(function(a) { return a.id === id; });
    if (ad) { ad.clickCount++; saveAds(ads); }
  }

  // ---- Popup UI ----
  var currentIndex = 0;
  var eligible = [];
  var popupEl = null;
  var intervalId = null;

  function buildPopup() {
    if (document.getElementById('ad-popup-overlay')) return;
    var el = document.createElement('div');
    el.id = 'ad-popup-overlay';
    el.innerHTML =
      '<div class="ad-popup" id="ad-popup-box">' +
        '<button class="ad-popup-close" id="ad-popup-close">✕</button>' +
        '<div class="ad-popup-image" id="ad-popup-img"></div>' +
        '<div class="ad-popup-body">' +
          '<div class="ad-popup-title" id="ad-popup-title"></div>' +
          '<div class="ad-popup-text" id="ad-popup-text"></div>' +
          '<a class="ad-popup-cta btn btn-primary" id="ad-popup-cta" href="#"></a>' +
          '<div class="ad-popup-meta" id="ad-popup-meta"></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(el);
    popupEl = el;

    document.getElementById('ad-popup-close').addEventListener('click', hidePopup);
    el.addEventListener('click', function(e) { if (e.target === el) hidePopup(); });
  }

  function showAd(ad) {
    if (!popupEl) buildPopup();
    var box = document.getElementById('ad-popup-box');
    box.style.background = ad.bg || 'var(--bg-card)';
    document.getElementById('ad-popup-img').textContent = ad.image || '🎨';
    document.getElementById('ad-popup-title').textContent = ad.title;
    document.getElementById('ad-popup-text').textContent = ad.body;
    var cta = document.getElementById('ad-popup-cta');
    cta.textContent = ad.cta;
    cta.href = ad.ctaUrl || '#';
    cta.onclick = function() { trackClick(ad.id); };
    var total = eligible.length;
    document.getElementById('ad-popup-meta').textContent = (currentIndex + 1) + ' / ' + total;
    popupEl.classList.add('open');
    trackImpression(ad.id);
  }

  function hidePopup() {
    if (popupEl) popupEl.classList.remove('open');
  }

  function showNext() {
    eligible = getEligibleAds();
    if (!eligible.length) return;
    currentIndex = (currentIndex + 1) % eligible.length;
    showAd(eligible[currentIndex]);
  }

  function init() {
    // Only run on public pages, not admin
    if (window.location.pathname.includes('admin')) return;
    eligible = getEligibleAds();
    if (!eligible.length) return;

    // Show first ad after 3s
    setTimeout(function() {
      currentIndex = 0;
      showAd(eligible[0]);
      // Rotate every 60s
      intervalId = setInterval(showNext, 60000);
    }, 3000);
  }

  // Public API
  return {
    init: init,
    loadAds: loadAds,
    saveAds: saveAds,
    trackImpression: trackImpression,
    trackClick: trackClick,
    getEligibleAds: getEligibleAds
  };
})();

document.addEventListener('DOMContentLoaded', function() {
  AdsEngine.init();
});
