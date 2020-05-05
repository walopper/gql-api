import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Contact } from '../contact/contact.entity';
import { IInstitution } from '../institution/institution.interface';
import { AInstitution } from '../institution/institution.abstract';

@ObjectType({ implements: IInstitution })
@Entity({ name: 'company' })
export class Company extends AInstitution {
    @Field(_ => ID)
    @Column()
    @PrimaryColumn()
    id: number;

    @Field()
    @Column()
    crm_is_active: boolean;

    @OneToMany(
        () => Contact,
        contact => contact.Company,
    )
    contacts: Contact[];
}

/*
@ObjectType()
@Entity({ name: 'company' })
export class Company extends Insti {
    @Field(_ => ID)
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
