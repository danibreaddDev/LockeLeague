import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('./pages/home/home').then(m=> m.Home),
        
    },
    {
        path: 'menu',
        loadComponent: ()=> import('./pages/menu/menu').then(m=> m.Menu)
        
    },
    {
        path:'',
        loadChildren : ()=> import('./pages/lockes/lockes.routes')
    }
    
];
