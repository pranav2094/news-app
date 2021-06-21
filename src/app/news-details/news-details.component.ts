import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
  message:any;
  subscription: Subscription;
  constructor(private data: DataService,public sanitizer:DomSanitizer) { }
  ngOnInit() {
    this.subscription = this.data.currentMessage.subscribe(message => this.message = message);
    this.message.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.message.url);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  newMessage() {
    return this.data.changeMessage(this.message)
  }
}
