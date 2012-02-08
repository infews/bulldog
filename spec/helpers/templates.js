(function(){
window.JST = window.JST || {};

window.JST['list'] = Mustache.template('{{#list}}\n<li class="{{className}}"><a href="{{url}}">{{name}}</a></li>\n{{/list}}\n');
window.JST['tabs'] = Mustache.template('{{#tabs}}\n<li class="{{className}}"><a href="{{link}}">{{text}}</a></li>\n{{/tabs}}\n');
window.JST['task'] = Mustache.template('<div class="data">\n  <div class="action">{{{action}}}</div>\n  <div class="footer">\n    {{#projectName}}\n    <h6 class="project">+{{projectName}}</h6>\n    {{/projectName}}\n    {{#context}}\n    <h6 class="context">@{{context}}</h6>\n    {{/context}}\n  </div>\n</div>\n<div class="meta">\n  <div class="number">\n    <a class="btn btn-info disabled">{{number}}</a>\n  </div>\n  {{#priority}}\n  <div class="priority">\n    <a class="btn btn-success disabled">{{priority}}</a>\n  </div>\n  {{/priority}}\n</div>');
})();