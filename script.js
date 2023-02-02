const table = document.getElementById("csv-table");

async function displayCSV(){
    const response = await fetch('./output.csv');
    const data = await response.text();
    const rows = data.split('\n');
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].split(",");
        let row = table.insertRow(-1);
        let cell1 = row.insertCell(0);
        cell1.innerHTML = "<a href='" + cells[1] + "'>" + cells[0] + "</a>";
}
}
displayCSV();