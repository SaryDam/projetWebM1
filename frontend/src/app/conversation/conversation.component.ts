import { Component, Input, OnChanges, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { GraphqlService } from '../Services/graphql.service';
import { GetConversationMessagesQuery, Message } from '../graphql/generated';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

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
export class ConversationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() conversationId: number | undefined;
  newMessage: string = '';
  messages: GetConversationMessagesQuery['conversationMessages'] | undefined;
  userId: number =  Number(sessionStorage.getItem('ID-user'));

  private subscription: Subscription | undefined;

  constructor(private graphqlService: GraphqlService, private apollo: Apollo) {}

  ngOnInit(): void {
    if (this.conversationId) {
      this.loadMessagesAndSubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['conversationId'] && !changes['conversationId'].isFirstChange()) {
      this.loadMessagesAndSubscribe();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadMessagesAndSubscribe(): void {
    if (this.conversationId) {
      this.loadMessages();
      this.subscribeToNewMessages();
    }
  }

  loadMessages(): void {
    if (this.conversationId) {
      this.graphqlService.getConversationMessages(Number(this.conversationId)).subscribe(
        (messages) => {
          this.messages = messages;
          this.scrollToBottom();
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
    }
  }

  subscribeToNewMessages(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.apollo.subscribe<MessageAddedSubscriptionResponse>({
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

  sendMessage(): void {
    if (this.newMessage && this.newMessage.trim() && this.conversationId) {
      this.graphqlService.sendMessage(this.userId, Number(this.conversationId), this.newMessage).subscribe(
        () => {
          this.newMessage = '';
          this.scrollToBottom();
          location.reload()
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
