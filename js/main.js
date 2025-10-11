const langSelect = document.getElementById('languageSelector');

availableLanguages.forEach(l => {
  const opt = document.createElement('option');
  opt.value = l;
  opt.textContent = languageDisplayNames[l] || l.toUpperCase();
  langSelect.appendChild(opt);
});

let currentLang = localStorage.getItem('DUMB_lang') || availableLanguages[0];
langSelect.value = currentLang;

function t(key) {
  const data = translations[currentLang];
  return data[key] || key;
}

function renderFeatures() {
  const container = document.getElementById('features');
  container.innerHTML = '';
  featuresData.forEach(f => {
    const div = document.createElement('div');
    div.className = 'feature';
    div.innerHTML = `
    <div class="feature-icon">
    <img src="imgs/icons/${f.icon}" alt="${t(f.titleKey)}">
    </div>
    <h3>${t(f.titleKey)}</h3>
    <p>${t(f.textKey)}</p>
    `;
    container.appendChild(div);
  });
}

function renderTeam() {
  const container = document.getElementById('team');
  container.innerHTML = '';
  teamData.forEach(m => {
    const div = document.createElement('div');
    div.className = 'member';
    
    let socialsHTML = '';
    if (m.socials && m.socials.length > 0) {
      socialsHTML = `
        <div class="member-socials">
          ${m.socials.map(social => `
            <a href="${social.url}" target="_blank" class="social-link" title="${social.type}">
              <img src="icons/socials/${social.type}.svg" alt="${social.type}" class="social-icon">
            </a>
          `).join('')}
        </div>
      `;
    }
    
    div.innerHTML = `
      <h3>
        <img src="imgs/flags/${m.country}.svg" alt="${m.country}" style="width:24px; height:24px; margin-right:6px; vertical-align:middle;">
        ${m.name}
      </h3>
      <p>${t(m.roleKey)}</p>
      ${socialsHTML}
    `;
    container.appendChild(div);
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('DUMB_lang', lang);
  const data = translations[lang];

  document.querySelectorAll('[data-translate-key]').forEach(el => {
    const key = el.getAttribute('data-translate-key');
    el.innerHTML = data[key] || key;
  });

  renderFeatures();
  renderTeam();
}

langSelect.addEventListener('change', e => setLanguage(e.target.value));

setLanguage(currentLang);
