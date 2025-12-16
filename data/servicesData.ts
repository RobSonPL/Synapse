import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
    // Publishing (Priority)
    { 
      id: 'p1', 
      name: 'Kompleksowe stworzenie E-booka', 
      price: 'od 400 zł', 
      category: 'publish',
      link: 'https://ebook-nu-opal.vercel.app',
      imageUrl: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Febook-nu-opal.vercel.app?w=400&h=300'
    },
    { id: 'p2', name: 'Skład i łamanie tekstu (DTP)', price: '10 zł / str.', category: 'publish' },
    { id: 'p3', name: 'Projekt okładki (3 propozycje)', price: '150 zł', category: 'publish' },
    { 
      id: 'p4', 
      name: 'Książka dla dzieci (tekst + AI art)', 
      price: 'od 200 zł', 
      category: 'publish',
      link: 'https://comics-navy.vercel.app/',
      imageUrl: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fcomics-navy.vercel.app%2F?w=400&h=300'
    },
    
    // Web & Social Media
    { 
      id: 'w1', 
      name: 'Landing Page sprzedażowy', 
      price: '499 zł', 
      category: 'web',
      link: 'https://vist-card.vercel.app',
      imageUrl: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fvist-card.vercel.app?w=400&h=300'
    },
    { 
      id: 'w2', 
      name: 'Video promujące / Portfolio', 
      price: '50 zł', 
      category: 'web',
      link: 'https://nano-grafic.vercel.app',
      imageUrl: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fnano-grafic.vercel.app?w=400&h=300'
    },
    { 
      id: 'w3', 
      name: 'Wirtualny Influencer dla marki', 
      price: 'Indywidualnie', 
      category: 'web',
      link: 'https://re-image-face.vercel.app/',
      imageUrl: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fre-image-face.vercel.app%2F?w=400&h=300'
    },
    
    // Text
    { id: 't1', name: 'Redakcja i korekta', price: '20 zł / A4', category: 'text' },
    { id: 't2', name: 'Copywriting sprzedażowy', price: 'od 50 zł', category: 'text' },
    { id: 't3', name: 'Opis produktu (naffy/sklep)', price: '30 zł', category: 'text' },
];