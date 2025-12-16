import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
    // Publishing (Priority)
    { id: 'p1', name: 'Kompleksowe stworzenie E-booka', price: 'od 400 zł', category: 'publish' },
    { id: 'p2', name: 'Skład i łamanie tekstu (DTP)', price: '10 zł / str.', category: 'publish' },
    { id: 'p3', name: 'Projekt okładki (3 propozycje)', price: '150 zł', category: 'publish' },
    { id: 'p4', name: 'Książka dla dzieci (tekst + AI art)', price: 'od 200 zł', category: 'publish' },
    
    // Web & Social Media
    { id: 'w1', name: 'Landing Page sprzedażowy', price: '499 zł', category: 'web' },
    { id: 'w2', name: 'Video promujące (Reels/TikTok)', price: '50 zł', category: 'web' },
    { id: 'w3', name: 'Wirtualny Influencer dla marki', price: 'Indywidualnie', category: 'web' },
    
    // Text
    { id: 't1', name: 'Redakcja i korekta', price: '20 zł / A4', category: 'text' },
    { id: 't2', name: 'Copywriting sprzedażowy', price: 'od 50 zł', category: 'text' },
    { id: 't3', name: 'Opis produktu (naffy/sklep)', price: '30 zł', category: 'text' },
];