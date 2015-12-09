$(function() {
  $('#new-article').submit(function(event) {
    event.preventDefault();
    var input = new Article({
      title: $('#blogTitle').val(),
      category: $('#article-category').val(),
      author: $('#author').val(),
      authorUrl: $('#article-author-url').val(),
      daysSince: $('#date').val(),
      body: marked($('#blogBody').val())
    });

    input.toHTML();

    var json = input.toJSON();
    $('#article-json').val(json.replace(/"/g, "\'"));
  });
});
