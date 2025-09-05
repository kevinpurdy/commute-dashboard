type CacheEntry = {
  setAt: Date;
  value: any;
};

declare global {
  var apiCache: Record<string, CacheEntry>;
}
global.apiCache = {};

const isCacheEntryExpired = (entry: CacheEntry, timeout: number): boolean => {
  const elapsedMS = new Date().getTime() - entry.setAt.getTime();
  const elapsedSeconds = elapsedMS / 1000;
  return elapsedSeconds > timeout;
};

export const cacheApiResponse = async <R>(
  path: string,
  timeout: number,
  func: () => Promise<R>,
): Promise<R> => {
  const cacheEntry = global.apiCache[path];
  if (cacheEntry && !isCacheEntryExpired(cacheEntry, timeout)) {
    console.log("=== Cache Hit: Return cached response");
    return cacheEntry.value;
  } else {
    console.log("=== Cache Miss: Return new response");
    const newValue = await func();
    global.apiCache[path] = {
      setAt: new Date(),
      value: newValue,
    };
    return newValue;
  }
};
