export interface Payload {
    type: string;
    userId: number;
    iat?: number;
    expiresIn?: string;
}