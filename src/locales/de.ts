import { DurationLocale } from '..';

function processRelativeTime(number: number, withoutSuffix: boolean, key: string) {
  const format: { [key: string]: string | string[] } = {
    'm': ['eine Minute', 'einer Minute'],
    'h': ['eine Stunde', 'einer Stunde'],
    'd': ['ein Tag', 'einem Tag'],
    'dd': [number + ' Tage', number + ' Tagen'],
    'M': ['ein Monat', 'einem Monat'],
    'MM': [number + ' Monate', number + ' Monaten'],
    'y': ['ein Jahr', 'einem Jahr'],
    'yy': [number + ' Jahre', number + ' Jahren']
  };

  return withoutSuffix ? format[key][0] : format[key][1];
}

const locale: DurationLocale = {
  future: 'in %s',
  past: 'vor %s',

  default: {
    S: 'wenige Millisekunden',
    SS: '%d Millisekunden',
    s: 'ein paar Sekunden',
    ss: '%d Sekunden',
    m: processRelativeTime,
    mm: '%d Minuten',
    h: processRelativeTime,
    hh: '%d Stunden',
    d: processRelativeTime,
    dd: processRelativeTime,
    M: processRelativeTime,
    MM: processRelativeTime,
    y: processRelativeTime,
    yy: processRelativeTime
  },

  tiny: {
    S: '%dms',
    SS: '%dms',
    s: '%ds',
    ss: '%ds',
    m: '%dm',
    mm: '%dm',
    h: '%dst',
    hh: '%dst',
    d: '%dd',
    dd: '%dd',
    M: '%dm',
    MM: '%dm',
    y: '%dj',
    yy: '%dj'
  },
};

export default locale;
