(function(){
window.JST = window.JST || {};

window.JST['list'] = Mustache.template('{{#list}}\n<div class="{{className}}">\n  <a href="{{url}}">{{name}}<a/>\n</div>\n{{/list}}\n');
window.JST['tabs'] = Mustache.template('{{#tabs}}\n<div class="{{className}}">{{text}}</div>\n{{/tabs}}');
window.JST['task'] = Mustache.template('<div class="data">\n  <div>\n    <span class="number">{{number}}</span>\n  </div>\n  {{#context}}\n  <div class="context">{{context}}</div>\n  {{/context}}\n</div>\n<div class="spacer">\n</div>\n<div class="right">\n  <div class="action">{{{action}}}</div>\n  {{#projectName}}\n  <div class="project">\n    <span>{{projectName}}</span>\n  </div>\n  {{/projectName}}\n</div>\n');
})();