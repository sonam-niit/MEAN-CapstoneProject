import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  constructor(private service:UserService,private route:ActivatedRoute) { }
  user:User;
  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id') ;
    this.service.getUserById(String(id)).subscribe(x=>this.user=x);
  }

}
