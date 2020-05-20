import { Connection } from '@graphql/libs/cursor-connection/connection.type';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EmailAddress } from '@graphql/scalars/email-address.scalar';
import { AInstitution } from '@domains/institution/institution.abstract';
import { IInstitution } from '@domains/institution/institution.interface';

@ObjectType({ implements: IInstitution })
@Entity({ name: 'account' })
export class Account extends AInstitution {
    @Field(_type => ID)
    @Column()
    @PrimaryColumn()
    id: number;

    @Field({ nullable: true })
    @Column()
    institution_id: number;

    @Field({ nullable: true })
    @Column()
    organization_id: number;

    @Field({ nullable: true })
    @Column()
    company_id: number;

    @Field({ nullable: true })
    @Column()
    staff_id: number;

    @Field({ nullable: true })
    @Column()
    first_name: string;

    @Field({ nullable: true })
    @Column()
    last_name: string;

    @Field({ nullable: true })
    @Column()
    username: string;

    @Field({ nullable: true })
    @Column()
    password_hash: string;

    @Field({ nullable: true })
    @Column()
    password_salt: string;

    @Field({ nullable: true })
    @Column()
    last_login: string;

    @Field({ nullable: true })
    @Column()
    last_login_attempt: string;

    @Field({ nullable: true })
    @Column()
    login_tries: string;

    @Field({ nullable: true })
    @Column()
    sex: string;

    @Field(_type => EmailAddress, { nullable: true })
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
    receive_email_notifications: boolean;

    @Field({ nullable: true })
    @Column()
    receive_sms_notifications: boolean;

    @Field({ nullable: true })
    @Column()
    config_method_call_bypass_manual_confirmation: boolean;

    @Field({ nullable: true })
    @Column()
    config_method_call_allow_multiple_calls: boolean;

    @Field({ nullable: true })
    @Column()
    active: boolean;

    @Field({ nullable: true })
    @Column()
    activation_key: string;

    @Field({ nullable: true })
    @Column()
    activation_key_expires_at: Date;

    @Field({ nullable: true })
    @Column()
    remember_me_hash: string;

    @Field({ nullable: true })
    @Column()
    password_key: string;

    @Field({ nullable: true })
    @Column()
    password_key_expires_at: Date;

    @Field({ nullable: true })
    @Column()
    updated_at: Date;

    @Column()
    deleted_at: Date;

}

@ObjectType()
export class AccountConnection extends Connection(Account) { }
