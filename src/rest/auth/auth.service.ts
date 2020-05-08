import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { Payload } from '@shared/types/payload';
import { UserService } from '@//domains/user/user.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService) { }

    async signPayload(payload: Payload) {
        return sign(payload, 'jwt-secret', { expiresIn: '12h' });
    }

    async validateUser(payload: Payload) {
        const sessionToken = payload.token;
        return sessionToken || null;
    }

    createToken(payload: any): string {
        return bcrypt.hashSync(JSON.stringify(payload), 10);
    }

}