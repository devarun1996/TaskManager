import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-manager',
  templateUrl: './signup-manager.component.html',
  styleUrls: ['./signup-manager.component.scss']
})
export class SignupManagerComponent implements OnInit {

  signup: boolean= false;
  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
  }

  addUser(name: string, password: string){
    
    this.taskService.addManager(name, password).subscribe((res: any) =>{
      console.log(res);
      if(res.success){
        this.signup = res.success; 
      }
    })
  }

}
