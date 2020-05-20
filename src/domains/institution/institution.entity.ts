import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IInstitution } from './institution.interface';

@ObjectType({ implements: IInstitution })
@Entity({ name: 'institution' })
//@Tree("nested-set")
export class Institution extends BaseEntity implements IInstitution {
    @Field(_type => ID)
    @Column()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    type: string;

    @Field()
    @Column()
    name: string;

    @Column()
    lft: number;

    @Column()
    rgt: number;

    @Field()
    @Column()
    level: number;
}
