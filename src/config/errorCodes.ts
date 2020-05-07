/**
 * _SERVER keys are graphql error codes
 */
export const _SERVER_ERRORS: ServerErrorsGroup = {
    GRAPHQL_VALIDATION_FAILED: {
        subcode: 'INPUT:VALIDATION_FAILED',
        errorType: 'UserInputError',
    },
    BAD_USER_INPUT: {
        subcode: 'INPUT:BAD_USER_INPUT',
        errorType: 'UserInputError',
    },
    UNAUTHENTICATED: {
        subcode: 'UNAUTHENTICATED',
        errorType: 'AuthenticationError',
    },
    INTERNAL_SERVER_ERROR: {
        subcode: 'INTERNAL_ERROR',
        errorType: 'InternalError',
    },
};

export const WHERE_INPUT: ErrorsGroup = {
    QUERY_TAKE_MAX_REACHED: {
        message: 'Max paging limit reached',
        subcode: 'QUERY:LIMIT_NUMBER_TO_BIG',
        errorType: 'UserInputError',
    },
    INVALID_EMAIL_ADDR: {
        message: 'Invalid form data',
        subcode: 'INPUT:INVALID_EMAIL',
        errorType: 'UserInputError',
    },
};
