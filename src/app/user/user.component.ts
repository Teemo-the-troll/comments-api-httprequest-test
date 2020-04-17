import { Component, OnInit } from "@angular/core";
import { ConstantsService } from "../common/services/constants.service";
import { InfoServantService } from "../common/services/info-servant.service";
import { HttpClient } from "@angular/common/http";
import { ReturnedData, Comment, CommentPage } from '../ReturnedData';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  constructor(
    private _constant: ConstantsService,
    private servant: InfoServantService,
    private httpClient: HttpClient
  ) {}
  public username:string;
  private email:string;
  private id:number;
  private commentsArray:Comment[];
  private pages;

  get comments(){
    return this.commentsArray;
  }

  get pageCount(){
    return this.pages
  }

  ngOnInit(): void {
    this.servant.getUser().subscribe(data => {
      this.username = data.body.username;
      this.email = data.body.email;
      this.id = data.body.id;
    });

    this.servant.getComments().subscribe(data => {
      this.commentsArray = data.body.comments;
      this.pages = data.body.page_count;
    })
  }
  
}
