import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'', redirectTo:'/list', pathMatch:'full'
    },
    {
        path:'list', loadComponent: ()=> import('./contact-list/contact-list.component').then(c=>c.ContactListComponent)
    }
];
