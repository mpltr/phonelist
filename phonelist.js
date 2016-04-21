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
    addHighlight('rowHeader', 'rowHeaderHighlighted', gbc('rowHeader')[0]);
    monitorHighlightedTab();
    monitorUnhighlightedTab();
}
gbi('searchBox').addEventListener("input", function(){
    clearTable('table');
    searchResults = [];
    searchArrayObjects('searchBox', addressBook, searchResults);
    fillTableWithArray(searchResults, 'table');
});
function monitorUnhighlightedTab(){
    var unhighlightLength = gbc('rowHeader').length;
    for (var i = 0; i < unhighlightLength; i++){
        gbc('rowHeader')[i].addEventListener("click", function(){
            addHighlight('rowHeader', 'rowHeaderHighlighted', this);
            var highlightedKey = gbc('rowHeaderHighlighted')[0].id;
            sortBy(highlightedKey);
            clearTable('table');
            fillTableWithArray(searchResults, 'table');
            monitorHighlightedTab();
        })
    }
}
function monitorHighlightedTab(){
    gbc('rowHeaderHighlighted')[0].addEventListener("click", function(){
        searchResults.reverse();
        clearTable('table');
        fillTableWithArray(searchResults, 'table');
    })
}
function sortBy(key) {        
    searchResults.sort(function(a,b){
        var alc = a[key].toLowerCase(), 
        blc = b[key].toLowerCase();
        return alc > blc ? 1 : alc < blc ? -1 : 0;
    });  
}

