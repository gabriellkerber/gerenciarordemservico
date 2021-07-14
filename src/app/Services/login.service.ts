import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private usuarioAutenticado = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();
  nomeEmitter = new EventEmitter<string>();
  senhaEmitter = new EventEmitter<boolean>();

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
    }else if(usuario.login === 'joao' && usuario.senha === '0309'){
      this.usuarioAutenticado = true;
      await this.router.navigateByUrl("/Home");
      this.mostrarMenuEmitter.emit(true);
      this.nomeEmitter.emit("João")
    }
    
    else{
      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
    }

  }

  async SenhaAtendente(senha:string){
    if(senha == '2205'){
      this.senhaEmitter.emit(true);
      await this.nomeEmitter.emit("Gabriel")
    }else if(senha == "0309"){
      this.senhaEmitter.emit(true);
      await this.nomeEmitter.emit("João")
    }else if(senha == "3107"){
      this.senhaEmitter.emit(true);
      await this.nomeEmitter.emit("Emanuelle")
    }else if(senha == "3004"){
      this.senhaEmitter.emit(true);
      await this.nomeEmitter.emit("Diego")
    }else if(senha == "1210"){
      this.senhaEmitter.emit(true);
      await this.nomeEmitter.emit("Ana C.")
    }else{
      this.senhaEmitter.emit(false);
    }
  }

   async verificar(){
    return await this.usuarioAutenticado;
  }
}
