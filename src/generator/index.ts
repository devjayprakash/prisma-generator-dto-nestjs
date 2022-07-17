import { writeFile } from 'fs/promises';
import { getFieldTypeWithRequiredCheck } from './helper';

const generateEntityDTO = async (modelData: any, path: string) => {
  console.log(`Processing ${modelData.name}`);

  const finalStr = `export class ${modelData.name} {
    ${modelData.fields
      .filter((k: any) => k.kind === 'scalar')
      .map(
        (m: any) =>
          `${m.name}:${getFieldTypeWithRequiredCheck(
            m.type,
            m.isRequired
          )} ; \n\t`
      )
      .join('')}
  }`;

  const fileName = `${modelData.name}.entity.ts`;

  console.log(finalStr);

  await writeFile(`${path}/${fileName}`, finalStr);
};

export default generateEntityDTO;
