import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
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
  SendMessageMutation, GetAllUsersGQL, GetAllUsersQuery,

} from '../graphql/generated';

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
    private getAllUsersGQL: GetAllUsersGQL
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

  createUser(email: string, name: string, password: string): Observable<CreateUserMutation['createUser']> {
    return this.createUserGQL
      .mutate({ email, name, password })
      .pipe(map((result) => result.data!.createUser));
  }

  login(email: string, password: string): Observable<LoginMutation['login']> {
    return this.loginGQL
      .mutate({ email, password })
      .pipe(map((result) => result.data!.login));
  }

  createConversation(userIds: number[], name: string): Observable<CreateConversationMutation['createConversation']> {
    return this.createConversationGQL
      .mutate({ userIds, name })
      .pipe(map((result) => result.data!.createConversation));
  }

  sendMessage(userId: number, conversationId: number, content: string): Observable<SendMessageMutation['sendMessage']> {
    return this.sendMessageGQL
      .mutate({ userId, conversationId, content })
      .pipe(map((result) => result.data!.sendMessage));
  }


}
