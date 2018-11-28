# Dura

Extendable duration library.

## Installation

```js
import Dura from 'dura';
import en from 'dura/locales/en';
import humanizePlugin from 'dura/plugins/humanize';

Dura.registerLocales({ en });
Dura.registerPlugins([humanizePlugin]);
```

## Usage

```js
const durationByMills = new Dura(1000);
const durationBySeconds = new Dura(21, 's');
const durationByMinutes = new Dura(30, 'm');
const durationByHours = new Dura(3, 'h');
const durationByDays = new Dura(5, 'd');
```

## Plugins

### Humanize
```js
import humanizePlugin from 'dura/plugins/humanize';
Dura.registerPlugins([humanizePlugin]);

const duration = new Dura(7 * 24 * 60 * 60 * 1000);
const humanizedDuration = duration.humaninze('en'); // 7 days
const humanizedRelatedDuration = duration.humaninze('en', true); // in 7 days
```
