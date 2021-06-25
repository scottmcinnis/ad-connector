import { errors, respond } from '../utils';
import { findUser } from '../functions';

export default async function describeUser(req, res, next) {
  try {
    const { user, attributes, ldapConfig } = req.body;

    if (!user || !ldapConfig) {
      throw new errors.UnprocessableError('user & ldapConfig are both required');
    }

    const userResponse = await findUser({ user, attributes, ldapConfig });

    if (!userResponse) {
      throw new errors.NotFoundError('User not found');
    }

    return respond.withOk(req, res, { user: userResponse });
  } catch (error) {
    return next(error);
  }
}
