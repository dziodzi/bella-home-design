/* Подборка хранится только в браузере посетителя. */
(function(){
  'use strict';
  var u=BH.u,D=BH.data,box=document.getElementById('fav-list');
  var list=D.PRODUCTS.filter(function(p){return u.fav.has(p.id);});
  function empty(){
    var suggestions=['divany-1','obedennye-1','konsoli-1'].map(D.product).filter(Boolean);
    box.innerHTML='<div class="selection-empty"><p>В подборке пока нет предметов. Отметьте их сердечком в каталоге — они сохранятся на этом устройстве.</p><a class="text-link" href="catalog.html">Перейти в каталог →</a></div><div class="section-topline"><h2>Начать с этих предметов</h2></div><div class="pgrid">'+suggestions.map(u.productCard).join('')+'</div>';
  }
  if(list.length)box.innerHTML='<p class="small-note mb-m">Подборка хранится только в браузере на этом устройстве. Она не отправляется владельцу сайта.</p><div class="pgrid">'+list.map(u.productCard).join('')+'</div><div class="btns mt-l"></div>';
  else empty();
  document.addEventListener('bh:favorites',function(){
    if(!list.length)return;
    list=list.filter(function(p){return u.fav.has(p.id);});
    if(!list.length){empty();BH.ui.decoratePhotos();BH.ui.observe(box);return;}
    box.querySelectorAll('.prod').forEach(function(card){var button=card.querySelector('[data-fav]');if(button&&!u.fav.has(button.dataset.fav))card.remove();});
  });
})();
