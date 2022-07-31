import { Controller, Get, HttpStatus, Inject, Req, Res } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import type { Request, Response } from 'express';
import { CoreController } from '../core/provider/core.controller';

@Controller('/status')
export class StatusController extends CoreController {
  constructor(@Inject(ModuleRef) moduleRef: ModuleRef) {
    super(moduleRef);
  }

  @Get()
  async getStatus(@Req() req: Request, @Res() res: Response) {
    res.status(HttpStatus.OK).json({ status: 'ok' }).end();
  }
}
