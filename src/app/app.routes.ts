import { RouterModule, Routes } from "@angular/router"
import { InicioSesionComponent } from "./inicio-sesion/inicio-sesion.component"
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
const APP_ROUTES: Routes=[
    {path:'inicio-sesion',component:InicioSesionComponent},
    {path:'navbar',component:NavbarComponent  },
    {path:'home',component:HomeComponent},
    {path:'**', pathMatch: 'full', redirectTo: 'home'},
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
