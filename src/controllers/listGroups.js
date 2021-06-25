import { errors, respond } from '../utils';
import { findGroups } from '../functions';

export default async function listGroups(req, res, next) {
  try {
    const { filter, attributes, ldapConfig } = req.body;

    if (!ldapConfig) {
      throw new errors.UnprocessableError('ldapConfig is required');
    }

    const groups = await findGroups({ filter, attributes, ldapConfig })

    if (!groups) {
      return respond.withOk(req, res, { groups: [] });
    }

    return respond.withOk(req, res, { groups });
  } catch (error) {
    return next(error);
  }
}
