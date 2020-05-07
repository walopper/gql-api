import { GraphQLScalarType } from 'graphql';

export const EmailAddress = new GraphQLScalarType({
    name: 'EmailAddress',
    description: 'Mongo object id scalar type',
    serialize(value: string): string {
        return value;
    },
});
