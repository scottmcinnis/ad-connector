import { errors, respond } from '../utils';
import { getUsersForGroup } from '../functions';

export default async function listGroupMembers(req, res, next) {
  try {
    const { group, attributes, ldapConfig } = req.body;

    if (!group || !ldapConfig) {
      throw new errors.UnprocessableError('group & ldapConfig are both required');
    }

    const groupResponse = await getUsersForGroup({ group: group, attributes, ldapConfig });

    if (!groupResponse) {
      throw new errors.NotFoundError('Group not found');
    }

    return respond.withOk(req, res, { group: groupResponse });
  } catch (error) {
    return next(error);
  }
}
