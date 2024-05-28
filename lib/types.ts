export interface ReturnObj {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

type OptionsFn = (result: ReturnObj | Partial<ReturnObj>) => unknown;

export interface OptionsObj<ReturnZeros extends boolean> {
  units?: string | Partial<Record<keyof ReturnObj, boolean>>;
  returnZeros?: ReturnZeros;
  callback?: OptionsFn;
}

export type Options<ReturnZeros extends boolean = false> =
  | string
  | OptionsFn
  | OptionsObj<ReturnZeros>;

export declare function timediff<ReturnZeros extends boolean = false>(
  start: Date | string | 'now',
  end: Date | string | 'now',
  options?: Options<ReturnZeros>,
): ReturnZeros extends true ? ReturnObj : Partial<ReturnObj>;
