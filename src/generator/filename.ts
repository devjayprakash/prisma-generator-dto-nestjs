import { captalize } from '../utils/helper';
import { Caseing } from '../utils/constants';

const generateCorrectCaseing = (
  wrds: Array<string>,
  caseing: Caseing
): string => {
  if (caseing === 'CAMEL_CASE') {
    return wrds
      .map((wrd, i) => {
        if (i !== 0) {
          return captalize(wrd);
        } else {
          return wrd.toLocaleLowerCase();
        }
      })
      .join('');
  } else if (caseing == 'KEBAB_CASE') {
    return wrds
      .map((wrd, i) => {
        if (i !== wrds.length - 1) {
          return wrd.toLocaleLowerCase() + '-';
        } else {
          return wrd.toLocaleLowerCase();
        }
      })
      .join('');
  } else if (caseing === 'PASCAL_CASE') {
    return wrds
      .map((wrd) => {
        return captalize(wrd);
      })
      .join('');
  } else if (caseing === 'SNAKE_CASE') {
    return wrds
      .map((wrd, i) => {
        return i !== wrds.length - 1
          ? wrd.toLocaleLowerCase() + '_'
          : wrd.toLocaleLowerCase();
      })
      .join('');
  }
};

export interface GetFileTypeOptions {
  name: string;
  prefix?: string;
  suffix?: string;
  caseing: Caseing;
}

type GetFileNameFunction = (config: GetFileTypeOptions) => string;

export const getFileName: GetFileNameFunction = ({
  name,
  prefix = '',
  suffix = '',
  caseing,
}) => {
  const wrds = [];
  prefix && wrds.push(prefix);
  wrds.push(name);
  suffix && wrds.push(suffix);

  return generateCorrectCaseing(wrds, caseing) + '.ts';
};

console.log(
  getFileName({
    name: 'Test',
    suffix: 'entity',
    caseing: 'SNAKE_CASE',
    prefix: 'dto',
  })
);
