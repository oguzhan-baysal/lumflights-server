import { faker } from '@faker-js/faker/locale/tr';

import { Reservation, ReservationStatus } from '../reservations/interfaces/reservation.interface';

// Rastgele bir tarih üretir (bugünden itibaren 90 gün içinde)
const generateRandomDate = () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + faker.number.int({ min: 1, max: 90 }));
  return futureDate.toISOString();
};

// Rastgele bir yolcu üretir
const generatePassenger = () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
});

// Rastgele bir rezervasyon üretir
const generateReservation = (): Reservation => {
  const departureDate = generateRandomDate();
  const arrivalDate = new Date(departureDate);
  arrivalDate.setHours(arrivalDate.getHours() + faker.number.int({ min: 1, max: 8 }));

  const passengerCount = faker.number.int({ min: 1, max: 3 });
  const passengers = Array.from({ length: passengerCount }, () => generatePassenger());

  return {
    id: faker.string.uuid(),
    flightNumber: `TK${faker.number.int({ min: 1000, max: 9999 })}`,
    departureDate: departureDate,
    arrivalDate: arrivalDate.toISOString(),
    status: faker.helpers.arrayElement([
      ReservationStatus.ACTIVE,
      ReservationStatus.CANCELLED,
      ReservationStatus.COMPLETED
    ]) as ReservationStatus,
    passengers
  };
};

// 1000 adet rezervasyon üretir
const generateMockReservations = (): Reservation[] => {
  return Array.from({ length: 1000 }, () => generateReservation());
};

// ReservationsService'e eklemek için bir metod
export const seedReservations = async (reservationsService: any) => {
  const mockReservations = generateMockReservations();
  
  for (const reservation of mockReservations) {
    await reservationsService.create({
      flightNumber: reservation.flightNumber,
      departureDate: reservation.departureDate,
      arrivalDate: reservation.arrivalDate,
      passengers: reservation.passengers
    });
  }

  console.log('1000 adet mock rezervasyon başarıyla oluşturuldu!');
}; 