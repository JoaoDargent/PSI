// user-login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      (loggedIn) => {
        if (loggedIn) {
          // navigate to dashboard if login successful
          this.router.navigate(['/dashboard']);
        } else {
          // display error message if login failed
          alert('Invalid username or password');
        }
      }
    );
  }
  

  login() {
    // Handle form submission
    console.log('Logging in user:', this.username);
  }
}
