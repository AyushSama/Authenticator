import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth.guard';
import { ReportsdataComponent } from './components/AccountSummary/reportsdata/reportsdata.component';

export const routes: Routes = [
    {
        path : '',
        redirectTo : 'login',
        pathMatch :'full'
    },
    {
        path : 'login',
        component : LoginComponent,
    },
    {
        path : 'signup',
        component : SignupComponent,
    },
    {
        path : 'home',
        component : HomeComponent,
        canActivate : [AuthGuard]
    },
    {
        path : 'reportsdata',
        component : ReportsdataComponent,
        canActivate : [AuthGuard]
    }
];
