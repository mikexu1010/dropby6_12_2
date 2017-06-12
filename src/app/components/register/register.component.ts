import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';

import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  retypepwd: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user ={
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      retypepwd: this.retypepwd
    }

    //Required Fields
    if(!this.validateService.validateRegister(user)){
        this.flashMessage.show("Please fill in all fields!", {cssClass: 'alert-danger', timeout: 2000});
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show("Please enter a valid email!", {cssClass: 'alert-danger', timeout: 2000});
      return false;
    }

    if(!this.validateService.validatePassword(user.password,user.retypepwd)){
    this.flashMessage.show("Two passwords need to be the same!", {cssClass: 'alert-danger', timeout: 2000});
      return false;
    }

    //Regiseter User
    this.authService.registerUser(user).subscribe(data => {
      console.log(data);
      if(data.success){
        this.flashMessage.show("Register Success!", {cssClass: 'alert-success', timeout: 2000});
        this.router.navigate(['/login']);
      }else{
        switch(data.msg){
          case 'User already existed':
            this.flashMessage.show("User already existed", {cssClass: 'alert-danger', timeout: 2000});
            break;
          case 'Email already existed':
            this.flashMessage.show("Email already existed", {cssClass: 'alert-danger', timeout: 2000});
            break;
          case 'Password is too short':
              this.flashMessage.show("Password is too short", {cssClass: 'alert-danger', timeout: 2000});
              break;

          default:
            this.flashMessage.show("Oops! Something went wrong...", {cssClass: 'alert-danger', timeout: 2000});
            break;

        }

        this.router.navigate(['/register']);
      }

    });

  }


  loginhere(){
    this.router.navigate(['/login']);
  }

}
