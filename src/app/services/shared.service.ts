import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private location: Location) { }

  corregirCaracteres(input: string): string {
    var tittles = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
    var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
    for (var i = 0; i < tittles.length; i++) {
      input = input.replace(tittles.charAt(i), original.charAt(i)).toLowerCase();
    };
    return input;
  }
  cancelar() {
    this.location.back();
  }



}
