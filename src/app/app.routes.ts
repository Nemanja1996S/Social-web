import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { RegistrationComponent } from './registration/registration.component';

export const routes: Routes = [
    { path: '', component: LogInComponent },
    { path: 'registry', component: RegistrationComponent }
];
