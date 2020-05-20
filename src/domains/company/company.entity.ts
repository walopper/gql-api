import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IInstitution } from '../institution/institution.interface';
import { AInstitution } from '../institution/institution.abstract';
import { Connection } from '@graphql/libs/cursor-connection/connection.type';
import { Contact } from '@domains/contact/contact.entity';

@ObjectType({ implements: IInstitution })
@Entity({ name: 'company' })
export class Company extends AInstitution {
    @Field(_type => ID)
    @Column()
    @PrimaryColumn()
    id: number;

    @Field({ nullable: true })
    @Column()
    timezone: string;

    @Field({ nullable: true })
    @Column()
    is_active: boolean;

    @Field({ nullable: true })
    @Column()
    crm_is_active: boolean;

    @Field(_type => [Contact], { name: 'contacts' })
    @OneToMany(
        () => Contact,
        contact => contact.Company,
    )
    Contacts: Contact[];
}

@ObjectType()
export class CompanyConnection extends Connection(Company) { }

/*
@ObjectType()
@Entity({ name: 'company' })
export class Company extends Insti {
    @Field(_type => ID)
    @Column()
    @PrimaryGeneratedColumn()
    id: number;

    // @Field()
    // @Column()
    // industry: InstitutionIndustry;

    @Field()
    @Column()
    name: string;

    // @Field()
    // @Column()
    // timezone: Timezone;

    @Field()
    @Column()
    billing_customer_id: string;

    @Field()
    @Column()
    billing_subscription_id: string;

    @Field()
    @Column()
    level: number;

    @Field()
    @Column()
    is_active: Boolean;

    // @Field()
    // @Column()
    // parent: Institution;

    // @Field()
    // @Column()
    // children: Institution[];

    @Field()
    @Column()
    created_at: Date;

    @Field()
    @Column()
    product_crm_is_active: Boolean;

}
*/
