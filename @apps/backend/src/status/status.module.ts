import { Module } from '@nestjs/common';

import { StatusController } from './status.controller';

@Module({
  controllers: [StatusController],
  providers: [],
  imports: [],
  exports: [],
})
export class StatusModule {}
