import { errors, respond } from '../utils';
import { getGroupMembershipForUsers, getGroupMembershipForGroups } from '../functions';

export default async function listGroupMembership(req, res, next) {
  try {
    const { attributes, groups = null, users = null, ldapConfig } = req.body;

    if ((!groups && !users) || !ldapConfig) {
      throw new errors.UnprocessableError('groups/users & ldapConfig are required');
    }

    const type = !groups ? 'users' : 'groups';

    const response = type === 'users'
      ? await getGroupMembershipForUsers({ users, attributes, ldapConfig })
      : await getGroupMembershipForGroups({ groups, attributes, ldapConfig });

    return respond.withOk(req, res, { [type]: response });
  } catch (error) {
    return next(error);
  }
}
