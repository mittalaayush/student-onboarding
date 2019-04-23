import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { OnBoardingFormComponent } from './portal/on-boarding-form/on-boarding-form.component';
import { ListStudentsComponent } from './portal/list-students/list-students.component';


const route: Route[] = [
  {
    path: 'onBoardingForm',
    component: OnBoardingFormComponent
  },
  {
    path: 'listStudents',
    component: ListStudentsComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule
    , RouterModule.forRoot(route)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
