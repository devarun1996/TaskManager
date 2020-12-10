import { ActivatedRoute } from '@angular/router';
import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {

  task:any;
  slider: any;

  constructor(private taskService: TaskService , private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((par) =>{
      
      this.taskService.getOneTask(par.userId, par.taskId).subscribe((res) =>{
        
        this.task = res;        
      });
    });
  }

  update(note: string, progress: number){
    this.taskService.updateTask(this.task.empId, this.task._id, note, progress).subscribe((res) =>{
      
    });

  }

  progress(slider){
      this.slider = slider;
  }
}
