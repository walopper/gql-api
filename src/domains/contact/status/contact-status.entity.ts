import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'lead_status' })
export class ContactStatus extends BaseEntity {

    @Field(_ => ID, { nullable: true })
    @Column()
    @PrimaryColumn()
    id: number;

    @Field({ nullable: true })
    @Column()
    stage_id: number;

    @Field({ nullable: true })
    @Column()
    type: string;

    @Field({ nullable: true })
    @Column()
    win_percentage: number;

    @Field({ nullable: true })
    @Column()
    is_active: boolean;

    @Field({ nullable: true })
    @Column()
    position: number;

    @Field({ nullable: true })
    @Column()
    name_es: string;

    @Field({ nullable: true })
    @Column()
    slug: string;

}

