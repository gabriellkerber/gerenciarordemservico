import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { Usuario } from '../models/usuario.model';
import { RouterLink, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { OrdensService } from '../Services/ordens.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario = new FormGroup({
    numero: new FormControl(null),
  });

  usuario: Usuario = new Usuario();

  constructor(
    private loginService: LoginService,
    private router: Router,
    private ordemService: OrdensService,
    ) { }

  ngOnInit(): void {
  }

  fazerLogin(){
    console.log(this.usuario);
    this.loginService.fazerLogin(this.usuario);
  }

  async buscarOS(){
    let inputValue = (document.getElementById("numero") as HTMLInputElement).value;
    let ordem = await this.ordemService.get(inputValue);
    if(!ordem.nome){
      this.router.navigateByUrl("/Login");
    }else{
    this.router.navigateByUrl("/Buscar/"+ inputValue+"/Ordem");
    }
  }

}
