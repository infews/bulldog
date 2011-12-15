describe("TaskList", function () {
  var collection, otherCollection;

  beforeEach(function () {
    var models = [
      new Backbone.Model({description: "foo"}),
      new Backbone.Model({description: "bar"})
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
      expect(otherCollection.models[0].get('description')).toEqual('foo');
      expect(otherCollection.models[1].get('description')).toEqual('bar');
    });
  });
});