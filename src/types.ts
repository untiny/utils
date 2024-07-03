/**
 * 将字符串转换为大写蛇形表示
 */
export type ToUpperSnakeCase<S extends string> =
  S extends `${infer F}${infer R}`
    ? F extends Lowercase<F>
      ? R extends Uncapitalize<R>
        ? `${Uppercase<F>}${ToUpperSnakeCase<R>}`
        : `${Uppercase<F>}_${ToUpperSnakeCase<R>}`
      : `${F}${ToUpperSnakeCase<R>}`
    : S;

/**
 * 将字符串转小写
 */
export type ToLower<S extends string> = S extends `${infer F}${infer R}`
  ? `${Lowercase<F>}${ToLower<R>}`
  : S;

/**
 * 将联合类型转换为对象类型，并添加前缀（如果提供）
 */
export type Enumerable<U extends string, P extends string = ''> = {
  [K in U as `${P extends ''
    ? ''
    : `${Uppercase<P>}_`}${ToUpperSnakeCase<K>}`]: `${P extends ''
    ? ''
    : `${ToLower<P>}_`}${K}`;
};

/**
 * 提取对象的所有路径
 */
export type Paths<T, P extends string = ''> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ?
            | `${P}${P extends '' ? '' : '.'}${Extract<K, string>}`
            | Paths<T[K], `${P}${P extends '' ? '' : '.'}${Extract<K, string>}`>
        : `${P}${P extends '' ? '' : '.'}${Extract<K, string>}`;
    }[keyof T]
  : '';

/**
 * 提取对象的所有键
 */
export type AllKeys<T> = T extends object
  ? keyof T | AllKeys<T[keyof T]>
  : never;
