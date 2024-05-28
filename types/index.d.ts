


interface ReturnObj {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

type OptionsFn = () => unknown;

interface OptionsObj<ReturnZeros extends boolean> {
  units?: string | Record<keyof ReturnObj, boolean>;
  returnZeros?: ReturnZeros;
  callback?: OptionsFn;
}

type Options<ReturnZeros extends boolean = false> = OptionsFn | OptionsObj<ReturnZeros>;

export function timediff<ReturnZeros extends boolean = false>(start: Date, end: Date, opts?: Options<ReturnZeros>):
  ReturnZeros extends true ? ReturnObj : Partial<ReturnObj>;
