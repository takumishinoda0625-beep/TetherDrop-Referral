"use strict";
(() => {
  let saved;
  try { saved = localStorage.getItem('tetherdrop-language'); } catch (_) {}
  const preferred = document.querySelector('[data-language-section="en"]') && location.hash === '#english' ? 'en' : saved === 'ja' || saved === 'en' ? saved : ((navigator.language || 'en').toLowerCase().startsWith('ja') ? 'ja' : 'en');
  function apply(language) {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-ja][data-en]').forEach(element => {
      // Only developer-authored static translations are used as HTML, never URL data.
      element.innerHTML = element.dataset[language];
    });
    document.querySelectorAll('[data-language-section]').forEach(section => { section.hidden = section.dataset.languageSection !== language; });
    document.querySelectorAll('[data-language]').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.language === language)); });
    if (document.body.dataset.titleEn) document.title = language === 'en' ? document.body.dataset.titleEn : document.body.dataset.titleJa;
    document.dispatchEvent(new Event('tetherdrop-language'));
  }
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
    const language = button.dataset.language;
    try { localStorage.setItem('tetherdrop-language', language); } catch (_) {}
    apply(language);
  }));
  apply(preferred);
})();
