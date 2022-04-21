import { NewsRss } from './model/new-Rss';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as xml2js from "xml2js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mini-project-flux-rss';
  RssData?: NewsRss;
  constructor(private http: HttpClient) {}
  GetRssFeedData() {
    const requestOptions: Object = {
      observe: "body",
      responseType: "text"
    };
    this.http
      .get<any>("https://www.lemonde.fr/rss/en_continu.xml", requestOptions)
      .subscribe(data => {
        let parseString = xml2js.parseString;
        parseString(data, (err, result: NewsRss) => {
          this.RssData = result;
          console.log("Rssss:", this.RssData);
        });
      });
  }
}
