import { TAcademicSemesterCode, TAcademicSemesterName, TAcademicSemesterNameCodeMapper, TMonth } from "./academicSemester.interface";
export const Months: TMonth[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    autum : '01',
    summer : '02',
    fall : '03'
}

  export const academicSemesterName : TAcademicSemesterName[] = ['autum', 'summer', 'fall']
  export const academicSemesterCode : TAcademicSemesterCode[] = ['01', '02', '03']