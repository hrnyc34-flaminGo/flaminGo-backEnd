const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const {
  MANAGER,
  HOUSEKEEPING_MAINTENANCE,
  ADMIN,
  FRONTDESK,
} = require('./constants');

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key based on the [Key ID](https://tools.ietf.org/html/rfc7515#section-4.1.4) header parameter ("kid") and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

const adminManagerPermissions = jwtAuthz([MANAGER, ADMIN], {
  customScopeKey: 'permissions'
});

const reservationsRouterPermissions = jwtAuthz([FRONTDESK, MANAGER, ADMIN], {
  customScopeKey: 'permissions'
});

const taskRouterPermissions = jwtAuthz([HOUSEKEEPING_MAINTENANCE, MANAGER, ADMIN], {
  customScopeKey: 'permissions'
});

const allPermissions = jwtAuthz([FRONTDESK, HOUSEKEEPING_MAINTENANCE, MANAGER, ADMIN], {
  customScopeKey: 'permissions'
});

module.exports = {
  checkJwt,
  adminManagerPermissions,
  reservationsRouterPermissions,
  taskRouterPermissions,
  allPermissions,
};
