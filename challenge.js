import * as readline from 'readline';

//configuramos la utilidad de node para que los datos se pidan y se muestran por consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//array solo male, mix age, para testeo
let students = [{
  age: 20,
  examScores: [],
  gender: 'female',
  nameS: 'zaira'
},
{
  age: 25,
  examScores: [],
  gender: 'female',
  nameS: 'ana'
}];
const availableMaleNames = ['pepe', 'juan', 'victor', 'Leo', 'francisco', 'carlos', 'kai'];
const availableFemaleNames = ['cecilia', 'ana', 'luisa', 'sara', 'isabel', 'virginia', 'karen'];
const availableGenders = ['male', 'female'];

let regex = /^[0-9]+$/;

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function addNewRandomStudent(students) {
  let gender;
  let studentName;
  let randomIndex = randomIntFromInterval(0, availableGenders.length - 1);
  gender = availableGenders[randomIndex];
  switch (gender) {
    case "male":
      randomIndex = randomIntFromInterval(0, availableMaleNames.length - 1);
      studentName = availableMaleNames[randomIndex];
      break;
    case "female":
      randomIndex = randomIntFromInterval(0, availableFemaleNames.length - 1);
      studentName = availableFemaleNames[randomIndex];
      break;
  }
  let age = randomIntFromInterval(20, 50);
  let newStudent = {
    age: age,
    examScores: [],
    gender: gender,
    nameS: studentName
  };
  students.push(newStudent);
}

function showMenuOptions() {
  const promise = new Promise((resolve, reject) => {
    rl.question('\n\t1- Mostrar en formato de tabla todos los alumnos.\n\t2- Mostrar por consola la cantidad de alumnos que hay en clase.\n\t3- Mostrar por consola todos los nombres de los alumnos.\n\t4- Eliminar el último alumno de la clase.\n\t5- Eliminar un alumno aleatoriamente de la clase.\n\t6- Mostrar por consola todos los datos de los alumnos que son chicas.\n\t7- Mostrar por consola el número de chicos y chicas que hay en la clase.\n\t8- Mostrar true o false por consola si todos los alumnos de la clase son chicas.\n\t9- Mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años.\n\t10- Añadir un alumno nuevo con los siguientes datos:\n\t\t- nombre aleatorio.\n\t\t- edad aleatoria entre 20 y 50 años.\n\t\t- género aleatorio.\n\t\t- listado de calificaciones vacío.\n\t11- Mostrar por consola el nombre de la persona más joven de la clase.\n\t12- Mostrar por consola la edad media de todos los alumnos de la clase.\n\t13- Mostrar por consola la edad media de las chicas de la clase.\n\t14- Añadir nueva nota a los alumnos.\n\t15- Ordenar el array de alumnos alfabéticamente según su nombre.\n\t16- Mostrar por consola el alumno de la clase con las mejores notas.\n\t17- Mostrar por consola la nota media más alta de la clase y el nombre del alumno al que pertenece.\n\t18- Añadir un punto extra a cada nota existente de todos los alumnos.\nElige una opcion: ', (num) => {
      rl.pause();
      if (regex.test(num)&& num < 19 && num >= 0) {
        resolve(parseInt(num));
      } else {
        reject("No has escogido una opción entre 1 y 18.\n");
      }
    })
  })
  return promise;
}

