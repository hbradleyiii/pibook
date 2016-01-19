        // work on sorting dates
        //

// Spreadsheet takes a table id

// AJAX states
const STATE_IDLE       = 0;
const STATE_RECEIVING  = 1;
const STATE_WAITING    = 2;
const STATE_SAVING     = 3;
const STATE_DELETING   = 4;

function AJAXTable(tableId) {

        // Make sure this is not being called directly.
    if ( !(this instanceof AJAXTable) ) {
        // Always use new.
        console.log("WARNING: AJAXTable was called without new.");
        return new AJAXTable();
    }

    this.table = document.getElementById(tableId);
    //this.table = $('#' + tableId).get();
    this.headings = this.table.tHead.rows[0].cells;
    //this.headings = $('#transactions').find('th');
    this.rows = this.table.tBodies[0].rows;
    //this.rows = this.table[0].rows;

        // return a null if table, heading, or rows are not found.
    if (this.table === null || this.headings === null || this.rows === null) { return null; }

    this.currentSortedth = null, this.currentEditRow = null;

    this.initSort(); // Setup sort anchors


}

AJAXTable.prototype.sort = function(columnIndex, descending) {
    var alpha = [], numeric = [], reordered = [];
    var cell, content, number;
    var heading = this.headings[columnIndex];

        // Loop through all rows to extract and separate alpha/numeric data
        // TODO: I had i=1 ???? why???
    for (var i=0; this.rows[i]; i++) {
        cell = this.rows[i].cells[columnIndex];
        content = cell.textContent ? cell.textContent : cell.innerText;
            // Reformat dates for sorting
        content = content.replace('/(\d{2})\.(\d{2})\.(\d{4})/', '$3$2$1')
        number = content.replace(/(\$|\,|\s)/g, "");
        if (parseFloat(number) == number) {
            numeric.push( {value: Number(number), row: this.rows[i]} )
        } else { 
            alpha.push( {value: content.toLowerCase(), row: this.rows[i]} )
        }
    }

        // Begin Sorting
    alpha = bubbleSort(alpha, descending);
    numeric = bubbleSort(numeric, descending);
    reordered = (descending) ? numeric.concat(alpha) : alpha.concat(numeric);

        // Reorder the rows accordingly
    for (var i=0; reordered[i]; i++) {
        this.table.tBodies[0].appendChild(reordered[i].row);
        //this.table.appendChild(reordered[i].row);
    }

        // change table header ids
    this.lastSortedth.id = "";
    heading.id = (descending) ? "descending" : "ascending";
    this.lastSortedth = heading;
}

AJAXTable.prototype.initSort = function() {

        // needed for event closure
    var that = this;

        // Loop through headings
    for (var i=0; this.headings[i]; i++) {

            // first child of header should be an <a> tag
        var link = this.headings[i].childNodes[0];

            // If not, skip this row
        if (link === undefined || link.href === undefined) { continue; }

        if (this.headings[i].id.match(/ascending|descending/)) {
            this.lastSortedth = this.headings[i];
        }

            // Set up sort <a> tag
        link.href = "javascript:void(0)"; // Remove link href
        link.addEventListener("click", function (heading) {
            var cIndex = i;

            return function () {
                descending = (heading.id === "descending") ? false : true;
                that.sort(cIndex, descending);
                if(event.preventDefault) { 
                    window.event.preventDefault();
                } else {
                    window.event.returnValue = false;
                }
            }
        }(this.headings[i]));
    }

}



function AJAXRow() {

        // Make sure this is not being called directly.
    if ( !(this instanceof AJAXRow) ) {
        // Always use new.
        console.log("WARNING: AJAXRow was called without new.");
        return new AJAXRow();
    }
}



// // HELPER FUCTIONS // //

    // Bubble sort algorithm
bubbleSort = function (array, descending){
    var start, end, dir;
    if ( descending ) {
        start = 0;
        end = array.length;
        dir = 1;
    } else {
        start = array.length -1;
        end = -1;
        dir = -1;
    }

    var unsorted = true;
    while(unsorted) {
        unsorted = false;
        for (var i=start; i!=end; i=i+dir) {
            if (array[i+dir] && array[i].value > array[i+dir].value) {
                var a = array[i];
                var b = array[i+dir];
                var c = a;
                array[i] = b;
                array[i+dir] = c;
                unsorted = true;
            }
        }
    }
    return array;
}
    // // //


window.onload = function() {
    var transactions = new AJAXTable('transactions');
}

