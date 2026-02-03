import { defineAbilityFor } from '@saas/auth';

const ability = defineAbilityFor({ role: 'MEMBER' });

const userCanInviteSomeoneElse = ability.can('delete', 'User');

console.log(userCanInviteSomeoneElse);
