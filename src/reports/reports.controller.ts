import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { CurrentUserGuard } from './../users/guards/auth.gaurd';

@Controller('reports')
export class ReportsController {

  constructor(private reportsService: ReportsService) {}
  @Post()
  @UseGuards(CurrentUserGuard)
  async createReport(@Body() body: CreateReportDto) {
    const reportCreated = await this.reportsService.createReport(body);
    return reportCreated;
  }
}
