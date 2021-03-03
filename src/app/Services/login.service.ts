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
    
    if(usuario.login === 'gabriel' && usuario.senha === '2205'){
      this.usuarioAutenticado = true;
      await this.router.navigateByUrl("/Home");
      this.mostrarMenuEmitter.emit(true);
      this.nomeEmitter.emit("Gabriel")
    }else if(usuario.login === 'emanuelle' && usuario.senha === '3107'){
      this.usuarioAutenticado = true;
      await this.router.navigateByUrl("/Home");
      this.mostrarMenuEmitter.emit(true);
      this.nomeEmitter.emit("Emanuelle")
    }else if(usuario.login === 'ana' && usuario.senha === '1210'){
      this.usuarioAutenticado = true;
      await this.router.navigateByUrl("/Home");
      this.mostrarMenuEmitter.emit(true);
      this.nomeEmitter.emit("Ana C.")
    }else if(usuario.login === 'diego' && usuario.senha === '3004'){
      this.usuarioAutenticado = true;
      await this.router.navigateByUrl("/Home");
      this.mostrarMenuEmitter.emit(true);
      this.nomeEmitter.emit("Diego")
    }else if(usuario.login === 'rayanne' && usuario.senha === '2609'){
      this.usuarioAutenticado = true;
      await this.router.navigateByUrl("/Home");
      this.mostrarMenuEmitter.emit(true);
      this.nomeEmitter.emit("Rayanne")
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
