import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    if(!file) {
      throw new BadRequestException("File is Required!");
    }

    if(file.mimetype !== 'application/json') {
      throw new BadRequestException("Invalid File Type");
    }
  }
}
