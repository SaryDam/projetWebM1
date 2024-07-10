import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['Int']['output'];
  messages: Array<Message>;
  name: Scalars['String']['output'];
  users: Array<User>;
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  conversation: Conversation;
  id: Scalars['Int']['output'];
  timestamp: Scalars['DateTime']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createConversation: Conversation;
  createUser: User;
  login?: Maybe<User>;
  sendMessage: Message;
};


export type MutationCreateConversationArgs = {
  name: Scalars['String']['input'];
  userIds: Array<Scalars['Int']['input']>;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSendMessageArgs = {
  content: Scalars['String']['input'];
  conversationId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  conversation: Conversation;
  conversationMessages: Array<Message>;
  message: Message;
  user: User;
  userConversations: Array<Conversation>;
  users: Array<User>;
};


export type QueryConversationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryConversationMessagesArgs = {
  conversationId: Scalars['Int']['input'];
};


export type QueryMessageArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserConversationsArgs = {
  userId: Scalars['Int']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded: Message;
};


export type SubscriptionMessageAddedArgs = {
  conversationId: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  conversations: Array<Conversation>;
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  messages: Array<Message>;
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
};

export type GetUserQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, email: string, name: string } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, name: string, email: string }> };

export type GetUserConversationsQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type GetUserConversationsQuery = { __typename?: 'Query', userConversations: Array<{ __typename?: 'Conversation', id: number, name: string, users: Array<{ __typename?: 'User', id: number, name: string, email: string }> }> };

export type GetConversationMessagesQueryVariables = Exact<{
  conversationId: Scalars['Int']['input'];
}>;


export type GetConversationMessagesQuery = { __typename?: 'Query', conversationMessages: Array<{ __typename?: 'Message', id: number, content: string, timestamp: any, user: { __typename?: 'User', id: number, name: string, email: string } }> };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, email: string, name: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'User', id: number, email: string, name: string } | null };

export type CreateConversationMutationVariables = Exact<{
  userIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  name: Scalars['String']['input'];
}>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation: { __typename?: 'Conversation', id: number, name: string } };

export type SendMessageMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  conversationId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'Message', id: number, content: string, timestamp: any } };

export const GetUserDocument = gql`
    query getUser($id: Int!) {
  user(id: $id) {
    id
    email
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserGQL extends Apollo.Query<GetUserQuery, GetUserQueryVariables> {
    document = GetUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  users {
    id
    name
    email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllUsersGQL extends Apollo.Query<GetAllUsersQuery, GetAllUsersQueryVariables> {
    document = GetAllUsersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetUserConversationsDocument = gql`
    query getUserConversations($userId: Int!) {
  userConversations(userId: $userId) {
    id
    name
    users {
      id
      name
      email
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserConversationsGQL extends Apollo.Query<GetUserConversationsQuery, GetUserConversationsQueryVariables> {
    document = GetUserConversationsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetConversationMessagesDocument = gql`
    query getConversationMessages($conversationId: Int!) {
  conversationMessages(conversationId: $conversationId) {
    id
    content
    timestamp
    user {
      id
      name
      email
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetConversationMessagesGQL extends Apollo.Query<GetConversationMessagesQuery, GetConversationMessagesQueryVariables> {
    document = GetConversationMessagesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateUserDocument = gql`
    mutation createUser($email: String!, $name: String!, $password: String!) {
  createUser(email: $email, name: $name, password: $password) {
    id
    email
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateUserGQL extends Apollo.Mutation<CreateUserMutation, CreateUserMutationVariables> {
    document = CreateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    email
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateConversationDocument = gql`
    mutation createConversation($userIds: [Int!]!, $name: String!) {
  createConversation(userIds: $userIds, name: $name) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateConversationGQL extends Apollo.Mutation<CreateConversationMutation, CreateConversationMutationVariables> {
    document = CreateConversationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SendMessageDocument = gql`
    mutation sendMessage($userId: Int!, $conversationId: Int!, $content: String!) {
  sendMessage(userId: $userId, conversationId: $conversationId, content: $content) {
    id
    content
    timestamp
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SendMessageGQL extends Apollo.Mutation<SendMessageMutation, SendMessageMutationVariables> {
    document = SendMessageDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }