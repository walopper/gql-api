import { ObjectType, Field, Int, ArgsType } from '@nestjs/graphql';
import { Cursor } from './cursor';

export interface ClassType<T = any> {
    new (...args: any[]): T;
}

export interface IPageInfo {
    startCursor: string;
    endCursor: string;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

@ObjectType({ description: 'Provides info abou the current page' })
export class PageInfo implements IPageInfo {
    @Field({ description: 'Cursor referencing the beginning of the page' })
    startCursor: string;

    @Field({ description: 'Cursor referencing the end of the page' })
    endCursor: string;

    @Field()
    hasPreviousPage: boolean;

    @Field()
    hasNextPage: boolean;
}

export interface IEdge<TNode> {
    cursor: string;
    node: TNode;
}

export interface IConnection<TNode> {
    totalCount: number;
    pageInfo: IPageInfo;
    edges: IEdge<TNode>[];
}

export interface IConnectionClass<TNode> {
    new (totalCount: number, pageInfo: IPageInfo, edges: IEdge<TNode>[]): IConnection<TNode>;
}

export const Connection = <TNode>(TNodeClass: ClassType<TNode>): IConnectionClass<TNode> => {
    @ObjectType(`${TNodeClass.name}Edge`, {
        description: `Provides ${TNodeClass.name} item and a cursor to its position`,
    })
    class EdgeClass implements IEdge<TNode> {
        @Field({ description: `The position of this ${TNodeClass.name} item` })
        public cursor: string;

        @Field(type => TNodeClass)
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

        @Field(type => Int, {
            description: `Total number of ${TNodeClass.name} items`,
        })
        public totalCount: number;

        @Field(type => PageInfo)
        public pageInfo: PageInfo;

        @Field(type => [EdgeClass])
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

    @Field(type => Int, { nullable: true })
    public first?: number;

    @Field({ nullable: true })
    public before?: string;

    @Field(type => Int, {
        nullable: true,
        description: 'Cursor to the item before which last n items will be taken',
    })
    public last?: number;
}

export interface IPaginateArgs {
    after?: string;
    first?: number;
    before?: string;
    last?: number;
    offset: number;
    limit: number;
}

export interface ICreateConnectionOptions<TNode> {
    paginationArgs: PaginationArgs;
    connectionClass: IConnectionClass<TNode>;
    defaultPageSize?: number;
    paginate(args: IPaginateArgs): Promise<[TNode[], number]>;
}

export const createConnection = async <TNode>({
    paginationArgs,
    connectionClass,
    defaultPageSize = 20,
    paginate,
}: ICreateConnectionOptions<TNode>): Promise<IConnection<TNode>> => {
    let offset = 0;
    let limit = paginationArgs.first || defaultPageSize;

    if (paginationArgs.after) {
        offset = Cursor.getOffset(paginationArgs.after) + 1;
    } else if (paginationArgs.before) {
        const beforeOffset = Cursor.getOffset(paginationArgs.before);
        limit = paginationArgs.last || limit;
        offset = beforeOffset - limit;
        if (offset < 0) {
            limit = beforeOffset;
            offset = 0;
        }
    }

    const result = await paginate({ ...paginationArgs, offset, limit });

    if (!Array.isArray(result)) {
        throw new Error('Result undefined');
    }

    const [nodes, totalCount] = result;

    const pageInfo: IPageInfo = {
        startCursor: Cursor.create(connectionClass.name, offset),
        endCursor: Cursor.create(connectionClass.name, offset + nodes.length),
        hasPreviousPage: offset > 0,
        hasNextPage: offset + nodes.length < totalCount,
    };

    const edges: IEdge<TNode>[] = nodes.map((node, index) => {
        return {
            cursor: Cursor.create(connectionClass.name, offset + index),
            node,
        };
    });

    return new connectionClass(totalCount, pageInfo, edges);
};
