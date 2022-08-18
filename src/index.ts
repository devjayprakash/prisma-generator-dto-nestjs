import { generatorHandler } from "@prisma/generator-helper";
import makeDir from "make-dir";
import { Config, Model } from "types";
import DTOGenerator from "./generator";
import { Caseing, validCaseConfig } from "./utils/constants";

const getCorrectCaseing = (caseing: string): string => {
  if (caseing === "camel") {
    return "CAMEL_CASE";
  } else if (caseing === "kebab") {
    return "KEBAB_CASE";
  } else if (caseing === "pascal") {
    return "PASCAL_CASE";
  } else if (caseing === "snake") {
    return "SNAKE_CASE";
  } else {
    throw new Error("invalid caseing config in get correct caseing function");
  }
};

export const generate = async (options: any) => {
  const { generator, dmmf } = options;

  console.log(generator);

  const {
    makeAt = "src/generator/dtos",
    caseing = "camel",
    prefix = "",
    suffix = "",
  } = generator.config;

  if (!validCaseConfig.includes(caseing)) {
    console.error("Invalid caseing config provided");
    return;
  }

  const path = await makeDir(makeAt);
  const modelData: Array<Model> = dmmf.datamodel.models;

  const config: Config = {
    suffix,
    prefix,
    caseing: getCorrectCaseing(caseing) as Caseing,
  };

  for (let i = 0; i < modelData.length; i++) {
    const dto_maker = new DTOGenerator(config, modelData[i], path);
    await dto_maker.generateConnectDTO();
    await dto_maker.generateEntityDTO();
  }
};

generatorHandler({
  onManifest: () => ({
    defaultOutput: "./src/generated/nestjs-dto",
    prettyName: "NestJS DTO generator",
  }),
  //@ts-ignore
  onGenerate: generate,
});
