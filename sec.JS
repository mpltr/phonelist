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