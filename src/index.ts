/**
 * Interpolate `${variable}` placeholders in a string from a context object.
 * Only plain variable names are extracted — no expressions are evaluated.
 *
 * @param str - the template string
 * @param ctx - context object holding the variable values
 * @returns the interpolated string
 *
 * @example
 * literalTmpl('${GITHUB_API_TOKEN} - ${afei}', { GITHUB_API_TOKEN: 'xxx-yyy-zzz', afei: 'zhengfei' });
 * // => 'xxx-yyy-zzz - zhengfei'
 */
const literalTmpl = (str: string, ctx?: Record<string, any> | null): string => {
  // invalid ctx: return the original string unchanged
  if (!ctx || typeof ctx !== 'object') return str;

  return str.replace(/\$\{([^}]+)\}/g, (match: string, key: string) => {
    const name = key.trim();
    // no such key: keep the original `${xxx}` text
    if (!Object.prototype.hasOwnProperty.call(ctx, name)) return match;
    const value = ctx[name];
    // null/undefined -> empty string, others -> string
    return value === null || value === undefined ? '' : String(value);
  });
};

export default literalTmpl;
export { literalTmpl };
