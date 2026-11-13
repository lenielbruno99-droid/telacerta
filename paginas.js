/* Lista "melhores TVs" das páginas de guia. Os dados vêm de catalogo.js. */
(function () {
  var el = document.getElementById("lista");
  if (!el || typeof TVS === "undefined") return;

  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var brl = function (v) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }); };
  var m1 = function (v) { return v.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }); };
  var dist = function (t) { return m1(Math.round(t.pol * 2.54 / 10) / 10) + " a " + m1(Math.round(t.pol * 2.54 * 1.5 / 10) / 10) + " m"; };
  var valor = function (t) { return (t.filmes + t.jogos) / 2 * 1000 / t.preco; };
  var url = function (t) { return t.link || ("https://www.mercadolivre.com.br/p/" + t.mlb); };

  var filtro = el.dataset.filtro, ordem = el.dataset.ordem || "custo", max = +(el.dataset.max || 6);
  var list = TVS.filter(function (t) {
    if (filtro === "50") return t.pol === 50;
    if (filtro === "55") return t.pol === 55;
    if (filtro === "grande") return t.pol >= 58;
    if (filtro === "jogos") return t.jogos >= 7;
    if (filtro === "ate2500") return t.preco <= 2500;
    return true;
  });
  list.sort(function (a, b) {
    if (ordem === "jogos") return b.jogos - a.jogos || a.preco - b.preco;
    return b.custo - a.custo || valor(b) - valor(a);
  });
  list = list.slice(0, max);

  var rot = ["Nossa escolha", "Também vale muito", "Boa alternativa"];
  el.innerHTML = list.map(function (t, i) {
    var hz = t.hz ? t.hz + " Hz" : "Hz: ver ficha";
    var why = t.pros.join(". ") + ". Atenção: " + t.contras.join("; ") + ".";
    return '<article class="pick-item' + (i === 0 ? " first" : "") + '">' +
      '<div class="ph">' + (t.img ? '<img src="img/' + t.id + '.webp" alt="' + esc(t.nome) + '" loading="lazy" onerror="if(!this.dataset.t){this.dataset.t=1;this.src=\'' + esc(t.img) + '\'}else{this.remove()}">' : "") + '<span class="rk">#' + (i + 1) + "</span></div>" +
      "<div><span class=\"lbl\">" + (rot[i] || "Também na lista") + "</span>" +
      "<h3>" + esc(t.nome) + "</h3>" +
      '<p class="why">' + esc(why) + "</p>" +
      '<div class="chips"><span>' + t.painel + "</span><span>" + hz + "</span>" + (t.so ? "<span>" + t.so + "</span>" : "") +
      "<span>Filmes " + t.filmes + "/10</span><span>Jogos " + t.jogos + "/10</span><span class=\"d\">Sofá a " + dist(t) + "</span></div>" +
      '<div class="buy"><b>' + brl(t.preco) + '</b><a class="btn" href="' + esc(url(t)) + '" target="_blank" rel="sponsored noopener">Ver preço de hoje</a><small>preço no ML em ' + ATUALIZADO_EM + "</small></div>" +
      "</div></article>";
  }).join("") || '<p class="meta">Nenhuma TV nessa categoria por enquanto.</p>';

  var d = document.getElementById("atualizado");
  if (d) d.textContent = ATUALIZADO_EM;
})();

/* links de rodapé que dependem das configurações */
(function () {
  var c = document.getElementById("contatoBox");
  if (!c) return;
  var h = "";
  if (typeof CONTATO_EMAIL !== "undefined" && CONTATO_EMAIL) h += '<p>E-mail: <b>' + CONTATO_EMAIL + '</b></p><p><a class="btn" href="mailto:' + CONTATO_EMAIL + '">Mandar e-mail</a></p>';
  if (typeof WHATSAPP_GRUPO !== "undefined" && WHATSAPP_GRUPO) h += '<p style="margin-top:14px"><a class="btn ghost" href="' + WHATSAPP_GRUPO + '" target="_blank" rel="noopener">Grupo de ofertas no WhatsApp</a></p>';
  if (h) c.innerHTML = h;
})();
