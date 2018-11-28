import { DurationLocale } from '..';

function plural(word: string, num: number) {
  const forms = word.split('_');
  return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
}

function relativeTimeWithPlural(number: number, withoutSuffix: boolean, key: string) {
  const format: { [key: string]: string } = {
    'SS': withoutSuffix ? 'миллисекунда_миллисекунды_миллисекунд' : 'миллисекунду_миллисекунды_миллисекунд',
    'ss': withoutSuffix ? 'секунда_секунды_секунд' : 'секунду_секунды_секунд',
    'mm': withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
    'hh': 'час_часа_часов',
    'dd': 'день_дня_дней',
    'MM': 'месяц_месяца_месяцев',
    'yy': 'год_года_лет'
  };
  if (key === 'm') {
    return withoutSuffix ? 'минута' : 'минуту';
  } else {
    return number + ' ' + plural(format[key], +number);
  }
}

const locale: DurationLocale = {
  future: 'через %s',
  past: '%s назад',

  default: {
    S: 'несколько миллисекунд',
    SS: relativeTimeWithPlural,
    s: 'несколько секунд',
    ss: relativeTimeWithPlural,
    m: relativeTimeWithPlural,
    mm: relativeTimeWithPlural,
    h: 'час',
    hh: relativeTimeWithPlural,
    d: 'день',
    dd: relativeTimeWithPlural,
    M: 'месяц',
    MM: relativeTimeWithPlural,
    y: 'год',
    yy: relativeTimeWithPlural
  },

  tiny: {
    S: '%dмс',
    SS: '%dмс',
    s: '%dс',
    ss: '%dс',
    m: '%dмин',
    mm: '%dмин',
    h: '%dч',
    hh: '%dч',
    d: '%dд',
    dd: '%dд',
    M: '%dмес',
    MM: '%dмес',
    y: '%dг',
    yy: '%dг'
  },
};

export default locale;
