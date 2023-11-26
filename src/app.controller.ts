import { Controller, Get, Post, Req, Body, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Request, @Session() session: Record<string, any>): string {
    console.log(`${new Date().toLocaleString('sv')} ${req.method}[${req.url}] ${req.sessionID}`);

    session.root ??= {};

    session.root.count = session.root.count ? session.root.count + 1 : 1;
    console.log(session.root.count);
    return `${this.appService.getHello()} ${session.root.count}`;
  }

  @Post()
  getPost(@Req() req: Request, @Session() session: Record<string, any>): any {
    console.log(`${new Date().toLocaleString('sv')} ${req.method}[${req.url}] ${req.sessionID}`);

    session.root ??= {};

    session.root.count = session.root.count ? session.root.count + 1 : 1;

    console.log(req.body, session.root.count);

    return { message: 'hello restjs world.', count: session.root.count };
  }
}
