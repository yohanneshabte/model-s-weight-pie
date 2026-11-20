// Zero-dependency SVG doughnut chart. Reads data/weight-breakdown.json and themes/themes.js.
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var CX = 100, CY = 100, R_OUT = 96, R_IN = 60;   // SVG viewBox is 200x200
  var GAP_DEG = 0.8, ANIM_MS = 1000;
  var $ = function (id) { return document.getElementById(id); };
  var data = null, paths = [], items = [], cur = -1;

  // Pick theme: URL ?theme=gold wins, then the last choice saved on this device, then dark.
  var keys = Object.keys(window.THEMES);
  var q = new URLSearchParams(location.search).get("theme");
  var themeKey = keys.indexOf(q) >= 0 ? q : (localStorage.getItem("theme") || keys[0]);
  if (keys.indexOf(themeKey) < 0) themeKey = keys[0];

  function applyTheme() {
    var t = window.THEMES[themeKey], s = document.documentElement.style;
    ["bg", "fg", "surface", "muted", "border", "primary"].forEach(function (k) { s.setProperty("--" + k, t[k]); });
    paths.forEach(function (p, i) { p.setAttribute("fill", t.slices[i % t.slices.length]); });
    items.forEach(function (li, i) { li.firstChild.style.background = t.slices[i % t.slices.length]; });
    $("tt").textContent = "Theme: " + t.name;
    try { localStorage.setItem("theme", themeKey); } catch (e) {}
  }

  function pt(r, deg) { var a = deg * Math.PI / 180; return (CX + r * Math.cos(a)) + " " + (CY + r * Math.sin(a)); }
  function arc(a0, a1) {
    var big = a1 - a0 > 180 ? 1 : 0;
    return "M" + pt(R_OUT, a0) + "A" + R_OUT + " " + R_OUT + " 0 " + big + " 1 " + pt(R_OUT, a1) +
           "L" + pt(R_IN, a1) + "A" + R_IN + " " + R_IN + " 0 " + big + " 0 " + pt(R_IN, a0) + "Z";
  }
  function fmt(v) { return v.toLocaleString() + " " + data.unit; }

  function focus(i) {
    cur = i;
    paths.forEach(function (p, j) { p.style.opacity = i < 0 || i === j ? 1 : 0.3; });
    items.forEach(function (li, j) { li.className = i === j ? "on" : ""; });
    var c = data.components[i];
    $("cv").textContent = fmt(i < 0 ? data.total : c.value);
    $("cl").textContent = i < 0 ? "Total (est.)" : c.label + " \u00b7 " + (c.value / data.total * 100).toFixed(1) + "%";
  }

  function build() {
    var svg = $("pie"), ul = $("legend");
    data.components.forEach(function (c, i) {
      var p = document.createElementNS(NS, "path"); svg.appendChild(p); paths.push(p);
      var li = document.createElement("li");
      li.innerHTML = '<span class="sw"></span><span></span><span class="n"></span><span class="p"></span>';
      li.children[1].textContent = c.label;
      li.children[2].textContent = fmt(c.value);
      li.children[3].textContent = (c.value / data.total * 100).toFixed(1) + "%";
      var toggle = function () { focus(cur === i ? -1 : i); };
      li.onclick = toggle; p.onclick = toggle;
      ul.appendChild(li); items.push(li);
    });
    $("title").textContent = data.vehicle;
    $("note").textContent = data.source;
    applyTheme(); focus(-1);
    var start = performance.now();
    (function draw(now) {
      var k = Math.min(1, (now - start) / ANIM_MS), sweep = 360 * (1 - Math.pow(1 - k, 3)), a = 0;
      data.components.forEach(function (c, i) {
        var span = c.value / data.total * 360, end = Math.min(a + span, sweep);
        paths[i].setAttribute("d", end > a + GAP_DEG ? arc(a, end - GAP_DEG) : "");
        a += span;
      });
      if (k < 1) requestAnimationFrame(draw);
    })(start);
  }

  $("tt").onclick = function () { themeKey = keys[(keys.indexOf(themeKey) + 1) % keys.length]; applyTheme(); };
  applyTheme();

  fetch("data/weight-breakdown.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
    .then(function (d) {
      d.total = d.components.reduce(function (s, c) { return s + c.value; }, 0);
      data = d; build();
    })
    .catch(function (e) { $("cl").textContent = "Could not load data (" + e.message + ")"; });
})();
