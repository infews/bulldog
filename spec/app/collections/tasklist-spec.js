describe("bulldog.TaskList", function () {
  var collection, otherCollection;

  beforeEach(function () {
    var models = [
      new Backbone.Model({action: "foo"}),
      new Backbone.Model({action: "bar"})
    ];
    collection = new bulldog.TaskList(models);
    models[0].save();
    models[1].save();
    otherCollection = new bulldog.TaskList();
  });

  describe("#fetch", function () {
    beforeEach(function () {
      otherCollection.fetch();
    });

    it("should retrieve the previously saved models", function () {
      expect(otherCollection.length).toEqual(2);
      expect(otherCollection.models[0].get('action')).toEqual('foo');
      expect(otherCollection.models[1].get('action')).toEqual('bar');
    });
  });
});