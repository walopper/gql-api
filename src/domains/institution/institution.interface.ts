import { Field, ID, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class IInstitution {
    @Field(_type => ID)
    abstract id: number;

    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    level: number;
}
