import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../Services/cliente.service';
import { Cliente } from '../models/cliente.model';
import { AngularFirestore } from  '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {


  formulario = new FormGroup({
    idPessoal: new FormControl(this.clienteService.pegarID()), 
    nome: new FormControl(null, [Validators.required]),
    cpf: new FormControl(null, [Validators.required, Validators.maxLength(16)]),
    bairro: new FormControl(null, [Validators.required]),
    endereco: new FormControl(null, [Validators.required]),
    cidade: new FormControl(null, [Validators.required]),
    telefone: new FormControl(null, [Validators.required]),
  });

  cliente: Cliente;

  constructor(
    private firestore: AngularFirestore,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.clienteService.atualizarLista();
    console.log("s"+this.clienteService.pegarID());
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
