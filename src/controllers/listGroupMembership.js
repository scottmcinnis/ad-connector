import { errors, respond } from '../utils';
import { getGroupMembershipForUsers, getGroupMembershipForGroup } from '../functions';

export default async function listGroupMembership(req, res, next) {
  try {
    const { attributes, groups = null, users = null, ldapConfig } = req.body;

    if ((!groups && !users) || !ldapConfig) {
      throw new errors.UnprocessableError('groups/users & ldapConfig are required');
    }

    const type = !groups ? 'users' : 'groups';

    const results = !groups
      ? await getGroupMembershipForUsers({ users, attributes, ldapConfig })
      : await getGroupMembershipForGroup({ groups, attributes, ldapConfig });

    return respond.withOk(req, res, { [type]: results });
  } catch (error) {
    return next(error);
  }
}
