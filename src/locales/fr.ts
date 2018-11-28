import { DurationLocale } from '..';

const locale: DurationLocale = {
  future: 'dans %s',
  past: 'il y a %s',

  default: {
    S: 'une milliseconde',
    SS: '%d millisecondes',
    s: 'quelques secondes',
    ss: '%d secondes',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: 'un an',
    yy: '%d ans'
  },

  tiny: {
    S: '%dms',
    SS: '%ms',
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
