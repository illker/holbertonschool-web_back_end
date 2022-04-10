const fs = require('fs');

async function countStudents(filepath) {
  try {
    const csv = await fs.promises.readFile(filepath, { encoding: 'utf8' });
    const Array = csv.split(/\r?\n|\n/);
    const headers = Array[0].split(',');

    const dictOfList = [];
    const noArray = Array.slice(1);
    for (let i = 0; i < noArray.length; i += 1) {
      const data = noArray[i].split(',');
      if (data.length === headers.length) {
        const row = {};
        for (let j = 0; j < headers.length; j += 1) {
          row[headers[j].trim()] = data[j].trim();
        }
        dictOfList.push(row);
      }
    }

    let noStudentCS = 0;
    let noStudentSWE = 0;
    const studentsCS = [];
    const studentsSWE = [];

    dictOfList.forEach((element) => {
      if (element.field === 'CS') {
        noStudentCS += 1;
        studentsCS.push(element.firstname);
      } else if (element.field === 'SWE') {
        noStudentSWE += 1;
        studentsSWE.push(element.firstname);
      }
    });

    const countStudents = noStudentCS + noStudentSWE;

    console.log(`Number of students: ${countStudents}`);
    console.log(
      `Number of students in CS: ${noStudentCS}. List: ${studentsCS
        .toString()
        .split(',')
        .join(', ')}`
    );
    console.log(
      `Number of students in SWE: ${noStudentSWE}. List: ${studentsSWE
        .toString()
        .split(',')
        .join(', ')}`
    );
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
