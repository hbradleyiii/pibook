        // TODO: change this to quick sort
        // work on sorting dates
        //

// Spreadsheet takes a table id

const fake = 0;

var spreadsheet = {

    // spreadsheet.init(id) 
    //     takes the id of an html table and sets up spreadsheet
    //     functionality.
    init: function (id) {

        var table = document.getElementById(id);
        if (table === null) { return false; }

        var headings = table.tHead.rows[0].cells;
console.log(headings);
        var rows = table.tBodies[0].rows;
        if (rows === null) { return false; }

        var lastSortedTableHeading = null, currentEditRow = null;

            // Set up sort anchors
        for (var i=0; headings[i]; i++) {
            headings[i].cIndex = i; // To avoid bug in Safari

            var link = headings[i].childNodes[0];
            if (link == null) { continue; }

            if (headings[i].id.match(/ascending|descending/)) {
                lastSortedTableHeading = headings[i];
            }

            link.addEventListener("click", function (heading) {
                        var column = i;
                    return function () {
                        descending = (heading.id === "descending") ? false : true;
                        spreadsheet.sortTable(table, column, descending);
                        lastSortedTableHeading.id = "";
                        heading.id = (descending) ? "descending" : "ascending";
                        lastSortedTableHeading = heading;
                        window.event.preventDefault(); // javascript handled this; stop the redirection
                    }
                }(headings[i]));

        }

            // Set up edit anchors
        for (var i=0; rows[i]; i++) {
            rows[i].addEventListener("click", function (row) {
                    return function () {
                        spreadsheet.cancelRow(currentEditRow);
                        currentEditRow = row;
                        spreadsheet.editRow(row);
                    }
                }(rows[i]));

        }

    },

    sortTable: function (table, column, descending){

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

            //sortTable
        var rows = table.tBodies[0].rows;
        var alpha = [], numeric = [], reordered = [];
        var cell, content, number;

            // Loop through all rows to extract and separate alpha/numeric data
            // TODO: I had i=1 ???? why???
        for (var i=0; rows[i]; i++) {
            cell = rows[i].cells[column];
            content = cell.textContent ? cell.textContent : cell.innerText;
                // Reformat dates for sorting
            content = content.replace('/(\d{2})\.(\d{2})\.(\d{4})/', '$3$2$1')
            number = content.replace(/(\$|\,|\s)/g, "");
            if (parseFloat(number) == number) {
                numeric.push( {value: Number(number), row: rows[i]} )
            } else { 
                alpha.push( {value: content.toLowerCase(), row: rows[i]} )
            }
        }

            // Begin Sorting
        alpha = bubbleSort(alpha, descending);
        numeric = bubbleSort(numeric, descending);
        reordered = (descending) ? numeric.concat(alpha) : alpha.concat(numeric);

            // Reorder the rows accordingly
        for (var i=0; reordered[i]; i++) {
            table.tBodies[0].appendChild(reordered[i].row);
        }

    },



    editRow: function (row){

        if (row.id === "edit") { 
            return true;
        }

        row.id="edit"

        var cells = row.cells;
        var td, input;

        // create form
        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", "#");

        for(var i=0; i < cells.length; i++) {
            td = document.createElement("td");
            td.className = cells[i].className;

            if (cells[i].className === "row-edit") {
                input = document.createElement("input");
                input.setAttribute("type", "submit");
                input.setAttribute("value", "Save");
            } else {
                input = document.createElement("input");
                input.setAttribute("type", "text");
                content = cells[i].textContent ? cells[i].textContent : cells[i].innerText;
                input.setAttribute("value", content);
            }

            td.appendChild(input);
            form.appendChild(td);
        }

        // empty contents
        while(row.firstChild) {
            row.removeChild(row.firstChild);
        }

        row.appendChild(form);
    },


    cancelRow: function (row){
        if (row == null){
            return false;
        }

        row.id=""

        var form = row.firstChild;
        var td = [];
        var j = 0;
        var aEdit, aDelete;

        // empty contents of row
        while(form.firstChild) {

            el = form.firstChild;

            td[j] = document.createElement("td");
            td[j].className = el.className;

            if (el.className === "row-edit") {
                aEdit = document.createElement("a");
                aEdit.setAttribute("href", "#");
                aEdit.setAttribute("class", "edit");
                td[j].appendChild(aEdit);
                aDelete = document.createElement("a");
                aDelete.setAttribute("href", "#");
                aDelete.setAttribute("class", "delete");
                td[j].appendChild(aDelete);
            } else {
                td[j].textContent = el.firstChild.value;
            }

            form.removeChild(el);
            j++;
        }

        // remove form
        row.removeChild(row.firstChild);

        for(var i=0; i < td.length; i++){
            row.appendChild(td[i]);
        }
    },

};


