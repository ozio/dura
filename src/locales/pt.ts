import { DurationLocale } from '..';

const locale: DurationLocale = {
  future: 'em %s',
  past: 'há %s',

  default: {
    S: 'alguns milissegundos',
    SS: '%d milissegundos',
    s: 'segundos',
    ss: '%d segundos',
    m: 'um minuto',
    mm: '%d minutos',
    h: 'uma hora',
    hh: '%d horas',
    d: 'um dia',
    dd: '%d dias',
    M: 'um mês',
    MM: '%d meses',
    y: 'um ano',
    yy: '%d anos'
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
