/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

export async function promiseRace<T>(promises: Promise<T>[]) {
  const results: T[] = [];
  for (const p of promises) {
    try {
      results.push(await p);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
  return results[0];
}
