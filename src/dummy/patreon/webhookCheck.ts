// noinspection BadExpressionStatementJS

/**
 * This file is intend to trigger typescript json schema check only, therefore no export should happen here.
 */
import {PatreonMember} from '@/types/subscription/patreon/common/member';

/* eslint-disable @typescript-eslint/no-restricted-imports */
import pledgeCreated1 from './data/pledgeCreated1.json';
import pledgeCreated2 from './data/pledgeCreated2.json';
import pledgeDeleted1 from './data/pledgeDeleted1.json';
/* eslint-enable @typescript-eslint/no-restricted-imports */


// `patron_status` is string literal but TypeScript can't load string literal type from json file
pledgeCreated1.data.attributes satisfies Omit<PatreonMember['attributes'], 'patron_status'>;
pledgeCreated2.data.attributes satisfies Omit<PatreonMember['attributes'], 'patron_status'>;
pledgeDeleted1.data.attributes satisfies Omit<PatreonMember['attributes'], 'patron_status'>;
