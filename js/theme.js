/* Runs in <head> to restore the theme before the first paint. */
(function(){
  'use strict';
  var media=window.matchMedia('(prefers-color-scheme: dark)'),saved=null;
  try{saved=localStorage.getItem('bh-theme');}catch(e){}
  if(saved==='light'||saved==='dark')document.documentElement.dataset.theme=saved;
  function dark(){return document.documentElement.dataset.theme?document.documentElement.dataset.theme==='dark':media.matches;}
  function sync(){document.querySelectorAll('[data-theme-toggle]').forEach(function(input){input.checked=dark();});}
  window.BHTheme={sync:sync,isDark:dark};
  document.addEventListener('change',function(event){
    if(!event.target.matches('[data-theme-toggle]'))return;
    var theme=event.target.checked?'dark':'light';
    document.documentElement.dataset.theme=theme;
    try{localStorage.setItem('bh-theme',theme);}catch(e){}
    sync();
  });
  window.addEventListener('storage',function(e){if(e.key==='bh-theme'){if(e.newValue==='dark'||e.newValue==='light')document.documentElement.dataset.theme=e.newValue;else delete document.documentElement.dataset.theme;sync();}});
  if(media.addEventListener)media.addEventListener('change',sync);
})();
