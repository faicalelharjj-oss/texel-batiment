(function(){
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  toggle.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    });
  });

  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, {threshold:0.15});
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in-view'); });
  }

  var devisForm = document.querySelector('.devis-form');
  if (devisForm) {
    devisForm.addEventListener('submit', function(e){
      e.preventDefault();
      var nom = devisForm.nom.value.trim();
      var tel = devisForm.telephone.value.trim();
      var msg = devisForm.message.value.trim();
      var lot = devisForm.getAttribute('data-lot') || '';
      var phone = devisForm.getAttribute('data-wa-phone');

      var lines = ['Bonjour, je m\'appelle ' + nom + ' (tél. ' + tel + ').'];
      if (lot) lines.push('Demande de devis : ' + lot + '.');
      if (msg) lines.push(msg);

      var text = encodeURIComponent(lines.join('\n'));
      window.open('https://wa.me/' + phone + '?text=' + text, '_blank', 'noopener');
    });
  }
})();
