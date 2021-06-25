import ActiveDirectory from '@edifylabs/activedirectory';
import { respond, errors } from '../utils';

export default async function handleAuthenticate(req, res, next) {
  try {
    const { username, password, ldapConfig } = req.body;

    if (!ldapConfig) {
      throw new errors.UnprocessableError('ldapConfig is required');
    }

    await authenticate(username, password, ldapConfig);

    return respond.withOk(req, res, { authenticated: true });
  } catch (error) {
    if (error.message.includes('connectTimeout')) {
      return next(new errors.RequestTimeout('Unable to connect to LDAP'));
    }

    return next(new errors.UnauthorizedError('Authentication failed'));
  }
}

function authenticate(username, password, ldapConfig) {
  const ldapConnection = new ActiveDirectory(ldapConfig);

  return new Promise((resolve, reject) => {
    ldapConnection.authenticate(username, password, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
}
