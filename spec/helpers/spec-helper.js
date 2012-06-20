beforeEach(function () {
  localStorage.clear();
  clearAjaxRequests();
  jasmine.Ajax.useMock();

  $content = $("#jasmine_content");
  $content.empty();
  $content.append($(appBody));
});