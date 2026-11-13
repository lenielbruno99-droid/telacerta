/* Google Analytics: só liga quando GA_ID estiver preenchido em catalogo.js.
   Também registra cada clique em link de afiliado como evento "clique_afiliado". */
(function () {
  if (typeof GA_ID === "undefined" || !GA_ID) return;
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", GA_ID);

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href*="meli.la"],a[href*="mercadolivre.com.br"]');
    if (!a) return;
    var card = a.closest(".card,.deal,.pick-item,td");
    var nome = card && card.querySelector("h3") ? card.querySelector("h3").textContent : a.href;
    gtag("event", "clique_afiliado", { produto: nome, pagina: location.pathname });
  });
})();
