import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Connection } from '@graphql/libs/cursor-connection/connection.type';

@ObjectType()
@Entity({ name: 'medium' })
export class Medium extends BaseEntity {

    @Field(_type => ID)
    @Column()
    @PrimaryGeneratedColumn()
    id: number;

    @Field({ nullable: true })
    @Column()
    type: string;

    @Field({ nullable: true })
    @Column()
    slug: string;

    @Field({ nullable: true })
    @Column()
    is_chat: boolean;

    @Field({ nullable: true })
    @Column()
    is_active: boolean;

    @Field({ nullable: true })
    @Column()
    name_en: string;

    @Field({ nullable: true })
    @Column()
    name_es: string;

    @Field({ nullable: true })
    @Column()
    created_at: Date;

    @Field({ nullable: true })
    @Column()
    updated_at: Date;

}

@ObjectType()
export class MediumConnection extends Connection(Medium) { }


