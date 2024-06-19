import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'
import {ConnexionPageComponent} from "./connexion-page/connexion-page.component";
import {HomeChatComponent} from "./home-chat/home-chat.component";


const routes: Routes = [
  { path: '', component : ConnexionPageComponent },
  { path: 'home', component : HomeComponent },
  { path: 'chat', component : HomeChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
