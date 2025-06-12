const subjects = [
  {
    discipline: 'English',
    grades: [
      { grade: '10', date: { day: '10', month: '06' } },
      { grade: '10', date: { day: '05', month: '06' } },
      { grade: '10', date: { day: '02', month: '06' } }
    ],
    absents: [{ day: '03', month: '06' }]
  },
  {
    discipline: 'Math',
    grades: [
      { grade: '9', date: { day: '09', month: '06' } },
      { grade: '8', date: { day: '04', month: '06' } },
      { grade: '10', date: { day: '01', month: '06' } }
    ],
    absents: [{ day: '06', month: '06' }]
  },
  {
    discipline: 'Biology',
    grades: [
      { grade: '7', date: { day: '08', month: '06' } },
      { grade: '9', date: { day: '03', month: '06' } },
      { grade: '8', date: { day: '01', month: '06' } }
    ],
    absents: [{ day: '07', month: '06' }]
  },
  {
    discipline: 'Chemistry',
    grades: [
      { grade: '10', date: { day: '07', month: '06' } },
      { grade: '10', date: { day: '03', month: '06' } },
      { grade: '9', date: { day: '02', month: '06' } }
    ],
    absents: [{ day: '08', month: '06' }]
  },
  {
    discipline: 'History',
    grades: [
      { grade: '9', date: { day: '06', month: '06' } },
      { grade: '8', date: { day: '02', month: '06' } },
      { grade: '10', date: { day: '01', month: '06' } }
    ],
    absents: [{ day: '09', month: '06' }]
  },
  {
    discipline: 'Geography',
    grades: [
      { grade: '10', date: { day: '05', month: '06' } },
      { grade: '10', date: { day: '04', month: '06' } },
      { grade: '10', date: { day: '03', month: '06' } }
    ],
    absents: [{ day: '02', month: '06' }]
  },
  {
    discipline: 'Physics',
    grades: [
      { grade: '8', date: { day: '10', month: '06' } },
      { grade: '7', date: { day: '07', month: '06' } },
      { grade: '9', date: { day: '05', month: '06' } }
    ],
    absents: [{ day: '06', month: '06' }]
  },
  {
    discipline: 'Computer Science',
    grades: [
      { grade: '10', date: { day: '09', month: '06' } },
      { grade: '9', date: { day: '06', month: '06' } },
      { grade: '10', date: { day: '03', month: '06' } }
    ],
    absents: [{ day: '01', month: '06' }]
  },
  {
    discipline: 'Art',
    grades: [
      { grade: '7', date: { day: '08', month: '06' } },
      { grade: '9', date: { day: '05', month: '06' } },
      { grade: '10', date: { day: '02', month: '06' } }
    ],
    absents: [{ day: '04', month: '06' }]
  },
  {
    discipline: 'Physical Education',
    grades: [
      { grade: '10', date: { day: '07', month: '06' } },
      { grade: '10', date: { day: '04', month: '06' } },
      { grade: '9', date: { day: '02', month: '06' } }
    ],
    absents: [{ day: '05', month: '06' }]
  }
];

let numberGrades = 0;
let numberAbsents = 0;
let finalGrade = 0;

subjects.forEach((item) => {
  numberGrades+=item.grades.length;
  numberAbsents+=item.absents.length;
  let grade = 0;
  for(let i=0;i<item.grades.length;i++)
    grade += Number(item.grades[i].grade);
  grade /= item.grades.length;

  finalGrade += grade;
})

finalGrade /= 10;

const stats = {
  numberGrades: numberGrades,
  numberAbsents: numberAbsents,
  finalGrade: finalGrade
} 

export { stats, subjects };

