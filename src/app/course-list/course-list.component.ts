import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CourseList } from '../education-interface';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})

export class CourseListComponent implements OnInit {

  courseList = [
    {
      "courseName": "Angular",
      "duration": ["3 months", "6 months", "9 months"],
      "fees": [
        {
          "3 months": "8,000",
          "6 months": "10,000",
          "9 months": "13,000"
        }
      ]
    }, 
    {
      "courseName": "Java",
      "duration": ["3 months", "6 months", "12 months"],
      "fees": [
        {
          "3 months": "10,000",
          "6 months": "13,000",
          "12 months": "18,000"
        }
      ]
    },
    {
      "courseName": "React",
      "duration": ["2 months", "4 months", "6 months"],
      "fees": [
        {
          "2 months": "5,000",
          "4 months": "8,000",
          "6 months": "10,000"
        }
      ]
    },
    {
      "courseName": "NodeJS",
      "duration": ["3 months", "6 months", "8 months"],
      "fees": [
        {
          "3 months": "7,000",
          "6 months": "10,000",
          "8 months": "13,000"
        }
      ]
    }, 
  ]

  searchFormControl = new FormControl('');
  form!: FormGroup;
  options = [
     'Java' ,
     'Angular' ,
     'NodeJS' ,
     'React' 
  ];
  filteredOptions!: Observable<CourseList[]>
  selectedCourseList: any = [];
  courseDuration: any;
  courseFees: any
  selectedCourseFees: any = [];

  constructor(private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      courseList: this.formBuilder.array([this.createCourseFormGroup()])
    })
  }

  ngOnInit() {
      console.log('form ########', this.form);
  }

  /**
   * onCourseSelection method called when course selected from the dropdown checkbox
   */
  onCourseSelection() {
   console.log('course form value: ', this.searchFormControl.value);
   this.getSelectedCourseDetails(this.searchFormControl.value);
  }

  private createCourseFormGroup() {
   return new FormGroup({
      courseName: new FormControl(''),
      duration: this.formBuilder.array([]),
      fees: this.formBuilder.array([])
    })
  }

  /**
   * get the selected course object from the courseList
   * @param selectedCourses selected courses name in array of string
   */
  getSelectedCourseDetails(selectedCourses: any) {
    this.selectedCourseList = [];
    this.courseList.forEach((course: any) => {
      selectedCourses.forEach((selectedCourse: string) => {
        if (course.courseName === selectedCourse) {
          this.selectedCourseList.push(course);
        }
      });
    });
    console.log('selected course List: ', this.selectedCourseList);
  }

  courseDurationLevelChangeAction(courseDuration: any, courseName: any) {
    this.selectedCourseList.forEach((course: any) => {
      if (course.courseName === courseName) {
        course.fees.forEach((fee: any) => {
        this.getKeyByValue(fee, courseDuration);
        //console.log('filterted object: ', filteredObj);
        });
      }
    });
    console.log('selected fees: ', this.selectedCourseFees);
  }

  /**
   * get the course fees object value
   * @param object 
   * @param value 
   */
  getKeyByValue(object: any, value: any) {
   this.courseFees = object[value];
}

/**
 * delete course object from seletectedCourseList array
 * @param coursename get the delete course name
 */
onDeleteCourse(coursename: string) {
  const index = this.selectedCourseList.findIndex((course: any) => 
    course.courseName === coursename
  );
  this.selectedCourseList.splice(index, 1);
}

}
