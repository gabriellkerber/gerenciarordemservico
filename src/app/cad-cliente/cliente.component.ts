import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../Services/cliente.service';
import { Cliente } from '../models/cliente.model';
import { AngularFirestore } from  '@angular/fire/firestore';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {


  formulario = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    cpf: new FormControl(null, [this.isValidCpf(), Validators.required, Validators.maxLength(11)]),
    bairro: new FormControl(null, [Validators.required]),
    endereco: new FormControl(null, [Validators.required]),
    cidade: new FormControl(null, [Validators.required]),
    telefone: new FormControl(null, [Validators.required]),
  });

  cliente: Cliente;

  constructor(
    private firestore: AngularFirestore,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private router: Router
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
    this.router.navigateByUrl("/Cadastrar/OS");

  }

  isValidCpf() {
     return (control: AbstractControl): Validators => {
       const cpf = control.value;
       if (cpf) {
         let numbers, digits, sum, i, result, equalDigits;
         equalDigits = 1;
         if (cpf.length < 11) {
          return { cpfNotValid: true };
         }

         for (i = 0; i < cpf.length - 1; i++) {
           if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
             equalDigits = 0;
             break;
           }
         }

         if (!equalDigits) {
           numbers = cpf.substring(0, 9);
           digits = cpf.substring(9);
           sum = 0;
           for (i = 10; i > 1; i--) {
             sum += numbers.charAt(10 - i) * i;
           }

           result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

           if (result !== Number(digits.charAt(0))) {
             return { cpfNotValid: true };
           }
           numbers = cpf.substring(0, 10);
           sum = 0;

           for (i = 11; i > 1; i--) {
             sum += numbers.charAt(11 - i) * i;
           }
           result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

           if (result !== Number(digits.charAt(1))) {
             return { cpfNotValid: true };
           }
           return null;
         } else {
           return { cpfNotValid: true };
         }
      }
    return null;
  };
  }

}
