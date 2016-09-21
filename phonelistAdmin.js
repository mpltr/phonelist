var addressBook = new Array();
var searchResults = new Array();
var time = new Date().getTime();
function loadContacts(){
	var request = new HttpRequest("contacts.txt?t=" + time, handleData);
	request.send();
}
loadContacts();
function handleData(text) {
	var retrievedData = JSON.parse(text);
	addressBook = retrievedData;
	searchArrayObjects('searchBox', addressBook, searchResults);
	sortObjectArray(searchResults, 'FirstName');
	fillTableWithArrayEditable(searchResults, 'table');
	gbi('loading').style.display = "none";
	//    addHighlight('rowHeader', 'rowHeaderHighlighted', gbc('rowHeader')[0]);
	//    monitorTopRow('table', onClicking);
}
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
///// Admin //////

var offices = ["Bristol HQ", 
				"London", 
				"Cardiff", 
				"Reading", 
				"Munich", 
				"Edinburgh", 
				"Manchester", 
				"Dublin", 
				"Southampton", 
				"Jackson Milne", 
				"Ham Green", 
				"Sterling Manhatten", 
				"RSA (London)", 
				"Royal London (Edinburgh)",
				"Royal London (Cheshire)",
				"Nationawide RBP"];

gbi('searchBox').style.display = "none";
gbi('searchIcon').style.display = "none";
function Contact(fn, sn, no, em, of) {
	this.FirstName = fn;
	this.SecondName = sn;
	this.internal = no;
	this.external = em;
	this.office = of;
}

function formatPhoneNumber(em, of) {
	var noSpace = em.replace(/ /g, '');
	var format = "xxxx xxx xxxx ";
	if(of === "Munich"){
		format = "xxxxxx xxxxxx xxx ";
	}
	if(of === "Dublin"){
		format = "xxxxxx xxx xxxx "
	}
	for (var i = 0; i < noSpace.length; i++){
		if (format.match(/x/)){
			format = format.replace('x', noSpace[i]);
		} else {
			format += noSpace[i]
		}
	}

	if(format.match(/x/)){
		format = format.replace(/x/g, '');
	}
	return format;
}

function save() {
	var tableLength = gbi('table').rows.length;
	addressBook = [];
	for (var i = 1; i < tableLength; i++){
		var cellNum = gbi('table').rows[i].cells;
		var fn = cellNum[0].innerHTML;
		var sn = cellNum[1].innerHTML;
		var no = cellNum[2].innerHTML;
		var em = cellNum[3].innerHTML;
		var of = cellNum[4].childNodes[0].value;
			em = formatPhoneNumber(em, of);
		addressBook[i-1] = new Contact(fn, sn, no, em, of);
	}
	searchResults = [];
	searchResults = addressBook;
	sortObjectArray(searchResults, 'FirstName');
	clearTable('table');
	fillTableWithArrayEditable(searchResults, 'table');
}
gbi('save').addEventListener("click", save);

function add() {
	gbi('table').insertRow(1);
	gbi('table').rows[1].className = "tableRows";
	for (var i = 0; i < 4; i++){
		gbi('table').rows[1].insertCell(i);
		gbi('table').rows[1].cells[i].contentEditable = true;
		gbi('table').rows[1].cells[i].className = "tableCells";            
    }
    gbi('table').rows[1].insertCell(4);
    gbi('table').rows[1].cells[4].className = "tableCells";
    var html = '<select>'
    for (var j = 0; j < offices.length; j++){
        html += '<option>' + offices[j] + '</option>';
    }
    html += '</select>';
	gbi('table').rows[1].cells[4].innerHTML = html;

    gbi('table').rows[1].insertCell(5);
    gbi('table').rows[1].cells[5].className = "tableCells";
	gbi('table').rows[1].cells[5].innerHTML = "<input type='checkbox' class='delCheck'>";
}
gbi('add').addEventListener("click", add);

function del() {
	var tick = gbc('delCheck')
	var tickLength = gbc('delCheck').length;
	for (var i = 0; i < tickLength; i++){
		if(tick[i].checked){
			gbi('table').deleteRow(i+1);
			i--;
			tickLength--;
		}
	}
}
gbi('delete').addEventListener("click", del);

function exportData() {
	save();
	var stringyExport = JSON.stringify(searchResults);
	var a=document.createElement('a');
	a.href='data:text/plain;base64,'+btoa(stringyExport);
	a.textContent='download';
	a.download='contacts.txt';
	a.click();
}
// Export Event Listener
gbi('export').addEventListener("click", function(){
	gbi('fade').style.display = "block";
	gbi('confirm').style.display = "block";
});

gbi('confirmYes').addEventListener("click", function(){
	gbi('fade').style.display = "none";
	gbi('confirm').style.display = "none";
	sendData();
})

gbi('confirmNo').addEventListener("click", function(){
	gbi('fade').style.display = "none";
	gbi('confirm').style.display = "none";
})

function sendData(){
	save();
	var data = JSON.stringify(searchResults);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			alert("Phonelist successfully exported!")
		}
	}
	xmlhttp.open("POST","processExport.php",true);
	//Must add this request header to XMLHttpRequest request for POST
	xmlhttp.setRequestHeader("Content-type", "application/JSON");
	xmlhttp.send(data);
}