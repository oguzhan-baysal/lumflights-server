import { Controller, Get, Post, Delete, Param, Body, UseGuards, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ReservationsService } from './reservations.service';
import { 
  Reservation, 
  BasicReservation,
  ReservationStatus 
} from './interfaces/reservation.interface';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/interfaces/user-roles.enum';
import { UserSeeder } from '../scripts/seedUsers';

@Controller('reservations')
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class ReservationsController {
  constructor(
    private readonly reservationsService: ReservationsService,
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App
  ) {}

  @Get()
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async findAll(): Promise<BasicReservation[]> {
    return this.reservationsService.findAll();
  }

  @Get('admin')
  @Roles(UserRole.ADMIN)
  async findAllWithDetails(): Promise<Reservation[]> {
    return this.reservationsService.findAllWithDetails();
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  async create(@Body() reservation: Omit<Reservation, 'id' | 'status'>): Promise<Reservation> {
    console.log('Gelen rezervasyon verisi:', reservation);
    const newReservation = this.reservationsService.create(reservation);
    return newReservation;
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async cancel(@Param('id') id: string): Promise<Reservation> {
    return this.reservationsService.cancel(id);
  }

  @Post('seed')
  @Roles(UserRole.ADMIN)
  async seed() {
    return this.reservationsService.seed();
  }

  @Post('seed-users')
  @Roles(UserRole.ADMIN)
  async seedUsers() {
    const userSeeder = new UserSeeder(this.firebaseAdmin);
    return await userSeeder.seedUsers();
  }
} 