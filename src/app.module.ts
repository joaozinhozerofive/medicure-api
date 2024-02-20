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
    .exclude(
      {path : '/users', method : RequestMethod.POST},
      {path : '/auth', method : RequestMethod.POST}
      )
    .forRoutes('*')
    
  }
}
