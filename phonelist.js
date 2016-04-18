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
function Contact(fn, sn, no, em) {
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
    
    
    for(var i = 0; i < addressBook.length; i++){  
            gbi("table").insertRow(-1);
            var rows = gbi("table").rows;
            var lastRow = rows[rows.length - 1];
            lastRow.className += " tableRow";
            lastRow.insertCell(0);
            lastRow.insertCell(1);
            lastRow.insertCell(2);
            lastRow.insertCell(3);
            lastRow.insertCell(4);
            lastRow.insertCell(5);



             for (var key in addressBook[i]){ 
               if(key == "FirstName"){
                    lastRow.cells[0].innerHTML = caps(addressBook[i][key]);
                } else if(key == "SecondName"){
                    lastRow.cells[1].innerHTML = caps(addressBook[i][key]);
                } else if(key == "internal"){
                    lastRow.cells[2].innerHTML = addressBook[i][key];
                } else if(key == "external"){
                    lastRow.cells[3].innerHTML = addressBook[i][key];
                } else if(key == "office"){
                    lastRow.cells[4].innerHTML = addressBook[i][key];
                } 
            }
        
        if(addressBook[i]["FirstName"] == "admindeletedxfx"){
            addressBook[i]["hidden"] = true;
        }
        if(addressBook[i]["hidden"] !== false){
        gbt('tr')[i+1].style.display = "none";
    }
    }
    
    
}
populate();
    
// Sort by String
function sortBy(key) {
    if (key == "internal"){
        addressBook.sort(function(a,b){
            alc = a[key];
            blc = b[key];            
            return alc > blc ? 1 : alc < blc ? -1 : 0;
        });
        populate();
    } else {        
        addressBook.sort(function(a,b){
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
        addressBook.reverse();
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
function searchContacts(){
    var searchBoxValue = gbi("searchBox").value.toLowerCase();
    var searchFor = new RegExp(searchBoxValue);
    
    for (var i=0; i<addressBook.length; i++){
        var match = false;
        for(var key in addressBook[i]){
            if(key !== "hidden"){
                var trial = addressBook[i][key].toLowerCase();
                var trialResult =  searchFor.test(trial);
                if(trialResult == true){
                    match = true;
                }

            }
            if(match == false){
                addressBook[i]["hidden"] = true;
            } else {
                addressBook[i]["hidden"] = false;
            }
        }
    }
    populate();
}

gbi('searchBox').addEventListener("input", searchContacts);

// Load
function load(){
    var request = new HttpRequest("test.txt", handleData);
    request.send();
}

load();

function handleData(text) {
    var retrievedData = JSON.parse(text);
    addressBook = retrievedData;
    ascendDescend('FirstName');
    highlight(gbi('firstNameHead'));
}

function sendData() {
    var XPort = JSON.stringify(addressBook);
    document.write(XPort)
}








