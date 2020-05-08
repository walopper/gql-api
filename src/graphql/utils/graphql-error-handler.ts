import { GraphQLError } from 'graphql';
import { formatError as formatApolloError } from 'apollo-errors';
import { ApolloError } from 'apollo-server-express';
import { _SERVER_ERRORS } from '../../config/errorCodes';

/**
 * Error handler callback for apollo-server instance
 * @param error
 */
export const formatError = (error: GraphQLError): any => {
    // console.log('---> Original error: ', error);

    // const { code, type, message, subcode } = getErrorType(error);
    let subcode = error.extensions?.subcode;
    let errorType = error.extensions?.errorType;

    if (!error.extensions?.subcode && error.extensions?.code && _SERVER_ERRORS.hasOwnProperty(error.extensions.code)) {
        subcode = _SERVER_ERRORS[error.extensions.code].subcode;
        errorType = _SERVER_ERRORS[error.extensions.code].errorType;
    }

    const errorObject: ErrorObject = {
        message: error.message,
        code: error.extensions?.code,
        errorType,
        subcode,
    };

    if (process.env.NODE_ENV !== 'production') {
        errorObject.orignalError = error;
    }

    return formatApolloError(errorObject);
};

/**
 * ApolloError middleware
 */
export class ServerError extends ApolloError {
    constructor(body: ErrorObject, overwriteMessage?: string | null | undefined, properties?: Record<string, any>) {
        properties = {
            subcode: body.subcode,
            errorType: body.errorType,
        };
        super(overwriteMessage || body.message, body.errorType || 'Error', properties);
    }
}
