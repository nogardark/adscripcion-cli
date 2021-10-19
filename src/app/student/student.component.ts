import { Component, OnInit } from '@angular/core';
import { Student } from './Student';
import { StudentService } from './student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  columnsName: string[] = ['Id', '', 'Currency', 'Status', 'Options'];
  studentList: Student[] = [];
  noFound = false;
  private indice = 0;
  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.initStudentList();
  }
  initStudentList() {
    this.studentService.getStudents().subscribe((data:any) => {
        this.studentList = data;
    })
  }

  delete(stundeId:number):void{
    console.log(stundeId);
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
       this.comfirmDelete(stundeId)
      } 
    })
   
  }
  private comfirmDelete(stundeId: number) {
    this.studentService.delete(stundeId).subscribe((data:any)=>{
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
}


