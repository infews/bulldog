Mustache.template = function(templateString) {
  return function() {
    return Mustache.to_html(templateString, arguments[0], arguments[1]);
  };
};
