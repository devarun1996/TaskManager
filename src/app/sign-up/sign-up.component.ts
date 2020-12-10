import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signup: boolean = false;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
  }

  addUser(name: string, password: string){
    
    this.taskService.addUser(name, password).subscribe((res: any) =>{
      console.log(res);
      if(res.success){
        this.signup = res.success; 
      }
    })
  }
}
