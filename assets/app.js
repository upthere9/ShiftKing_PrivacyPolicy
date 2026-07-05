(function () {
  // Kept in sync with the *.md language files at the repository root.
  var supportedLanguages = [
    'en', 'ko', 'de', 'es', 'es-MX', 'fr', 'hi', 'id', 'it',
    'ja', 'nl', 'pl', 'pt-BR', 'ru', 'th', 'tr', 'vi', 'zh-Hans'
  ];

  var languageNames = {
    en: 'English',
    ko: '한국어',
    de: 'Deutsch',
    es: 'Español',
    'es-MX': 'Español (México)',
    fr: 'Français',
    hi: 'हिन्दी',
    id: 'Bahasa Indonesia',
    it: 'Italiano',
    ja: '日本語',
    nl: 'Nederlands',
    pl: 'Polski',
    'pt-BR': 'Português (Brasil)',
    ru: 'Русский',
    th: 'ไทย',
    tr: 'Türkçe',
    vi: 'Tiếng Việt',
    'zh-Hans': '简体中文'
  };

  var DEFAULT_LANGUAGE = 'en';

  function normalize(code) {
    if (!code) return null;
    var match = supportedLanguages.filter(function (lang) {
      return lang.toLowerCase() === code.toLowerCase();
    });
    return match.length ? match[0] : null;
  }

  function matchBrowserLanguage() {
    var candidates = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || DEFAULT_LANGUAGE];

    for (var i = 0; i < candidates.length; i++) {
      var candidate = candidates[i];
      if (!candidate) continue;

      var exact = normalize(candidate);
      if (exact) return exact;

      var base = normalize(candidate.split('-')[0]);
      if (base) return base;
    }
    return DEFAULT_LANGUAGE;
  }

  function resolveLanguage() {
    var params = new URLSearchParams(window.location.search);
    var requested = normalize(params.get('lang'));
    if (requested) return requested;
    return matchBrowserLanguage();
  }

  function renderNav(activeLang) {
    var nav = document.getElementById('lang-nav');
    nav.innerHTML = '';
    supportedLanguages.forEach(function (lang) {
      var link = document.createElement('a');
      link.href = '?lang=' + encodeURIComponent(lang);
      link.textContent = languageNames[lang] || lang;
      link.className = 'lang-link' + (lang === activeLang ? ' active' : '');
      if (lang === activeLang) link.setAttribute('aria-current', 'page');
      nav.appendChild(link);
    });
  }

  function loadContent(lang) {
    var content = document.getElementById('content');
    content.innerHTML = '<p class="loading">Loading…</p>';

    return fetch(lang + '.md', { cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) throw new Error('Failed to load ' + lang + '.md');
        return response.text();
      })
      .then(function (text) {
        content.innerHTML = MiniMarkdown.render(text);
      })
      .catch(function () {
        if (lang !== DEFAULT_LANGUAGE) {
          return loadContent(DEFAULT_LANGUAGE);
        }
        content.innerHTML = '<p class="loading">Unable to load the privacy policy.</p>';
      });
  }

  function init() {
    var lang = resolveLanguage();
    document.documentElement.lang = lang;
    renderNav(lang);
    loadContent(lang);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
