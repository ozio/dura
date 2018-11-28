export type DurationLocaleKey = 'S' | 'SS' | 's' | 'ss' | 'm' | 'mm' | 'h' | 'hh' | 'd' | 'dd' | 'M' | 'MM' | 'y' | 'yy';
export type DurationLocaleValue = ((number: number, withoutSuffix: boolean, key: string, isFuture?: boolean) => string) | string;
export type DurationMeasurement = 'ms' | 's' | 'm' | 'h' | 'd' | 'y';

export interface DurationLocale {
  future: string;
  past: string;
  default: { [key in DurationLocaleKey]: DurationLocaleValue };
  tiny: { [key in DurationLocaleKey]: DurationLocaleValue };
}

export interface DurationObject {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  months: number;
  years: number;
}

export interface DurationPlugin {
  initialize?: (instance: Duration, store: DurationPluginStore) => void;
  methods?: {
    [key: string]: (instance: Duration, store: DurationPluginStore) => any;
  };
}

export interface DurationPluginStore {
  [key: string]: any;
}

export default class Duration {
  static MILLISECOND  =       1;
  static SECOND_IN_MS =    1000 * Duration.MILLISECOND;
  static MINUTE_IN_MS =      60 * Duration.SECOND_IN_MS;
  static HOUR_IN_MS   =      60 * Duration.MINUTE_IN_MS;
  static DAY_IN_MS    =      24 * Duration.HOUR_IN_MS;
  static MONTH_IN_MS  = 30.4375 * Duration.DAY_IN_MS; // 365.25 / 12 = 30.4375
  static YEAR_IN_MS   =  365.25 * Duration.DAY_IN_MS;

  private static thresholds: DurationObject = {
    milliseconds: Duration.MILLISECOND,
    seconds:      Duration.SECOND_IN_MS,
    minutes:      Duration.MINUTE_IN_MS,
    hours:        Duration.HOUR_IN_MS,
    days:         Duration.DAY_IN_MS,
    months:       Duration.MONTH_IN_MS,
    years:        Duration.YEAR_IN_MS,
  };

  public static registerLocales(locales: { [key: string]: DurationLocale }) {
    this.locales = { ...this.locales, ...locales };
  }

  public static registerPlugins(plugins: DurationPlugin[]) {
    this.plugins = this.plugins.concat(plugins);
  }

  static locales: { [key: string]: DurationLocale } = {};

  private static plugins: DurationPlugin[] = [];

  static msToDuration(ms: number): DurationObject {
    const thresholds = Duration.thresholds;
    const floor = Math.floor;

    let tmp = ms;

    const d: DurationObject = {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
      months: 0,
      years: 0,
    };

    if (tmp >= thresholds.years) {
      d.years = floor(tmp / thresholds.years);
      tmp = tmp - d.years * thresholds.years;
    }

    if (tmp >= thresholds.months) {
      d.months = floor(tmp / thresholds.months);
      tmp = tmp - d.months * thresholds.months;
    }

    if (tmp >= thresholds.months) {
      d.months = floor(tmp / thresholds.months);
      tmp = tmp - d.months * thresholds.months;
    }

    if (tmp >= thresholds.days) {
      d.days = floor(tmp / thresholds.days);
      tmp = tmp - d.days * thresholds.days;
    }

    if (tmp >= thresholds.hours) {
      d.hours = floor(tmp / thresholds.hours);
      tmp = tmp - d.hours * thresholds.hours;
    }

    if (tmp >= thresholds.minutes) {
      d.minutes = floor(tmp / thresholds.minutes);
      tmp = tmp - d.minutes * thresholds.minutes;
    }

    if (tmp >= thresholds.seconds) {
      d.seconds = floor(tmp / thresholds.seconds);
      tmp = tmp - d.seconds * thresholds.seconds;
    }

    if (tmp >= thresholds.milliseconds) {
      d.milliseconds = floor(tmp / thresholds.milliseconds);
    }

    return d;
  }

  private pluginStore: DurationPluginStore = {};

  duration: number;
  tense: 'future' | 'past';
  obj: DurationObject;

  constructor(duration: number, measurement: DurationMeasurement = 'ms') {
    let _duration;

    if (measurement === 'ms')     _duration = duration * Duration.MILLISECOND;
    else if (measurement === 's') _duration = duration * Duration.SECOND_IN_MS;
    else if (measurement === 'm') _duration = duration * Duration.MINUTE_IN_MS;
    else if (measurement === 'h') _duration = duration * Duration.HOUR_IN_MS;
    else if (measurement === 'd') _duration = duration * Duration.DAY_IN_MS;
    else if (measurement === 'y') _duration = duration * Duration.YEAR_IN_MS;
    else throw new Error(`Unknown measurement "${measurement}"`);

    this.tense = _duration < 0 ? 'past' : 'future';
    this.duration = Math.abs(_duration);
    this.obj = Duration.msToDuration(this.duration);

    Duration.plugins.forEach((plugin: DurationPlugin) => {
      plugin.initialize
        ? plugin.initialize(this, this.pluginStore)
        : undefined
      ;

      plugin.methods
        ? Object.keys(plugin.methods).forEach(key => {
          if (plugin.methods) this[key] = plugin.methods[key](this, this.pluginStore)
        })
        : undefined
      ;
    });
  }

  [key: string]: any;
}

