import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReq: WebRequestService) { }

  addEmp(name: string){
    return this.webReq.post("employee", { name });
  }

  createTask(task: string, empId: string, deadline: number){
    return this.webReq.post(`employee/${empId}/task`, { task, deadline });
  }

  loginUser(name: string, password: string){
    return this.webReq.post('login-user', { name, password });
  }

  loginManager(name: string, password: string){
    return this.webReq.post('login-manager', { name, password });
  }

   addUser(name: string, password: string){
     return this.webReq.post('register-user',{ name, password });
   }

   addManager(name: string, password: string){
    return this.webReq.post('register-manager',{ name, password });
  }

  getEmp(){
    return this.webReq.get("employee");
  }

  getTask(empId: string){
    return this.webReq.get(`employee/${empId}/task`);
  }
 
  getOneTask(empId: string, taskId: string){
    return this.webReq.get(`employee/${empId}/task/${taskId}`);
  }

  editTask(empId: string, taskId: string, task: string){
    return this.webReq.patch(`employee/${empId}/task/${taskId}`, {task});
  }

  updateTask(userId: string, taskId: string, note: string, progress: number){
    return this.webReq.patch(`employee/${userId}/task/${taskId}`, {note, progress});
  }

  updateDeadline(userId: string, taskId: string, deadline: number){
    return this.webReq.patch(`employee/${userId}/task/${taskId}`, { deadline });
  }

  deleteTask(empId: string, taskId: string){
    return this.webReq.delete(`employee/${empId}/task/${taskId}`);
  }

  deleteEmployee(empId: string){
    return this.webReq.delete(`employee/${empId}`);
  }
}
