function buildTaskFixtures() {
  return [
    new bulldog.models.Task({action: "foo", projectName: 'Zip', context: 'pc', priority: 'C'}),
    new bulldog.models.Task({action: "bar", projectName: '__none', context: '__none'}),
    new bulldog.models.Task({action: "baz", projectName: 'Buzz', context: 'pc', priority: 'N'}),
    new bulldog.models.Task({action: "quux", projectName: 'Zip', context: 'home', priority: 'N'}),
    new bulldog.models.Task({action: "corge", projectName: 'Zip', context: '__none', priority: 'N'})
  ];
}