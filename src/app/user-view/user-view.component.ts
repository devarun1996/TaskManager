import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  tasks: any;
  userId: any;

  constructor(private taskService: TaskService , private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((par) =>{
      //console.log(par);
      this.userId = par.userId;
      this.taskService.getTask(par.userId).subscribe((res) =>{
      this.tasks = res;   
        
      });
    });
  }

}
