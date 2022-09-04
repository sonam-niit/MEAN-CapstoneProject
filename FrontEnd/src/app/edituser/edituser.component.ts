import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

    //form declared
    user: User = new User();
    id:string |null;
    registerForm: FormGroup;
    submitted: boolean = false;
    //builder dependency injected through constructor
    constructor(private builder: FormBuilder, 
      private service: UserService,private router:Router,private route:ActivatedRoute) { }
  
    ngOnInit(): void {
      this.id=this.route.snapshot.paramMap.get('id');
      this.service.getUserById(String(this.id)).subscribe(x=>this.user=x);
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
        this.service.editUser(this.user,String(this.id)).subscribe(x=>console.log(x));
        this.router.navigate(['list']);
      }
    }

}
