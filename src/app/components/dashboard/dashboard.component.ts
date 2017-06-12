import { Component, OnInit } from '@angular/core';
import {AuthService} from  '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashstate: String;
  formstate: String;
  packagestate: Number;

  username: String;

  startpoint: String;
  destination: String;

  pickupdate: String;
  pickuptime: String;
  recipient: String;
  recipient_phone: String;

  order: Object;
  all_packages: Object;
  package_amount: Number;

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit() {
    console.log("asdfjnlmk/bgdsfga;sedlfjse-idlkgfhbnlksajgvfsdb");
    this.dashstate = '1';
    this.formstate = '1';
    this.authService.getProfile().subscribe(profile =>{
      this.username = profile.user.username;
      this.onViewPackages();
    },
    err => {
      console.log(err);
      return false;
    });
  }

  dashchange(pram){

    switch(pram){
      case 1:
      this.dashstate = "1";
      break;

      case 2:
      this.dashstate = "2";
      break;

      case 3:
      this.dashstate = "3";
      break;

      default:
      console.log("err...");
      break;
    }
  }

  formchange(pram){
    switch(pram){
      case 1:
      this.formstate = "1";
      break;

      case 2:
      this.formstate = "2";
      break;

      case 3:
      this.formstate = "3";
      break;

      case 4:
      this.formstate = "4";
      break;

      default:
      console.log("err...");
    }
  }

  onOrderSubmit(){
    const order ={
      username: this.username,
      startpoint: this.startpoint,
      destination: this.destination,
      pickupdate: this.pickupdate,
      pickuptime: this.pickuptime,
      recipient: this.recipient,
      recipient_phone: this.recipient_phone
    }
    console.log(order);

    this.authService.createOrder(order).subscribe(data => {
      console.log(data);
      console.log(data.success);
      console.log(data.msg);
    });
  }

  onViewPackages(){
    console.log("Hi ZONG!!!");
    console.log(this.username);
    const username = this.username;
    this.authService.retrievePackage(username).subscribe(order =>{
      console.log("profile!!!!!!!!!!!!!!!!!!");
      console.log(order);
      console.log(order.length);
      console.log("-------------------");
      this.package_amount = order.length;
      for(var i=0; i<order.length; i++){
        console.log(i);
        console.log(order[i]);
      }
      this.all_packages = order;
      this.packagestate = 0;
      this.order = this.all_packages[Number(this.packagestate)];
    },
    err => {
      console.log(err);
      return false;
    });

  }

  packagechange(i){
    console.log("packagechange");
    switch(i){
      case 'previous':
      this.packagestate = Number(this.packagestate) - Number(1);
      this.order = this.all_packages[Number(this.packagestate)];
      break;

      case 'next':
      this.packagestate = Number(this.packagestate) + Number(1);
      this.order = this.all_packages[Number(this.packagestate)];
      break;

      default:
      console.log("error occured");
      break;
    }
  }

  test(){
    console.log("HELLO WORLD!!!!!!!!!!!!!!!");
  }

}
