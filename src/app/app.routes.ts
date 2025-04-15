// app.routes.ts
import { Routes } from '@angular/router';

// app.routes.ts
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';

import { TeamListComponent } from './teams/team-list/team-list.component';
import { TeamFormComponent } from './teams/team-form/team-form.component';

import { PokedexListComponent } from './pokedex/pokedex-list/pokedex-list.component';
import { PokemonDetailComponent } from './pokedex/pokemon-detail/pokemon-detail.component';


export const routes: Routes = [
  { path: '', redirectTo: 'pokedex', pathMatch: 'full' },
  { path: 'pokedex', component: PokedexListComponent },
  { path: 'pokemon/:id', component: PokemonDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'teams',
    component: TeamListComponent,
    canActivate: [AuthGuard] // Solo usuarios logueados
  },
  {
    path: 'teams/new',
    component: TeamFormComponent,
    canActivate: [AuthGuard]
  }
];
