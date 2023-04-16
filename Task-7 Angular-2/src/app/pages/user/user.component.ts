import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users : any = []
  handelUser(e : any){
    console.log("added");
    
    this.users.push(e)
    console.log(this.users);
  }
  handelDelete(i:any){
    this.users.splice(i,1)
  }
  handelEdit(i:any){
    const newEmail = prompt("enter the new email")
    this.users[i].email = newEmail;
  }
}
