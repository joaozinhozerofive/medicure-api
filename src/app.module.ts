import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { PatientsModule } from './patients/patients.module';
import {ServeStaticModule} from '@nestjs/serve-static'
import { join } from 'path';
import { FileModule } from './file/file.module';
import { DoctorsModule } from './doctors/doctors.module';
import { DateModule } from './dates/date.module';
import { ConsultationsModule } from './consultations/consultations.module';
import { ConsultationsController } from './consultations/consultations.controller';
import { DateController } from './dates/date.controller';
import { DoctorsController } from './doctors/doctors.controller';
import { UsersController } from './users/users.controller';
import { FileController } from './file/file.controller';

@Module({
  imports: [
      ConsultationsModule,
      DateModule,
      DoctorsModule,
      FileModule,
      UsersModule,
      AuthModule,
      PatientsModule, 
      ServeStaticModule.forRoot({
        serveRoot: '/files',
        rootPath: join(__dirname, '..', 'TMP'), 
      })
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {
  configure(consumer : MiddlewareConsumer){
    consumer.apply(AuthMiddleware)
    .exclude({path : "/file", method : RequestMethod.GET})
      .forRoutes(ConsultationsController, DateController, DoctorsController, UsersController, FileController)
  }
}
