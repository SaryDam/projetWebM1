import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {GraphqlService} from "../Services/graphql.service";
import {GetAllUsersQuery, GetUserConversationsQuery, User} from "../graphql/generated";

@Component({
  selector: 'app-liste-conversation',
  templateUrl: './liste-conversation.component.html',
  styleUrls: ['./liste-conversation.component.css']
})
export class ListeConversationComponent {

  constructor(private router: Router,
              private graphqlService: GraphqlService) {}


  userId = 5; // ID de l'utilisateur, vous pouvez le changer dynamiquement selon vos besoins
  conversations: GetUserConversationsQuery['userConversations'] | undefined;
  showNewConversationModal : boolean = false;
  users: GetAllUsersQuery['users'] | undefined;
  ngOnInit(): void {
    this.graphqlService.getUserConversations(Number(this.userId)).subscribe(
      (conversations) => {
        this.conversations = conversations;
        this.loadUsers()
        console.log(this.conversations)

      },
      (error) => {
        console.error('Error fetching conversations:', error);
      }
    );
  }

  loadUsers(): void {
    this.graphqlService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }
  getMessage(idConversation: number) {
    this.router.navigate(['/chat',idConversation]);
  }


  openNewConversation(): void {
    this.showNewConversationModal = true;
  }

  closeNewConversation(): void {
    this.showNewConversationModal = false;
  }
  refreshConversations(): void {
    // Votre logique pour rafraîchir la liste des conversations
    // Exemple :
    this.graphqlService.getUserConversations(Number(this.userId)).subscribe(conversations => {
      this.conversations = conversations;
    });
  }
  createConversation(userIdEx: number): void {
    // Votre logique pour créer une nouvelle conversation
    // Exemple :
    this.graphqlService.createConversation([this.userId, userIdEx],"test").subscribe(() => {
      this.closeNewConversation();
      // Rafraîchir la liste des conversations après la création
      console.log("this.userId "+this.userId)
      console.log("userId "+userIdEx)
      this.refreshConversations();
      location.reload()
    });


  }


}
