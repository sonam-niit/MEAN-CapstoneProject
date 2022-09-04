import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  baseUrl:string="http://localhost:8080/user/api/";

  getAllUsers():Observable<User[]>{
   return this.http.get<User[]>(this.baseUrl);
  }
  getUserById(id:string):Observable<User>{
    return this.http.get<User>(this.baseUrl+id);
  }
  deleteUserById(id:string){
   return this.http.delete(this.baseUrl+id);
  }
  addUser(user:User){
    return this.http.post(this.baseUrl,user);
  }
  editUser(user:User,id:string){
    return this.http.put(this.baseUrl+id,user);
  }
}
