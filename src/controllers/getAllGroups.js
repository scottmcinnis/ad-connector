import { errors, respond } from '../utils';
import { getGroups } from '../functions';

export default async function getAllGroups(req, res, next) {
  try {
    const { filter, attributes, ldapConfig } = req.body;

    if (!ldapConfig) {
      throw new errors.UnprocessableError('ldapConfig is required');
    }

    const groups = await getGroups({ filter, attributes, ldapConfig });

    if (!groups) {
      return respond.withOk(req, res, { groups: [] });
    }

    return respond.withOk(req, res, { groups });
  } catch (error) {
    return next(error);
  }
}
