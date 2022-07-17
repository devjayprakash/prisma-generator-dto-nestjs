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
