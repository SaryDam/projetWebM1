interface User {
    userId: number;
    username: string;
}

export interface GraphQLContext {
    req: { user: User };
}