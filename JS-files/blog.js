
var Article = function(property) {
  this.title = property.title;
  this.author = property.author;
  this.authorUrl = property.authorUrl;
  this.category = property.category;
  this.blogBody = property.body;
  this.publishedOn = property.publishedOn;
};

Article.prototype.toHTML = function() {
  $('#template').show();
  var $articleTemplate = $('#template').clone();
  $articleTemplate.find('.title').html(this.title);
  $articleTemplate.find('.author').html('<a href="' + this.authorUrl + '">' + this.author + '</a>');
  $articleTemplate.find('.category').html(this.category);
  $articleTemplate.find('.blogBody').html(this.blogBody);
  $articleTemplate.find('.publishedOn').html(this.publishedOn);
  $('main').append($articleTemplate);
  $('#template').hide();
};

var prepData = function() {
  var data = getData();
  data = stringToDate(data);
  data = calculateDaysSince(data);
  data = sortByDate(data);
  var authorChoice = $('#authorChoice').val();
  var categoryChoice = $('#categoryChoice').val();
  data = filterData(data, authorChoice, categoryChoice);
  return data;
};

var renderPage = function() {
  var filteredData = blog.rawData;
  var chosenAuthor = 'Select an Author';
  filteredData = filterData(filteredData,chosenAuthor);

  for (i=0;i<filteredData.length;i++) {
    var article1 = new Article(filteredData[i]);
    article1.toHTML();
    console.log(article1);
  }
};

var filterData = function(blogData,chosenAuthor) {
  var filterArray = [];
  if (chosenAuthor == 'Select an Author') {
    filterArray = blogData;
  } else {
    filterArray = blogData.filter(function(post) {
      return post.author === chosenAuthor;
    });
  }
  return filterArray;
};


var filterDatatoHTML = function() {
  var $categoryChoice = $('.categorySelection').clone();
  $categoryChoice.removeAttr('class');
  $categoryChoice.attr('value', this.category);
  $categoryChoice.text(this.category);
  if ($('#categoryOption').find('option[value="' + this.category + '"]').length === 0) {
    $('#categoryOption').append($categoryChoice);
  }
  var $authorChoice = $('.authorSelection').clone();
  $authorChoice.removeAttr('class');
  $authorChoice.attr('value', this.author);
  $authorChoice.text(this.author);
  if ($('#authorOption').find('option[value="' + this.author + '"]').length === 0) {
    $('#authorOption').append($authorChoice);
  }
};

var getData = function() {
  return blog.rawData;
};

var checkForDuplicateAuthors = function(authorNameArray,authorName){
  var found = false;
  for(var i = 0; i < authorNameArray.length; i++) {
    if (authorNameArray[i] == authorName){
      found = true;
      break;
    }
  }
  return found;
};

var getAuthorNames = function(data) {
  var authorNameArray = [];
  for (i=0;i<data.rawData.length;i++){
    if(checkForDuplicateAuthors(data.rawData[i].author) === false){
      authorNameArray.push(data.rawData[i].author);
    }
    console.log(authorNameArray);
  }
  return authorNameArray;
  console.log(authorNameArray);
};

var stringToDate = function(data) {
  var data = data.map(function(dataItem) {
    dataItem.publishedOn = new Date(dataItem.publishedOn);
    return dataItem;
  });
  return data;
};
var calculateDaysSince = function(data) {
  var data = data.map(function(dataItem) {
    var today = new Date();
    dataItem.daysSince = today - dataItem.publishedOn;
    dataItem.daysSince = dataItem.daysSince / (1000 * 60 * 60 * 24);
    dataItem.daysSince = Math.floor(dataItem.daysSince);
    return dataItem;
  });
  return data;
};
var sortByDate = function(data) {
  var data = data.sort(function(a, b) {
    if (a.publishedOn < b.publishedOn)
      return 1;
    if (a.publishedOn > b.publishedOn)
      return -1;
    return 0;
  });
  return data;
};
/*
var getTemplate = function() {
  return $('.blogPost').detach();
};
var makeClones = function(template, data) {
  var clones = data.map(function(dataItem) {
    var clone = template.clone();
    clone.find('.blogTitle').text(dataItem.title);
    clone.find('.category').text(dataItem.category);
    clone.find('.author').attr('href', dataItem.authorUrl).text(dataItem.author);
    clone.find('.publishDate').text('Published ' + dataItem.daysSince + ' days ago');
    clone.find('.blogBody').append(dataItem.body);
    return clone;
  });
  return clones;
};
var deployClones = function(clones) {
  $('main').append(clones);
};
*/


// blog.truncateArticles = function() {
//   $('article .blogBody p:not(:first-child)').hide();
//   $('main').on('click', '.read-on', function(event) {
//     event.preventDefault();
//     $(this).parent().find('p:not(:first-child)').show();
//   });
// };
// $(function() {
//   blog.renderPage();
//   $('#post').remove();
//   blog.truncateArticles();
//   $('select[id="category"]').change(function() {
//     $('#author').find('option:first').attr('selected', 'selected');
//     $('main').find('article').show();
//     if ($(this).val() !== 'none') {
//       $('.postCategory:not(:contains(' + $(this).val() + '))').parent().hide();
//     }
//   });
// });
// var buildAuthorNameList(data){
//   var listOfAuthors = [];
//   for (var i = 0; i < author.length; i++) {

renderPage();

//eventlistener for responding to a change in category selection
//re-renders page with selected categories ONLY.
$('.authorChoice').change(function() {
  renderPage();
});
