import _ from 'lodash';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { parseResolveInfo, ResolveTree, simplifyParsedResolveInfoFragmentWithType } from 'graphql-parse-resolve-info';

export const Fields = createParamDecorator(<TNode>(data: any, ctx: ExecutionContext) => {
    const resolverData = GqlExecutionContext.create(ctx);
    const info = resolverData.getInfo();

    const parsedResolveInfoFragment = parseResolveInfo(info) as ResolveTree;
    const simplifiedFragment = simplifyParsedResolveInfoFragmentWithType(parsedResolveInfoFragment, info.returnType);

    //Try to get connection cursor fields
    const connectionCursorFields = _.chain(simplifiedFragment)
        .get('fieldsByTypeName')
        .find()
        .get('edges.fieldsByTypeName')
        .find()
        .get('node.fieldsByTypeName')
        .find()
        .map('name')
        .value();

    if (connectionCursorFields.length > 0) {
        return connectionCursorFields;
    }

    return _.map(simplifiedFragment.fields, 'name');
});
