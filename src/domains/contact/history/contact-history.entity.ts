import { Source } from '@domains/source/source.entity';
import { Connection } from '@graphql/libs/cursor-connection/connection.type';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Contact } from '../contact.entity';
import { Company } from '@domains/company/company.entity';
import { User } from '@domains/user/user.entity';
import { Medium } from '@domains/medium/medium.entity';

@ObjectType()
@Entity({ name: 'lead_history' })
export class ContactHistory extends BaseEntity {
    @Field(_type => ID, { nullable: true })
    @Column()
    @PrimaryGeneratedColumn()
    id: number;

    @Field(_type => Contact, { name: 'contact' })
    @ManyToOne(_type => Contact)
    @JoinColumn({ name: 'lead_id' })
    Contact?: Contact;

    @Field()
    @Column({ name: 'lead_id' })
    contact_id: number;

    @Field(_type => Company, { name: 'company' })
    @ManyToOne(_type => Company)
    @JoinColumn({ name: 'company_id' })
    Company?: Company;

    @Field({ nullable: true })
    @Column()
    company_id: number;

    @Field({ nullable: true })
    @Column()
    lead_id: number;

    @Field(_type => Source, { name: 'source', nullable: true })
    @OneToOne(_type => Source)
    @JoinColumn({ name: 'source_id' })
    Source: Source;

    @Column()
    source_id: number;

    @Field(_type => Medium, { name: 'medium', nullable: true })
    @OneToOne(_type => Medium)
    @JoinColumn({ name: 'medium_id' })
    Medium: Medium;

    @Column()
    medium_id: number;

    @Field(_type => User, { name: 'user' })
    @ManyToOne(_type => User)
    @JoinColumn({ name: 'account_id' })
    User?: User;

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



