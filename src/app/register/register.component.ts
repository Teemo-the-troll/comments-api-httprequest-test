import {Component, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { ConstantsService } from "../common/services/constants.service";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
	constructor(private httpClient: HttpClient, private _constant: ConstantsService) {
		this.httpClient = httpClient;
	}

	username;
	email;
	password;
	passconf;

	sendReg() {
		let body = {
			email: this.email,
			username: this.username,
			password: this.password,
			password_confirmation: this.passconf
		};

		let url =  this._constant.ip + "/session/register";

		this.httpClient.post(url, body).subscribe(
			(data) => {
				document.write("You have been registered.");
			},
			error => {
				console.log(error);
			}
		);

		
	}
	ngOnInit(): void {}
}
