function buildTaskFixtures() {
  return [
    new bulldog.Task({action: "foo", projectName: 'Zip', context: 'pc', priority: 'C'}),
    new bulldog.Task({action: "bar", projectName: '__none', context: '__none'}),
    new bulldog.Task({action: "baz", projectName: 'Buzz', context: 'pc', priority: 'N'}),
    new bulldog.Task({action: "quux", projectName: 'Zip', context: 'home', priority: 'N'}),
    new bulldog.Task({action: "corge", projectName: 'Zip', context: '__none', priority: 'N'})
  ];
}