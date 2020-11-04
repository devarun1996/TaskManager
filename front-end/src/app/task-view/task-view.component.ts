import { TaskService } from './../task.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  employees: any;
  tasks: any;
  daysLeft: any;
  empId: any;
  timeUp: boolean = false;

  constructor(private taskService: TaskService , private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe((par) =>{
      //console.log(par);
      this.empId = par.empId;
      this.taskService.getTask(this.empId).subscribe((res) =>{
        //console.log(res);
        this.tasks = res;

        //Update deadlines before navigating... 
        //calculate days left
        var current = new Date();
        var days = 1000*60*60*24;
          
        for( let i=0; i<this.tasks.length; i++)
          {
            //console.log(this.tasks[i].timestamp)
            //console.log(current)
            var assigned = new Date(this.tasks[i].timestamp);
            var diff = current.getTime() - assigned.getTime();
            //console.log(Math.floor(diff/days), "days");
            //console.log(this.tasks[i].deadline)
            if(Math.floor(diff/days) > 0 && this.tasks[i].deadline != 0)
              {
                this.daysLeft = this.tasks[i].deadline - Math.floor(diff/days);
                this.taskService.updateDeadline(this.empId, this.tasks[i]._id, this.daysLeft).subscribe((res) =>{
                  // Deadline updated...
                  //console.log("deadline fn called!")
                })
              }
            }
        
        });
      });

    this.taskService.getEmp().subscribe((res) =>{
      console.log(res);
      this.employees = res;
    })
  }

  delete(empId: string, taskId: string){
    this.taskService.deleteTask(empId, taskId).subscribe((res) =>{
      //console.log(res);
      this.route.navigate(['/dummy', empId]);
    });
  }

  deleteEmp(empId: string){

    this.taskService.deleteEmployee(empId).subscribe((res) =>{
      console.log(res);
      this.route.navigate(['/employees']);
    })
  }
}
