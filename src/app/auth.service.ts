import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  setLoginStatus(status: boolean) {
    this.isLoggedInSubject.next(status);
  }

  getLoginStatus(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
}
