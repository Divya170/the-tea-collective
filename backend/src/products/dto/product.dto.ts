import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator';
import { TINTS } from '../product-category.entity';

const optionalText = () => ValidateIf((_o: unknown, v: unknown) => v !== null && v !== '');

export class CreateCategoryDto {
  @IsString() @IsNotEmpty({ message: 'Add the category name.' }) @MaxLength(80) name: string;
  @IsOptional() @IsString() @MaxLength(300) blurb?: string;
  @IsOptional() @IsString() @MaxLength(200) imageAlt?: string;
  @IsOptional() @IsIn(TINTS as unknown as string[], { message: 'Choose a placeholder tint.' }) tint?: string;
  @IsOptional() @IsInt() sortOrder?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class CreateProductDto {
  @IsInt({ message: 'Choose a category.' }) categoryId: number;
  @IsString() @IsNotEmpty({ message: 'Add the tea’s name.' }) @MaxLength(120) name: string;
  @IsOptional() @IsString() @MaxLength(800) description?: string;
  @IsOptional() @optionalText() @IsString() @MaxLength(120) origin?: string | null;
  @IsOptional() @optionalText() @IsString() @MaxLength(160) flavourProfile?: string | null;
  @IsOptional() @optionalText() @IsString() @MaxLength(400) ingredients?: string | null;
  @IsOptional() @IsString() @MaxLength(200) imageAlt?: string;
  @IsOptional() @optionalText() @IsIn(TINTS as unknown as string[]) tint?: string | null;
  @IsOptional() @IsBoolean() featured?: boolean;
  @IsOptional() @IsBoolean() isSample?: boolean;
  @IsOptional() @IsInt() sortOrder?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}
export class UpdateProductDto extends PartialType(CreateProductDto) {}
