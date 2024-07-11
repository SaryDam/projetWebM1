import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MessageService} from "./Services/message.service";
import { ConnexionPageComponent } from './connexion-page/connexion-page.component';
import { HomeChatComponent } from './home-chat/home-chat.component';
import { ListeConversationComponent } from './liste-conversation/liste-conversation.component';
import { ConversationComponent } from './conversation/conversation.component';
import {GraphQLConfigModule, GraphQLModule} from "./graphql.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConnexionPageComponent,
    HomeChatComponent,
    ListeConversationComponent,
    ConversationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GraphQLModule,
    GraphQLConfigModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
