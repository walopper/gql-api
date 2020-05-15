
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EmailAddress } from '../../graphql/scalars/email-address.scalar';
import { Connection } from '../../graphql/libs/cursor-connection/connection.type';

enum UserSex {
    M = 'M',
    F = 'F',
}
registerEnumType(UserSex, {
    name: 'User sex',
    description: 'User sex',
});

@ObjectType()
@Entity({ name: 'account' })
export class User extends BaseEntity {
    @Field(_ => ID, { nullable: true })
    @Column()
    @PrimaryGeneratedColumn()
    id: number;

    @Field({ nullable: true })
    @Column()
    first_name: string;

    @Field({ nullable: true })
    @Column()
    last_name: string;

    @Field({ nullable: true })
    @Column()
    username: string;

    @Column({ select: false })
    password_hash: string;

    @Column({ select: false })
    password_salt: string;

    @Field({ nullable: true })
    @Column()
    last_login: string;

    @Field({ nullable: true })
    @Column()
    last_login_attempt: string;

    @Field({ nullable: true })
    @Column()
    sex: UserSex;

    @Field(_ => EmailAddress, { nullable: true })
    @Column()
    email: string;

    @Field({ nullable: true })
    @Column()
    phone: string;

    @Field({ nullable: true })
    @Column()
    phone_ext: string;

    @Field({ nullable: true })
    @Column()
    phone2: string;

    @Field({ nullable: true })
    @Column()
    phone2_ext: string;

    @Field({ nullable: true })
    @Column()
    internal_id: string;

    @Field({ nullable: true })
    @Column()
    language: string;

    @Field({ nullable: true })
    @Column()
    active: boolean;
}

@ObjectType()
export class UserConnection extends Connection(User) { }
