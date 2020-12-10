import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  noTask: boolean;
  tasks: any;
  userId: any;
  daysLeft: number;

  constructor(private taskService: TaskService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
  }

  login(name: string, password: string){
    this.taskService.loginUser(name, password).subscribe((res: any) =>{
      //console.log(res);
      
      if(res){
        localStorage.setItem("token", res.token);
        this.userId = res.userData._id;
        
        if(res.userData == null){
          this.noTask = true;
        }
        
        else{
              //Update deadlines before navigating...
              //get tasks of user
              this.taskService.getTask(this.userId).subscribe((res) =>{
              this.tasks = res;   
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
                    this.taskService.updateDeadline(this.userId, this.tasks[i]._id, this.daysLeft).subscribe((res) =>{
                    // Deadline updated...
                    //console.log("deadline fn called!")
                    })
                 }
               }
      
            });
          
          this.route.navigate([`/user/${this.userId}`]);
        }
      }
    });
  }

}
