const langSelect = document.getElementById('languageSelector');

availableLanguages.forEach(l => {
  const opt = document.createElement('option');
  opt.value = l;
  opt.textContent = l.toUpperCase();
  langSelect.appendChild(opt);
});

let currentLang = localStorage.getItem('DUMB_lang') || availableLanguages[0];
langSelect.value = currentLang;

function renderFeatures(featuresData){
  const container = document.getElementById('features');
  container.innerHTML = '';
  featuresData.forEach(f => {
    const div = document.createElement('div');
    div.className = 'feature';
    div.innerHTML = `<h3>${f.title}</h3><p>${f.text}</p>`;
    container.appendChild(div);
  });
}

function renderTeam(teamData){
  const container = document.getElementById('team');
  container.innerHTML = '';
  teamData.forEach(m => {
    const div = document.createElement('div');
    div.className = 'member';
    div.innerHTML = `<h3>${m.name}</h3><p>${m.role}</p>`;
    container.appendChild(div);
  });
}

function setLanguage(lang){
  currentLang = lang;
  localStorage.setItem('DUMB_lang', lang);
  const data = translations[lang];
  document.querySelectorAll('[data-translate-key]').forEach(el => {
    const key = el.getAttribute('data-translate-key');
    el.innerHTML = data[key] || '';
  });
  renderFeatures(data.features || []);
  renderTeam(data.team || []);
}

langSelect.addEventListener('change', e => setLanguage(e.target.value));

setLanguage(currentLang);
