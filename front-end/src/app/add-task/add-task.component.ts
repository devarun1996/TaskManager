import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  empId: any;
    
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    this.route.params.subscribe((par) =>{
      //console.log(par.empId);
      this.empId = par.empId;
    });
  }

  createNewTask(task: string, deadline: number){
    this.taskService.createTask(task, this.empId, deadline).subscribe((res: any) =>{
      //console.log(res);
      this.router.navigate([ '/employees', res.empId ]);
    })
  }
}
