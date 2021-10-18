import { Component, OnInit } from '@angular/core';
import { Student } from './Student';
import { StudentService } from './student.service';


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
    this.studentService.getStudents().subscribe((data:any) => {
      console.log(data);
      this.studentList = data;
    })
  }

  delete(stundeId:number):void{
    console.log(stundeId);
  }
  
}
