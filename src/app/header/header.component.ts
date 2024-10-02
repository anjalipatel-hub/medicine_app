import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn: any;
  authService = inject(AuthService)
  ngOnInit(): void {
    this.authService.getLoginStatus().subscribe((status) => {
      this.isLoggedIn = status;
    });
  }
  // ngOnChange(): {

  // }
}
