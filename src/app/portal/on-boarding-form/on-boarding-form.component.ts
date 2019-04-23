import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService, StudentInterface} from 'src/app/student.service';

@Component({
  selector: 'app-on-boarding-form',
  templateUrl: './on-boarding-form.component.html',
  styleUrls: ['./on-boarding-form.component.css']
})
export class OnBoardingFormComponent implements OnInit {

  onBoardingForm: FormGroup;
  
  students : StudentInterface[];
  categories = ['International', 'Domestic'];
  currentDOB : string;
  ngOnInit() {
   
  }

  constructor(public studentService: StudentService,public fb: FormBuilder ) {
    
    this.studentService.fetchStudents();
   // const sub = this.studentService.fetchStudents().subscribe(data => {
    //     this.students = data;
    // });
    this.students = JSON.parse(localStorage.getItem('students'));

    if(this.studentService.currentMode!='create'){
    this.onBoardingForm = this.fb.group({
      studentName: [this.studentService.currentStudent.studentName, Validators.required],
      category: [this.studentService.currentStudent.category,Validators.required],
      domicile: [this.studentService.currentStudent.domicile,Validators.required],
      birthCertificate : [this.studentService.currentStudent.birthCerti,Validators.required],
      marksheets : [this.studentService.currentStudent.marksheets,Validators.required],
      policeClearance : [this.studentService.currentStudent.policeClearance],
      passport : [this.studentService.currentStudent.passport],
      declaration : [this.studentService.currentStudent.declaration,Validators.required],
      dob : [this.studentService.currentStudent.dob],
      fathersName : [this.studentService.currentStudent.fatherName],
      mothersName : [this.studentService.currentStudent.motherName],
      lastClassScore : [this.studentService.currentStudent.lastClassScore]
    });
  }
  else{
    this.onBoardingForm = this.fb.group({
      studentName: ['', Validators.required],
      category: ['',Validators.required],
      domicile: ['',Validators.required],
      birthCertificate : ['',Validators.required],
      marksheets : ['',Validators.required],
      policeClearance : [''],
      passport : [''],
      declaration : ['',Validators.required],
      dob : [''],
      fathersName : [],
      mothersName : [],
      lastClassScore : []
    });
  }

   }

   onBoardStudent(){
    
    if(this.onBoardingForm.value.studentName==null){
      alert("Name not given : student not onboarded");
      return;
    }
    if(this.onBoardingForm.value.studentName.length<3){
      alert("Name has to atleast of 3 characters : student not onboarded");
      return;
    }
    if(this.onBoardingForm.value.category==null){
      alert("Category not given : student not onboarded");
      return;
    }
    if(this.onBoardingForm.value.domicile==null||this.onBoardingForm.value.domicile==false){
      alert("Domicile not submitted : student not onboarded");
      return;
    }
    if(this.onBoardingForm.value.birthCertificate==null||this.onBoardingForm.value.birthCertificate==false){
      alert("Birth Certificate not submitted : student not onboarded");
      return;
    }
    if(this.onBoardingForm.value.marksheets==null||this.onBoardingForm.value.marksheets==false){
      alert("marksheets not submitted : student not onboarded");
      return;
    }
    if(this.onBoardingForm.value.category=='International'){
    if(this.onBoardingForm.value.policeClearance==null||this.onBoardingForm.value.policeClearance==false){
      alert("Police Clearance Doc not submitted : student not onboarded");
      return;
    }
    if(this.onBoardingForm.value.passport==null||this.onBoardingForm.value.passport==false){
      alert("Passport Doc not submitted : student not onboarded");
      return;
    }

  }
  if(this.onBoardingForm.value.declaration==null||this.onBoardingForm.value.declaration==false){
    alert("Signed declaration Doc not submitted : student not onboarded");
    return;
  }

    const student = {
        id : 0,
  studentName:this.onBoardingForm.value.studentName,
  category:this.onBoardingForm.value.category,
  domicile:this.onBoardingForm.value.domicile,
  birthCerti:this.onBoardingForm.value.birthCertificate,
  marksheets:this.onBoardingForm.value.marksheets,
  policeClearance : this.onBoardingForm.value.policeClearance,
  passport : this.onBoardingForm.value.passport,
  declaration : this.onBoardingForm.value.declaration,
  dob:new Date(this.onBoardingForm.value.dob),
  fatherName:this.onBoardingForm.value.fathersName,
  motherName:this.onBoardingForm.value.mothersName,
  lastClassScore:this.onBoardingForm.value.lastClassScore
      }

      if(this.studentService.currentMode=='edit'){
        student.id = this.studentService.currentStudent.id;
        if(student.dob==null || student.dob==undefined)
        {
        student.dob = this.studentService.currentStudent.dob;}
        for (var i = this.students.length - 1; i >= 0; --i) {
          if (this.students[i].id == student.id) {
            this.students[i] = student;
            this.studentService.updateStudent(student);
            break;   
          }
      }
      }
      else{
      if(this.studentService.students$.value!=null && this.studentService.students$.value.length>0){
        student.id = this.studentService.students$.value[this.studentService.students$.value.length-1].id+1;
      }
     this.studentService.addStudent(student);
    }
      this.studentService.currentStudent = null;
     localStorage.setItem('students',JSON.stringify(this.studentService.students$.value));
  }
}
