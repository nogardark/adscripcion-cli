import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../student/Student';
import { StudentService } from '../student/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  title="Nuevo Estudiante";
  formStudent:FormGroup;
  student!: Student;
  private id:Number;
  private edit=false;
  constructor(private formbuilder: FormBuilder,
              private route: ActivatedRoute,
              private studentService:StudentService) {
    this.id = this.route.snapshot.params['id']    
    if(this.id){
      this.title="Editar Estudiante";
      this.initStudent();
    }
    this.formStudent = this.formbuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      birthDate:['', [Validators.required]]
    });
   }
  

  ngOnInit(): void {
   
    
  }
  initStudent() {
    this.edit=true;
    this.studentService.getStudent(this.id).subscribe((data:any)=>{
      this.updateForm(data);      
    })
  }
  updateForm(student: Student) {    
      this.formStudent = this.formbuilder.group({
        name: [student.name, [Validators.required]],
        email: [student.email, [Validators.required]],
        birthDate:[student.birthDate, [Validators.required]]
      });
    
  }
  onSubmit(){
    if(this.edit){
     this.studentService.update(this.id,this.formStudent.value).subscribe((data:any)=>{
       console.log(data);
       
     });
    }else{
      this.student = this.formStudent.value
      this.student.id =0;
      this.studentService.save(this.student).subscribe((data:any)=>{
      console.log(data);
    });
    this.formStudent.reset();
    }
    
  }

}

