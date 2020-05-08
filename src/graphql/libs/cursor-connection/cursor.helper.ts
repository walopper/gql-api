export class CursorHelper {
    public static create<TNode>(prefix: string, offset: number, node: TNode): string {
        let nodeInfo;

        //Get additional cursor info from the node object
        if (typeof node === 'object' && typeof node['getConnectionCursorInfo'] === 'function') {
            nodeInfo = node['getConnectionCursorInfo']();
        }

        const value = { c: prefix, o: offset, n: nodeInfo };

        return Buffer.from(JSON.stringify(value)).toString('base64');
    }

    public static getInfo(encodedValue: string) {
        let value;
        const decodedValue = Buffer.from(encodedValue, 'base64').toString('ascii');

        try {
            value = JSON.parse(decodedValue);
        } catch (e) {
            this.throwInvalidCursorError(encodedValue);
        }

        const offset = parseInt(value['o'], 10);
        if (Number.isNaN(offset)) {
            this.throwInvalidCursorError(encodedValue);
        }

        return {
            className: value['c'],
            offset,
            nodeInfo: value['n'],
        };
    }

    private static throwInvalidCursorError(encodedValue: string): never {
        const decodedValue = Buffer.from(encodedValue, 'base64').toString('ascii');
        throw new Error(`Invalid cursor: ${encodedValue} (${decodedValue})`);
    }
}
