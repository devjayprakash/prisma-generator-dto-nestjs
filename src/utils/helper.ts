import { getFileName } from '../generator/filename';
import { Config, Fields } from 'types';
import { Caseing } from './constants';

const PrismaScalarToTypeScript: Record<string, string> = {
  String: 'string',
  Boolean: 'boolean',
  Int: 'number',
  BigInt: 'bigint',
  Float: 'number',
  Decimal: 'Prisma.Decimal',
  DateTime: 'Date',
  Json: 'Prisma.JsonValue',
  Bytes: 'Buffer',
};

export let getRequiredTreated = (val: string, isRequired: boolean) => {
  return isRequired ? val : val + ' | null';
};

export const prismaToTSType = (type: string) => {
  if (Object.keys(PrismaScalarToTypeScript).includes(type)) {
    return PrismaScalarToTypeScript[type];
  } else {
    throw new Error('The given type is not a valid type');
  }
};

export const getFieldTypeWithRequiredCheck = (
  type: string,
  isRequired: boolean
) => {
  return getRequiredTreated(prismaToTSType(type), isRequired);
};

export const getUniqueFields = (fields: Array<Fields>) => {
  return fields.filter((field) => {
    return field.isUnique || field.isId;
  });
};

export const captalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1, str.length);
};

export const generateImportsStr = (fields: Array<Fields>, config: Config) => {
  return `${fields
    .filter((field) => field.kind === 'object')
    .map((obj_field) => {
      const fileName = getFileName({
        caseing: config.caseing,
        suffix: config.suffix,
        prefix: config.prefix,
        name: obj_field.type,
      });
      const fileAddr = `./${fileName}`;
      return `import { ${captalize(obj_field.type)} } from '${fileAddr}';\n`;
    })}`;
};

export const generateFieldsToTsStr = (
  fields: Array<Fields>,
  className: string,
  config: Config
) => {
  return `
  ${generateImportsStr(fields, config)}
  export class ${className} {
    ${fields
      .map(
        (m) =>
          `${m.name}:${
            m.kind === 'object'
              ? m.type
              : getFieldTypeWithRequiredCheck(m.type, m.isRequired)
          } ; \n\t`
      )
      .join('')}
  }`;
};
