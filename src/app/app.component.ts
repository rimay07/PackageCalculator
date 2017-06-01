/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Package } from './package.interface';
import { Globals } from './globals';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    public packageForm: FormGroup;
    public totalAmount: any;
    public isValid:Boolean;
    private globals:Globals;
    private weightObj;
    private volumeObj;
    private priceObj;

    constructor(private _formBuilder: FormBuilder, globals:Globals) { 
      this.globals = globals;
      this.weightObj = this.globals.weightObj;
      this.volumeObj = this.globals.volumeObj;
      this.priceObj = this.globals.priceObj;
    }

    ngOnInit() {
        this.packageForm = this._formBuilder.group({
            weight: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
            height: ['', <any>Validators.required],
            width: [''],
            depth:['']
        });
    }

    calculateTotalPrice(model:Package){
        this.isValid = this.validateInput();
        if(this.isValid){
          let weight = parseInt(model.weight);
          let height = parseInt(model.height);
          let width = parseInt(model.width);
          let depth = parseInt(model.depth);
          this.totalAmount = this.calculateByPriority(weight, height, width, depth);
          (<HTMLInputElement>document.getElementById("total")).innerHTML = this.totalAmount;
        }
    }

    validateInput(){
        let currForm = document.forms["packageForm"];
		    let blankFields = [];
        for (let formIdx = 0; formIdx< currForm.length; formIdx++) {
          let field = currForm.elements[formIdx].name;
          let fieldValue = currForm.elements[formIdx].value;
          let fieldName = null;

          switch (field) {
	    		case "weight":
	    			fieldName = "Weight";
	    			break;
	    		case "height":
	    			fieldName = "Height";
	    			break;
	    		case "width":
	    			fieldName = "Width";
	    			break;
	    		case "depth":
	    			fieldName = "Depth";
	    			break;
          }
          if(fieldName != null && (fieldValue == null || fieldValue == "" || fieldValue == ".")){
		        blankFields.push(fieldName);
	        }
        }

        if(blankFields.length > 0){
	    		alert("The Following Fields are required: " + blankFields);
	    	  return false;
	    	} 
	    	else return true;
    }

    calculateByPriority(weight, height, width, depth) {
        if(weight > this.weightObj.maxWeight){
          return "N/A";
        }
        else if (weight > this.weightObj.minWeight && weight <= this.weightObj.maxWeight){
          return "$ " + this.calculateByWeight(weight);
        }
        else if (weight <= this.weightObj.minWeight){
          return "$ " + this.calculateByVolume(height, width, depth);
        }
    }

    calculateByWeight(weight){
      return weight * this.priceObj.priceWeight;
    }

    calculateByVolume(height, width, depth){
      let volume = height * width * depth;
      if(volume < this.volumeObj.minVolume){
        return volume * this.priceObj.minVolumePrice;
      }
      else if (volume < this.volumeObj.maxVolume && volume >= this.volumeObj.minVolume){
        return volume * this.priceObj.maxVolumePrice;
      }
      else if (volume >= this.volumeObj.maxVolume){
        return volume * this.priceObj.overMaxVolumePrice;
      }
    }

    resetDivs(form){
      if(form)form.reset();
      let elements = document.getElementsByTagName("input");
      let elemCounter = 0;
      for (elemCounter; elemCounter < elements.length; elemCounter++) {
        if (elements[elemCounter].type == "text") {
          elements[elemCounter].value = "";
        }
      }
      (<HTMLInputElement>document.getElementById("total")).innerHTML = "";
    }
}
