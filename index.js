const toggle = document.getElementById("languageToggle");
const label = document.getElementById("langLabel");

function getBrowserLanguage() {
  const lang = navigator.language || navigator.userLanguage;
  return lang.startsWith("en") ? "en" : "pt";
}

async function loadLanguage(lang) {
  const response = await fetch(`./i18n/${lang}.json`);
  const translations = await response.json();

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const keys = key.split(".");
    let text = translations;

    keys.forEach((k) => (text = text?.[k]));

    if (text) el.innerHTML = text;
  });

  label.textContent = lang.toUpperCase();
  localStorage.setItem("lang", lang);
}

const savedLang = localStorage.getItem("lang");
const initialLang = savedLang || getBrowserLanguage();

toggle.checked = initialLang === "en";
loadLanguage(initialLang);

toggle.addEventListener("change", () => {
  loadLanguage(toggle.checked ? "en" : "pt");
});
