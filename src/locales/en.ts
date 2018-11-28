import { DurationLocale } from '..';

const locale: DurationLocale = {
  future: 'in %s',
  past: '%s ago',

  default: {
    S: 'a millisecond',
    SS: '%d milliseconds',
    s: 'a few seconds',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  },

  tiny: {
    S: '%dms',
    SS: '%dms',
    s: '%ds',
    ss: '%ds',
    m: '%dm',
    mm: '%dm',
    h: '%dh',
    hh: '%dh',
    d: '%dd',
    dd: '%dd',
    M: '%dm',
    MM: '%dm',
    y: '%dy',
    yy: '%dy'
  },
};

export default locale;
