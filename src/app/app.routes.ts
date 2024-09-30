import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MedicineListComponent } from './medicine-list/medicine-list.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard', component: DashboardComponent, 
        children: [
            {
                path: 'medicine-list',
                component: MedicineListComponent,
                children: [
                    {
                        path: 'checkout',
                        component: CheckoutComponent
                    }
                ]
            },
        ]
    },
    { path: 'add-patient', component: AddPatientComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: '**', redirectTo: '' }
];
