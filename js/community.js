// DesignVerse - Community JS

var GROUPS = [
  { id: 1, icon: '🖥️', name: 'UI/UX Beginners', category: 'uiux', label: 'UI/UX', desc: 'Just starting out in UI/UX? Share your first projects, get feedback, and learn from others on the same journey.', members: 3420, avatars: ['PS','AM','KN','RV'] },
  { id: 2, icon: '✏️', name: 'Figma Wizards', category: 'uiux', label: 'UI/UX', desc: 'All things Figma — components, auto-layout, variables, plugins. Level up your Figma game with fellow designers.', members: 2180, avatars: ['DK','AS','VP','SJ'] },
  { id: 3, icon: '🖼️', name: 'Graphic Design Hub', category: 'graphic', label: 'Graphic', desc: 'Branding, typography, print, illustration — a space for graphic designers to share work and get inspired.', members: 4750, avatars: ['SP','RM','PK','NR'] },
  { id: 4, icon: '💼', name: 'Brand Identity Crew', category: 'graphic', label: 'Graphic', desc: 'Obsessed with logos, brand systems, and visual identity? This is your crew. Share case studies and get critiques.', members: 1890, avatars: ['AK','BS','TM','LG'] },
  { id: 5, icon: '🔷', name: 'Design Systems Gang', category: 'pattern', label: 'Design Systems', desc: 'Tokens, component libraries, documentation — for designers building scalable systems at any company size.', members: 1340, avatars: ['RV','KS','PD','AM'] },
  { id: 6, icon: '🎭', name: 'Art & Aesthetics', category: 'art', label: 'Art Styles', desc: 'Minimalism, Brutalism, Bauhaus, Y2K — explore and discuss art movements and how they influence modern design.', members: 2670, avatars: ['KN','VP','SJ','DK'] },
  { id: 7, icon: '🌈', name: 'Color Theory Club', category: 'art', label: 'Art Styles', desc: 'Palettes, contrast, emotion through color. Share your color experiments and learn the science behind great color choices.', members: 3100, avatars: ['VJ','PS','AM','SP'] },
  { id: 8, icon: '🚀', name: 'Design Career Lounge', category: 'career', label: 'Career', desc: 'Job hunting, portfolio reviews, salary talks, freelancing tips — everything you need to grow your design career.', members: 5820, avatars: ['RM','DK','KN','AS'] },
  { id: 9, icon: '💡', name: 'Freelance Designers', category: 'career', label: 'Career', desc: 'Running your own design business? Connect with other freelancers, share clients tips, pricing strategies and tools.', members: 2430, avatars: ['SP','VJ','PK','TM'] },
  { id: 10, icon: '✨', name: 'Motion & Animation', category: 'uiux', label: 'UI/UX', desc: 'Micro-interactions, After Effects, Lottie, Rive — for designers who love bringing interfaces to life with motion.', members: 1560, avatars: ['AS','RM','BS','LG'] },
];

var SAMPLE_MESSAGES = {
  1: [
    { user: 'Priya S', initials: 'PS', text: 'Hey everyone! Just finished my first wireframe. Would love some feedback 🙌', time: '10:02 AM', mine: false },
    { user: 'Arjun M', initials: 'AM', text: 'Welcome Priya! Share it in the thread, we\'re all here to help.', time: '10:05 AM', mine: false },
    { user: 'Kavya N', initials: 'KN', text: 'Same here, I just started last week. This group has been super helpful!', time: '10:08 AM', mine: false },
  ],
  2: [
    { user: 'Dev K', initials: 'DK', text: 'Anyone using Figma variables for dark/light mode? Game changer honestly.', time: '9:30 AM', mine: false },
    { user: 'Ananya S', initials: 'AS', text: 'Yes! Combined with modes it\'s so clean. No more duplicate components.', time: '9:33 AM', mine: false },
  ],
  default: [
    { user: 'Rahul V', initials: 'RV', text: 'Good morning everyone! What are you all working on today?', time: '9:00 AM', mine: false },
    { user: 'Sneha P', initials: 'SP', text: 'Working on a rebrand project. Excited to share it soon!', time: '9:04 AM', mine: false },
    { user: 'Vikram J', initials: 'VJ', text: 'Just dropped a new color palette resource in the files section 🎨', time: '9:10 AM', mine: false },
  ]
};

var joined = JSON.parse(localStorage.getItem('dv_joined_groups') || '[]');
var activeGroup = null;

function saveJoined() { localStorage.setItem('dv_joined_groups', JSON.stringify(joined)); }

