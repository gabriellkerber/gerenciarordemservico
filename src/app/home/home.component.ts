import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  funcionario;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {

    this.funcionario = this.loginService.x
  }

}
