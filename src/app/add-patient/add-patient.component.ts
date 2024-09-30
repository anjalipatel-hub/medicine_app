import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MedicineService } from '../Services/medicine.service';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    HttpClientModule,
    CommonModule,
    MatSnackBarModule,
    MatDatepickerModule],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css',
  providers: [MedicineService, DatePipe],
})
export class AddPatientComponent {
  patientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private snackBar: MatSnackBar,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.patientForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: [''],
      zipcode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]], // ZIP code must be 6 digits
      dob: [''],
      blood_group: [''],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // Mobile must be 10 digits
      gender: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const formData = { ...this.patientForm.value };

      if (formData.dob) {
        formData.dob = this.datePipe.transform(formData.dob, 'yyyy-MM-dd');
      }

      this.medicineService.addPatient(formData).subscribe(
        (response) => {
          if (response.status_code == 0) {
            this.snackBar.open(response.status_message || 'Operation completed.', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          } else if (response.status_code == 1) {
            const patientId = response.data?.patient_id;
            this.snackBar.open(response.status_message || 'Form saved successfully', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
            const serializedData = JSON.stringify(formData);

            this.router.navigate(['/checkout'], {
              queryParams: {
                patientId: patientId,
                patientDetails: serializedData
              }
            });

          }
        },
        (error) => {
          this.snackBar.open('Error saving form. Please try again.', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
      );
    }
  }


}
