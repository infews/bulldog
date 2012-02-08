(function($) {
  bulldog.TaskAgent = function(view, task) {
    var self = this;

    self.getTaskLocals = function() {
      return {
        action: decorateLinks(task.get('action')),
        number: task.get('number'),
        context: task.get('context'),
        projectName: task.get('projectName'),
        priority: task.get('priority')
      };
    };

    return self;

    function decorateLinks(text) {
      var urlRe = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:(?:[^\s()<>.]+[.]?)+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?Â«Â»â��â��â��â��]))/gi;

      var matchData = text.match(urlRe);
      if (!matchData) {
        return text;
      }

      var tag = _.template('<a target="_blank" href="<%=url%>">[link<%=count%>]</a>');

      for(var i=0; i < matchData.length; i++) {
        var count = matchData.length == 1 ? '' : ' ' + (i + 1);
        text = text.replace(matchData[i], tag({url: matchData[i], count: count}));
      }

      return text;
    }
  }
}(jQuery));