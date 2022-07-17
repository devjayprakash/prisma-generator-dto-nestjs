export type FieldType = 'scalar' | 'object';

export type PrismaTypes =
  | 'Int'
  | 'BigInt'
  | 'Float'
  | 'Decimal'
  | 'DateTime'
  | 'Json'
  | 'Bytes';

export interface Default {
  name: string;
  args: Array<string>;
}

export interface Fields {
  name: string;
  kind: FieldType;
  isList: boolean;
  isRequired: boolean;
  isUnique: boolean;
  isId: boolean;
  isReadOnly: boolean;
  hasDefaultValue: boolean;
  type: PrismaTypes;
  isGenerated: boolean;
  isUpdatedAt: false;
  default: Default;
}

export interface Model {
  name: string;
  dbName: string | null;
  fields: Array<Fields>;
}
