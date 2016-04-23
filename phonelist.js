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
    monitorTopRow('table', onClicking);
	gbi('loading').style.display = "none";
}
gbi('searchBox').addEventListener("input", function(){
    clearTable('table');
    searchResults = [];
    searchArrayObjects('searchBox', addressBook, searchResults);
    fillTableWithArray(searchResults, 'table');
});
function onClicking(thisTab){
    var currentClass = thisTab.className;
    if (currentClass === 'rowHeader') {
        addHighlight('rowHeader', 'rowHeaderHighlighted', thisTab);
        var highlightedKey = gbc('rowHeaderHighlighted')[0].id;
        sortObjectArray(searchResults, highlightedKey);
        clearTable('table');
        fillTableWithArray(searchResults, 'table');
    } else if (currentClass === 'rowHeaderHighlighted'){
        searchResults.reverse();
        clearTable('table');
        fillTableWithArray(searchResults, 'table');
    } else {
        alert('error');
    }
} //function for monitorTopRow
function scrollFunction() {
	if(document.body.scrollTop == 0) {
		gbi('scrollUp').style.display = "none";
	} else {
		gbi('scrollUp').style.display = "block";
	}
}
window.onscroll = scrollFunction;
gbi('scrollUp').addEventListener("click", function(){
//	document.body.scrollTop = document.documentElement.scrollTop = 0;
	scrollToTop(500);
})
function scrollToTop(scrollDuration) {
	var scrollStep = -window.scrollY / (scrollDuration / 15),
		scrollInterval = setInterval(function(){
			if ( window.scrollY != 0 ) {
				window.scrollBy( 0, scrollStep );
			}
			else clearInterval(scrollInterval); 
		},15);
}
