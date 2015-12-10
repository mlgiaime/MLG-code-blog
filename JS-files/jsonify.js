var myLocalStorage = {};

myLocalStorage.prototype.get = function(input) {
  //return JSON.parse( /* some code that asks localstorage for "input"*/ );
};

myLocalStorage.prototype.set = function(input) {
  // some code that puts "input" into local storage
};
work items:
1. implement local storage get & set functions
2. change blogarticles to be a .json file (and make it valid)
3. make a new json file, version-number.json, with one piece of data called version-number, = 0
4. start changing the getData function - now it uses localstorage to load blogData.json
5. test 1-4 by opening the page regularly, and make suure it looks (about) like it did yesterday.
6. implement "check the version number" inside the getData function; remember that it compares the Number
  in JSON to the number in localstorage. if it doesnt find one in localstorage, thats actually fine
  it just means we havent loaded the page ever.
  What were checking is "number in localstorage !== number in file"
6a. part of 6 is using ajax to get the version number. that probably looks sort of like this

var versionNumFromJSON;
$.ajax('/version-number.json', {
   success: function(receivedData) {
     versionNumFromJSON = JSON.parse(receivedData);
   }
 }

 7. we now have code to know if we need to reload all the blog posts. Next step is to write code to do that.
 7a. if we need to rebuild the blog posts, use ajax to get the data from 'blogData.json', and then save that data in localstorage
 7b. if we rebuild the blog posts, make sure to set the 'version-number' in localstorage to be equal to the one from version-number.json
8. by now we should be good, test work by making changes to blogarticles.json and version-number.json,
  and use console logs to see if your code calls the right functions
