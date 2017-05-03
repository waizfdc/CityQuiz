import { Injectable } from '@angular/core';
import {Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {ICity} from '../model/iCity'
import {FirebaseService} from './firebase.service';
import * as firebase from "firebase";

@Injectable()
export class LoaderService {
  private baseUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ce3b022b704a3b38e55b2836bea955fb&tags=architecture,outdoors&extras=url_c&format=json&nojsoncallback=1&woe_id=';

  citiesInit = false;
  loadedCities: ICity[];

  cityInit() {
    if(!this.citiesInit) {
      return this.getCities()
      .map(cities => this.loadedCities = cities);
    }
  }

  constructor(private http: Http) { }

  getImageUrl(woeId: number) {
    return this.http.get(this.baseUrl+woeId)
      .map((res: Response) => res.json())
      .map(data => {return (data.photos.photo[Math.floor(Math.random() * data.photos.photo.length)]).url_c});
  }

  addCity(city: string) {
    const baseUrl = 'https://api.flickr.com/services/rest/?method=flickr.places.find';
    const apiKey = '&api_key=ce3b022b704a3b38e55b2836bea955fb';
    const query = '&query=';
    const json = '&format=json&nojsoncallback=1';

    this.http.get(baseUrl+apiKey+query+city+json)
      .map(res => res.json())
      // .map(data => {console.log(data); return data;})
      .map(data => {return data.places.place[0].woeid})
      // .map(woeId => console.log('woe ===> ', woeId))
      .map(woeId => firebase.database().ref('cities/'+city).set(+woeId))
      .subscribe();
  }

  getCities() {
    const citiesUrl = 'https://city-quiz-82854.firebaseio.com/cities';

    return this.http.get(citiesUrl+'.json')
      .map((res: Response) => res.json())
      // .map(data => {console.log((data)); return data;})
      .map((data) => {
        const result = Object.keys(data).map(city => {
          return Object.assign({}, data.city, {name: city}, {woeId: data[city]});
        });
        return result;
      })
      // .map(data => {console.log(data); return data;})
      // .map(res => res[7].id)
  }

  pickRandomCity(): ICity {
    return this.loadedCities[Math.floor(Math.random() * this.loadedCities.length)];
  }
}
