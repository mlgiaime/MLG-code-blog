var Article = function(property) {
  this.title = property.title;
  this.author = property.author;
  this.authorUrl = property.authorUrl;
  this.category = property.category;
  this.blogBody = property.body;
  this.daysSince = property.daysSince;

};

Article.prototype.toHTML = function() {
  $('#template').show();
  var $articleTemplate = $('#template').clone();
  $articleTemplate.removeAttr('id');
  $articleTemplate.find('.title').html(this.title);
  $articleTemplate.find('.author').html('<a href="' + this.authorUrl + '">' + this.author + '</a>');
  $articleTemplate.find('.category').html(this.category);
  $articleTemplate.find('.blogBody').html(this.blogBody);
  $articleTemplate.find('.daysSince').html('Published ' + this.daysSince + ' days ago');
  $('main').append($articleTemplate);
  $('#template').hide();
  this.filterDatatoHTML();
};

var prepData = function() {
  var data = getData();
  data = stringToDate(data);
  data = calculateDaysSince(data);
  data = sortByDate(data);
  var authorChoice = $('.authorChoice').val();
  var categoryChoice = $('.categoryChoice').val();
  data = filterData(data, authorChoice, categoryChoice);
  return data;
};

var renderPage = function(firstTime) {
  var filteredData = prepData();
  var chosenAuthor = $('.authorChoice').val();
  var chosenCategory = $('.categoryChoice').val();

  filteredData = filterData(filteredData,chosenAuthor,chosenCategory);
  for (i=0;i<filteredData.length;i++) {
    var article1 = new Article(filteredData[i]);
    article1.toHTML();
    delete article1;
  };

};

var filterData = function(blogData,chosenAuthor,chosenCategory) {
  var filterArray = [];
  if (chosenAuthor == 'Select an Author') {
    filterArray = blogData;
    if (chosenCategory == 'Select a Category') {
      filterArray = blogData;
    } else {
      filterArray = blogData.filter(function(post) {
        return post.category === chosenCategory;
      });
    }
  } else {
    filterArray = blogData.filter(function(post) {
      return post.author === chosenAuthor;
    });
  }

  return filterArray;
};

Article.prototype.filterDatatoHTML = function() {
  var $categoryChoice = $('.categorySelection').clone();
  $categoryChoice.removeAttr('class');
  $categoryChoice.attr('value', this.category);
  $categoryChoice.text(this.category);
  if ($('.categoryChoice').find('option[value="' + this.category + '"]').length === 0) {
    $('.categoryChoice').append($categoryChoice);
  }
  var $authorChoice = $('.authorSelection').clone();
  $authorChoice.removeAttr('class');
  $authorChoice.attr('value', this.author);
  $authorChoice.text(this.author);
  if ($('.authorChoice').find('option[value="' + this.author + '"]').length === 0) {
    $('.authorChoice').append($authorChoice);
  }

};

var getData = function() {
  return blog.rawData;
};

var getCategoryChoice = function(data) {
  var categoryOptions = [];
  for (i=0;i<data.rawData.length;i++) {
    return categoryOptions;
  }
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

var clearBlogPosts = function(){
  var existingPosts = $('.blogPost');
  for (i=0;i<existingPosts.length;i++){
    if ($(existingPosts[i]).attr('id') !=='template'){
      $(existingPosts[i]).remove();
    }
  }
};

hideArticles = function() {
  $('article p:not(:first-child)').hide();
  $('article').on('click', '.read-on', function(event) {
    event.preventDefault();
    $(this).parent().find('p').fadeIn();
    $(this).hide();
  });
};




$('.authorChoice').change(function() {
  var chosenCategory = $('.categoryChoice');
  $(chosenCategory).val('Select a Category');
  clearBlogPosts();
  renderPage();
});

$('.categoryChoice').change(function() {
  var chosenAuthor = $('.authorChoice');
  $(chosenAuthor).val('Select an Author');
  clearBlogPosts();
  renderPage();
});
renderPage();
hideArticles();

$('#aboutTab').click(function(event) {
  event.preventDefault();
  $('.tab1').hide();
  $('.tab2').show();
});

$('#homeTab').click(function(event) {
  event.preventDefault();
  $('.tab2').hide();
  $('.tab1').show();
});
