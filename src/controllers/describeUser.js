import { errors, respond } from '../utils';
import { getUser } from '../functions';

export default async function describeUser(req, res, next) {
  try {
    const { email, attributes, ldapConfig } = req.body;

    if (!email || !ldapConfig) {
      throw new errors.UnprocessableError('email & ldapConfig are both required');
    }

    const user = await getUser({ email, attributes, ldapConfig });

    if (!user) {
      throw new errors.NotFoundError('User not found');
    }

    return respond.withOk(req, res, { user });
  } catch (error) {
    return next(error);
  }
}
