import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  //form declared
  user: User = new User();
  registerForm: FormGroup;
  submitted: boolean = false;
  //builder dependency injected through constructor
  constructor(private builder: FormBuilder, 
    private service: UserService,private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.builder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],

    })
  }
  get form() {
    return this.registerForm.controls;
  }
  onSubmit(){
    this.submitted=true;
    if(this.registerForm.invalid)
    return;
    else{
      console.log(this.user)
      this.service.addUser(this.user).subscribe(x=>console.log(x));
      this.router.navigate(['list']);
    }
  }
}
