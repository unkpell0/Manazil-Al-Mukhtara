
import { Hotel } from './types';

export const PRIMARY_ORANGE = '#F37021';
export const PRIMARY_BLUE = '#2A3990';
export const LIGHT_ORANGE = '#FDB913';
export const BACKGROUND_COLOR = '#FAF7F2';
export const TEXT_DARK = '#333333';
export const TEXT_LIGHT = '#FFFFFF';

export const APP_ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  SERVICE_SELECTION: '/select-service',
  FLIGHT_DETAILS: '/flight-details',
  HOTEL_SELECTION: '/hotel-selection',
  CONFIRMATION: '/confirmation',
};

export const HOTELS_DATA: Hotel[] = [
  { id: 'ritz_madinah', name: 'Al Ritz Al Madinah Hotel', city: 'Al Madinah', imageUrl: 'https://picsum.photos/400/300?random=1', restaurants: 2, elevators: 4, beds: 1302, rooms: 250, roomService: true, coffeeShop: true, wifi: true, parkingSlots: 40, locationDescription: 'The northern central region' },
  { id: 'waqf_othman', name: 'Waqf Othman Ben Affan Hotel', city: 'Al Madinah', imageUrl: 'https://picsum.photos/400/300?random=2', restaurants: 1, elevators: 6, beds: 1150, rooms: 234, roomService: true, coffeeShop: true, wifi: true, parkingSlots: 26, locationDescription: 'King Faisal Road, First Ring Road, The northern central region' },
  { id: 'zowar_intl', name: 'Zowar International Hotel', city: 'Al Madinah', imageUrl: 'https://picsum.photos/400/300?random=3', restaurants: 2, elevators: 5, beds: 1127, rooms: 280, roomService: true, coffeeShop: true, wifi: true, parkingSlots: 35, locationDescription: 'Badaa Dictrict- Abdul Rahman Bin Awf Street, The northern central region' },
  { id: 'odst_madinah', name: 'ODST Al Madinah Hotel', city: 'Al Madinah', imageUrl: 'https://picsum.photos/400/300?random=4', restaurants: 3, elevators: 13, beds: 3262, rooms: 700, roomService: true, coffeeShop: true, wifi: true, parkingSlots: 60, locationDescription: 'Badaa Dictrict- Abdul Rahman Bin Awf Street, The northern central region' },
  { id: 'mokhtara_intl', name: 'Al Mokhtara International Hotel', city: 'Al Madinah', imageUrl: 'https://picsum.photos/400/300?random=5', restaurants: 3, elevators: 1, beds: 1820, rooms: 476, roomService: true, coffeeShop: true, wifi: true, parkingSlots: 45, locationDescription: 'Next to waqf Othman Bin Affan Hotel, The northern central region' },
  { id: 'nozol_makkah', name: 'Nozol Al Mokhtara Hotel', city: 'Makkah', imageUrl: 'https://picsum.photos/400/300?random=6', restaurants: 1, elevators: 2, beds: 614, rooms: 149, roomService: true, coffeeShop: false, wifi: true, parkingSlots: "12 Slots & Prayer Hall", locationDescription: 'Sulaymaniyah Street, Al-Jahoun District, Western central area' },
  { id: 'odst_suites_jeddah', name: 'ODST Hotel Suites', city: 'Jeddah', imageUrl: 'https://picsum.photos/400/300?random=7', restaurants: "Available", elevators: 2, beds: 0, rooms: 25, roomService: true, coffeeShop: false, wifi: true, parkingSlots: 25, locationDescription: 'Jeddah - Sari Street' },
  { id: 'odst_jeddah_hotel', name: 'ODST Jeddah Hotel', city: 'Jeddah', imageUrl: 'https://picsum.photos/400/300?random=8', restaurants: 1, elevators: 2, beds: 246, rooms: 88, roomService: true, coffeeShop: true, wifi: true, parkingSlots: 50, locationDescription: 'Palestine Street intersection, The descending road of Medina' },
];
