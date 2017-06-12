import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService,
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    console.log(this.username);
    console.log(this.password);
    const user = {
      username: this.username,
      password: this.password
    }
    console.log("11-----------------");
    console.log(this.username);
    console.log(this.password);
    console.log("0-----------------");
    console.log(user.username);
    console.log(user.username);

    this.authService.authenticateUser(user).subscribe(data => {
      console.log(data);
      if(data.success === true){
        this.flashMessage.show('Logged in', {cssClass: 'alert-success', timeout: 1000});
        this.router.navigate(['dashboard']);
        this.authService.storeUserData(data.token,data.user);

      }else{
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['login']);
        return false;
      }
    });
  }

  signuphere(){
    this.router.navigate(['/register']);
  }



}
