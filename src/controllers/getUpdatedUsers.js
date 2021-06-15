import { errors, respond } from '../utils';
import { getUsers } from '../functions';
import { managerAttributes } from '../constants';

export default async function getUpdatedUsers(req, res, next) {
  try {
    const { attributes, filter, ldapConfig } = req.body;

    if (!ldapConfig) {
      throw new errors.UnprocessableError('ldapConfig is required');
    }

    const modifiedUsers = await getUsers({ filter, attributes, ldapConfig });
    const allUsers = await getUsers({ attributes: managerAttributes, ldapConfig });

    if (!modifiedUsers) {
      return respond.withOk(req, res, { users: [] });
    }

    const filteredUsers = modifiedUsers.filter((user) => user.userPrincipalName);

    const usersWithManagerEmail = getManagerEmail(filteredUsers, allUsers);

    return respond.withOk(req, res, { users: usersWithManagerEmail });
  } catch (error) {
    return next(error);
  }
}

function getManagerEmail(userList, allUsers) {
  return userList.map((user) => {
    if (user.manager) {
      user.manager = allUsers.find((u) => u.dn === user.manager).userPrincipalName;
    }
    return user;
  });
}
