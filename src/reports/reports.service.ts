import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-exstimate.dto';
import { Report } from './reports.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private reportRepository: Repository<Report>) {}

  createReport(createReportDto: CreateReportDto, user: User): Promise<Report> {
    const report = this.reportRepository.create(createReportDto);
    report.user = user;
    return this.reportRepository.save(report);
  }

  async changeApproval(id: string, approved: boolean): Promise<Report> {
    const report = await this.reportRepository.findOne(id);
    if (!report) {
      throw new NotFoundException(`Report with ID "${id}" not found`);
    }
    report.approved = approved;
    return this.reportRepository.save(report);
  }

  createEstimate({make, model, lng, lat, madeYear, mileage }: GetEstimateDto) {
    return this.reportRepository.createQueryBuilder()
      .select('AVG(soldPrice)', 'averageSoldPrice')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('madeYear - :madeYear BETWEEN -3 AND 3', { madeYear })
      .andWhere('approved = true')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(5)
      .getRawOne();


    // const { make, model, madeYear, mileage, lat, lng } = estimateDto;
    // const reports = await this.reportRepository.find({
    //   where: {
    //     user,
    //     approved: true,
    //     make,
    //     model,
    //     madeYear,
    //     mileage,
    //     lat,
    //     lng,
    //   },
    // });
    // return reports.length;
  }
}
