import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
        { id:1, name: 'Thanh Soc Trang'},
        { id:2, name: 'Viet Citizen'},
        { id:3, name: 'Trung Cho Lon'},
        { id:4, name: 'Tuan Dinh Dong Nai'},
        { id:5, name: 'Cheese Campuchia'},
        { id:6, name: 'MrQ Ben Tre'},
      { id: 20, name: 'Tornado' }
    ];
    return {heroes};
}
}
