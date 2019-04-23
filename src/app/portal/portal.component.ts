import { Component, OnInit } from '@angular/core';
import { StudentService, AdminI } from '../student.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  admin : AdminI;
  

  constructor(public studentService: StudentService) {
    this.admin = JSON.parse(localStorage.getItem('admin'));
    this.studentService.currentMode = 'create';
   }

  ngOnInit() {
  }

}
