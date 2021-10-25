import { Component, OnInit } from '@angular/core';
import { Student } from './Student';
import { StudentService } from './student.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  columnsName: string[] = ['Id', '', 'Currency', 'Status', 'Options'];
  studentList: Student[] = [];
   
  constructor(private studentService: StudentService,private router:Router) { }

  ngOnInit(): void {
    this.initStudentList();
  }
  initStudentList() {
    this.studentService.getStudents().subscribe((data:any) => {
        this.studentList = data;
    })
  }

  delete(studentId:number):void{
    console.log(studentId);
    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Eliminar estudiante',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
       this.comfirmDelete(studentId)
      } 
    })
   
  }
  private comfirmDelete(studentId: number) {
    this.studentService.delete(studentId).subscribe((data:any)=>{
        if(data.deleted){
          this.initStudentList();
          Swal.fire(
            'Eliminado!',
            '',
            'success'
          )

        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.message,            
          })
        }
    })
  }
  edit(studentId:number){
    this.router.navigate(["editStudent",studentId]);
  }
}


