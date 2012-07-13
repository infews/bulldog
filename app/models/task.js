(function ($) {
  bulldog.models.Task = Backbone.Model.extend({

    isNextAction: function() {
      return this.get('priority') == 'N';
    }

  });
}(jQuery));