import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';


@Injectable()
export class WeatherService {

	constructor(
		private http: Http
	) { }

	currentWeather(){
		return this.http.get("https://api.openweathermap.org/data/2.5/weather?id=1277333&APPID=1c7d7fd4b639fed954d9b1235273e8f4")
	}

	forcast(){
		return this.http.get("http://api.openweathermap.org/data/2.5/forecast?id=1277333&APPID=1c7d7fd4b639fed954d9b1235273e8f4")
			
	}

}
