import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../clientes/cliente.service';
import { Cliente } from '../clientes/cliente';
import { AngularFirestore } from  '@angular/fire/firestore';
import { NgModel, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-cad-os',
  templateUrl: './cad-os.component.html',
  styleUrls: ['./cad-os.component.scss']
})
export class CadOSComponent implements OnInit {

  formulario = new FormGroup({
    nome: new FormControl(null,),
    cpf: new FormControl(null, [Validators.required, Validators.maxLength(16)]),
    bairro: new FormControl(null, [Validators.required, Validators.email]),
    endereco: new FormControl(null),
    cidade: new FormControl(null),
    telefone: new FormControl(null),
  });

  cliente: Cliente;

  constructor(
    private firestore: AngularFirestore,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.clienteService.atualizarLista();
  }

  async onSubmit(){

    if(! this.formulario.valid){
      return;
    }

    const dados = this.formulario.value;
    this.clienteService.adicionar(dados);
    this.formulario.reset();
    await this.snackBar.open('Novo Cliente cadastrado com Sucesso!');
  }
  
  

}
