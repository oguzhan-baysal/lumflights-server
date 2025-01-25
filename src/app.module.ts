import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReservationsModule } from './reservations/reservations.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ReservationsModule,
  ],
  controllers: [AppController],
})
export class AppModule {} 