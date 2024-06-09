import * as multer from 'multer';

const fileStorage = multer.memoryStorage();


export const upload = multer({ storage:  fileStorage })

