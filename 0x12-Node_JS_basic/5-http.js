const http = require('http');
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

    return {
      countStudents,
      noStudentCS,
      noStudentSWE,
      studentsCS,
      studentsSWE,
    };
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

const pathDB = process.argv[2];
const hostname = '127.0.0.1';
const port = 1245;

const application = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    countStudents(pathDB)
      .then(
        ({
          countStudents,
          noStudentCS,
          noStudentSWE,
          studentsCS,
          studentsSWE,
        }) => {
          res.write('This is the list of our students\n');
          res.write(`Number of students: ${countStudents}\n`);
          res.write(
            `Number of students in CS: ${noStudentCS}. List: ${studentsCS
              .toString()
              .split(',')
              .join(', ')}\n`
          );
          res.write(
            `Number of students in SWE: ${noStudentSWE}. List: ${studentsSWE
              .toString()
              .split(',')
              .join(', ')}`
          );
          res.end();
        }
      )
      .catch(() => {
        res.end('Error: Cannot load the database');
        throw new Error('Cannot load the database');
      });
  }
});

application.listen(port, hostname);

module.exports = application;
