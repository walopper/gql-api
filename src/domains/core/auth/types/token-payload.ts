export interface TokenPayload {
    type: 'USER' | 'INTERNAL';
    userId: number;
    iat?: number;
}
