// As a site owner, I want to see total number of articles, authors, and words on the site, so that I can see blog health at a glance.
// As a site owner, I want to know average word length across all posts, so that I know how erudite the writing is.
// As a site owner, I want to know the average length (in words) of all articles by each individual author, so that I can assign appropriate bonuses.
//
// Continue to make good use of SMACSS principles.
// Do not use the for keyword! Use the functional programming methods.
// Use named functions, attached to an object, rather than number anonymous callbacks.
// Ensure you find a use for map, reduce, forEach, and optionally filter.
//
// "title":
// "category":
// "author":
// "authorUrl":
// "publishedOn":
// "body":
// $( "p" )
//   .append( $( "input" ).map(function() {
//     return $( this ).val();
//   })
//   .get()
//   .join( ", " ) );
var dynamicData;
var getData = function() {
  // $.get('JS-files/blogData.json',
  //   function(data) {
  //     dynamicData.push(JSON.parse(data));
  //   });
  dynamicData.blogData = JSON.parse('JS-files/blogData.json');
  console.log(dynamicData.blogData);
};

getData();

console.log('we have this many articles on the blog:' + dynamicData.blogData.length());
//$()
