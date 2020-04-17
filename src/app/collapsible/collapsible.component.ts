import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.scss']
})
export class CollapsibleComponent implements OnInit {

  constructor() { }

  private isHidden:boolean = true;

  get hidden(){
    return this.isHidden
  }
  
  set hidden(value:boolean){
    this.isHidden = value;
  }

  ngOnInit(): void {
  }

}
