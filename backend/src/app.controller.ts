import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      success: true,
      service: 'Rudraa Cash Backend',
      project: 'Project Anant',
      status: 'ready',
    };
  }

  @Get('health')
  getHealth() {
    return {
      success: true,
      status: 'healthy',
      service: 'rudraa-cash-backend',
    };
  }
}
