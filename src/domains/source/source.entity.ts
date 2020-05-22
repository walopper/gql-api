import { ObjectType, Field, ID } from "@nestjs/graphql";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Connection } from '@graphql/libs/cursor-connection/connection.type';

@ObjectType()
@Entity({ name: 'source' })
export class Source extends BaseEntity {

    @Field(_type => ID)
    @Column()
    @PrimaryGeneratedColumn()
    id: number;

    @Field({ nullable: true })
    @Column()
    campaign_id: number;

    @Field({ nullable: true })
    @Column()
    channel_id: number;

    @Field({ nullable: true })
    @Column()
    name: string;

    @Field({ nullable: true })
    @Column()
    description: string;

    @Field({ nullable: true })
    @Column()
    cost: number;

    @Field({ nullable: true })
    @Column()
    hash: string;

    @Field({ nullable: true })
    @Column()
    created_at: Date;

    @Field({ nullable: true })
    @Column()
    updated_at: Date;

}

@ObjectType()
export class SourceConnection extends Connection(Source) { }