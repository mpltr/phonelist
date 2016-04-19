function gbi(id) {
    return document.getElementById(id);
}
function gbc(cl) {
    return document.getElementsByClassName(cl);
}
function gbt(tag) {
    return document.getElementsByTagName(tag);
}
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
function createTableFromObjectArray(arrayName, tableName, appendTo){
    var createdTable = document.createElement('table');
    createdTable.id = tableName;
    createdTable.insertRow(0);
    createdTable.rows[0].id = tableName + "Header";
    gbi(appendTo).appendChild(createdTable);
    var keyCounter = 0;
    for (var key in arrayName[0]){
            createdTable.rows[0].insertCell(keyCounter);
            createdTable.rows[0].cells[keyCounter].innerHTML = key;
            keyCounter++;
    }
    var arrayLength = arrayName.length;
    for (var i = 1; i < arrayLength; i++){
        createdTable.insertRow(i);
        createdTable.rows[i].className = tableName + "Rows";
        keyCounter = 0;
        for (var key in arrayName[i]){
                createdTable.rows[i].insertCell(keyCounter);
                var keyVal = arrayName[i][key];
                createdTable.rows[i].cells[keyCounter].innerHTML = keyVal;
                keyCounter++;
        }
    }
} // With Keys as Table Headers
function fillTableWithArray(arrayName, tableID){
    var table = gbi(tableID);
    var arrayLength = arrayName.length;
    for (var i = 1; i < arrayLength + 1; i++){
        table.insertRow(i);
        table.rows[i].className = tableID + "Rows";
        var keyCount = 0;
        for (var key in arrayName[i-1]){
            if (key != "hidden"){
                table.rows[i].insertCell(keyCount);
                table.rows[i].cells[keyCount].className = tableID + "Cells";
                table.rows[i].cells[keyCount].innerHTML = arrayName[i-1][key];
                keyCount++;
            }
        }
    }
} // If Table Header is set first
function clearTable(tableID){
    while(gbi(tableID).rows[1]){
        gbi(tableID).deleteRow(1);
    }
}
function searchArrayObjects(searchboxID, arrayName, resultsArray){
    var searchBoxValue = gbi(searchboxID).value.toLowerCase();
    var searchExp = new RegExp(searchBoxValue);
    var arrayLength = arrayName.length;
    for (var i=0; i < arrayLength; i++){
        var match = false;
        for(var key in arrayName[i]){
            if (match != true){
                var keyValue = arrayName[i][key].toString().toLowerCase();
                var tryForMatch = searchExp.test(keyValue);
                if(tryForMatch == true){
                    resultsArray.push(arrayName[i]); 
                    match = true;
                }
            }
        }
    }
} // Posts results to second array
function classHighlight(selectedClass, highlightClass) {
    var classLength = gbc(selectedClass).length;
    for (var i = 0; i < classLength; i++){
        gbc(selectedClass)[i].addEventListener("click", function(){
            if (gbc(highlightClass)[0]){
                gbc(highlightClass)[0].className = selectedClass;
            }
            this.className = highlightClass;
        })
    }
} 
function sortObjectArray(sortArray, sortByKey) {
    sortArray.sort(function(a,b){
        var alc = a[sortByKey].toLowerCase(); 
        var blc = b[sortByKey].toLowerCase();
        return alc > blc ? 1 : alc < blc ? -1 : 0;
    }); 
} // Copied, needs research. Have to specify Key to sort by.