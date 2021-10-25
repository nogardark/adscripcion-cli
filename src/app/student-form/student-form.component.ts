import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from '../student/Student';
import { StudentService } from '../student/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  formStudent:FormGroup;
  student!: Student;
  constructor(private formbuilder: FormBuilder,private studentService:StudentService) {

    this.formStudent = this.formbuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      birthDate:['', [Validators.required]]
    });
   }

  ngOnInit(): void {
  }
  onSubmit(){
    this.student = this.formStudent.value
    this.student.id =0;
    this.studentService.save(this.student).subscribe((data:any)=>{
      console.log(data);
    });
    this.formStudent.reset();
  }

}
