import { Routes } from '@angular/router';
import { ListProductoComponent } from './productos/list-producto/list-producto.component';
import { FormProductoComponent } from './productos/form-producto/form-producto.component';
import { ListUsuarioComponent } from './usuarios/list-usuario/list-usuario.component';
import { FormUsuarioComponent } from './usuarios/form-usuario/form-usuario.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path:'',
        component: ListProductoComponent,
        title:'Listado de Productos'
    },
    {
        path:'productos/form/:id',
        component: FormProductoComponent,
        title:'Formulario de productos'
    },
    {
        path:'usuarios/list',
        component: ListUsuarioComponent,
        title:'Listado de usuarios'
    },
    {
        path:'usuarios/form/:id',
        component: FormUsuarioComponent,
        title:'Formulario de usuarios'
    },
    {
        path:'login',
        component: LoginComponent,
        title:'login'
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
    }
];
