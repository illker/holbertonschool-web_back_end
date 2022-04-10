const express = require('express');
const fs = require('fs');

function noStudents(filepath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf-8', (err, res) => {
      if (err) return reject(new Error('Cannot load the database'));

      const Array = res.split(/\r?\n|\n/);
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

      const noStudents = noStudentCS + noStudentSWE;

      return resolve({
        noStudents,
        noStudentCS,
        noStudentSWE,
        studentsCS,
        studentsSWE,
      });
    });
  });
}

const pathDB = process.argv[2];
const application = express();
const port = 1245;

application.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

application.get('/students', async (req, res) => {
  await noStudents(pathDB)
    .then(({ noStudents, noStudentCS, noStudentSWE, studentsCS, studentsSWE }) => {
      const enun = 'This is the list of our students\n';
      const total = `Number of students: ${noStudents}\n`;
      const CS = `Number of students in CS: ${noStudentCS}. List: ${studentsCS
        .toString()
        .split(',')
        .join(', ')}\n`;
      const SWE = `Number of students in SWE: ${noStudentSWE}. List: ${studentsSWE
        .toString()
        .split(',')
        .join(', ')}`;
      res.status(200).send(enun + total + CS + SWE);
    })
    .catch(() => {
      res.status(404).send('Cannot load the database');
    });
});

application.listen(port);

module.exports = application;
