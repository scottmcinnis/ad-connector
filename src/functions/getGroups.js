import ActiveDirectory from 'activedirectory';
import { errors } from '../utils';

export default async function getGroups({ filter, attributes, ldapConfig }) {
  const ldapConnection = new ActiveDirectory(ldapConfig);
  const options = {
    ...(attributes ? { attributes } : {}),
    ...(filter ? { filter } : {}),
  };

  return new Promise((resolve, reject) => {
    ldapConnection.findGroups(options, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  }).catch((_err) => {
    throw new errors.NotFoundError('Unable to connect to LDAP');
  });
}
