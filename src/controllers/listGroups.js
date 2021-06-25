import { errors, respond } from '../utils';
import { findGroups, getGroupMembershipForGroup } from '../functions';

export default async function listGroups(req, res, next) {
  try {
    const { filter, attributes, ldapConfig } = req.body;

    if (!ldapConfig) {
      throw new errors.UnprocessableError('ldapConfig is required');
    }

    const groupsFromAD = await findGroups({ filter, attributes, ldapConfig })

    if (!groupsFromAD) {
      return respond.withOk(req, res, { groups: [] });
    }

    return respond.withOk(req, res, { groups: groupsFromAD });
  } catch (error) {
    return next(error);
  }
}
