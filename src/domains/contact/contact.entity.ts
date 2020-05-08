import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../company/company.entity';
import { EmailAddress } from '../../graphql/scalars/email-address.scalar';
import { Connection } from '../../graphql/libs/cursor-connection/connection.type';

enum ContactSex {
    M = 'M',
    F = 'F',
}
registerEnumType(ContactSex, {
    name: 'Contact sex',
    description: 'Contact sex',
});

@ObjectType()
@Entity({ name: 'lead' })
export class Contact extends BaseEntity {
    @Field(_ => ID, { nullable: true })
    @Column()
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(_ => Company)
    @JoinColumn({ name: 'company_id' })
    Company?: Company;

    @Column()
    company_id: number;

    @Field({ nullable: true })
    @Column()
    sex: ContactSex;

    // @Field()
    // @Column()
    // stage: ContactStage;

    // @Field()
    // @Column()
    // status: ContactStatus;

    // @Field()
    // @Column()
    // campaign: Campaign;

    // @Field()
    // @Column()
    // source: Source;

    // @Field()
    // @Column()
    // owner: User;

    // @Field()
    // @Column()
    // assigner: User;

    @Field({ nullable: !!1 })
    @Column()
    first_name: string;

    @Field({ nullable: !!1 })
    @Column()
    last_name: string;

    @Field({ nullable: !!1 })
    @Column()
    birthdate: Date;

    @Field({ nullable: !!1 })
    @Column()
    name: string;

    @Field(_ => EmailAddress, { nullable: true })
    @Column()
    email: string;

    // @Field()
    // @Column()
    // phone_home: PhoneAddress;

    // @Field()
    // @Column()
    // phone_office: PhoneAddress;

    // @Field()
    // @Column()
    // phone_cel: PhoneAddress;

    @Field({ nullable: !!1 })
    @Column()
    address1: string;

    @Field({ nullable: !!1 })
    @Column()
    address2: string;

    @Field({ nullable: !!1 })
    @Column()
    city: string;

    @Field({ nullable: !!1 })
    @Column()
    postal_code: string;

    @Field({ nullable: !!1 })
    @Column()
    notes: string;

    @Field({ nullable: !!1 })
    @Column()
    interest: string;

    @Field({ nullable: !!1 })
    @Column()
    assigned_at: Date;

    @Field({ nullable: !!1 })
    @Column()
    last_activity_at: Date;

    @Field({ nullable: !!1 })
    @Column()
    follow_up_at: Date;

    @Field({ nullable: !!1 })
    @Column()
    last_communication_interaction_at: Date;

    @Field({ nullable: !!1 })
    @Column()
    created_at: Date;

    @Field({ nullable: !!1 })
    @Column()
    updated_at: Date;

    @Column()
    deleted_at: Date;

    getConnectionCursorInfo() {
        return { id: this.id };
    }
}

@ObjectType()
export class ContactConnection extends Connection(Contact) {}
