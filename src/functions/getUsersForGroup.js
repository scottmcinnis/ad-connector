import ActiveDirectory from '@edifylabs/activedirectory';
import { errors } from '../utils';

export default async function getUsersForGroup({ groupName, attributes, ldapConfig }) {
  const ldapConnection = new ActiveDirectory(ldapConfig);
  const options = attributes ? { attributes } : {};

  return new Promise((resolve, reject) => {
    ldapConnection.getUsersForGroup(options, groupName, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  }).catch((err) => {
    if (err.message.includes('connectTimeout')) {
      throw new errors.RequestTimeout('Unable to connect to LDAP');
    }

    throw new errors.InternalError(`Error executing request: ${err.message}`);
  });
}
