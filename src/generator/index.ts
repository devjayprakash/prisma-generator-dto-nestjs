import { writeFile } from 'fs/promises';
import { Model } from 'types';
import { generateFieldsToTsStr, getUniqueFields } from './helper';

/**
 *
 * @param modelData Model data
 * @param path path at which you want to save the dtos
 */
export const generateConnectDTO = async (modelData: Model, path: string) => {
  console.log(`Processing ${modelData.name} [Connect type]`);

  const fields = getUniqueFields(modelData.fields);
  const tsStr = generateFieldsToTsStr(fields, modelData.name);
  const fileName = `${modelData.name}.connect.ts`;

  await writeFile(`${path}/${fileName}`, tsStr);
};

/**
 * Generates Entitly DTO
 * @param modelData Model data
 * @param path path at which we want to save the dtos
 */
export const generateEntityDTO = async (modelData: Model, path: string) => {
  console.log(`Processing ${modelData.name} [Entity Type]`);

  const finalStr = generateFieldsToTsStr(modelData.fields, modelData.name);

  const fileName = `${modelData.name}.entity.ts`;

  await writeFile(`${path}/${fileName}`, finalStr);
};
