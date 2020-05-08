import { Injectable } from '@nestjs/common';
import { PaginationArgs } from './connection.type';
import { CursorHelper } from './cursor.helper';

export class LimitOffsetPagingHelper {
    /**
     * Create a 'paging parameters' object as expected by most ORMs with 'limit' and 'offset' fields based on the incoming
     * cursor-paging arguments as spec'd by Relay.
     *
     * TODO: Handle the case when a user uses 'last' alone.
     */
    public static getLimitOffset(
        args: PaginationArgs,
    ): { limit?: number; offset?: number; cursor?: string; direction?: 'forward' | 'backward' } {
        const meta = this._checkPagingSanity(args);

        switch (meta.pagingType) {
            case 'forward': {
                return {
                    limit: meta.first,
                    offset: meta.after ? this._nextId(meta.after) : 0,
                    cursor: meta.after,
                    direction: meta.pagingType,
                };
            }
            case 'backward': {
                const { last, before } = meta;

                const cursor = before;
                let limit = last;
                let offset = this._getId(before) - last;

                // Check to see if our before-page is underflowing past the 0th item
                if (offset < 0) {
                    // Adjust the limit with the underflow value
                    limit = Math.max(last + offset, 0);
                    offset = 0;
                }

                return { offset, limit, cursor, direction: meta.pagingType };
            }
            default:
                return {};
        }
    }

    /**
     * Check if the pagination arguments supplied are valid and returns
     * @throws on invalid args
     * @param args
     */
    protected static _checkPagingSanity(args: PaginationArgs): PagingMeta {
        const after = args.after || undefined;
        const before = args.before || undefined;
        const first = args.first || 0;
        const last = args.last || 0;
        const isForwardPaging = !!first || !!after;
        const isBackwardPaging = !!last || !!before;

        if (isForwardPaging && isBackwardPaging) {
            if ((isForwardPaging && before) || (isBackwardPaging && after)) {
                throw new Error('paging must use either first/after or last/before');
            } else {
                throw new Error('cursor-based pagination cannot be forwards AND backwards');
            }
        }

        if ((isForwardPaging && first < 0) || (isBackwardPaging && last < 0)) {
            throw new Error('paging limit must be positive');
        }
        // This is a weird corner case. We'd have to invert the ordering of query to get the last few items then re-invert it when emitting the results.
        // We'll just ignore it for now.
        if (last && !before) {
            throw new Error("when paging backwards, a 'before' argument is required");
        }

        if (isForwardPaging) {
            return { pagingType: 'forward', after, first };
        } else if (isBackwardPaging) {
            return { pagingType: 'backward', before: before as string, last };
        } else {
            return { pagingType: 'none' };
        }
    }

    protected static _getId(cursor: string): number {
        return CursorHelper.getInfo(cursor).offset;
    }

    protected static _nextId(cursor: string): number {
        return this._getId(cursor) + 1;
    }
}

// eslint-disable-next-line @typescript-eslint/no-type-alias
type PagingMeta = ForwardPaging | BackwardPaging | NoPaging;
interface ForwardPaging {
    pagingType: 'forward';
    after?: string;
    first: number;
}
interface BackwardPaging {
    pagingType: 'backward';
    before: string;
    last: number;
}
interface NoPaging {
    pagingType: 'none';
}
