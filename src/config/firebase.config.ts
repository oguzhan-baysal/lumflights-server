import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

export function initializeFirebase(configService: ConfigService) {
  if (!admin.apps.length) {
    const serviceAccount = {
      type: "service_account",
      project_id: configService.get<string>('FIREBASE_PROJECT_ID'),
      private_key_id: configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
      private_key: configService.get<string>('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
      client_email: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${configService.get<string>('FIREBASE_CLIENT_EMAIL')}`
    };

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount)
    });
  }
  return admin;
} 