import ActiveDirectory from 'activedirectory';
import { errors } from '../utils';

export default async function getUsers({ filter, attributes, ldapConfig }) {
  const ldapConnection = new ActiveDirectory(ldapConfig);
  const options = attributes ? { attributes } : {};

  if (filter) {
    options.filter = filter;
  }

  return new Promise((resolve, reject) => {
    ldapConnection.findUsers(options, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  }).catch((_err) => {
    throw new errors.NotFoundError('Unable to connect to LDAP');
  });
}
