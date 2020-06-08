import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  fazerLogin(){
    console.log(this.usuario);
    this.loginService.fazerLogin(this.usuario);
  }

}
