import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.scss']
})
export class AddEmpComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
  }

  addNewEmp(name: string){
    this.taskService.addEmp(name).subscribe((res: any) =>{
      console.log(res);
    
      this.router.navigate([ '/employees', res._id ]);
    });
  }

}
