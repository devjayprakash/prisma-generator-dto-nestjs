// please create a feature request by raising a issue if you want more to be supported
export type Caseing =
  | 'CAMEL_CASE' // ex - thisIsFun
  | 'SNAKE_CASE' // ex - this_is_fun
  | 'KEBAB_CASE' // ex - this-is-fun
  | 'PASCAL_CASE'; // ex - ThisIsFun

export const validCaseConfig = ['camel', 'kebab', 'pascal', 'snake'];
