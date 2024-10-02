import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MedicineService } from '../Services/medicine.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MedicineListComponent } from "../medicine-list/medicine-list.component";
import { Medicine } from '../../interfaces/medicine';
import { MedicineResource } from '../../interfaces/medicine-resource';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    MedicineListComponent,
    MatSnackBarModule 
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MedicineService]
})
export class DashboardComponent {
  searchForm: FormGroup;
  medicines: Medicine[] = [];
  searchError: string | null = null;
 

  constructor(private fb: FormBuilder, private medicineservice: MedicineService, private snackBar: MatSnackBar) {
    this.searchForm = this.fb.group({
      query: ['',[Validators.required, Validators.minLength(3)]]
    });
    console.log( localStorage.getItem('isLoggedIn'))
  }

  searchMedicines(): void {
    if (this.searchForm.valid) {
      const query = this.searchForm.value.query;
      this.medicineservice.searchMedicines(query).subscribe(
        (data: MedicineResource) => {
          if (data && data.data && data.data.result) {
            this.medicines = data.data.result.map(medicine => ({
              ...medicine,
              image: this.getImagePath()
            }));
            if (this.medicines.length === 0) {
              this.openSnackBar('Medicine not available!', 'Close');
            }
          } else {
            this.medicines = [];
          }
        },
        (error) => {
          console.log(error);
          this.medicines = [];
        }
      );
    } else {
      this.searchError = 'Please enter at least 3 characters to search for medicines.';
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top', 
      horizontalPosition: 'center'
    });
  }
  getImagePath(): string {
    return `assets/medicineImg.jpg`;
  }
}
