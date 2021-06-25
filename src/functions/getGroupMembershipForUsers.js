import ActiveDirectory from '@edifylabs/activedirectory';
import { errors } from '../utils';

export default async function getGroupMembershipForUser({ users, attributes, ldapConfig }) {
  if (!Object.keys(users).length) {
    return {};
  }

  const ldapConnection = new ActiveDirectory(ldapConfig);
  const options = attributes ? { attributes } : {};

  const results = await Promise.all(users.map((user) =>
    new Promise((resolve, reject) => {
      ldapConnection.getGroupMembershipForGroup(options, user, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve({ [user]: result });
      });
    }).catch((err) => {
      if (err.message.includes('connectTimeout')) {
        throw new errors.RequestTimeout('Unable to connect to LDAP');
      }

      throw new errors.InternalError(`Error executing request: ${err.message}`);
    }),
  ));

  return results.reduce((acc, result) => ({ ...acc, ...result }), {});
}
