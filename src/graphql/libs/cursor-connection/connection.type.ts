import { ObjectType, Field, Int, ArgsType } from '@nestjs/graphql';
import { IEdge } from './edge.type';
import { IPageInfo, PageInfo } from './pageinfo.type';
import { Type } from '@nestjs/common';

export interface IConnection<TNode> {
    totalCount: number;
    pageInfo: IPageInfo;
    edges: IEdge<TNode>[];
}

export interface IConnectionClass<TNode> {
    new(totalCount: number, pageInfo: IPageInfo, edges: IEdge<TNode>[]): IConnection<TNode>;
}

export const Connection = <TNode>(TNodeClass: Type<TNode>): IConnectionClass<TNode> => {
    @ObjectType(`${TNodeClass.name}Edge`, {
        description: `Provides ${TNodeClass.name} item and a cursor to its position`,
    })
    class EdgeClass implements IEdge<TNode> {
        @Field({ description: `The position of this ${TNodeClass.name} item` })
        public cursor: string;

        @Field(_type => TNodeClass)
        public node: TNode;
    }

    @ObjectType(`${TNodeClass.name}Connection`, {
        isAbstract: true,
        description: `Provides paginated ${TNodeClass.name} data`,
    })
    class ConnectionClass implements IConnection<TNode> {
        constructor(totalCount: number, pageInfo: PageInfo, edges: EdgeClass[]) {
            this.totalCount = totalCount;
            this.pageInfo = pageInfo;
            this.edges = edges;
        }

        @Field(_type => Int, {
            description: `Total number of ${TNodeClass.name} items`,
        })
        public totalCount: number;

        @Field(_type => PageInfo)
        public pageInfo: PageInfo;

        @Field(_type => [EdgeClass])
        public edges: EdgeClass[];
    }

    return ConnectionClass;
};

@ArgsType()
export class PaginationArgs {
    @Field({
        nullable: true,
        description: 'Cursor to the item after which first n items will be taken',
    })
    public after?: string;

    @Field(_type => Int, { nullable: true })
    public first?: number;

    @Field({ nullable: true })
    public before?: string;

    @Field(_type => Int, {
        nullable: true,
        description: 'Cursor to the item before which last n items will be taken',
    })
    public last?: number;
}
