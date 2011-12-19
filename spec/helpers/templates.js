(function(){
window.JST = window.JST || {};

window.JST['task'] = Mustache.template('<div class="data">\n  <div class="number">{{number}}</div>\n  {{#project}}\n  <div class="project">{{project}}</div>\n  {{/project}}\n  {{#context}}\n  <div class="context">{{context}}</div>\n  {{/context}}\n</div>\n<div class="right">\n  <div class="action">{{action}}</div>\n</div>\n');
})();