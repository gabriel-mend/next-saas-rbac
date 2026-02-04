import {
  createMongoAbility,
  type CreateAbility,
  type MongoAbility,
  AbilityBuilder,
} from '@casl/ability';
import type { User } from './models/User';
import { permissions } from './permissions';
import { userSubject } from './subjects/user';
import { projectSubject } from './subjects/project';
import z from 'zod';
import { inviteSubject } from './subjects/invite';
import { organizationSubject } from './subjects/organization';
import { billingSubject } from './subjects/billing';

const appAbilitiesSchema = z.union([
  userSubject,
  inviteSubject,
  organizationSubject,
  projectSubject,
  billingSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
]);

type AppAbilities = z.infer<typeof appAbilitiesSchema>;

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility);

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for role ${user.role} not found`);
  }

  permissions[user.role](user, builder);

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename;
    },
  });

  return ability;
}
