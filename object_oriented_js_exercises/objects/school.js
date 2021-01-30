/* Create a school object. The school object uses the student object from the previous exercise. It has methods that use and update information about the student. Be sure to check out the previous exercise for the other arguments that might be needed by the school object. Implement the following methods for the school object:

addStudent: Adds a student by creating a new student and adding the student to a collection of students. The method adds a constraint that the year can only be any of the following values: '1st', '2nd', '3rd', '4th', or '5th'. Returns a student object if year is valid otherwise it logs "Invalid Year".
enrollStudent: Enrolls a student in a course.
addGrade: Adds the grade of a student for a course.
getReportCard: Logs the grades of a student for all courses. If the course has no grade, it uses "In progress" as the grade.
courseReport: Logs the grades of all students for a given course name. Only student with grades are part of the course report.
To test your code, use the three student objects listed below. Using the three student objects, produces the following values from the getReportCard and courseReport methods respectively. */

// Examples of created student objects with grades; methods on the objects are not shown here for brevity.
// The following are only showing the properties that aren't methods for the three objects

function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    notes: {},
    info() {
      console.log(`${this.name} is a ${this.year} year student.`)
    },
    listCourses() {
      return this.courses;
    },
    addCourse(newCourse) {
      this.courses.push(newCourse);
    },
    addNote(code, note) {
      courseName = this.courses.filter(obj => obj.code === code)[0].name
      if (this.notes[courseName] !== undefined) {
        this.notes[courseName] += '; ' + note;
      } else {
        this.notes[courseName] = note;
      }
    },
    viewNotes() {
      Object.keys(this.notes).forEach(key => console.log(`${key}: ${this.notes[key]}`));
    },
    updateNote(code, newNote) {
      courseName = this.courses.filter(obj => obj.code === code)[0].name

      if (this.notes[courseName] !== undefined) {
        this.notes[courseName] = newNote;
      }
    },
  }
}


let school = {
  students: [],
  addStudent(name, year) {
    let validYears = ['1st', '2nd', '3rd', '4th', '5th'];
    if (validYears.includes(year)) {
      let newStudent = createStudent(name, year);
      this.students.push(newStudent);
      return newStudent;
    } else {
      console.log('Invalid year!');
    }
  },
  enrollStudent(name, course) {
    this.students.filter(studentObj => studentObj.name === name)[0].addCourse(course);
  },
  addGrade(studentName, courseName, courseGrade) {
    let findStudent = this.students.filter(studentObj => studentObj.name === studentName)[0];
    let findCourse = findStudent.courses.filter(courseObj => courseObj.name === courseName)[0];
    findCourse['grade'] = courseGrade;
  },
  getReportCard(studentName) {
    let findStudent = this.students.filter(studentObj => studentObj.name === studentName)[0];
    findStudent.courses.forEach(courseObj => {
      let courseGrade = courseObj.grade || 'In progress';
      console.log(`${courseObj.name}: ${courseGrade}`);
    })
  },
  courseReport(courseName) {
    let courseGrades = this.getAllCourseGrades(courseName);
    let averageCourseGrade;

    if (courseGrades.length > 0) {
      averageCourseGrade = courseGrades.reduce((accum, current) => accum + current) / courseGrades.length;
    } else {
      return averageCourseGrade;
    }

    console.log(`=${courseName} Grades=`);

    this.students.forEach(student => {
      let selectedCourse = student.courses.filter(course => course.name === courseName && course.grade !== undefined)[0];
      if (selectedCourse) {
        console.log(`${student.name}: ${selectedCourse.grade}`);
      }
    })

    console.log('---');
    console.log(`Course Average: ${averageCourseGrade}`);

  },
  getAllCourseGrades(courseName) {
    let allStudentsCourseGrade = [];
    this.students.forEach(student => {
      let courseObject = student.courses.filter(course => course.name === courseName && course.grade !== undefined)[0];
      if (courseObject && courseObject.grade) allStudentsCourseGrade.push(courseObject.grade);
    })
    return allStudentsCourseGrade;
  }
}

school.addStudent('foo', '3rd');
school.enrollStudent('foo', {name: 'Math', code: 101, grade: 95, });
school.enrollStudent('foo', {name: 'Advanced Math', code: 102, grade: 90, });
school.enrollStudent('foo', {name: 'Physics', code: 202, });

school.addStudent('bar', '1st');
school.enrollStudent('bar', {name: 'Math', code: 101, grade: 91, });

school.addStudent('qux', '2nd');
school.enrollStudent('qux', {name: 'Math', code: 101, grade: 93, });
school.enrollStudent('qux', {name: 'Advanced Math', code: 102, grade: 90, });

school.courseReport('Math');
school.courseReport('Advanced Math');
school.courseReport('Physics');

