import { Field, ObjectType } from '@nestjs/graphql';

export interface IPageInfo {
    startCursor?: string;
    endCursor?: string;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

@ObjectType({ description: 'Provides info abou the current page' })
export class PageInfo implements IPageInfo {
    @Field({ description: 'Cursor referencing the beginning of the page', nullable: true })
    startCursor?: string;

    @Field({ description: 'Cursor referencing the end of the page', nullable: true })
    endCursor?: string;

    @Field()
    hasPreviousPage: boolean;

    @Field()
    hasNextPage: boolean;
}
