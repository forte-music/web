// @flow

type Identifiable = {
  id: string,
};

export const mustGet = <K, V>(map: Map<K, V>, key: K): V => {
  const value = map.get(key);

  if (value === undefined) {
    throw new TypeError('Schema invalid. Value not found in map.');
  }

  return value;
};

export const mustGetKeys = <T>(map: Map<string, T>, keys: string[]): T[] =>
  keys.map(key => mustGet(map, key));

// The getMap is needed because due to circular imports, the map may be
// undefined at import time. For example if song imports album's map and
// album import's songs map album's song map will be undefined because song
// hasn't exported anything yet.
export const arrayPropertyDescriptor = <T>(
  getMap: () => Map<string, T>,
  keys: string[]
) => ({
  get: () => mustGetKeys(getMap(), keys),
});

export const propertyDescriptor = <T>(
  getMap: () => Map<string, T>,
  key: string
) => ({
  get: () => mustGet(getMap(), key),
});

export const makeMap = <T: Identifiable>(list: T[]): Map<string, T> =>
  list.reduce((map, identifiable: T) => {
    map.set(identifiable.id, identifiable);
    return map;
  }, new Map());
