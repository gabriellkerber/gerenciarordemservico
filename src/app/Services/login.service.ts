import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }
  

 async  fazerLogin(usuario: Usuario){
    
    if(usuario.login === 'gabrielkerber' && usuario.senha === 'pepel006'){
      this.usuarioAutenticado = true;
      await this.router.navigateByUrl("/Home");
      this.mostrarMenuEmitter.emit(true);
    }
    else{
      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
      console.log("desloguei")
    }

  }

   async verificar(){
    return await this.usuarioAutenticado;
  }
}
