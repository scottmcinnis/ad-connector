import { errors, respond } from '../utils';
import { getGroups, getGroupMembership } from '../functions';

export default async function listGroups(req, res, next) {
  try {
    const { filter, attributes, groups = null, ldapConfig } = req.body;

    if (!ldapConfig) {
      throw new errors.UnprocessableError('ldapConfig is required');
    }

    const groupsFromAD = !groups
      ? await getGroups({ filter, attributes, ldapConfig })
      : await getGroupMembership({ groups, attributes, ldapConfig });

    if (!groupsFromAD) {
      return respond.withOk(req, res, { groups: [] });
    }

    return respond.withOk(req, res, { groups: groupsFromAD });
  } catch (error) {
    return next(error);
  }
}
