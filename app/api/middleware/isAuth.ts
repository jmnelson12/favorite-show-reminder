import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import config from '../../config';

const jwtCheck = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://jmnelson61199.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://fav-show-api',
    issuer: 'https://jmnelson61199.auth0.com/',
    algorithms: ['RS256']
});

export default jwtCheck;