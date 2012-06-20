(function(){
window.JST = window.JST || {};

window.JST['list'] = Mustache.template('<ul>\n  {{#list}}\n  <li class="{{className}}"><a href="{{url}}">{{name}}</a></li>\n  {{/list}}\n</ul>\n');
window.JST['tabs'] = Mustache.template('{{#tabs}}\n<li class="{{className}}"><a href="{{link}}">{{text}}</a></li>\n{{/tabs}}\n');
window.JST['task'] = Mustache.template('<div class="data">\n  <div class="action">{{{action}}}</div>\n  <div class="footer">\n    {{#nextAction}}\n    <span class="label label-success">next action</span>\n    {{/nextAction}}\n    {{#projectName}}\n    <span class="project">+{{projectName}}</span>\n    {{/projectName}}\n    {{#context}}\n    <span class="context">@{{context}}</span>\n    {{/context}}\n  </div>\n</div>\n<div class="meta">\n  <div class="number">\n    <a class="btn btn-info disabled">{{number}}</a>\n  </div>\n  {{#priority}}\n  <div class="priority">\n    <a class="btn btn-success disabled">{{priority}}</a>\n  </div>\n  {{/priority}}\n</div>');
})();