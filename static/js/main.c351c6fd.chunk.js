(this.webpackJsonppokedex=this.webpackJsonppokedex||[]).push([[0],{24:function(e,t,a){},25:function(e,t,a){},45:function(e,t,a){"use strict";a.r(t);var c=a(2),n=a(19),s=a.n(n),o=(a(24),a(4)),r=a(8),i=(a(25),a(10)),l=a.n(i),d=a(0);var j=function(){var e=Object(c.useState)([]),t=Object(r.a)(e,2),a=t[0],n=t[1],s=Object(c.useState)([]),i=Object(r.a)(s,2),j=i[0],b=i[1],m=Object(c.useState)(0),h=Object(r.a)(m,2),u=h[0],p=h[1];return Object(c.useEffect)((function(){a.sort((function(e,t){return e.id-t.id}));var e=Object(o.a)(a);b(Object(o.a)(e))}),[a]),Object(c.useEffect)((function(){l.a.get("https://pokeapi.co/api/v2/pokemon?limit=386").then((function(e){var t=e.data.results;console.log(t),t.forEach((function(e,t){var a;a=e.url,l.a.get(a).then((function(e){n((function(t){return[].concat(Object(o.a)(t),[e.data])}))}))}))}))}),[]),Object(d.jsxs)("div",{className:"app",children:[Object(d.jsx)("h1",{children:"Pok\xe9dex"}),Object(d.jsxs)("div",{className:"pokedex-container",children:[Object(d.jsxs)("div",{className:"all-pokemon-container",children:[Object(d.jsxs)("div",{className:"search-container",children:[Object(d.jsx)("input",{type:"text",name:"searchBar",onChange:function(e){var t,c=e.target.value;t=a.filter((function(e){return""===c||isNaN(c)?e.forms[0].name.includes(c.toLowerCase()):e.id==c})),b(Object(o.a)(t)),console.log(a),console.log(e.target.value.toLowerCase())},id:"search-bar",placeholder:"Search Pok\xe9mon by name or number"}),Object(d.jsx)("button",{className:"search-button",children:Object(d.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-search",viewBox:"0 0 16 16",children:Object(d.jsx)("path",{d:"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"})})})]}),Object(d.jsx)("div",{className:"card-container",children:(console.log(a),j.map((function(e){var t="url(".concat(e.sprites.versions["generation-v"]["black-white"].animated.front_default,")");return Object(d.jsxs)("div",{className:"pokemon-card",onClick:function(){return p(e.id-1)},children:[Object(d.jsx)("div",{className:"pokemon-img",style:{backgroundImage:t}}),Object(d.jsx)("p",{className:"pokemon-id",children:e.id<100?e.id<10?"#00".concat(e.id):"#0".concat(e.id):"#".concat(e.id)}),Object(d.jsx)("h3",{className:"pokemon-name",children:e.forms[0].name}),Object(d.jsx)("p",{className:"pokemon-type",children:e.types.map((function(e){return Object(d.jsx)("span",{children:e.type.name})}))})]})})))})]}),a[u]&&function(){var e=a[u],t=e.sprites.other["official-artwork"].front_default;return Object(d.jsxs)("div",{className:"selected-pokemon-container",children:[Object(d.jsx)("img",{className:"pokemon-img-artwork",src:t,alt:""}),Object(d.jsx)("p",{className:"pokemon-id",children:e.id<100?e.id<10?"#00".concat(e.id):"#0".concat(e.id):"#".concat(e.id)}),Object(d.jsx)("h2",{className:"pokemon-name",children:e.forms[0].name}),Object(d.jsx)("p",{className:"pokemon-type",children:e.types.map((function(e){return Object(d.jsx)("span",{children:e.type.name})}))}),Object(d.jsx)("table",{className:"pokemon-stats-container",children:function(){var t=[],a=0;return(t=e.stats.map((function(e,t){var c=e.base_stat/255*100;return a+=e.base_stat,Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{className:"stat-name",children:["HP","Attack","Defense","Sp. Atk","Sp. Def","Speed"][t]}),Object(d.jsx)("td",{className:"stat-val",children:e.base_stat}),Object(d.jsx)("td",{children:Object(d.jsx)("div",{className:"stat-bar ".concat(e.base_stat>149?"ultimate-high":e.base_stat>124?"very-high":e.base_stat>99?"high":""),style:{width:"".concat(c,"%")}})})]})}))).push(Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{className:"stat-name",children:"Total"}),Object(d.jsx)("td",{className:"stat-val total",children:a}),Object(d.jsx)("td",{})]})),t}()})]})}()]})]})},b=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,46)).then((function(t){var a=t.getCLS,c=t.getFID,n=t.getFCP,s=t.getLCP,o=t.getTTFB;a(e),c(e),n(e),s(e),o(e)}))};s.a.render(Object(d.jsx)(j,{}),document.getElementById("root")),b()}},[[45,1,2]]]);
//# sourceMappingURL=main.c351c6fd.chunk.js.map