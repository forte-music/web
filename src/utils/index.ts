import React from 'react';

export const join = <T>(input: T[], btwn: T): T[] =>
  input.reduce(
    (acc, val, idx, arr) => {
      const addedVal = acc.concat(val);

      if (idx < arr.length - 1) {
        return addedVal.concat(btwn);
      }

      return addedVal;
    },
    [] as T[]
  );

export const unique = (elems: Array<React.ReactElement<any>>) =>
  elems.map(
    (e: React.ReactElement<any>, i: number): React.ReactElement<any> =>
      React.cloneElement(e, { key: i })
  );

export const last = <T>(arr: T[]): T | void => arr[arr.length - 1];

// Splits a collection of items into two buckets based on the return value
// of a predicate.
export const split = <T>(
  arr: T[],
  predicate: (item: T, index: number, array: T[]) => any
): { accepted: T[]; failed: T[] } =>
  arr.reduce(
    ({ accepted, failed }, value, idx, arr) => {
      const result = predicate(value, idx, arr);
      if (result) {
        accepted = [...accepted, value];
      } else {
        failed = [...failed, value];
      }

      return { accepted, failed };
    },
    { accepted: [] as T[], failed: [] as T[] }
  );

export function* genRange(to: number): Iterable<number> {
  for (let i = 0; i < to; i++) {
    yield i;
  }
}

// tslint:disable-next-line: no-empty
export const noop = () => {};

export const pluralize = (prefix: string, count: number) => {
  if (count === 1) {
    return prefix;
  }

  return prefix + 's';
};

export type Omit<T, K extends keyof T> = Pick<
  T,
  ({ [P in keyof T]: P } &
    { [P in K]: never } & { [x: string]: never })[keyof T]
>;
