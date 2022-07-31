import { Inject } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

export class CoreController {
  constructor(@Inject(ModuleRef) protected moduleRef: ModuleRef) {}
}
