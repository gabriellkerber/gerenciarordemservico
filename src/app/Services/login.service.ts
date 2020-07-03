import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuarioAutenticado: boolean = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();
  nomeEmitter = new EventEmitter<string>();

  constructor(private router: Router) { }
  

 async fazerLogin(usuario: Usuario){
    
    if(usuario.login === 'gabrielkerber' && usuario.senha === 'pepel006'){
      this.usuarioAutenticado = true;
      await this.router.navigateByUrl("/Home");
      this.mostrarMenuEmitter.emit(true);
      this.nomeEmitter.emit("Gabriel")
    }else if(usuario.login === 'admin' && usuario.senha === 'admin123'){
      this.usuarioAutenticado = true;
      await this.router.navigateByUrl("/Home");
      this.mostrarMenuEmitter.emit(true);
      this.nomeEmitter.emit("Admin")
    }
    else{
      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
    }

  }
   async verificar(){
    return await this.usuarioAutenticado;
  }
}
