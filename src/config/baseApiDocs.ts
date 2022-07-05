import { DocumentBuilder } from '@nestjs/swagger';

export class BaseAPIDocumentation {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder
      .setTitle('Money Book API Server')
      .setDescription('가계부 API 서버입니다.')
      .setVersion('1.0')
      .build();
  }
}
