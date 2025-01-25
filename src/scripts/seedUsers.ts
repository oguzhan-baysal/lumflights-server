import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserRole } from '../auth/interfaces/user-roles.enum';

@Injectable()
export class UserSeeder {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App
  ) {}

  private users = [
    { 
      email: 'admin@lumflights.com',
      password: 'Admin123!',
      role: UserRole.ADMIN,
      name: 'Admin Yönetici'
    },
    { 
      email: 'staff1@lumflights.com',
      password: 'Staff123!',
      role: UserRole.STAFF,
      name: 'Ahmet Yılmaz'
    },
    { 
      email: 'staff2@lumflights.com',
      password: 'Staff123!',
      role: UserRole.STAFF,
      name: 'Mehmet Demir'
    },
    { 
      email: 'staff3@lumflights.com',
      password: 'Staff123!',
      role: UserRole.STAFF,
      name: 'Ayşe Kaya'
    },
    { 
      email: 'staff4@lumflights.com',
      password: 'Staff123!',
      role: UserRole.STAFF,
      name: 'Fatma Çelik'
    },
    { 
      email: 'staff5@lumflights.com',
      password: 'Staff123!',
      role: UserRole.STAFF,
      name: 'Ali Yıldız'
    },
    { 
      email: 'staff6@lumflights.com',
      password: 'Staff123!',
      role: UserRole.STAFF,
      name: 'Zeynep Şahin'
    },
    { 
      email: 'staff7@lumflights.com',
      password: 'Staff123!',
      role: UserRole.STAFF,
      name: 'Mustafa Öztürk'
    },
    { 
      email: 'staff8@lumflights.com',
      password: 'Staff123!',
      role: UserRole.STAFF,
      name: 'Elif Arslan'
    },
    { 
      email: 'staff9@lumflights.com',
      password: 'Staff123!',
      role: UserRole.STAFF,
      name: 'Can Aydın'
    }
  ];

  async seedUsers() {
    try {
      for (const user of this.users) {
        try {
          // Önce mevcut kullanıcıyı kontrol et
          const userRecord = await this.firebaseAdmin.auth().getUserByEmail(user.email)
            .catch(() => null);

          if (userRecord) {
            console.log(`Kullanıcı zaten mevcut: ${user.email}`);
            continue;
          }

          // Firebase Authentication'da kullanıcı oluştur
          const userCredential = await this.firebaseAdmin.auth().createUser({
            email: user.email,
            password: user.password,
            displayName: user.name
          });

          // Firestore'da kullanıcı rolünü kaydet
          await this.firebaseAdmin.firestore()
            .collection('users')
            .doc(userCredential.uid)
            .set({
              email: user.email,
              role: user.role,
              name: user.name
            });

          console.log(`Kullanıcı oluşturuldu: ${user.email}`);
        } catch (error) {
          console.error(`${user.email} için hata:`, error);
        }
      }

      return { message: 'Kullanıcı oluşturma işlemi tamamlandı!' };
    } catch (error) {
      console.error('Genel hata:', error);
      throw error;
    }
  }
} 