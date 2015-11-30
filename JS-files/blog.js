var blog = {};
blog.articles = [];

var Article = function(props) {
  this.title = props.title;
  this.category = props.category;
  this.author = props.author;
  this.authorURL = props.authorURL;
  this.publishedOn = props.publishedOn;
  this.body = props.body;
};

Article.prototype.toHTML = function (argument) {
  return '<article>' +
    '<h2>' + this.title + '</h2>' +
    '</article>';
  // body...
};
