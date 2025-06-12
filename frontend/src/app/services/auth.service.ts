import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserData } from '../polling.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSubject = new BehaviorSubject<UserData | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { 
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  saveUser(userData: User): Observable<UserData> {
    return this.http.post<UserData>(`/api/v1/user/save`, userData);
  }

  loginExistingUser(loginData : User): Observable<UserData> {
    return this.http.post<UserData>(`/api/v1/user/userLogin`, loginData);
  }
  
  getCurrentUser() {
      return JSON.parse(localStorage.getItem('currentUser') || '{}') as UserData;
  }

  setCurrentUser(usrData: UserData) {
      localStorage.setItem('currentUser', JSON.stringify(usrData));
      return this.currentUserSubject.next(usrData);
  }

  logoutUser() {
      localStorage.clear();
  }


}
