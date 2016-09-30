var addressBook = new Array();
var searchResults = new Array();
displaySearchBox();
displayTable();
var time = new Date().getTime();
function loadContacts(){    var request = new HttpRequest("contacts.txt?t=" + time, handleData);
    request.send();
}
loadContacts();
function handleData(text) {
    var retrievedData = JSON.parse(text);
    addressBook = retrievedData;
    searchArrayObjects('searchBox', addressBook, searchResults);
    sortObjectArray(searchResults, 'FirstName', 'SecondName');
    fillTableWithArray(searchResults, 'table');
    addHighlight('rowHeader', 'rowHeaderHighlighted', gbc('rowHeader')[0]);
    monitorTopRow('table', onClicking);
	gbi('loading').style.display = "none";
}
gbi('searchBox').addEventListener("input", function(){
    clearTable('table');
    searchResults = [];
    searchArrayObjects('searchBox', addressBook, searchResults);
    var highlightedKey = gbc('rowHeaderHighlighted')[0].id;
        if(highlightedKey == "SecondName"){
            sortObjectArray(searchResults, highlightedKey, "FirstName");
        } else {
            sortObjectArray(searchResults, highlightedKey, "SecondName");
        }
    fillTableWithArray(searchResults, 'table');
});
function onClicking(thisTab){
    var currentClass = thisTab.className;
    if (currentClass === 'rowHeader') {
        addHighlight('rowHeader', 'rowHeaderHighlighted', thisTab);
        var highlightedKey = gbc('rowHeaderHighlighted')[0].id;
        if(highlightedKey == "SecondName"){
            sortObjectArray(searchResults, highlightedKey, "FirstName");
        } else {
            sortObjectArray(searchResults, highlightedKey, "SecondName");
        }
       
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
	if(document.documentElement.scrollTop == 0) {
		gbi('scrollUp').style.display = "none";
	} else {
		gbi('scrollUp').style.display = "block";
	}
}
function scrollToTop(scrollDuration) {
    var vertical;
    if(-window.scrollY){
	    vertical = -window.scrollY;
    } else {
        vertical = -window.pageYOffset;
    }
    var scrollStep = vertical / (scrollDuration / 15); 
	var	scrollInterval = setInterval(function(){
        if(-window.scrollY){
            var vertCheck = window.scrollY;
        } else {
            var vertCheck = window.pageYOffset;
        }
			if ( vertCheck != 0 ) {
				window.scrollBy( 0, scrollStep );
			}
			else clearInterval(scrollInterval); 
		},15);
}

window.onscroll = function() {scrollFunction();};
gbi('scrollUp').addEventListener("click", function(){
//	document.body.scrollTop = document.documentElement.scrollTop = 0;
	scrollToTop(500);
})

function displayTable(){
    gbi('table').innerHTML = '<tr id="topRow" class="tableHeader"><td id="FirstName" class="rowHeader">First Name</td><td id="SecondName" class="rowHeader">Second Name</td><td id="internal" class="rowHeader">Internal</td><td id="external" class="rowHeader">Direct / Mobile</td><td id="office" class="rowHeader">Office</td></tr>';
}

function displaySearchBox(){
    var searchBox = document.createElement('input');
    searchBox.style.type = "text";
    searchBox.id = "searchBox";
    gbi('inputs').appendChild(searchBox);
    gbi('searchBox').focus();

    var searchIcon = document.createElement('img');
    searchIcon.id = "searchIcon";
    searchIcon.src = "search.png";
    gbi('inputs').appendChild(searchIcon);
}

gbi("pl").addEventListener("click", function(){
    openPhonelist();
})

function openPhonelist(){
    gbi('pl').className = "toggleSelected";
    gbi('fp').className = "toggle";
    gbi('table').style.display = "table";
    gbi("floorplan").style.display = "none";
    gbi("searchBox").style.display = "block";
    gbi("searchIcon").style.display = "block";
    gbi('floorButtonWrap').style.display = "none";
    gbi('title').innerText = "PHONE LIST";
    gbi('searchBox').focus();
}
gbi("fp").addEventListener("click", function(){
    openFloorplan();
})

function openFloorplan(){
    gbi('fp').className = "toggleSelected";
    gbi("pl").className = "toggle";
    gbi('table').style.display = "none";
    gbi("floorplan").style.display = "block";
    gbi("searchBox").style.display = "none";
    gbi("searchIcon").style.display = "none";
    gbi('floorButtonWrap').style.display = "block";
    gbi('title').innerText = "FLOOR PLAN"; 
}

gbi('mainFloor').addEventListener("click", function(){
    gbc('floorButtons floorHigh')[0].className = "floorButtons";
    this.className = "floorButtons floorHigh";
    gbi('floorplan').src = "Floorplan.png?" + time;
})

gbi('meeting').addEventListener("click", function(){
    gbc('floorButtons floorHigh')[0].className = "floorButtons";
    this.className = "floorButtons floorHigh";
    gbi('floorplan').src = "Floorplan2.png?" + time;
})

gbi('second').addEventListener("click", function(){
    gbc('floorButtons floorHigh')[0].className = "floorButtons";
    this.className = "floorButtons floorHigh";
    gbi('floorplan').src = "Floorplan3.png?" + time;
})