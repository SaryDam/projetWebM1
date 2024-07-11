import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {catchError, Observable, throwError} from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GetUserGQL,
  GetUserConversationsGQL,
  GetConversationMessagesGQL,
  CreateUserGQL,
  LoginGQL,
  CreateConversationGQL,
  SendMessageGQL,
  GetUserQuery,
  GetUserConversationsQuery,
  GetConversationMessagesQuery,
  CreateUserMutation,
  LoginMutation,
  CreateConversationMutation,
  SendMessageMutation,
  GetAllUsersGQL,
  GetAllUsersQuery,
  SendMessageMutationVariables,
  CreateUserMutationVariables,
  CreateConversationMutationVariables,

} from '../graphql/generated';
import gql from "graphql-tag";

const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($userId: Int!, $conversationId: Int!, $content: String!) {
    sendMessage(userId: $userId, conversationId: $conversationId, content: $content) {
      id
      content
      timestamp
    }
  }
`;


const CREATE_USER_MUTATION = gql`
  mutation CreateUser($email: String!, $name: String!, $password: String!) {
    createUser(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

const CREATE_CONVERSATION_MUTATION = gql`
  mutation CreateConversation($userIds: [Int!]!, $name: String!) {
    createConversation(userIds: $userIds, name: $name) {
      id
      name
      users {
        id
        email
        name
        messages {
          id
          content
        }
        conversations {
          id
          name
        }
      }
      messages {
        id
        content
        timestamp
        user {
          id
          name
        }
      }
    }
  }
`;



@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(
    private getUserGQL: GetUserGQL,
    private getUserConversationsGQL: GetUserConversationsGQL,
    private getConversationMessagesGQL: GetConversationMessagesGQL,
    private createUserGQL: CreateUserGQL,
    private loginGQL: LoginGQL,
    private createConversationGQL: CreateConversationGQL,
    private sendMessageGQL: SendMessageGQL,
    private getAllUsersGQL: GetAllUsersGQL,
    private apollo: Apollo
  ) {}

  getUser(id: number): Observable<GetUserQuery['user']> {
    return this.getUserGQL
      .fetch({ id })
      .pipe(map((result) => result.data.user));
  }

  getAllUsers(): Observable<GetAllUsersQuery['users']> {
    return this.getAllUsersGQL
      .watch()
      .valueChanges.pipe(map((result) => result.data.users));
  }

  getUserConversations(userId: number): Observable<GetUserConversationsQuery['userConversations']> {
    return this.getUserConversationsGQL
      .fetch({ userId })
      .pipe(map((result) => result.data.userConversations));
  }

  getConversationMessages(conversationId: number): Observable<GetConversationMessagesQuery['conversationMessages']> {
    return this.getConversationMessagesGQL
      .fetch({ conversationId })
      .pipe(map((result) => result.data.conversationMessages));
  }

  /*
  createUser(email: string, name: string, password: string): Observable<CreateUserMutation['createUser']> {
    return this.createUserGQL
      .mutate({ email, name, password })
      .pipe(map((result) => result.data!.createUser));
  }*/

  createUser(email: string, name: string, password: string): Observable<CreateUserMutation['createUser']> {
    return this.apollo
      .mutate<CreateUserMutation, CreateUserMutationVariables>({
        mutation: CREATE_USER_MUTATION,
        variables: {
          email,
          name,
          password,
        },
      })
      .pipe(
        map(result => result.data!.createUser),
        catchError(error => {
          console.error('GraphQL error:', error);
          return throwError(error);
        })
      );
  }
  login(email: string, password: string): Observable<LoginMutation['login']> {
    return this.loginGQL
      .mutate({ email, password })
      .pipe(map((result) => result.data!.login));
  }


  createConversation(userIds: number[], name: string): Observable<CreateConversationMutation['createConversation']> {
    return this.apollo
      .mutate<CreateConversationMutation, CreateConversationMutationVariables>({
        mutation: CREATE_CONVERSATION_MUTATION,
        variables: {
          userIds,
          name,
        },
      })
      .pipe(
        map(result => result.data!.createConversation),
      );
  }


  /*
  createConversation(userIds: number[], name: string): Observable<CreateConversationMutation['createConversation']> {
    return this.createConversationGQL
      .mutate({ userIds, name })
      .pipe(map((result) => result.data!.createConversation));
  }
*/

  /*
  sendMessage(userId: number, conversationId: number, content: string): Observable<SendMessageMutation['sendMessage']> {
    return this.sendMessageGQL
      .mutate({ userId, conversationId, content })
      .pipe(map((result) => result.data!.sendMessage));
  }
*/
  sendMessage(userId: number, conversationId: number, content: string): Observable<SendMessageMutation['sendMessage']> {
    return this.apollo
      .mutate<SendMessageMutation, SendMessageMutationVariables>({
        mutation: SEND_MESSAGE_MUTATION,
        variables: {
          userId,
          conversationId,
          content,
        },
      })
      .pipe(map((result) => result.data!.sendMessage));
  }

}
