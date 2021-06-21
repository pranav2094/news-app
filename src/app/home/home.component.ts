import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Typed from 'typed.js';
import { DataService } from '@app/_services/data.service';
export interface Category {
    value: string;
    viewValue: string;
  }
  
  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
    })
export class HomeComponent {
    user: User;
    message:string;
    subscription: Subscription;
    categories: Category[] = [
      { value: 'science', viewValue: 'Science' },
      { value: 'entertainment', viewValue: 'Entertainment' },
      { value: 'general', viewValue: 'General' },
      { value: 'health', viewValue: 'Health' },
      { value: 'business', viewValue: 'Business' },
      { value: 'sports', viewValue: 'Sports' },
      { value: 'technology', viewValue: 'Technology' }
    ];
    private API_KEY = "0cb53a6b64fc476fbad2798f32ce2bcf";
    showResultsDiv: boolean = false;
    totalResults:any;
    data = [];
    ghosts = [];
    public passTheURL: any;
    selected="";
    article='';
    constructor(private accountService: AccountService,private httpClient: HttpClient,public _router: Router, private dataService: DataService) {
        this.user = this.accountService.userValue;
        const options = {
            strings: ['Science', 'Entertainment', 'General',
              'Health', 'Business', 'Sports', 'Technology'],
            typeSpeed: 100,
            backSpeed: 150,
            showCursor: true,
            cursorChar: '|',
            loop: true
          };
      
        //   const typed = new Typed('#typed-element', options);
          this.makeTheRequestAndGetData(this.selected);
    }
    makeTheRequestAndGetData(formValue) {
        console.log(formValue);
        
        return this.httpClient.get(`https://newsapi.org/v2/top-headlines?category=${formValue}&
       language=en&country=in&sortBy=publishedAt&apiKey=${this.API_KEY}`).pipe(delay(3000)).subscribe((data:any) => {
         console.log(data.totalResults);
         
          this.totalResults = data.totalResults;
          console.log(data['articles']);
          this.data = data['articles'];
          this.showResultsDiv = false;
        });
    
      }
      
  searchButtonClicked(formValue) {
    console.log("ererew",formValue);
    
    this.ghosts = new Array(30);
    this.showResultsDiv = true;
    this.makeTheRequestAndGetData(formValue);
  }

  
  openNewsDetails(article){

    this.subscription = this.dataService.currentMessage.subscribe(message => this.message = article)
    this.dataService.changeMessage(article);
    this._router.navigate(["news_detail"]);
  }


  comment(){

  }
 

}