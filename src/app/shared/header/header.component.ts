import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public back: BackendService) { }

  ngOnInit() {
  }
  cambiarIdioma(lang): void {

    console.log(lang);
    this.back.setLanguage(lang);


}
}
