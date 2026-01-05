import {schedule} from './schedule';
import {blockContent} from './blockContent';
import {aboutPage} from './aboutPage';
import {person} from './person';
import {organizer} from './organizer';
import {faq} from './faq';
import {announcement} from './announcement';
import {prize} from './prize';
import {sponsor} from './sponsor';
import {rulesPage} from './rulesPage';
import {siteSettings} from './siteSettings';

export const schemaTypes = [
    // Reusable types
    blockContent,
    // Documents
    schedule,
    aboutPage,
    person,
    organizer,
    faq,
    announcement,
    prize,
    sponsor,
    rulesPage,
    siteSettings,
];