async function startApp() {
  let numberFromConsole;
  while (true) {
    try {
      numberFromConsole = await showMenuOptions();
    } catch (error) {
      console.log(error);
      process.exit(0);
    }
    //console.log("Has escogido la opción " + numberFromConsole);
    switch (numberFromConsole) {
      case 0:
        process.exit(0);
      case 1:
        // ### 1- Mostrar en formato de tabla todos los alumnos. 
        console.table(students);
        break;
      case 2:
        // ### 2- Mostrar por consola la cantidad de alumnos que hay en clase.
        console.log(students.length);
        break;
      case 3:
        // ### 3- Mostrar por consola todos los nombres de los alumnos.
        students.forEach((n) => console.log(n.nameS));
        break;
      case 4:
        // ### 4- Eliminar el último alumno de la clase.
        if (students.length > 0) {
          students.pop()
          console.log("Alumno eliminado");
        } else {
          console.log("No hay alumnos en la lista.");
        }
        break;
      case 5:
        // ### 5- Eliminar un alumno aleatoriamente de la clase.
        if (students.length > 0) {
          students.splice(randomIntFromInterval(0, students.length - 1), 1);
        } else {
          console.log("No hay alumnos en la lista.");
        }
        break;
      case 6:
        // ### 6- Mostrar por consola todos los datos de los alumnos que son chicas.
        console.table(students.filter(student => student.gender === 'female'));
        break;
      case 7:
        // ### 7- Mostrar por consola el número de chicos y chicas que hay en la clase.
        console.log("Estudiantes F: " + students.filter(student => student.gender === 'female').length);
        console.log("Estudiantes M: " + students.filter(student => student.gender === 'male').length);
        break;
      case 8:
        // ### 8- Mostrar true o false por consola si todos los alumnos de la clase son chicas.
        if(students.length>0){
          console.log(students.every(student => student.gender == 'female'));
        } 
        break;
      case 9:
        // ### 9- Mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años.
        if(students.length>0){
          students.filter(student => student.age >= 20 && student.age <= 25).forEach(n => console.log(n.nameS));
        } else{
          console.log("No hay alumnos que cumplan ese requisito");
        }

        break;
      case 10:
        //  ### 10- Añadir un alumno nuevo con los siguientes datos:
        // - nombre aleatorio.
        // - edad aleatoria entre 20 y 50 años.
        // - género aleatorio.
        // - listado de calificaciones vacío.
        // ¡OJO!, el nombre y el género tienen que ir acordes.
        //console.log("Nuevo alumno agregado a lista. ");
        addNewRandomStudent(students);
        break;
      case 11:
        // ### 11- Mostrar por consola el nombre de la persona más joven de la clase.
        // ¡OJO!, si varias personas de la clase comparten la edad más baja, cualquiera de ellos es una respuesta válida.
        if(students.length>0){
          students.sort((a, b) => a.age - b.age);
          console.log(students[0].nameS);
        } else{
          console.log("No hay alumnos en la lista.");
        }
   
        break;
      case 12:
        // ### 12- Mostrar por consola la edad media de todos los alumnos de la clase.
        if(students.length>0){
          console.log(students.reduce((sum, n) => sum + n.age, 0) / students.length);
        } else{
          console.log("No hay alumnos en la lista.");
        }
        
        break;
      case 13:
        // ### 13- Mostrar por consola la edad media de las chicas de la clase.
        //get female students
        if(students.length>0){
            let femaleArray = students.filter(student => student.gender == 'female');
            if(femaleArray.length>0){
              //get average age
              console.log(femaleArray.reduce((sum, n) => sum + n.age, 0) / femaleArray.length);
            } else{
              console.log("No hay alumnos con esos requisitos.");
            }
        }else{
          console.log("No hay alumnos en la lista.");
        }
        break;
      case 14:
        // ### 14- Añadir nueva nota a los alumnos. Por cada alumno de la clase, tendremos que calcular una nota de forma aleatoria(número entre 0 y 10) y añadirla a su listado de notas.
        students.forEach(student => student.examScores.push(randomIntFromInterval(0, 10)))
        break;
      case 15:
        // ### 15- Ordenar el array de alumnos alfabéticamente según su nombre.
        //cambio a lowercase los nombres para poder ordernar bien los nombres ya que una mayuscula influye en el orden.
        //students.sort((a, b) => (a.nameS.toLowerCase() > b.nameS.toLowerCase()) ? 1 : ((b.nameS.toLowerCase() > a.nameS.toLowerCase()) ? -1 : 0))
        students.sort((a, b) => a.nameS.toLowerCase().localeCompare(b.nameS.toLowerCase()));
        break;
      case 16:
        // ### 16- Mostrar por consola el alumno de la clase con las mejores notas.
        // El alumno con mejores notas es aquel cuyo sumatorio de todas sus notas es el valor más alto de todos.
        //reduce students scores and sort students by those scores (descending). Then get the first element.nameS of the array.
        if(students.length>0){
          console.log(students.sort((a, b) => b.examScores.reduce((sum, n) => sum + n, 0) - a.examScores.reduce((sum, n) => sum + n, 0))[0].nameS);
        } else{
          console.log("No hay alumnos en la lista.")
        }
        break;
      case 17:
        // ### 17- Mostrar por consola la nota media más alta de la clase y el nombre del alumno al que pertenece.
        if(students.length>0){
          let studentWithHighestScore = students.sort((a, b) => b.examScores.reduce((sum, n) => sum + n, 0) / b.examScores.length - a.examScores.reduce((sum, n) => sum + n, 0) / a.examScores.length)[0];
          let averageScoreOfBestStudent= 0;
          if (studentWithHighestScore.examScores.length>0){
            averageScoreOfBestStudent = studentWithHighestScore.examScores.reduce((sum, n) => sum + n, 0) / studentWithHighestScore.examScores.length;
          }
          //console.log(studentWithHighestScore.examScores);
          console.log("Nota media mas alta: " + averageScoreOfBestStudent);
          console.log("Nombre del estudiante: " + studentWithHighestScore.nameS);
        } else{
          console.log("No hay alumnos en la lista.")
        }
        break;
      case 18:
        // ### 18- Añadir un punto extra a cada nota existente de todos los alumnos. Recordad que la nota máxima posible es 10. Si los alumnos aún no tienen registrada ninguna nota, les pondremos un 10.
        if(students.length>0){
          for (let i = 0; i < students.length; i++) {
            for (let j = 0; j < students[i].examScores.length; j++) {
              if (students[i].examScores[j] < 10) {
                students[i].examScores[j] += 1;
              }
            }
          }
          students.filter(student => student.examScores.length === 0).forEach(student => student.examScores.push(10));
        }else{
          console.log("No hay estudiantes en la lista.");
        }
      
        break;
    }
  }

}

startApp();