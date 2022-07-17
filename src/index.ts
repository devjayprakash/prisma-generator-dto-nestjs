import { generatorHandler } from '@prisma/generator-helper';
import makeDir from 'make-dir';
import { Model } from 'types';
import { generateConnectDTO, generateEntityDTO } from './generator';

export const generate = async (options: any) => {
  const { generator, dmmf } = options;

  let { makeAt = 'src/generator/dtos' } = generator.config;

  let path = await makeDir(makeAt);

  console.log(path);

  const modelData: Array<Model> = dmmf.datamodel.models;

  for (let i = 0; i < modelData.length; i++) {
    await generateEntityDTO(modelData[i], path);
    await generateConnectDTO(modelData[i], path);
  }
};

generatorHandler({
  onManifest: () => ({
    defaultOutput: './src/generated/nestjs-dto',
    prettyName: 'NestJS DTO generator',
  }),
  //@ts-ignore
  onGenerate: generate,
});
