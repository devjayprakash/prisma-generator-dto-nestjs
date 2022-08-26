import { DMMF } from '@prisma/generator-helper';
import { Caseing } from '../utils/constants';

export type FieldType = 'scalar' | 'object';

export type PrismaTypes = 'Int' | 'BigInt' | 'Float' | 'Decimal' | 'DateTime' | 'Json' | 'Bytes';

export interface Default {
  name: string;
  args: Array<string>;
}

export type Field = DMMF.Field;

export type Model = DMMF.Model;

export interface Config {
  prefix: string;
  suffix: string;
  caseing: Caseing;
}
