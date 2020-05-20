import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Connection } from '@graphql/libs/cursor-connection/connection.type';
import { EmailAddress } from '@graphql/scalars/email-address.scalar';
import { ContactStage } from './stage/contact-stage.entity';
import { ContactStatus } from './status/contact-status.entity';
import { Company } from '@domains/company/company.entity';

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
    @Field(_type => ID, { nullable: true })
    @Column()
    @PrimaryGeneratedColumn()
    id: number;

    @Field(_type => Company, { name: 'company' })
    @ManyToOne(_type => Company)
    @JoinColumn({ name: 'company_id' })
    Company?: Company;

    @Column()
    company_id: number;

    @Field({ nullable: true })
    @Column()
    sex: ContactSex;

    @Field(_type => ContactStage, { name: 'stage', nullable: true })
    @OneToOne(_type => ContactStage)
    @JoinColumn({ name: 'stage_id' })
    Stage: ContactStage;

    @Column()
    stage_id: number;

    @Field(_type => ContactStatus, { name: 'status', nullable: true })
    @OneToOne(_type => ContactStatus)
    @JoinColumn({ name: 'status_id' })
    Status: ContactStatus;

    @Column()
    status_id: number;

    // @Field()
    // @Column()
    // status: string;

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

    // @Field()
    // @Column()
    // area: User;

    @Field({ nullable: true })
    @Column()
    first_name: string;

    @Field({ nullable: true })
    @Column()
    last_name: string;

    @Field({ nullable: true })
    @Column()
    birthdate: Date;

    @Field({ nullable: true })
    @Column()
    name: string;

    @Field(_type => EmailAddress, { nullable: true })
    @Column()
    email: string;

    @Field()
    @Column()
    phone_home: string;

    @Field()
    @Column()
    phone_office: string;

    @Field()
    @Column()
    phone_cel: string;

    @Field({ nullable: true })
    @Column()
    address1: string;

    @Field({ nullable: true })
    @Column()
    address2: string;

    @Field({ nullable: true })
    @Column()
    city: string;

    @Field({ nullable: true })
    @Column()
    postal_code: string;

    @Field({ nullable: true })
    @Column()
    follow_up_at: Date;

    @Field({ nullable: true })
    @Column()
    notes: string;

    @Field({ nullable: true })
    @Column()
    interest: string;

    @Field({ nullable: true })
    @Column()
    assigned_at: Date;

    @Field({ nullable: true })
    @Column()
    last_activity_at: Date;

    @Field({ nullable: true })
    @Column()
    last_communication_interaction_at: Date;

    @Field({ nullable: true })
    @Column()
    created_at: Date;

    @Field({ nullable: true })
    @Column()
    updated_at: Date;

    @Column()
    deleted_at: Date;

    getConnectionCursorInfo() {
        return { id: this.id };
    }
}

@ObjectType()
export class ContactConnection extends Connection(Contact) { }
