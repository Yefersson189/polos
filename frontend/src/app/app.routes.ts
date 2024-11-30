import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ListProductoComponent } from './productos/list-producto/list-producto.component';
import { FormProductoComponent } from './productos/form-producto/form-producto.component';
import { ListUsuarioComponent } from './usuarios/list-usuario/list-usuario.component';
import { FormUsuarioComponent } from './usuarios/form-usuario/form-usuario.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guards';

export const routes: Routes = [
    {
        path: '',
        component: ListProductoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'productos/list',
        component: ListProductoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'productos/form/:id',
        component: FormProductoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'usuarios/list',
        component: ListUsuarioComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'usuarios/form/:id',
        component: FormUsuarioComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
