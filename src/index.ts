import objectPath from 'object-path';

// hoist the regex: avoid re-creating it on every call
const RE_PLACEHOLDER = /\$\{([^}]+)\}/g;

/**
 * Interpolate `${variable}` placeholders in a string from a context object.
 * Only variable paths are extracted — no expressions are evaluated.
 * Nested paths are supported, e.g. `${address.detail.street}`.
 *
 * @param str - the template string
 * @param ctx - context object holding the variable values
 * @returns the interpolated string
 *
 * @example
 * varlit('${GITHUB_API_TOKEN} - ${afei}', { GITHUB_API_TOKEN: 'xxx-yyy-zzz', afei: 'zhengfei' });
 * // => 'xxx-yyy-zzz - zhengfei'
 *
 * @example
 * varlit('${address.detail.street}', { address: { detail: { street: 'main st' } } });
 * // => 'main st'
 */
const varlit = (str: string, ctx?: Record<string, any> | null): string => {
  // invalid ctx: return the original string unchanged
  if (!ctx || typeof ctx !== 'object') return str;

  return str.replace(RE_PLACEHOLDER, (match: string, key: string) => {
    const name = key.trim();
    // no such path: keep the original `${xxx}` text
    if (!objectPath.has(ctx, name)) return match;
    const value = objectPath.get(ctx, name);
    // null/undefined -> empty string, others -> string
    return value === null || value === undefined ? '' : String(value);
  });
};

export default varlit;
