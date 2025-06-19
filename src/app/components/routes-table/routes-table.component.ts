import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Route {
  uuid: string;
  address: string;
  mask: string;
  gateway: string;
  interface: string;
}

@Component({
  selector: 'app-routes-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routes-table.component.html',
  styleUrls: ['./routes-table.component.css'],
})
export class RoutesTableComponent {
  routes: Route[] = [
    {
      uuid: '1',
      address: '0.0.0.0',
      mask: '/0',
      gateway: '193.0.174.1',
      interface: 'Подключение Ethernet',
    },
    {
      uuid: '2',
      address: '10.1.30.0',
      mask: '/24',
      gateway: '0.0.0.0',
      interface: 'Гостевая сеть',
    },
    {
      uuid: '3',
      address: '192.168.1.0',
      mask: '/24',
      gateway: '0.0.0.0',
      interface: 'Домашняя сеть',
    },
    {
      uuid: '4',
      address: '193.0.174.0',
      mask: '/24',
      gateway: '0.0.0.0',
      interface: 'Подключение Ethernet',
    },
    {
      uuid: '5',
      address: '193.0.175.0',
      mask: '/25',
      gateway: '193.0.174.10',
      interface: 'Подключение Ethernet',
    },
    {
      uuid: '6',
      address: '193.0.175.22',
      mask: '/32',
      gateway: '193.0.174.1',
      interface: 'Подключение Ethernet',
    },
    {
      uuid: '7',
      address: '172.16.0.0',
      mask: '/16',
      gateway: '192.168.1.1',
      interface: 'VPN сеть',
    },
    {
      uuid: '8',
      address: '192.168.100.0',
      mask: '/24',
      gateway: '192.168.1.254',
      interface: 'Домашняя сеть',
    },
  ];

  sortedColumn: keyof Route | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  sortBy(column: keyof Route) {
    if (this.sortedColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    this.routes.sort((a, b) => {
      let result = 0;

      if (column === 'address' || column === 'gateway') {
        result = this.compareIPs(a[column], b[column]);
      } else if (column === 'interface') {
        result = a.interface.localeCompare(b.interface, 'ru');
      }

      return this.sortDirection === 'asc' ? result : -result;
    });
  }

  private compareIPs(ip1: string, ip2: string): number {
    const ipToNumberArray = (ip: string) =>
      ip.split('.').map((part) => parseInt(part, 10));

    const a = ipToNumberArray(ip1);
    const b = ipToNumberArray(ip2);

    for (let i = 0; i < 4; i++) {
      if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
  }
}
