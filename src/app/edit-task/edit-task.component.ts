import { ActivatedRoute } from '@angular/router';
import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  task: any;

  constructor(private taskService: TaskService , private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((par) =>{
      console.log(par.empId);
      this.taskService.getOneTask(par.empId, par.taskId).subscribe((res) =>{
        console.log(res);
        this.task = res;
        console.log(this.task.task, this.task.empId);
      });
    });
  }

  edit(task: string){
    this.taskService.editTask(this.task.empId, this.task._id, task).subscribe((res) =>{
      console.log(this.task.empId, this.task._id);
    });

  }

}
