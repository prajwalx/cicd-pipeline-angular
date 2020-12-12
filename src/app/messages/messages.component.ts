import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollframe', {static: false}) scrollFrame!: ElementRef;
  @ViewChildren('msg') msgElements!: QueryList<any>;
  private scrollContainer: any;
  messages: Array<any> = [];
  isNearBottom = true;

  constructor() {
   }

  ngAfterViewInit(): void {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.msgElements.changes.subscribe(_ => this.onMsgElementsChanged());

    // Add a new item every 2 seconds
    setInterval(() => {
      this.messages.push({});
    }, 10000);
  }

  private onMsgElementsChanged(): void {
    if (this.isNearBottom) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    window.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }

  private isUserNearBottom(): boolean {
    const threshold = 150;
    const position = window.scrollY + window.innerHeight; // <- Measure position differently
    const height = document.body.scrollHeight; // <- Measure height differently
    return position > height - threshold;
  }

  @HostListener('window:scroll', ['$event']) // <- Add scroll listener to window
  scrolled(event: any): void {
    this.isNearBottom = this.isUserNearBottom();
  }

  ngOnInit(): void {

  }

}
