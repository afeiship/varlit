import varlit, { literalTmpl } from '../src';

describe('literalTmpl', () => {
  test('replaces placeholders with context values', () => {
    const str = '${GITHUB_API_TOKEN} - ${afei}';
    const ctx = {
      GITHUB_API_TOKEN: 'xxx-yyy-zzz',
      afei: 'zhengfei'
    };
    expect(varlit(str, ctx)).toBe('xxx-yyy-zzz - zhengfei');
  });

  test('trims whitespace around the variable name', () => {
    expect(varlit('${ afei }', { afei: 'zhengfei' })).toBe('zhengfei');
    expect(varlit('${\t GITHUB_API_TOKEN \n}', { GITHUB_API_TOKEN: 'x' })).toBe('x');
  });

  test('keeps the original placeholder when the key is missing', () => {
    expect(varlit('${missing}', { afei: 'zhengfei' })).toBe('${missing}');
    expect(varlit('a ${one} b ${two} c', { one: 1 })).toBe('a 1 b ${two} c');
  });

  test('returns the original string when ctx is null/undefined/not an object', () => {
    const str = '${afei} ${missing}';
    expect(varlit(str, null)).toBe(str);
    expect(varlit(str, undefined)).toBe(str);
    expect(varlit(str)).toBe(str);
    expect(varlit(str, 'nope' as any)).toBe(str);
    expect(varlit(str, 42 as any)).toBe(str);
  });

  test('replaces null/undefined values with empty string', () => {
    expect(varlit('${a}-${b}', { a: null, b: undefined })).toBe('-');
  });

  test('converts other types to string', () => {
    expect(varlit('${num}-${zero}-${flag}', { num: 1024, zero: 0, flag: false })).toBe(
      '1024-0-false'
    );
    expect(varlit('${obj}', { obj: { x: 1 } })).toBe('[object Object]');
  });

  test('leaves strings without placeholders untouched', () => {
    expect(varlit('plain text', { afei: 'zhengfei' })).toBe('plain text');
    expect(varlit('${}', { afei: 'zhengfei' })).toBe('${}');
  });

  test('is exported as both default and named export', () => {
    expect(literalTmpl).toBe(varlit);
    expect(literalTmpl('${afei}', { afei: 'zhengfei' })).toBe('zhengfei');
  });
});
