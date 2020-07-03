import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { Usuario } from '../models/usuario.model';
import { RouterLink, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { OrdensService } from '../Services/ordens.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.loginService.mostrarMenuEmitter.subscribe(
      msg => this.teste(msg)
    );
  }

  async fazerLogin(){
    await this.loginService.fazerLogin(this.usuario)
  }

  async teste(msg:string){
    if(!msg){
    await this.snackBar.open('Usuário ou Senha Incorretos!');
    }
  }

  async buscarOS(){
    let inputValue = (document.getElementById("numero") as HTMLInputElement).value;
    let ordem = await this.ordemService.get(inputValue);
    if(!ordem.nome){
      this.router.navigateByUrl("/Login");
      this.snackBar.open('Número de OS Incorreto!');
    }else{
    this.router.navigateByUrl("/Buscar/"+ inputValue+"/Ordem");
    }
  }

}
