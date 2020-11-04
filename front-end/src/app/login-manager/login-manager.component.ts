import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-manager',
  templateUrl: './login-manager.component.html',
  styleUrls: ['./login-manager.component.scss']
})
export class LoginManagerComponent implements OnInit {

  constructor(private taskService: TaskService, private route: Router) { }

  ngOnInit(): void {


  }

  login(name: string, password: string){

        this.taskService.loginManager(name, password).subscribe((res: any) =>{
        //console.log(res);
        //localStorage.setItem("token", res.token);
        
        this.route.navigate(['/employees']);

        
      
      });

  }

}
