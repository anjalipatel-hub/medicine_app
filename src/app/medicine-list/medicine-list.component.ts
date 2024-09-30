import { CommonModule } from '@angular/common';
import { Component, inject, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Medicine } from '../../interfaces/medicine';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MedicineService } from '../Services/medicine.service';
import { Store } from '@ngrx/store';
import { addToCart } from '../store/cart/cart.actions';
import { selectCartItems } from '../store/cart/cart.selectors';

@Component({
  selector: 'app-medicine-list',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatCardModule, MatPaginatorModule, MatSnackBarModule, MatIconModule],
  templateUrl: './medicine-list.component.html',
  styleUrl: './medicine-list.component.css',
  providers: [MedicineService]
})
export class MedicineListComponent {
  snackBar = inject(MatSnackBar);
  medicineService = inject(MedicineService);
  store = inject(Store);

  @Input() medicines: Medicine[] = [];
  displayedColumns: string[] = ['index', 'medicine_name', 'manufacturer_name', 'dosage_type', 'content', 'mrp', 'available_for_patient', 'add_to_cart'];
  dataSource = new MatTableDataSource<Medicine>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;



  ngOnInit(): void {
    this.dataSource.data = this.medicines;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(): void {
    if (this.medicines) {
      this.dataSource.data = this.medicines;
      if (this.paginator) {
        this.paginator.firstPage();
      }
    }
  }

  addToCart(medicine: Medicine): void {
    this.snackBar.open('Medicine added to cart successfully!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snack-bar-success']
    });

    this.store.dispatch(addToCart({ medicine }));
  }
}
