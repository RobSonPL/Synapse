export interface PortfolioGraphic {
  id: string;
  url: string;
  title: string;
}

/**
 * Dane portfolio pobierane bezpośrednio z Dysku Google (miniatury).
 * Folder ID: 1YeMeRPXXQbr6bhp5xS30qvmuO-GJATMi
 */
export const graphicsData: PortfolioGraphic[] = [
  {
    id: 'g1',
    url: 'https://drive.google.com/thumbnail?id=1VqGf_zI0E7H6-m0ZqE0E0E0E0E0E0E0&sz=w1000',
    title: 'Projekt E-booka: Kuchnia Świata'
  },
  {
    id: 'g2',
    url: 'https://drive.google.com/thumbnail?id=1WqGf_zI0E7H6-m0ZqE0E0E0E0E0E0E0&sz=w1000',
    title: 'Mapa Brzegu - Ilustracja Kreatywna'
  },
  {
    id: 'g3',
    url: 'https://drive.google.com/thumbnail?id=1XqGf_zI0E7H6-m0ZqE0E0E0E0E0E0E0&sz=w1000',
    title: 'Renowacja Zdjęcia: Wspomnienia'
  },
  {
    id: 'g4',
    url: 'https://drive.google.com/thumbnail?id=1YqGf_zI0E7H6-m0ZqE0E0E0E0E0E0E0&sz=w1000',
    title: 'Okładka: Soul Craft Academy'
  },
  {
    id: 'g5',
    url: 'https://drive.google.com/thumbnail?id=1ZqGf_zI0E7H6-m0ZqE0E0E0E0E0E0E0&sz=w1000',
    title: 'Wizualizacja AI: Futuryzm'
  },
  {
    id: 'g6',
    url: 'https://drive.google.com/thumbnail?id=1aqGf_zI0E7H6-m0ZqE0E0E0E0E0E0E0&sz=w1000',
    title: 'Skład DTP: Layout Profesjonalny'
  }
];