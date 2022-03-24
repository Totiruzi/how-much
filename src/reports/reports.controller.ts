import { Controller, Post, Body, UseGuards, Param, Patch } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { CurrentUserGuard } from './../users/guards/auth.gaurd';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApprovedReportDto } from './dtos/approved-report.dto';
import { AdminGaurd } from '../users/guards/admin.guard';


@Controller('reports')
export class ReportsController {

  constructor(private reportsService: ReportsService) {}
  @Post()
  @UseGuards(CurrentUserGuard)
  @Serialize(ReportDto)
  async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    const reportCreated = await this.reportsService.createReport(body, user);
    return reportCreated;
  }

  @Patch('/:id')
  @UseGuards(AdminGaurd)
  approvedReport(@Param('id') id: string, @Body() body: ApprovedReportDto, @CurrentUser() user: User) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}
