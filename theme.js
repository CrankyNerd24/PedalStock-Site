// Colour themes, shared with the web app at /app/ (same browser setting), so a choice made
// on one shows on the other. Each page's <head> applies the saved theme before drawing.
(function () {
  var THEMES = [
    { id: 'pcb', name: 'PCB Green', primary: '#3fcf8e', secondary: '#e9c46a' },
    { id: 'sky', name: 'Sky Blue', primary: '#5bc0f8', secondary: '#f5b04c' },
    { id: 'deep', name: 'Deep Blue', primary: '#3d9cf0', secondary: '#ffc145' }
  ];
  var KEY = 'pedalstock.theme';
  function current() {
    var t = document.documentElement.dataset.theme;
    return t === 'sky' || t === 'deep' ? t : 'pcb';
  }
  function apply(id) {
    if (id === 'pcb') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = id;
    try { if (id === 'pcb') localStorage.removeItem(KEY); else localStorage.setItem(KEY, id); } catch (e) {}
  }
  document.querySelectorAll('[data-theme-picker]').forEach(function (host) {
    host.setAttribute('role', 'radiogroup');
    host.setAttribute('aria-label', 'Colour theme');
    var label = document.createElement('span');
    label.textContent = 'Theme';
    host.appendChild(label);
    var buttons = THEMES.map(function (t) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'theme-option';
      b.setAttribute('role', 'radio');
      b.innerHTML = '<span class="theme-swatch" aria-hidden="true"><i style="background:' + t.primary + '"></i><i style="background:' + t.secondary + '"></i></span>' + t.name;
      b.addEventListener('click', function () { apply(t.id); sync(); });
      host.appendChild(b);
      return { button: b, id: t.id };
    });
    function sync() { var c = current(); buttons.forEach(function (x) { x.button.setAttribute('aria-checked', String(x.id === c)); }); }
    sync();
  });
})();