function renderGroups(filter, search) {
  var grid = document.getElementById('comm-grid');
  var list = GROUPS.filter(function(g) {
    var matchFilter = !filter || filter === 'all' || g.category === filter;
    var matchSearch = !search || g.name.toLowerCase().includes(search.toLowerCase()) || g.desc.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  if (!list.length) {
    grid.innerHTML = '<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:3rem 0">No groups found.</p>';
    return;
  }

  grid.innerHTML = list.map(function(g) {
    var isJoined = joined.includes(g.id);
    var iconBg = { uiux: 'rgba(124,58,237,0.15)', graphic: 'rgba(236,72,153,0.15)', pattern: 'rgba(6,182,212,0.15)', art: 'rgba(245,158,11,0.15)', career: 'rgba(16,185,129,0.15)' }[g.category] || 'rgba(124,58,237,0.15)';
    var avatarHtml = g.avatars.map(function(a) { return '<span>' + a + '</span>'; }).join('');
    return '<div class="comm-card" data-id="' + g.id + '">' +
      '<div class="comm-card-top">' +
        '<div class="comm-icon" style="background:' + iconBg + '">' + g.icon + '</div>' +
        '<div><div class="comm-card-title">' + g.name + '</div><div class="comm-card-category">' + g.label + '</div></div>' +
      '</div>' +
      '<div class="comm-card-desc">' + g.desc + '</div>' +
      '<div class="comm-card-footer">' +
        '<div style="display:flex;align-items:center;gap:0.5rem">' +
          '<div class="comm-avatars">' + avatarHtml + '</div>' +
          '<span class="comm-members">👥 ' + g.members.toLocaleString() + ' members</span>' +
        '</div>' +
        '<button class="btn-join' + (isJoined ? ' joined' : '') + '" data-id="' + g.id + '">' + (isJoined ? '✓ Joined' : '+ Join') + '</button>' +
      '</div>' +
    '</div>';
  }).join('');
}

function openChat(group) {
  activeGroup = group;
  document.getElementById('chat-icon').textContent = group.icon;
  document.getElementById('chat-name').textContent = group.name;
  document.getElementById('chat-members').textContent = group.members.toLocaleString() + ' members';

  var msgs = SAMPLE_MESSAGES[group.id] || SAMPLE_MESSAGES.default;
  var stored = JSON.parse(localStorage.getItem('dv_chat_' + group.id) || '[]');
  var all = msgs.concat(stored);

  var container = document.getElementById('chat-messages');
  container.innerHTML = all.map(function(m) {
    return '<div class="chat-msg' + (m.mine ? ' mine' : '') + '">' +
      '<div class="chat-avatar">' + m.initials + '</div>' +
      '<div class="chat-bubble">' +
        (!m.mine ? '<div class="chat-bubble-name">' + m.user + '</div>' : '') +
        m.text +
        '<div class="chat-bubble-time">' + m.time + '</div>' +
      '</div>' +
    '</div>';
  }).join('');
  container.scrollTop = container.scrollHeight;

  document.getElementById('chat-overlay').classList.add('open');
  document.getElementById('chat-input').focus();
}

function sendMessage() {
  var input = document.getElementById('chat-input');
  var text = input.value.trim();
  if (!text || !activeGroup) return;

  var user = (typeof Auth !== 'undefined' && Auth.getUser()) ? Auth.getUser() : null;
  var name = user ? user.name : 'You';
  var initials = name.split(' ').map(function(n) { return n[0]; }).join('').toUpperCase().slice(0, 2);
  var now = new Date();
  var time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  var msg = { user: name, initials: initials, text: text, time: time, mine: true };
  var stored = JSON.parse(localStorage.getItem('dv_chat_' + activeGroup.id) || '[]');
  stored.push(msg);
  localStorage.setItem('dv_chat_' + activeGroup.id, JSON.stringify(stored));

  var container = document.getElementById('chat-messages');
  var div = document.createElement('div');
  div.className = 'chat-msg mine';
  div.innerHTML = '<div class="chat-avatar">' + initials + '</div>' +
    '<div class="chat-bubble">' + text + '<div class="chat-bubble-time">' + time + '</div></div>';
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  input.value = '';
}

// Events
document.addEventListener('DOMContentLoaded', function() {
  var currentFilter = 'all';
  var currentSearch = '';

  renderGroups(currentFilter, currentSearch);

  // Filter buttons
  document.getElementById('comm-filters').addEventListener('click', function(e) {
    var btn = e.target.closest('.comm-filter');
    if (!btn) return;
    document.querySelectorAll('.comm-filter').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderGroups(currentFilter, currentSearch);
  });

  // Search
  document.getElementById('comm-search').addEventListener('input', function() {
    currentSearch = this.value;
    renderGroups(currentFilter, currentSearch);
  });

  // Card click — open chat / join
  document.getElementById('comm-grid').addEventListener('click', function(e) {
    var joinBtn = e.target.closest('.btn-join');
    if (joinBtn) {
      e.stopPropagation();
      var id = parseInt(joinBtn.dataset.id);
      if (joined.includes(id)) {
        joined = joined.filter(function(j) { return j !== id; });
        joinBtn.textContent = '+ Join';
        joinBtn.classList.remove('joined');
      } else {
        joined.push(id);
        joinBtn.textContent = '✓ Joined';
        joinBtn.classList.add('joined');
        if (typeof showToast === 'function') showToast('Joined ' + GROUPS.find(function(g){return g.id===id;}).name + '!', 'success');
      }
      saveJoined();
      return;
    }
    var card = e.target.closest('.comm-card');
    if (card) {
      var id = parseInt(card.dataset.id);
      var group = GROUPS.find(function(g) { return g.id === id; });
      if (group) openChat(group);
    }
  });

  // Close chat
  document.getElementById('chat-close').addEventListener('click', function() {
    document.getElementById('chat-overlay').classList.remove('open');
  });
  document.getElementById('chat-overlay').addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('open');
  });

  // Send message
  document.getElementById('chat-send').addEventListener('click', sendMessage);
  document.getElementById('chat-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') sendMessage();
  });
});
