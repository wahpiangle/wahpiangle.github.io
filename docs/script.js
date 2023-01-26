const table = document.getElementById("file-csv");

async function displayCSV() {
    // using async await to receive the data from csv file
    const response = await fetch('./Table_Input.csv');
    const data = await response.text();

    //separating rows by lines into an array
    const rows = data.split("\n");

    //getting the data for the second table
    const A5 = parseInt(rows[5].split(",")[1]);
    const A20 = parseInt(rows[20].split(",")[1]);
    const A15 = parseInt(rows[15].split(",")[1]);
    const A7 = parseInt(rows[7].split(",")[1]);
    const A13 = parseInt(rows[13].split(",")[1]);
    const A12 = parseInt(rows[12].split(",")[1]);

    //iterating through the entire array of rows to append each line into html
    for (let i = 0; i < rows.length; i++) {
        const row = table.insertRow();
        const cells = rows[i].split(",");
        cells.forEach(cell => {
            const newCell = row.insertCell();
            newCell.innerHTML = cell;
        });
    }

    //appending the values for the 2nd table
    const addition = document.getElementById('addition');
    const division = document.getElementById('division');
    const multiplication = document.getElementById('multiplication');
    addition.innerHTML = (A5 + A20)
    division.innerHTML = (A15 / A7)
    multiplication.innerHTML = (A13 * A12)
}
displayCSV();