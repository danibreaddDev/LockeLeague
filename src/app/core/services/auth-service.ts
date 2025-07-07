import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private _currentUser = new BehaviorSubject(null);
currentUser$ = this._currentUser.asObservable()
  constructor() { }
  login(){
    const userstring = localStorage.getItem('user');
    if (userstring) {
      const user =  JSON.parse(userstring)
  this._currentUser.next(user)
  console.log(this.currentUser$);
  
  
    }
   
   
  }
  register(){
    const user = {
      id: '1',
      username: 'danibreadd',
      password: '123456',
      role: ['admin','user']
    }
    localStorage.setItem("user",JSON.stringify(user));
  }
}
