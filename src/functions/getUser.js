import ActiveDirectory from 'activedirectory';
import { errors } from '../utils';

export default async function getUser({ email, attributes, ldapConfig }) {
  const ldapConnection = new ActiveDirectory(ldapConfig);
  const options = attributes ? { attributes } : {};

  return new Promise((resolve, reject) => {
    ldapConnection.findUser(options, email, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  }).catch((_err) => {
    throw new errors.NotFoundError('Unable to connect to LDAP');
  });
}
