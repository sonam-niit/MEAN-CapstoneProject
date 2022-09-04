import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  constructor(private service:UserService) { }
  users:User[]
  ngOnInit(): void {
    this.service.getAllUsers().subscribe(x=>this.users=x)
  }

  delete(id:string){
    this.users=this.users.filter(u=>u._id!==id)
    this.service.deleteUserById(String(id)).subscribe(x=>console.log(x));
  }
}
