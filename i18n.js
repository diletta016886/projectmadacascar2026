/* ============================================================
   GESTIONE DEL CAMBIO LINGUA
   Legge il dizionario "translations" (definito in translations.js,
   che va incluso PRIMA di questo file) e sostituisce i testi
   nella pagina in base alla lingua scelta.
   ============================================================ */

// Applica la lingua "lang" a tutti gli elementi con l'attributo data-i18n
function applicaLingua(lang) {
  // Aggiorna l'attributo lang dell'HTML (utile per accessibilità e SEO)
  document.documentElement.lang = lang;

  // Cerca ogni elemento che ha "data-i18n" nell'HTML di questa pagina
  document.querySelectorAll('[data-i18n]').forEach(function (elemento) {
    const chiave = elemento.getAttribute('data-i18n');
    const testo = translations[lang][chiave];
    // Se esiste una traduzione per questa chiave, la inseriamo.
    // Usiamo innerHTML (non textContent) perché alcuni testi
    // contengono tag come <strong> o <br> da preservare.
    if (testo) {
      elemento.innerHTML = testo;
    }
  });

  // Evidenzia il bottone della lingua attiva (per lo stile CSS ".active")
  document.querySelectorAll('.lang-btn').forEach(function (bottone) {
    bottone.classList.toggle('active', bottone.dataset.lang === lang);
  });

  // Ricorda la scelta per le prossime pagine/visite
  localStorage.setItem('lingua-sito', lang);
}

// Al caricamento della pagina: recupera la lingua salvata (o 'it' di default)
// e collega il click dei bottoni IT/EN/FR alla funzione applicaLingua
document.addEventListener('DOMContentLoaded', function () {
  const linguaSalvata = localStorage.getItem('lingua-sito') || 'it';
  applicaLingua(linguaSalvata);

  document.querySelectorAll('.lang-btn').forEach(function (bottone) {
    bottone.addEventListener('click', function () {
      applicaLingua(bottone.dataset.lang);
    });
  });
});
