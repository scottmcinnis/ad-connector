import { errors, respond } from '../utils';
import { findUsers } from '../functions';

export default async function listUsers(req, res, next) {
  try {
    const { attributes, filter, ldapConfig } = req.body;

    if (!ldapConfig) {
      throw new errors.UnprocessableError('ldapConfig is required');
    }

    const users = await findUsers({ filter, attributes, ldapConfig }) || [];

    return respond.withOk(req, res, { users });
  } catch (error) {
    return next(error);
  }
}