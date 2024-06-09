import { Controller, Post, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { FileValidationPipe } from 'src/pipes/file-validation.pipe';

@Controller('upload')
export class UploadFileController {
    @Post('file')
    @UseInterceptors(FileInterceptor('file', {
        storage: memoryStorage()
    }))
    @UsePipes(FileValidationPipe)
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return file
    }
}
