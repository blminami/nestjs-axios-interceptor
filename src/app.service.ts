import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getCats(): Observable<any> {
    return this.httpService.get('http://localhost:3001/cats').pipe(
      map((data) => {
        console.log('Do something');
        return data;
      }),
    );
  }
}
