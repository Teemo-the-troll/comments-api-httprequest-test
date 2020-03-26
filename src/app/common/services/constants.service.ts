import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ReturnedData } from "src/app/ReturnedData";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ConstantsService {
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.httpClient = httpClient;
  }
  access_token: string = "";
  ip: string = "http://85.160.64.233:3000";
  usersArray: string[] = [];

  getUsers() {
    let header = new HttpHeaders().set("User_token", this.access_token); //header
    let tempUsersArray = []; //array na usery
    let url = this.ip + "/users"; //ip
    this.httpClient //request na get prvni page na extract PAGE_COUNT
      .get<ReturnedData>(url, { headers: header, observe: "response" }) 
      .subscribe(
        data => {
          for (let i = 0; i < data.body.page_count + 1; i++) {
            let subUrl = url + "?page=" + i;
            this.httpClient
              .get<ReturnedData>(subUrl, {
                headers: header,
                observe: "response"
              })
              .subscribe(
                data => {
                  tempUsersArray = data.body.users.concat(tempUsersArray);//add to array
                  console.log(tempUsersArray);
                },
                error => {
                  console.log(error);
                }
              );
          }
        },
        error => {
          if (error.status === 401) {
            this.router.navigate(["/login"]);
          }
          console.log(error);
        }
      );

    setTimeout(() => {
      tempUsersArray.sort((a: any, b: any) => (a.id > b.id ? 1 : -1));
      this.usersArray = tempUsersArray;
      console.log(this.usersArray);
    }, 1000);
  }
}
