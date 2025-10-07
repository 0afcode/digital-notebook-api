import { IsDateString, IsOptional, IsString } from 'class-validator';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export abstract class BaseSearchDTO {
  @IsOptional()
  @IsDateString()
  createdDateStart?: string;

  @IsOptional()
  @IsDateString()
  createdDateEnd?: string;

  @IsOptional()
  @IsDateString()
  modifiedDateStart?: string;

  @IsOptional()
  @IsDateString()
  modifiedDateEnd?: string;

  @IsOptional()
  @IsDateString()
  deletedDateStart?: string;

  @IsOptional()
  @IsDateString()
  deletedDateEnd?: string;

  @IsOptional()
  @IsString()
  createdBy?: string;

  @IsOptional()
  @IsString()
  modifiedBy?: string;

  @IsOptional()
  @IsString()
  deletedBy?: string;

  // filtering function for these fields
  public static applyAuditFilters<T extends ObjectLiteral>(
    queryBuilder: SelectQueryBuilder<T>,
    searchDto: BaseSearchDTO,
    alias: string,
  ): SelectQueryBuilder<T> {
    // 1. Creation Date Range
    if (searchDto.createdDateStart) {
      queryBuilder.andWhere(`${alias}.createdDate >= :cds`, {
        cds: searchDto.createdDateStart,
      });
    }
    if (searchDto.createdDateEnd) {
      queryBuilder.andWhere(`${alias}.createdDate <= :cde`, {
        cde: searchDto.createdDateEnd,
      });
    }

    // 2. Modification Date Range
    if (searchDto.modifiedDateStart) {
      queryBuilder.andWhere(`${alias}.modifiedDate >= :mds`, {
        mds: searchDto.modifiedDateStart,
      });
    }
    if (searchDto.modifiedDateEnd) {
      queryBuilder.andWhere(`${alias}.modifiedDate <= :mde`, {
        mde: searchDto.modifiedDateEnd,
      });
    }

    // 3. Deletion Date Range
    if (searchDto.deletedDateStart) {
      queryBuilder.andWhere(`${alias}.deletedDate >= :dds`, {
        dds: searchDto.deletedDateStart,
      });
    }
    if (searchDto.deletedDateEnd) {
      queryBuilder.andWhere(`${alias}.deletedDate <= :dde`, {
        dde: searchDto.deletedDateEnd,
      });
    }

    // 4. Audit User Filters
    if (searchDto.createdBy) {
      queryBuilder.andWhere(`${alias}.createdBy = :createdBy`, {
        createdBy: searchDto.createdBy,
      });
    }
    if (searchDto.modifiedBy) {
      queryBuilder.andWhere(`${alias}.modifiedBy = :modifiedBy`, {
        modifiedBy: searchDto.modifiedBy,
      });
    }
    if (searchDto.deletedBy) {
      queryBuilder.andWhere(`${alias}.deletedBy = :deletedBy`, {
        deletedBy: searchDto.deletedBy,
      });
    }
    return queryBuilder;
  }
}
