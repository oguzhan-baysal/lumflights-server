import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReservationsModule } from './reservations/reservations.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ReservationsModule,
  ],
})
export class AppModule {} 