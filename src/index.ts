import { generatorHandler } from '@prisma/generator-helper';
import makeDir from 'make-dir';
import generateEntityDTO from './generator';

export const generate = async (options: any) => {
  const { generator, dmmf } = options;

  let { makeAt = 'src/generator/dtos' } = generator.config;

  let path = await makeDir(makeAt);

  const modelData = dmmf.datamodel.models;

  modelData.forEach((data: any) => {
    generateEntityDTO(data, path);
  });
};

generatorHandler({
  onManifest: () => ({
    defaultOutput: './src/generated/nestjs-dto',
    prettyName: 'NestJS DTO generator',
  }),
  //@ts-ignore
  onGenerate: generate,
});
