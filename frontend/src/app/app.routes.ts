import { Routes } from '@angular/router';
import { ListComponent } from './productos/list/list.component';
import { FormComponent } from './productos/form/form.component';

export const routes: Routes = [
    {
        path:'',
        component: ListComponent,
        title:'Listado de Productos'
    },
    {
        path:'productos/form/:id',
        component: FormComponent,
        title:'Formulario de productos'
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
    }
];
