import { IPageInfo } from './pageinfo.type';
import { IEdge } from './edge.type';
import { CursorHelper } from './cursor.helper';
import { IConnection, IConnectionClass, PaginationArgs } from './connection.type';
import { LimitOffsetPagingHelper } from './limit-offset-paging.helper';

interface IPaginateArgs {
    offset?: number;
    limit?: number;
    direction?: 'forward' | 'backward';
    nodeInfo?: any;
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
    paginate,
}: ICreateConnectionOptions<TNode>): Promise<IConnection<TNode>> => {
    const { limit, offset, cursor, direction } = LimitOffsetPagingHelper.getLimitOffset(paginationArgs);

    const result = await paginate({
        offset,
        limit,
        direction,
        nodeInfo: cursor ? CursorHelper.getInfo(cursor).nodeInfo : null,
    });

    if (!Array.isArray(result)) {
        throw new Error('Result undefined');
    }

    // eslint-disable-next-line prefer-const
    let [nodes, totalCount] = result;

    //Remove all results when we reach the limit of an backward pagination
    if (limit === 0) {
        nodes = [];
    }

    const edges: IEdge<TNode>[] = nodes.map((node, index) => {
        return {
            cursor: CursorHelper.create(connectionClass.name, (offset || 0) + index, node),
            node,
        };
    });

    const pageInfo: IPageInfo = {
        startCursor: nodes.length ? edges[0].cursor : undefined,
        endCursor: nodes.length ? edges[nodes.length - 1].cursor : undefined,
        hasPreviousPage: offset > 0,
        hasNextPage: limit === 0 || (offset || 0) + nodes.length < totalCount,
    };

    return new connectionClass(totalCount, pageInfo, edges);
};
