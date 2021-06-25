import { errors, respond } from '../utils';
import { findGroup } from '../functions';

export default async function describeGroup(req, res, next) {
  try {
    const { group, attributes, ldapConfig } = req.body;

    if (!group || !ldapConfig) {
      throw new errors.UnprocessableError('groupName & ldapConfig are both required');
    }

    const groupResponse = await findGroup({ group, attributes, ldapConfig });

    if (!groupResponse) {
      throw new errors.NotFoundError('Group not found');
    }

    return respond.withOk(req, res, { group: groupResponse });
  } catch (error) {
    return next(error);
  }
}
