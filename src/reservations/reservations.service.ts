import { Injectable } from '@nestjs/common';
import { 
  Reservation, 
  ReservationStatus, 
  BasicReservation 
} from './interfaces/reservation.interface';
import { v4 as uuidv4 } from 'uuid';
import { seedReservations } from '../scripts/seed';

@Injectable()
export class ReservationsService {
  private reservations: Reservation[] = [];

  findAll(): BasicReservation[] {
    // Staff rolü için sadece temel bilgileri döndür
    return this.reservations.map(reservation => ({
      id: reservation.id,
      flightNumber: reservation.flightNumber,
      departureDate: reservation.departureDate,
      arrivalDate: reservation.arrivalDate,
      status: reservation.status,
      passengers: reservation.passengers.map(p => ({
        id: p.id,
        name: p.name
      }))
    }));
  }

  findAllWithDetails(): Reservation[] {
    // Admin rolü için tüm detayları döndür
    return this.reservations;
  }

  create(reservationData: Omit<Reservation, 'id' | 'status'>): Reservation {
    const newReservation = {
      id: uuidv4(),
      ...reservationData,
      status: ReservationStatus.ACTIVE,
      passengers: reservationData.passengers.map(passenger => ({
        id: uuidv4(),
        ...passenger
      }))
    };

    this.reservations.push(newReservation);
    return newReservation;
  }

  cancel(id: string): Reservation {
    const reservationIndex = this.reservations.findIndex(r => r.id === id);
    if (reservationIndex === -1) {
      throw new Error('Rezervasyon bulunamadı');
    }

    this.reservations[reservationIndex] = {
      ...this.reservations[reservationIndex],
      status: ReservationStatus.CANCELLED
    };

    return this.reservations[reservationIndex];
  }

  // Admin için detaylı rezervasyon bilgisi
  findById(id: string): Reservation | undefined {
    return this.reservations.find(r => r.id === id);
  }

  async seed() {
    // Mevcut rezervasyonları temizle
    this.reservations = [];
    
    // Mock verileri oluştur
    await seedReservations(this);
    
    return { message: 'Seed işlemi başarıyla tamamlandı' };
  }
} 