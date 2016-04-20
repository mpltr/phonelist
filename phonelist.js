var addressBook = new Array();
var searchResults = new Array();

function loadContacts(){
    var request = new HttpRequest("contacts.txt", handleData);
    request.send();
}
loadContacts();
function handleData(text) {
    var retrievedData = JSON.parse(text);
    addressBook = retrievedData;
    searchArrayObjects('searchBox', addressBook, searchResults);
    sortObjectArray(searchResults, 'FirstName');
    fillTableWithArray(searchResults, 'table');
}

gbi('searchBox').addEventListener("input", function(){
    clearTable('table');
    searchResults = [];
    searchArrayObjects('searchBox', addressBook, searchResults);
    fillTableWithArray(searchResults, 'table');
});

classHighlight('rowHeader', 'rowHeaderHighlighted');




    
    
//    for (var i=0; i < arrayLength; i++){
//        var searchMatch = 0;
//        for (var j = 0; j < numOfSearches; j++){
//             if (searchMatch === numOfSearches){
//                    resultsArray.push(arrayName[i]);
//                    break;
//                }
//            }
//        } 
//                
//    }
//} // Posts results to second array
  
//// Sort by String
//function sortBy(key) {
//    if (key == "internal"){
//        addressBook.sort(function(a,b){
//            alc = a[key];
//            blc = b[key];            
//            return alc > blc ? 1 : alc < blc ? -1 : 0;
//        });
//    } else {        
//        addressBook.sort(function(a,b){
//            var alc = a[key].toLowerCase(), 
//            blc = b[key].toLowerCase();
//            return alc > blc ? 1 : alc < blc ? -1 : 0;
//        });  
//    }
//}
//
//// Sort by Column header Ascending/Descending
//function ascendDescend (columnHeader) {
//    if (sortedBy != columnHeader){
//    sortBy(columnHeader);
//    sortedBy = columnHeader;
//    } else {
//        addressBook.reverse();
//        populate();
//    }  
//}
//
//// Highlight
//function highlight(header) {
//    for (var i=0; i<5; i++) {
//    document.getElementById("topRow").getElementsByTagName('td')[i].setAttribute('class', "");
//    }
//    header.setAttribute('class', "highlighted");    
//}
//
//// Sort by ...
//var sortedBy = "";
//gbi("firstNameHead").addEventListener("click", function(){
//    ascendDescend("FirstName");
//    highlight(this);
//});
//gbi("secondNameHead").addEventListener("click", function(){
//    ascendDescend("SecondName");
//    highlight(this);
//});
//gbi("internalHead").addEventListener("click", function(){
//    ascendDescend("internal");
//    highlight(this);
//});
//gbi("externalHead").addEventListener("click", function(){
//    ascendDescend("external");
//    highlight(this);
//});
//gbi("office").addEventListener("click", function(){
//    ascendDescend("office");
//    highlight(this);
//});
//
//// Search
//function searchContacts(){
//    var searchBoxValue = gbi("searchBox").value.toLowerCase();
//    var searchFor = new RegExp(searchBoxValue);
//    
//    for (var i=0; i<addressBook.length; i++){
//        var match = false;
//        for(var key in addressBook[i]){
//            if(key !== "hidden"){
//                var trial = addressBook[i][key].toLowerCase();
//                var trialResult =  searchFor.test(trial);
//                if(trialResult == true){
//                    match = true;
//                }
//
//            }
//            if(match == false){
//                addressBook[i]["hidden"] = true;
//            } else {
//                addressBook[i]["hidden"] = false;
//            }
//        }
//    }
//    populate();
//}
//
//gbi('searchBox').addEventListener("input", searchContacts);
//
// Load











