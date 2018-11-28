import { DurationLocale } from '..';

const locale: DurationLocale = {
  future: 'en %s',
  past: 'hace %s',

  default: {
    S: 'un milisegundo',
    SS: '%d milisegundos',
    s: 'unos segundos',
    ss: '%d segundos',
    m: 'un minuto',
    mm: '%d minutos',
    h: 'una hora',
    hh: '%d horas',
    d: 'un día',
    dd: '%d días',
    M: 'un mes',
    MM: '%d meses',
    y: 'un año',
    yy: '%d años'
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
    y: '%da',
    yy: '%da'
  },
};

export default locale;
