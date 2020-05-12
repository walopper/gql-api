import { Resolver } from '@nestjs/graphql';
import { User } from './user.entity';

@Resolver(of => User)
export class UserResolver {

}
