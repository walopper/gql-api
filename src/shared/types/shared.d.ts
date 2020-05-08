type Scalar = boolean | number | string;
type ObjectLiteral = {
    [key: string]: any;
};

/** Error handler types */
type ErrorObject = {
    message: string;
    code?: string;
    subcode: string;
    errorType: 'UserInputError' | 'InternalError' | 'AuthenticationError' | 'AuthorizationError';
    orignalError?: any;
};

type ErrorsGroup = {
    [key: string]: ErrorObject;
};

type ServerErrorsGroup = {
    [key: string]: ServerErrorsObject;
};

type ServerErrorsObject = {
    subcode: string;
    errorType: 'UserInputError' | 'InternalError' | 'AuthenticationError' | 'AuthorizationError';
};