import { Injectable } from '@angular/core';

@Injectable()
export class Globals{
	public weightObj : object;
    public volumeObj : object;
    public priceObj : object;

	constructor(){
		this.weightObj = { maxWeight: 50, minWeight:10 };
        this.volumeObj = { minVolume:1500, maxVolume: 2500 };
        this.priceObj =  {minVolumePrice:.05, maxVolumePrice: .04, overMaxVolumePrice: .03, priceWeight:15 }
	}

}