import { errors, respond } from '../utils';
import { getUsers } from '../functions';

export default async function listUsers(req, res, next) {
  try {
    const { attributes, filter, ldapConfig } = req.body;

    if (!ldapConfig) {
      throw new errors.UnprocessableError('ldapConfig is required');
    }

    const users = await getUsers({ filter, attributes, ldapConfig }) || [];

    return respond.withOk(req, res, { users });
  } catch (error) {
    return next(error);
  }
}