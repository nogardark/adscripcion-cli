import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {path:'', component: StudentComponent},
  {path:'addStudent',component:StudentFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
