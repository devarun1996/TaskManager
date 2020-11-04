import { DummyComponent } from './dummy/dummy.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { HomeComponent } from './home/home.component';
import { SignupManagerComponent } from './signup-manager/signup-manager.component';
import { LoginManagerComponent } from './login-manager/login-manager.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserViewComponent } from './user-view/user-view.component';
import { LoginComponent } from './loginUser/login.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddEmpComponent } from './add-emp/add-emp.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "add-emp", component: AddEmpComponent},
  {path: "employees", component: TaskViewComponent},
  {path: "employees/:empId", component: TaskViewComponent},
  {path: "employees/:empId/add-task", component: AddTaskComponent},
  {path: "login-user", component:LoginComponent},
  {path: "user/:userId", component: UserViewComponent},
  {path: "signup-user", component: SignUpComponent},
  {path: "login-manager", component: LoginManagerComponent},
  {path: "signup-manager", component: SignupManagerComponent},
  {path: "home", component: HomeComponent},
  {path: "user/:userId/update-task/:taskId", component: UpdateTaskComponent},
  {path: "employees/:empId/edit-task/:taskId", component: EditTaskComponent},
  {path: "dummy/:empId", component: DummyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
