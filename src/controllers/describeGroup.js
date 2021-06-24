import { errors, respond } from '../utils';
import { findGroup } from '../functions';

export default async function describeGroup(req, res, next) {
  try {
    const { groupName, attributes, ldapConfig } = req.body;

    if (!groupName || !ldapConfig) {
      throw new errors.UnprocessableError('groupName & ldapConfig are both required');
    }

    const group = await findGroup({ groupName: groupName, attributes, ldapConfig });

    if (!group) {
      throw new errors.NotFoundError('Group not found');
    }

    return respond.withOk(req, res, { group });
  } catch (error) {
    return next(error);
  }
}
