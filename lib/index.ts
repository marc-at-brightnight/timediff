import * as moment from 'moment';
import Diff = moment.unitOfTime.Diff;
import DurationConstructor = moment.unitOfTime.DurationConstructor;
import { Options } from './types';
import { ReturnObj } from './types';

export function timediff<ReturnZeros extends boolean = false>(
  start: Date | string | 'now',
  end: Date | string | 'now',
  options?: Options<ReturnZeros>,
): ReturnZeros extends true ? ReturnObj : Partial<ReturnObj> {
  const now = new Date();
  let sd;
  let ed;
  if (start === 'now') {
    sd = now;
  }
  if (end === 'now') {
    ed = now;
  }
  sd = moment(start);
  if (!sd.isValid()) throw 'invalid start date ' + sd;
  ed = moment(end);
  if (!ed.isValid()) throw 'invalid end date ' + ed;

  const config: {
    units: Record<keyof ReturnObj, boolean>;
    returnZeros: boolean;
    callback: ((result: ReturnObj | Partial<ReturnObj>) => unknown) | undefined;
  } = {
    units: {
      years: true,
      months: true,
      weeks: true,
      days: true,
      hours: true,
      minutes: true,
      seconds: true,
      milliseconds: true,
    },
    returnZeros: true as ReturnZeros,
    callback: undefined,
  };

  if (typeof options === 'string') {
    options = { units: options };
  } else if (typeof options === 'function') {
    options = { callback: options };
  }

  if (options) {
    if (typeof options.units === 'string') {
      if (options.units.search('Y') === -1) {
        config.units.years = false;
      }
      if (options.units.search('M') === -1) {
        config.units.months = false;
      }
      if (options.units.search('W') === -1) {
        config.units.weeks = false;
      }
      if (options.units.search('D') === -1) {
        config.units.days = false;
      }
      if (options.units.search('H') === -1) {
        config.units.hours = false;
      }
      if (options.units.search('m') === -1) {
        config.units.minutes = false;
      }
      if (options.units.search('S') === -1) {
        config.units.seconds = false;
      }
      if (options.units.search('s') === -1) {
        config.units.milliseconds = false;
      }
    } else if (typeof options.units == 'object') {
      if (!options.units.years) {
        config.units.years = false;
      }
      if (!options.units.months) {
        config.units.months = false;
      }
      if (!options.units.weeks) {
        config.units.weeks = false;
      }
      if (!options.units.days) {
        config.units.days = false;
      }
      if (!options.units.hours) {
        config.units.hours = false;
      }
      if (!options.units.minutes) {
        config.units.minutes = false;
      }
      if (!options.units.seconds) {
        config.units.seconds = false;
      }
      if (!options.units.milliseconds) {
        config.units.milliseconds = false;
      }
    }

    if (options.returnZeros === false) {
      config.returnZeros = false;
    }
    if (typeof options.callback === 'function') {
      config.callback = options.callback;
    }
  }

  const result: Partial<ReturnObj> = {};
  for (let unit in config.units) {
    if (config.units[unit as keyof ReturnObj]) {
      const value = ed.diff(sd, unit as Diff);
      sd.add(value, unit as DurationConstructor);
      if (config.returnZeros || value != 0) {
        result[unit as keyof ReturnObj] = value;
      }
    }
  }

  if (config.callback) {
    return config.callback(result) as ReturnZeros extends true ? ReturnObj : Partial<ReturnObj>;
  }

  return result as ReturnZeros extends true ? ReturnObj : Partial<ReturnObj>;
}
