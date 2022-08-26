import { writeFile } from 'fs/promises';
import { Config, Model } from 'types';
import { generateFieldsToTsStr, getUniqueFields } from '../utils/helper';
import { getFileName } from './filename';

class DTOGenerator {
  //configs
  config: Config;
  modelData: Model;
  saveAt: string;

  constructor(config: Config, modelData: Model, saveAt: string) {
    this.config = config;
    this.modelData = modelData;
    this.saveAt = saveAt;
  }

  async generateConnectDTO() {
    console.log(`Processing ${this.modelData.name} [Connect type]`);

    const fields = getUniqueFields(this.modelData.fields);
    const tsStr = generateFieldsToTsStr(fields, this.modelData.name, this.config);
    const fileName = getFileName({
      name: this.modelData.name,
      prefix: '',
      suffix: 'connect',
      caseing: this.config.caseing,
    });

    await writeFile(`${this.saveAt}/${fileName}.ts`, tsStr);
  }
  async generateEntityDTO() {
    console.log(`Processing ${this.modelData.name} [Entity Type]`);

    const finalStr = generateFieldsToTsStr(this.modelData.fields, this.modelData.name, this.config);

    const fileName = getFileName({
      name: this.modelData.name,
      prefix: '',
      suffix: 'entity',
      caseing: this.config.caseing,
    });

    await writeFile(`${this.saveAt}/${fileName}.ts`, finalStr);
  }
}

export default DTOGenerator;
