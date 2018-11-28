import { DurationLocale } from '..';

const locale: DurationLocale = {
  future: '%s後',
  past: '%s前',

  default: {
    S: '数ミリ秒',
    SS: '%dミリ秒',
    s: '数秒',
    ss: '%d秒',
    m: '1分',
    mm: '%d分',
    h: '1時間',
    hh: '%d時間',
    d: '1日',
    dd: '%d日',
    M: '1ヶ月',
    MM: '%dヶ月',
    y: '1年',
    yy: '%d年'
  },

  tiny: {
    S: '数ミリ秒',
    SS: '%dミリ秒',
    s: '数秒',
    ss: '%d秒',
    m: '1分',
    mm: '%d分',
    h: '1時間',
    hh: '%d時間',
    d: '1日',
    dd: '%d日',
    M: '1ヶ月',
    MM: '%dヶ月',
    y: '1年',
    yy: '%d年'
  },
};

export default locale;
