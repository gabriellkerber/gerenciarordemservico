import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../Services/cliente.service';
import { Cliente } from '../models/cliente.model';
import { AngularFirestore } from  '@angular/fire/firestore';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss']
})
export class EditarClienteComponent implements OnInit {

  idCliente: string;


  formulario = this.formBuilder.group({
    idPessoal: new FormControl(null), 
    nome: new FormControl('',Validators.required),
    cpf: new FormControl('',[Validators.required, Validators.maxLength(16)]),
    bairro: new FormControl('',Validators.required),
    endereco: new FormControl('',Validators.required),
    cidade: new FormControl('',Validators.required),
    telefone: new FormControl('',Validators.required),
  });

  cliente: Cliente;

  constructor(
    private firestore: AngularFirestore,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  async ngOnInit(){
    // this.clienteService.atualizarLista();
    this.idCliente =
     this.activedRoute.snapshot.paramMap.get('id');
    this.cliente = await this.clienteService.get(this.idCliente);

    this.formulario.patchValue(this.cliente);
  }

  async onSubmit(){

    if(! this.formulario.valid){
      return;
    }

    const dados = this.formulario.value;
    this.clienteService.update(this.idCliente, dados);
    this.formulario.reset();
    await this.snackBar.open(`${"Cliente"} ${this.cliente.nome} ${"editado com Sucesso!"}`);
    this.router.navigate(["/Buscar/Cliente"]);
  }

  

}
