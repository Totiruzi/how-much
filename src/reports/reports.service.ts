import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './reports.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private reportRepository: Repository<Report>) {}

  createReport(createReportDto: CreateReportDto, user: User): Promise<Report> {
    const report = this.reportRepository.create(createReportDto);
    report.user = user;
    return this.reportRepository.save(report);
  }
}
