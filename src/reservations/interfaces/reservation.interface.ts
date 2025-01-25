export enum ReservationStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

// Temel yolcu bilgileri (Staff rolü için)
export interface BasicPassenger {
  id: string;
  name: string;
}

// Detaylı yolcu bilgileri (Admin rolü için)
export interface DetailedPassenger extends BasicPassenger {
  email: string;
}

// Temel rezervasyon bilgileri (Staff rolü için)
export interface BasicReservation {
  id: string;
  flightNumber: string;
  departureDate: string;
  arrivalDate: string;
  status: ReservationStatus;
  passengers: BasicPassenger[];
}

// Detaylı rezervasyon bilgileri (Admin rolü için)
export interface Reservation extends Omit<BasicReservation, 'passengers'> {
  passengers: DetailedPassenger[];
} 