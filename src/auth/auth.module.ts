import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { initializeFirebase } from '../config/firebase.config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: (configService: ConfigService) => initializeFirebase(configService),
      inject: [ConfigService],
    },
    FirebaseAuthGuard
  ],
  exports: [FirebaseAuthGuard, 'FIREBASE_ADMIN']
})
export class AuthModule {} 