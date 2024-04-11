import * as XLSX from 'xlsx';
const generateExcel = allotments => {
  const sheetsData = {};
  try {
    Object.keys(allotments).forEach(branch => {
      Object.keys(allotments[branch]).forEach(gender => {
        const type = gender === 'Male' ? 'Boys' : 'Girls';
        const sheetName = `${branch} ${type}`;
        const data = [
          [
            'Sr. No',
            'MIS',
            'Name of Student',
            'Student Category',
            'CGPA',
            'Number of Backlogs',
            'Seat Category',
          ], // Assuming these are the headers
        ];

        const waitingData = [['Waiting List']];

        // Add confirmed and waiting lists
        data.push(
          ...allotments[branch][gender]['confirmed'].map((student, index) => [
            index + 1, // Adding 1 to start indexing from 1 instead of 0
            student.username,
            student.name,
            student.category,
            student.grade,
            student.backlogs,
          ]),
        );
        waitingData.push(
          ...allotments[branch][gender]['waiting'].map((student, index) => [
            index + 1, // Adding 1 to start indexing from 1 instead of 0
            student.username,
            student.name,
            student.category,
            student.grade,
            student.backlogs,
          ]),
        );

        if (!sheetsData[sheetName]) {
          sheetsData[sheetName] = [data];
          sheetsData[sheetName].push(waitingData);
        }
      });
    });

    // Generate Excel files
    Object.keys(sheetsData).forEach(sheetName => {
      const truncatedSheetName = sheetName.slice(0, 31); // Truncate the sheet name if it exceeds 31 characters

      const wb = XLSX.utils.book_new();
      const combinedData = [];

      sheetsData[sheetName].forEach((data, index) => {
        // Skip the first data array as it contains the headers
        if (index === 0) {
          combinedData.push(...data);
        } else {
          combinedData.push(...data);
        }
      });

      // Log combinedData to inspect its structure
      workbook.sheet(0).cell('A1').value(combinedData);

      // Convert combined data to worksheet
      const ws = XLSX.utils.aoa_to_sheet(combinedData);

      // Calculate column widths
      const columnWidths = combinedData.reduce((acc, row) => {
        row.forEach((cell, colIndex) => {
          if (cell !== undefined) {
            const cellLength = cell.toString().length;
            acc[colIndex] = Math.max(acc[colIndex] || 0, cellLength);
          }
        });
        return acc;
      }, []);

      // Set column widths
      ws['!cols'] = columnWidths.map(width => ({ wch: width + 2 }));

      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, truncatedSheetName);

      // Write the workbook to a file
      XLSX.writeFile(wb, `${sheetName}.xlsx`);
    });
  } catch (error) {
    console.log(error);
  }
};

export default generateExcel;
