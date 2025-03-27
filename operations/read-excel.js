const xlsx = require("xlsx");

function Read(workbook) {
  
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const range = xlsx.utils.decode_range(sheet["!ref"]);
  const headers = [];
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = xlsx.utils.encode_cell({ r: range.s.r, c: col });
    const cell = sheet[cellAddress];
    headers.push(cell ? cell.v : `Column${col}`);
  }

  const data = [];
  for (let row = range.s.r + 1; row <= range.e.r; row++) {
    const rowData = {};
    let emptyRow = true;

    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = xlsx.utils.encode_cell({ r: row, c: col });
      const cell = sheet[cellAddress];

      if (cell && cell.v !== undefined) {
        rowData[headers[col - range.s.c]] = cell.v;
        emptyRow = false;
      } else {
        rowData[headers[col - range.s.c]] = null;
      }
    }

    if (!emptyRow) data.push(rowData);
  }

  return data;
}

module.exports = Read;
