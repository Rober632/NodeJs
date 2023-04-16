import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() sendingUser = new EventEmitter<any>()
    userData :any = {name : '' , email : ''}
    handelAdd(){
    const obj = { name : this.userData.name , email : this.userData.email}
    this.sendingUser.emit(obj)
    }
}
