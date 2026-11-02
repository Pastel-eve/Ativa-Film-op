/* ==========================================================
   ATIVA FILM – CONFIGURAÇÕES (edite só esta parte)
   ========================================================== */

/* 1) LINKS DO SITE
   Deixe "" para manter o link que já está no HTML.
   Preencha para trocar o link em TODOS os lugares do site de uma vez. */
var LINKS = {
  whatsapp:  "",   // ex: "https://wa.me/5511999999999"
  instagram: "",   // ex: "https://instagram.com/seuusuario"
  facebook:  "",   // ex: "https://facebook.com/suapagina"
  maps:      ""    // ex: "https://maps.app.goo.gl/..." (link da loja no Google Maps)
};

/* 2) RESUMO DA NOTA NO GOOGLE (opcional)
   Deixe nota: 0 para esconder. */
var GOOGLE_RESUMO = {
  nota: 0,      // ex: 4.9
  total: 0      // ex: 87  (quantidade de avaliações)
};

/* 3) AVALIAÇÕES REAIS DO GOOGLE MAPS
   Copie do Google Maps e cole aqui, uma por bloco { ... },.
   Modelo (apague as barras // para usar):

   { nome: "Nome do cliente", nota: 5, data: "há 2 meses", texto: "Texto da avaliação copiado do Google." },
*/
var AVALIACOES = [
  // { nome: "", nota: 5, data: "", texto: "" },
];


/* ==========================================================
   CÓDIGO DO SITE (não precisa mexer)
   ========================================================== */

/* Aplica os links configurados */
(function(){
  var els = document.querySelectorAll('[data-link]');
  for (var i = 0; i < els.length; i++){
    var url = LINKS[els[i].getAttribute('data-link')];
    if (url) els[i].setAttribute('href', url);
  }
})();

/* Simulador de película */
(function(){
  var r = document.getElementById('range'), t = document.getElementById('tint'), o = document.getElementById('out');
  function upd(){ var v = +r.value; t.style.opacity = (1 - v/100).toFixed(2); o.textContent = 'Passa ' + v + '% da luz'; }
  r.addEventListener('input', upd); upd();
})();

/* Avaliações */
(function(){
  function estrelas(n){
    n = Math.max(0, Math.min(5, Math.round(n)));
    return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
  }
  function el(tag, cls, txt){
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt) e.textContent = txt;   // textContent evita injeção de HTML
    return e;
  }

  var lista = document.getElementById('reviews-list');
  var resumo = document.getElementById('reviews-summary');

  if (GOOGLE_RESUMO.nota > 0){
    resumo.appendChild(el('strong', '', String(GOOGLE_RESUMO.nota).replace('.', ',')));
    var s = el('span', 'stars', estrelas(GOOGLE_RESUMO.nota));
    s.setAttribute('aria-label', 'Nota ' + GOOGLE_RESUMO.nota + ' de 5');
    resumo.appendChild(s);
    if (GOOGLE_RESUMO.total > 0) resumo.appendChild(el('span', '', GOOGLE_RESUMO.total + ' avaliações no Google'));
    resumo.hidden = false;
  }

  var validas = AVALIACOES.filter(function(a){ return a && a.nome && a.texto; });

  if (!validas.length){
    lista.appendChild(el('p', 'rev-empty', 'As avaliações dos clientes aparecem aqui. Veja todas no Google Maps pelo botão abaixo.'));
    return;
  }

  validas.forEach(function(a){
    var card = el('div', 'rev');
    var st = el('div', 'stars', estrelas(a.nota || 5));
    st.setAttribute('aria-label', (a.nota || 5) + ' estrelas');
    card.appendChild(st);
    card.appendChild(el('p', '', a.texto));
    var head = el('div', 'rev-head');
    head.appendChild(el('b', '', a.nome));
    if (a.data) head.appendChild(el('time', '', a.data));
    card.appendChild(head);
    lista.appendChild(card);
  });
})();
