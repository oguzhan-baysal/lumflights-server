import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { UserRole } from './interfaces/user-roles.enum';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
    private configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const token = authHeader.split('Bearer ')[1];
      const decodedToken = await this.firebaseAdmin.auth().verifyIdToken(token);
      
      // Firestore'dan kullanıcı rolünü al
      const userDoc = await this.firebaseAdmin
        .firestore()
        .collection('users')
        .doc(decodedToken.uid)
        .get();

      if (!userDoc.exists) {
        throw new UnauthorizedException('User not found in Firestore');
      }

      const userData = userDoc.data();
      const userRole = userData?.role || UserRole.STAFF;

      // Kullanıcı bilgilerini request nesnesine ekle
      request.user = {
        ...decodedToken,
        role: userRole
      };

      return true;
    } catch (error) {
      console.error('Firebase Auth Error:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
} 