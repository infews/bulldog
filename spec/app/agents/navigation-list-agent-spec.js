describe("bulldog.NavigationListAgent", function() {
  var agent, view, locals;

  beforeEach(function() {
    var projectCollection = new Backbone.Collection([
      new Backbone.Model({name: 'All'}),
      new Backbone.Model({name: 'ThankYouNotes'}),
      new Backbone.Model({name: ''})
    ]);

    var contextCollection = new Backbone.Collection([
      new Backbone.Model({name: 'home'}),
      new Backbone.Model({name: 'pc'}),
      new Backbone.Model({name: 'calls'}),
      new Backbone.Model({name: ''})
    ]);

    view = { render: jasmine.createSpy('view.render') };
    agent = new bulldog.NavigationListAgent(
      view,
      {
        projects: projectCollection,
        contexts: contextCollection
      }
    );
  });

  describe("on initialize", function() {

    describe("#getLocals", function() {

      beforeEach(function() {
        locals = agent.getLocals();
      });

      it("should have the correct number of list items", function() {
        expect(locals.list.length).toEqual(3);
      });

      it("should have the items of default list", function() {
        var eachIsAProject = _(locals.list).all(function(item) {
          return item.className.match(/project/);
        });
        expect(eachIsAProject).toEqual(true);
      });

      it("should have the default list item selected", function() {
        expect(locals.list[0].className.match(/selected/)).toBeTruthy();
      });
    });
  });

  describe("on item selection", function() {
    beforeEach(function() {
      agent.selectItem('Thank You Notes');
    });

    it("should tell the view to render", function() {
      expect(view.render).toHaveBeenCalled();
    });

    describe("#getLocals", function() {
      beforeEach(function() {
        locals = agent.getLocals();
      });

      it("should have the correct number of list items", function() {
        expect(locals.list.length).toEqual(3);
      });

      it("should have the requested list item selected", function() {
        expect(locals.list[1].className.match(/selected/)).toBeTruthy();
      });
    });
  });

  describe("on selecting a new list", function() {
    beforeEach(function() {
      agent.selectList("contexts");
    });

    it("should tell the view to render", function() {
      expect(view.render).toHaveBeenCalled();
    });

    describe("#getLocals", function() {
      beforeEach(function() {
        locals = agent.getLocals();
      });

      it("should have the correct number of list items", function() {
        expect(locals.list.length).toEqual(4);
      });

      it("should have the items of new list", function() {
        var eachIsContenxt = _(locals.list).all(function(item) {
          return item.className.match(/context/);
        });
        expect(eachIsContenxt).toEqual(true);
      });

      it("should have the default list item selected", function() {
        expect(locals.list[0].className.match(/selected/)).toBeTruthy();
      });
    });

    describe("and then selecting a new item", function() {
      beforeEach(function() {
        agent.selectItem('Calls');
        locals = agent.getLocals();
      });

      it("should have the items of new list", function() {
        var eachIsContenxt = _(locals.list).all(function(item) {
          return item.className.match(/context/);
        });
        expect(eachIsContenxt).toEqual(true);
      });

      it("should have the correct list item selected", function() {
        expect(locals.list[2].className.match(/selected/)).toBeTruthy();
      });
    });
  });

  describe("#getSelection", function() {
    var selection;

    beforeEach(function() {
      selection = agent.getSelection();
    });

    it("should return the current selection", function() {
      expect(selection).toEqual({list: 'projects', name: "All"});
    });

    describe("after a new list item is selected", function() {
      beforeEach(function() {
        agent.selectItem('Thank You Notes');
        selection = agent.getSelection();
      });

      it("should return the current selection", function() {
        expect(selection).toEqual({list: 'projects', name: "ThankYouNotes"});
      });
    });

    describe("after a new list is selected", function() {
      beforeEach(function() {
        agent.selectList("contexts");
        selection = agent.getSelection();
      });

      it("should return the current selection", function() {
        expect(selection).toEqual({list: 'contexts', name: "home"});
      });
    });
  });
});