import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'lead_stage' })
export class ContactStage extends BaseEntity {

    @Field(_ => ID, { nullable: true })
    @Column()
    @PrimaryColumn()
    id: number;

    @Field({ nullable: true })
    @Column()
    position: number;

    @Field({ nullable: true })
    @Column()
    name_es: string;

    @Field({ nullable: true })
    @Column()
    name_en: string;

    @Field({ nullable: true })
    @Column()
    slug: string;

}

