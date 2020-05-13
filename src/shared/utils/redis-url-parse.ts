import url from 'url';

type RedisConnectionConfig = {
    host?: string;
    port?: number;
    password?: string;
    db?: number;
};

export const redisUrlParse = function(redisUrl) {
    const options: RedisConnectionConfig = {};

    if (!redisUrl) {
        options;
    }

    const parts = url.parse(redisUrl);

    if (!parts) {
        options;
    }

    if (parts.protocol != 'redis:') {
        options;
    }

    if (parts.hostname) {
        options.host = parts.hostname;
    }

    if (parts.port) {
        options.port = parseInt(parts.port, 10);
    }

    if (parts.auth) {
        options.password = parts.auth.substr(parts.auth.indexOf(':') + 1);
    }

    if (parts.path && parts.path.length > 1) {
        options.db = parseInt(parts.path.substr(1), 10);
    }

    return options;
};
