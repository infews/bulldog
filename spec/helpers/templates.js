(function(){
window.JST = window.JST || {};

window.JST['projects'] = Mustache.template('<div class="heading">All Projects</div>\n{{#projects}}\n<div class="{{className}}">{{name}}</div>\n{{/projects}}\n');
window.JST['task'] = Mustache.template('<div class="data">\n  <div>\n    <span class="number">{{number}}</span>\n  </div>\n  {{#context}}\n  <div class="context">{{context}}</div>\n  {{/context}}\n</div>\n<div class="spacer">\n</div>\n<div class="right">\n  <div class="action">{{{action}}}</div>\n  {{#projectName}}\n  <div class="project">\n    <span>{{projectName}}</span>\n  </div>\n  {{/projectName}}\n</div>\n');
})();