import {
  DurationLocaleKey,
  DurationLocaleValue,
  DurationObject,
  DurationPlugin,
  DurationPluginStore
} from '..';
import Duration from '..';

const formatAtom = (
  amount: number,
  localeObj: { [key in DurationLocaleKey]: DurationLocaleValue },
  key: DurationLocaleKey
): string => {
  const atom = localeObj[key];

  return typeof atom === 'string'
    ? atom.replace('%d', String(amount))
    : atom(amount, true, key)
  ;
};

const durationToRelativeDuration = (d: DurationObject): DurationObject => {
  const relativeD: DurationObject = d;

  if (d.milliseconds > 500) relativeD.seconds++;
  if (d.seconds > 30) relativeD.minutes++;
  if (d.minutes > 30) relativeD.hours++;
  if (d.hours > 12) relativeD.days++;
  if (d.days > 15) relativeD.months++;
  if (d.months > 6) relativeD.years++;

  return d;
};

const plugin: DurationPlugin = {
  initialize: (instance: Duration, store: DurationPluginStore) => {
    store.humanizeRelObj = durationToRelativeDuration(instance.obj);
  },
  methods: {
    humanize: (instance: Duration, store: DurationPluginStore) => (
      locale: string,
      relative: boolean,
      preset: 'tiny' | 'default' = 'default',
    ): string => {
      if (!Duration.locales[locale]) {
        throw new Error(`Locale "${locale}" doesn't exist.`);
      }

      const localeObj = Duration.locales[locale][preset];
      const obj = store.humanizeRelObj;

      let string = '';

      if (obj.years) {
        string = obj.years === 1
          ? formatAtom(obj.years, localeObj, 'y')
          : formatAtom(obj.years, localeObj, 'yy')
        ;
      } else if (obj.months) {
        string = obj.months === 1
          ? formatAtom(obj.months, localeObj, 'M')
          : formatAtom(obj.months, localeObj, 'MM')
        ;
      } else if (obj.days) {
        string = obj.days === 1
          ? formatAtom(obj.days, localeObj, 'd')
          : formatAtom(obj.days, localeObj, 'dd')
        ;
      } else if (obj.hours) {
        string = obj.hours === 1
          ? formatAtom(obj.hours, localeObj, 'h')
          : formatAtom(obj.hours, localeObj, 'hh')
        ;
      } else if (obj.minutes) {
        string = obj.minutes === 1
          ? formatAtom(obj.minutes, localeObj, 'm')
          : formatAtom(obj.minutes, localeObj, 'mm')
        ;
      } else {
        string = obj.seconds === 0 || obj.seconds === 1
          ? formatAtom(obj.seconds, localeObj, 's')
          : formatAtom(obj.seconds, localeObj, 'ss')
        ;
      }

      return relative
        ? Duration.locales[locale][instance.tense].replace('%s', string)
        : string
      ;
    }
  }
};

export default plugin;
