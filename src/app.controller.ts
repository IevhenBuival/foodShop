import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import path from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Request, @Res() res: Response) {
    return 'hello nest.js!';
  }
}
