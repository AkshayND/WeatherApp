import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Chart } from 'chart.js';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

	id: any;
	weather: any;
	date: Date;
	localDate: string;
	temp: number;
	minTemp: number = Infinity;
	maxTemp: number = 0;
	mincwTemp: number = Infinity;
	maxcwTemp: number = 0;
	tempArray: number[] = [];
	localDateArray: string[] = [];

	cwDateArray: string[] = []
	cwTempArray: number[] = []

	chart: any;
	newChart: any;
	canvas: any;
	ctx: any;
	

	constructor(private weatherService: WeatherService){

	}

	ngOnInit(){
		this.callCurrentWeather();
		this.callCurrentWeather();
		this.callCurrentWeather();
		this.callForcast();
		this.id = setInterval(() => {
			this.callCurrentWeather()
		}, 600000)
	}

	callCurrentWeather(){
		this.weatherService.currentWeather()
			.subscribe(
				(data) => {
					console.log(data.json())
					var weather = data.json()
					console.log(weather.dt)
					var date = new Date(weather.dt * 1000) ;
					var localDate = date.toLocaleTimeString()

					// console.log(this.localDate);
					this.cwDateArray.push(localDate)
					var temp = weather.main.temp -273.15;
					if(temp < this.mincwTemp)
						this.mincwTemp = temp
					if(temp > this.maxcwTemp)
						this.maxcwTemp = temp
					// console.log(this.temp)
					this.cwTempArray.push(temp)
					console.log(this.cwDateArray);
					console.log(this.cwTempArray);

					var canvas: any = document.getElementById('newCanvas');
					var ctx = canvas.getContext('2d');

					this.newChart = new Chart(ctx, {
						type: 'line',
						data: {
							labels: this.cwDateArray,
							datasets: [{
								label: 'Temperature',
								data: this.cwTempArray,
								borderColor: "#ffcc00",
								fill: false
							}]
						},
						options: {
						  	responsive: false,
						  	legend: {
								display: false
							},
							scales: {
								xAxes: [{
									display: true,
									scaleLabel: {
										display: true,
										labelString: 'Time'
									}
								}],
								yAxes: [{
									display: true,
									scaleLabel: {
										display: true,
										labelString: 'Temperature'
									}
								}]
							}
						}
					  });

					// console.log(this.localDateArray)
					// console.log(this.tempArray);
				}
			)
	}

	callForcast(){
		this.weatherService.forcast()
		.subscribe(
			(data) => {
				console.log(data.json().list);
				this.weather = data.json().list;
				let temp = this.weather.map(res => res.main.temp-273.15);
				//console.log(temp)
				let alldates = this.weather.map(res => res.dt * 1000)
				for (const date of alldates) {
					const localDate = new Date(date).toLocaleTimeString()
					this.localDateArray.push(localDate)
				}
				console.log(temp)
				this.canvas = document.getElementById('canvas');
				this.ctx = this.canvas.getContext('2d');

				for(let temperature of temp){
					if(temperature < this.minTemp)
						this.minTemp = temperature
					if(temperature > this.maxTemp)
						this.maxTemp = temperature
				}

				this.chart = new Chart(this.ctx, {
					type: 'line',
					data: {
						labels: this.localDateArray,
						datasets: [{
							label: 'Temperature',
							data: temp,
							borderColor: "#3cba9f",
							fill: false
						}]
					},
					options: {
					  	responsive: false,
					  	legend: {
							display: false
						},
						scales: {
							xAxes: [{
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Time'
								}
							}],
							yAxes: [{
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Temperature'
								}
							}]
						}
					}
				  });

				
			}
		);	
	}

	
	
}
