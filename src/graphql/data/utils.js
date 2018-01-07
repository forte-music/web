// @flow

type Identifiable = {
  id: string,
};

export const makeMap = <T: Identifiable, D: Object>(
  list: T[],
  defaults?: D
): Map<string, T & D> =>
  list
    .map((identifiable: T): T & D => ({
      ...defaults,
      ...identifiable,
    }))
    .reduce((map, identifiable: T & D) => {
      map.set(identifiable.id, identifiable);
      return map;
    }, new Map());
