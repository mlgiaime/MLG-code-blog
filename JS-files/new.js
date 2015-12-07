$(function() {

  $('#new-article').submit(function(event) {
    event.preventDefault();
    var input = new Article({
      title: $('#blogTitle').val(),
      category: $('#article-category').val(),
      author: $('#author').val(),
      authorUrl: $('#article-author-url').val(),
      body: marked($('#blogBody').val())
    });
    var inputHTML = input.toHTML();
  });


});
