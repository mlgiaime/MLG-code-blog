var init = function() {
  renderPage(getTemplate(),prepData());
};

var prepData = function() {
  var data = getData();
  data = stringToDate(data);
  data = calculateDaysSince(data);
  data = sortByDate(data);
  var authorDrop = $('#authorDrop').val();
  data = filterData(data, authorDrop);
  return data;
};

var renderPage = function(template,data){
  var clones = makeClones(template, data);
  deployClones(clones);
};

var filterData = function(blogData,chosenAuthor) {
  //var chosenAuthor = authorDrop.options[authorDrop.selectedIndex].text;
  var filterArray = [];
  if (chosenAuthor == 'nothing') {
    filterArray = blogData;
  } else {
    filterArray = blogData.filter(function(post) {
      return post.author === chosenAuthor;
    });
  }
  return filterArray;
};
var getData = function() {
  return blog.rawData;
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
/*
var buildAuthorNameList(data){
var listOfAuthors = [];
for (var i = 0; i < author.length; i++) {

}
}*/

init();

$('select').change(function() {
  renderPage(getTemplate(),prepData());
});
