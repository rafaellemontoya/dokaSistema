import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  lang = 'es';
  constructor(private http: HttpClient) { }

  getLanguage(): void{
    this.http.get('https://apptudoka.com.mx/get_lang.php').subscribe( (data: any) => {
      console.log('entro get');
      console.log(data);
      if (data.response === 1) {
        
        this.lang = data.lang;
        console.log(data);
      }
    });
  }

  setLanguage(lang: string): void {
    this.http.post('https://apptudoka.com.mx/set_lang.php', {setlang: lang}).subscribe( (data: any) => {
      if (data.response === 1) {
        this.getLanguage();
        console.log(data);
      }

    });
  }
}
