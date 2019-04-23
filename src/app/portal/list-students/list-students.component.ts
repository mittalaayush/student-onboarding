import { Component, OnInit } from '@angular/core';
import { StudentService, StudentInterface } from 'src/app/student.service';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

  currentStudent : StudentInterface;
  students : StudentInterface[];
  categoryFilter : string = "All";
  studentFilter : string ="";
  constructor(public studentService: StudentService) { }

  ngOnInit() {
    this.studentService.fetchStudents();
    this.students = JSON.parse(localStorage.getItem('students'));
    if(this.students==null){
      this.students = this.studentService.students$.value;
      localStorage.setItem('students',JSON.stringify(this.students));
    }

  }

  onView(event,student:StudentInterface){ 
    this.studentService.currentMode = 'view'
    this.studentService.currentStudent = student;
  }

  onEdit(event,student:StudentInterface){ 
    this.studentService.currentMode = 'edit'
    this.studentService.currentStudent = student;
  }

  onDelete(event,student:StudentInterface){ 
    
    if (confirm("Are you sure you want to delete")){
    for (var i = this.students.length - 1; i >= 0; --i) {
      if (this.students[i].id == student.id) {
        this.students.splice(i,1);   
      }
  }
    localStorage.setItem('students',JSON.stringify(this.students));
    alert("Student Deleted")
  }
  else{alert("Delete Aborted")}
  }

  setCategory(){
    this.categoryFilter = (<HTMLInputElement>document.getElementById("Category")).value;
  }

  setStudentFilter(){
    this.studentFilter = (<HTMLInputElement>document.getElementById("searchStudent")).value;
  }

}
