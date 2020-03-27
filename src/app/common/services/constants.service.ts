import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReturnedData, User } from 'src/app/ReturnedData';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  constructor(private httpClient: HttpClient, private route: ActivatedRoute,
    private router: Router) {
    this.httpClient = httpClient;

  }
  access_token: string = "";
  ip: string = "http://85.160.64.233:3000";
  usersArray: User[] = [];

  getUsers() {
    let header = new HttpHeaders()
      .set("User_token", this.access_token)
    
    let url = this.ip + '/users'
    this.httpClient
      .get<ReturnedData>(url, { headers: header, observe: 'response' })
      .subscribe((data) => {
        for (let i = 0; i < (data.body.page_count + 4); i++) {
          let subUrl = url + '?page=' + i;
          this.httpClient
            .get<ReturnedData>(subUrl, { headers: header, observe: 'response' })
            .subscribe((data) => {
              this.usersArray.concat(data.body.users);
            }, (error) => {
              console.log(error)
            });
        }
      }, (error) => {
        if (error.status === 401) {
          this.router.navigate(["/login"]);
        }
        console.log(error)
      });

    setTimeout(() => {
      this.usersArray.sort((a: any, b: any) => (a.id > b.id) ? 1 : -1);
      console.log(this.usersArray)
    }, 1000);
  }

 


}
