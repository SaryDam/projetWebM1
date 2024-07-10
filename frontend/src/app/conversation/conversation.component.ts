import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { GraphqlService } from '../Services/graphql.service';
import { GetConversationMessagesQuery, Message } from '../graphql/generated';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription OnMessageAdded($conversationId: Int!) {
    messageAdded(conversationId: $conversationId) {
      id
      content
      timestamp
      user {
        id
        email
        name
      }
    }
  }
`;

interface MessageAddedSubscriptionResponse {
  messageAdded: Message;
}

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnInit,OnChanges {
  @Input() conversationId: number | undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['conversationId']) {
      this.loadMessage()
    }
  }

  onVariableChange() {
    console.log('Variable has changed:', this.conversationId);
    // Appelez ici la fonction souhaitée
  }

  newMessage: string = '';
  messages: GetConversationMessagesQuery['conversationMessages'] | undefined;
  userId: number = 1;

  constructor(private graphqlService: GraphqlService, private apollo: Apollo) {}

  ngOnInit(): void {
this.loadMessage()
  }


  loadMessage():void{
    if (this.conversationId) {
      console.log(this.conversationId);
      this.graphqlService.getConversationMessages(Number(this.conversationId)).subscribe(
        (messages) => {
          this.messages = messages;
          this.scrollToBottom();
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );

      this.apollo.subscribe<MessageAddedSubscriptionResponse>({
        query: MESSAGE_ADDED_SUBSCRIPTION,
        variables: {
          conversationId: this.conversationId,
        },
      }).subscribe({
        next: ({ data }) => {
          if (this.messages && data) {
            this.messages.push(data.messageAdded);
            this.scrollToBottom();
          }
        },
        error: (err) => {
          console.error('Error subscribing to messages:', err);
        },
      });
    }
  }
  sendMessage(): void {
    if (this.newMessage && this.newMessage.trim()) {
      this.graphqlService.sendMessage(this.userId, Number(this.conversationId), this.newMessage).subscribe(
        () => {
          this.newMessage = '';
          this.scrollToBottom();
        },
        (error) => {
          console.error('Error sending message:', error);
        }
      );
    }
  }

  private scrollToBottom(): void {
    try {
      const container = document.querySelector('.messages-list-container');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
}
