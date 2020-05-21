import { Connection } from '@graphql/libs/cursor-connection/connection.type';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Contact } from '../contact.entity';

@ObjectType()
@Entity({ name: 'lead_history' })
export class ContactHistory extends BaseEntity {
    @Field(_type => ID, { nullable: true })
    @Column()
    @PrimaryGeneratedColumn()
    id: number;

    @Field(_type => Contact, { name: 'contact' })
    @ManyToOne(_type => Contact)
    @JoinColumn({ name: 'contact_id' })
    Contact?: Contact;

    @Field({ nullable: true })
    @Column()
    company_id: number;

    @Field({ nullable: true })
    @Column()
    lead_id: number;

    @Field({ nullable: true })
    @Column()
    source_id: number;

    @Field({ nullable: true })
    @Column()
    medium_id: number;

    @Field({ nullable: true })
    @Column()
    account_id: number;

    @Field({ nullable: true })
    @Column()
    department_id: number;

    @Field({ nullable: true })
    @Column()
    status: string;

    @Field({ nullable: true })
    @Column()
    lead_address: string;

    @Field({ nullable: true })
    @Column()
    resource_address: string;

    @Field({ nullable: true })
    @Column()
    destination_address: string;

    @Field({ nullable: true })
    @Column()
    quantity: number;

    @Field({ nullable: true })
    @Column()
    direction: string;

    @Field({ nullable: true })
    @Column()
    message: string;

    @Field({ nullable: true })
    @Column()
    vendor: string;

    @Field({ nullable: true })
    @Column()
    vendor_resource_id: Date;

    @Field({ nullable: true })
    @Column()
    created_at: Date;

    @Field({ nullable: true })
    @Column()
    updated_at: Date;
}

@ObjectType()
export class ContactHistoryConnection extends Connection(ContactHistory) { }



