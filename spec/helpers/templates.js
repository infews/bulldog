(function(){
window.JST = window.JST || {};

window.JST['projects'] = Mustache.template('<ul>\n{{#projects}}\n  <li class="project">{{.}}</li>\n{{/projects}}\n</ul>');
window.JST['task'] = Mustache.template('<div class="data">\n  <div>\n    <span class="number">{{number}}</span>\n  </div>\n  {{#context}}\n  <div class="context">{{context}}</div>\n  {{/context}}\n</div>\n<div class="spacer">\n</div>\n<div class="right">\n  <div class="action">{{{action}}}</div>\n  {{#project}}\n  <div class="project">\n    <span>{{project}}</span>\n  </div>\n  {{/project}}\n</div>\n');
})();