import { __decorate } from "tslib";
import { Component } from "@angular/core";
let RegisterComponent = class RegisterComponent {
    constructor(httpClient, router) {
        this.httpClient = httpClient;
        this.router = router;
        this.httpClient = httpClient;
    }
    sendReg() {
        let body = {
            email: this.email,
            username: this.username,
            password: this.password,
            password_confirmation: this.passconf
        };
        let url = "http://85.160.64.233:3000/session/register";
        this.httpClient.post(url, body).subscribe((data) => {
            this.router.navigate(["/login"]);
        }, error => {
            console.log(error);
        });
        //var password = document.getElementById("pass").value;
        //var username = document.getElementById("username").value;
        //var passwordConfirm = document.getElementById("passconf").value;
    }
    ngOnInit() { }
};
RegisterComponent = __decorate([
    Component({
        selector: "app-register",
        templateUrl: "./register.component.html",
        styleUrls: ["./register.component.scss"]
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map