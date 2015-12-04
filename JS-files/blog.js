var Article = function(property) {
  this.title = property.title;
  this.author = property.author;
  this.authorUrl = property.authorUrl;
  this.category = property.category;
  this.blogBody = property.body;
  // this.publishedOn = property.publishedOn;
  this.daysSince = property.daysSince;
  //this.authorChoice = property.author;
  //this.categoryChoice = property.category;
  // console.log('creating new article');
};

Article.prototype.toHTML = function() {
  $('#template').show();
  var $articleTemplate = $('#template').clone();
  $articleTemplate.removeAttr('id');
  $articleTemplate.find('.title').html(this.title);
  $articleTemplate.find('.author').html('<a href="' + this.authorUrl + '">' + this.author + '</a>');
  $articleTemplate.find('.category').html(this.category);
  $articleTemplate.find('.blogBody').html(this.blogBody);
  // $articleTemplate.find('.publishedOn').html(this.publishedOn);
  $articleTemplate.find('.daysSince').html('Published ' + this.daysSince + ' days ago');
  $('main').append($articleTemplate);
  $('#template').hide();
  this.filterDatatoHTML();
  // var $choiceTemplate1 = $('#categoryTemplate').clone();
  // var $choiceTemplate2 = $('#authorTemplate').clone();
  // $choiceTemplate1.attr(this.categoryChoice);
  // $choiceTemplate2.attr(this.authorChoice);
  // $choiceTemplate1.attr('id','clone');
  // $choiceTemplate2.attr('id','clone');
  // console.log('template1=' + $choiceTemplate1);
  // console.log('template2=' + $choiceTemplate2);
  // $('select').append($choiceTemplate1);
  // $('select').append($choiceTemplate2);
  // console.log('Adding an article to the page');

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
    // console.log('between new article and .tohtml');
    article1.toHTML();
    delete article1;
  };
  // console.log('calling renderPage');
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



  // console.log('calling filterData');
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
  // console.log('doing filterDatatoHTML');
};

var getData = function() {
  return blog.rawData;
};

// var checkForDuplicateAuthors = function(authorNameArray,authorName) {
//   var found = false;
//   for(var i = 0; i < authorNameArray.length; i++) {
//     if (authorNameArray[i] == authorName){
//       found = true;
//       break;
//     }
//   }
//   return found;
// };
//
// var getAuthorNames = function(data) {
//   var authorNameArray = [];
//   for (i=0;i<data.rawData.length;i++) {
//     if(checkForDuplicateAuthors(data.rawData[i].author) === false) {
//       authorNameArray.push(data.rawData[i].author);
//     }
//   }
//   return authorNameArray;
// };


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

// blog.truncateArticles = function() {
//   $('Article.blogPost p:not(:first-child)').hide();
//   $('main').on('click', '.read-on', function(event) {
//     event.preventDefault();
//     $('main').parent().find('p:not(:first-child)').show();
//     console.log('this happened');
//   });
// };
// $(function() {
//   blog.truncateArticles();
//   $('.blogBody').hide();
//   $('select[id="categoryOption"]').change(function() {
//     $('.author').find('option:first').attr('selected', 'selected');
//     $('main').find('article').show();
//     if ($(this).val() !== 'none') {
//       $('.categorySelection:not(:contains(' + $(this).val() + '))').parent().hide();
//     }
//   });
// });

var clearBlogPosts = function(){
  var existingPosts = $('.blogPost');
  for (i=0;i<existingPosts.length;i++){
    if ($(existingPosts[i]).attr('id') !=='template'){
      $(existingPosts[i]).remove();
    }
  }
};

renderPage();

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
