import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [UsersModule, AuthModule, PatientsModule],
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
