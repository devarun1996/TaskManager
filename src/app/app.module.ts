import { WebRequestService } from './web-request.service';
import { TaskService } from './task.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { HttpClientModule } from '@angular/common/http';
import { AddEmpComponent } from './add-emp/add-emp.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { LoginComponent } from './loginUser/login.component';
import { UserViewComponent } from './user-view/user-view.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginManagerComponent } from './login-manager/login-manager.component';
import { SignupManagerComponent } from './signup-manager/signup-manager.component';
import { HomeComponent } from './home/home.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { DummyComponent } from './dummy/dummy.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    AddEmpComponent,
    AddTaskComponent,
    LoginComponent,
    UserViewComponent,
    SignUpComponent,
    LoginManagerComponent,
    SignupManagerComponent,
    HomeComponent,
    UpdateTaskComponent,
    EditTaskComponent,
    DummyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    TaskService,
    WebRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
