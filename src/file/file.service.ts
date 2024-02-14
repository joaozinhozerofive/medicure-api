import { Injectable } from "@nestjs/common";
import { writeFile } from "fs/promises";
import { File } from 'multer';
import {join} from "path";
import {randomBytes} from 'crypto';

@Injectable()
export class FileService {

    async upload(file: File) {
        const fileHash =  randomBytes(10).toString("hex")
        const filename = `${fileHash}-${file.originalname}`;

        const TMP_FOLDER = join(__dirname, "..", "..", "TMP"); 
        const destination = join(TMP_FOLDER, filename);

        await writeFile(destination, file.buffer);

        return filename
    }}

