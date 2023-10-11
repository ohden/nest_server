import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { request } from 'http';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Request): string {
    console.log(`${new Date().toLocaleString('sv')} ${req.method}[${req.url}]`);
    return this.appService.getHello();
  }

  @Post()
  getPost(@Req() req: Request): any {
    console.log(`${new Date().toLocaleString('sv')} ${req.method}[${req.url}]`);
    console.log(req.body);
    return { message: 'hello restjs world.' };
  }
}
