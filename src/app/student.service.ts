import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface StudentInterface {
  id : number;
  studentName:string; 
  category:string;
  domicile:boolean;
  birthCerti:boolean;
  marksheets:boolean;
  policeClearance : boolean;
  passport:boolean;
  declaration:boolean;
  dob:Date;
  fatherName:string;
  motherName:string;
  lastClassScore:number;
}

export interface AdminI{
  id :number,
  adminName: string,
  username : string,
   password:string
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students$: BehaviorSubject<StudentInterface[]> = new BehaviorSubject([]);
  admin$: BehaviorSubject<AdminI[]> = new BehaviorSubject([]);

  currentMode :string;
  currentStudent : StudentInterface = {
    id : null,
  studentName:null,
  category:null,
  domicile:null,
  birthCerti:null,
  marksheets:null,
  policeClearance : null,
  passport:null,
  declaration:null,
  dob:null,
  fatherName:null,
  motherName:null,
  lastClassScore:null
  };
  currentAdmin : AdminI;
  constructor(private http: HttpClient) { }

  fetchStudents() {

    this.students$.next(JSON.parse(localStorage.getItem('students')));
    // const url = '/assets/student.json';

    // this.http.get<StudentInterface[]>(url).subscribe(data => {
    //   this.students$.next(data);
    // });
  }

  fetchAdmins() {
    const url = '/assets/admin.json';

    this.http.get<AdminI[]>(url).subscribe(data => {
      this.admin$.next(data);
    });
  }

  updateStudent(student){
    // this.students$.next({...this.students$.value, ...student});
    var currentData = this.students$.getValue();
    for (var i = currentData.length - 1; i >= 0; --i) {
      if (currentData[i].id == student.id) {
        currentData[i] = student;   
      }
  }
    this.students$.next(currentData)
  }

  addStudent(student:StudentInterface) {
    console.log(student);
    const currentData = this.students$.getValue();
    console.log(currentData);

    if(currentData!=null)
    {const updatedData = [...currentData, student];
    this.students$.next(updatedData);
    }

    else
    {
      this.students$.next([student]); 
    }
    console.log(this.students$.value);

  }

}