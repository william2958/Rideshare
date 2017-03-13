import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

@Injectable()
export class NavBarService {
	showLogin: Observable<boolean>;
	showSignUp: boolean;

	private showLoginSubject: Subject<boolean>;

	constructor() {
		this.showLoginSubject = new Subject<boolean>();
		this.showLogin = this.showLoginSubject.asObservable();
	}

	showLoginModal() {
		this.showLoginSubject.next(true);
	}

	showSignUpModal() {
		this.showSignUp = true;
	}

}