// Get Element By ID shortcut
function gbi(id) {
    return document.getElementById(id);
}

// Get Element By Class shortcut
function gbc(cl) {
    return document.getElementsByClassName(cl);
}

// Get Element By Class shortcut
function gbt(tag) {
    return document.getElementsByTagName(tag);
}

//Capitalise First Letter of string
function caps(string) {
    if(string == ""){
        return "N/A";
    } else {
    var seperate = string.split("");
    seperate[0] = seperate[0].toUpperCase();
    return seperate.join("");
    }
}

function HttpRequest(url, callback) {
    this.request = new XMLHttpRequest();
    this.request.open("GET", url);
    var tempRequest = this.request;
    function reqReadyStateChange() {
        if (tempRequest.readyState == 4) {
            if (tempRequest.status == 200) {
                callback(tempRequest.responseText);
            } else {
                alert("An error occurred trying to contact the server.");
                alert(tempRequest.status);
            }
        }
    }
    this.request.onreadystatechange = reqReadyStateChange;
}

HttpRequest.prototype.send = function () {
    this.request.send(null);
};



// Contact Class
function Contact(fn, sn, no, em, of) {
    this.FirstName = fn;
    this.SecondName = sn;
    this.internal = no;
    this.external = em;
    this.office = of;
    this.hidden = false;
}

// Address Book Array
var addressBook = new Array();

// Search Results Array
var searchResults = new Array();

// Populate contact book
function populate(){
    var contactRows = gbc("tableRow");
    while(contactRows[0]){
        contactRows[0].parentNode.removeChild(contactRows[0]);        
    }
    
    
    for(var i = 0; i < exportArray.length; i++){  
            gbi("table").insertRow(-1);
            var rows = gbi("table").rows;
            var lastRow = rows[rows.length - 1];
            lastRow.className += " tableRow";
            lastRow.insertCell(0);
            lastRow.insertCell(1);
            lastRow.insertCell(2);
            lastRow.insertCell(3);
            lastRow.insertCell(4);
         



             for (var key in exportArray[i]){ 
               if(key == "FirstName"){
                    lastRow.cells[0].innerHTML = caps(exportArray[i][key]);
                    lastRow.cells[0].contentEditable = "true";
                } else if(key == "SecondName"){
                    lastRow.cells[1].innerHTML = caps(exportArray[i][key]);
                    lastRow.cells[1].contentEditable = "true";
                } else if(key == "internal"){
                    lastRow.cells[2].innerHTML = exportArray[i][key];
                    lastRow.cells[2].contentEditable = "true";
                } else if(key == "external"){
                    lastRow.cells[3].innerHTML = exportArray[i][key];
                    lastRow.cells[3].contentEditable = "true";
                } else if(key == "office"){
                    lastRow.cells[4].innerHTML = exportArray[i][key];
                    lastRow.cells[4].contentEditable = "true";
                }
            }
        if(exportArray[i]["FirstName"] == "admindeletedxfx"){
            exportArray[i]["hidden"] = true;
        }
        if(exportArray[i]["hidden"] !== false){
        gbt('tr')[i+1].style.display = "none";
    }
    }
    
    
}
    
// Sort by String
function sortBy(key) {
    if (key == "internal"){
        exportArray.sort(function(a,b){
            alc = a[key];
            blc = b[key];            
            return alc > blc ? 1 : alc < blc ? -1 : 0;
        });
        populate();
    } else {        
        exportArray.sort(function(a,b){
            var alc = a[key].toLowerCase(), 
            blc = b[key].toLowerCase();
            return alc > blc ? 1 : alc < blc ? -1 : 0;
        });  
        populate();
    }
}

// Sort by Column header Ascending/Descending
function ascendDescend (columnHeader) {
    if (sortedBy != columnHeader){
    sortBy(columnHeader);
    sortedBy = columnHeader;
    } else {
        exportArray.reverse();
        populate();
    }  
}

// Highlight
function highlight(header) {
    for (var i=0; i<5; i++) {
    document.getElementById("topRow").getElementsByTagName('td')[i].setAttribute('class', "");
    }
    header.setAttribute('class', "highlighted");    
}

// Sort by ...
var sortedBy = "";
gbi("firstNameHead").addEventListener("click", function(){
    ascendDescend("FirstName");
    highlight(this);
});
gbi("secondNameHead").addEventListener("click", function(){
    ascendDescend("SecondName");
    highlight(this);
});
gbi("internalHead").addEventListener("click", function(){
    ascendDescend("internal");
    highlight(this);
});
gbi("externalHead").addEventListener("click", function(){
    ascendDescend("external");
    highlight(this);
});
gbi("office").addEventListener("click", function(){
    ascendDescend("office");
    highlight(this);
});

// Search
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

//gbi('searchBox').addEventListener("input", searchContacts);

// Load
function load(){
    var request = new HttpRequest("test.txt", handleData);
    request.send();
}

load();

function handleData(text) {
    var retrievedData = JSON.parse(text);
    exportArray = retrievedData;
    ascendDescend('FirstName');
    highlight(gbi('firstNameHead'));
}

function sendData() {
    var XPort = JSON.stringify(addressBook);
    document.write(XPort)
}

    var exportArray = new Array();

function save(){
    var tableLength = gbi('table').rows.length;
    for (var i = 1; i < tableLength; i++){
        var fn = gbi('table').rows[i].cells[0].innerHTML;
        var sn = gbi('table').rows[i].cells[1].innerHTML;
        var int = gbi('table').rows[i].cells[2].innerHTML;
        var ext = gbi('table').rows[i].cells[3].innerHTML;
        var off = gbi('table').rows[i].cells[4].innerHTML;
        exportArray[i-1] = new Contact(fn,sn,int,ext,off);
}
    sortBy('FirstName');
}
    
function exportData() {
    save();
    var stringyExport = JSON.stringify(exportArray);
    document.write(stringyExport);
}

gbi('export').addEventListener("click", exportData);

gbi('save').addEventListener("click", save);

//add
gbi('add').addEventListener("click", function(){
    gbi("table").insertRow(1);
            var rows = gbi("table").rows;
            var lastRow = rows[1];
            lastRow.className += " tableRow";
            lastRow.insertCell(0);
            lastRow.insertCell(1);
            lastRow.insertCell(2);
            lastRow.insertCell(3);
            lastRow.insertCell(4);
     lastRow.cells[0].contentEditable = "true";
 lastRow.cells[1].contentEditable = "true";
lastRow.cells[2].contentEditable = "true";
lastRow.cells[3].contentEditable = "true";
lastRow.cells[4].contentEditable = "true";
})







