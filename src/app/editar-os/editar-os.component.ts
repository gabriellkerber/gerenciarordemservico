import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../Services/cliente.service';
import { Cliente } from '../models/cliente.model';
import { AngularFirestore } from  '@angular/fire/firestore';
import { NgModel, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Ordem } from '../models/ordem.model';
import { OrdensService } from '../Services/ordens.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-editar-os',
  templateUrl: './editar-os.component.html',
  styleUrls: ['./editar-os.component.scss']
})
export class EditarOsComponent implements OnInit {

  idOrdem: string;

  formulario = this.formBuilder.group({
    nome: new FormControl(null,),
    equipamento: new FormControl(null),
    modelo: new FormControl(null),
    defeito: new FormControl(null),
    status: new FormControl(null),
    acessorios: new FormControl(null),
    valorEntrada: new FormControl(null),
    valorTotal: new FormControl(null),
    andamento: new FormControl(null),
  });

  ordem: Ordem;

  constructor(
    private firestore: AngularFirestore,
    private ordemService: OrdensService,
    private snackBar: MatSnackBar,
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  async ngOnInit(){
    this.idOrdem = this.activedRoute.snapshot.paramMap.get('id');
    this.ordem = await this.ordemService.get(this.idOrdem);

    this.formulario.patchValue(this.ordem);
  }

  async onSubmit(){

    if(! this.formulario.valid){
      return;
    }

    const dados = this.formulario.value;
    this.ordemService.update(this.idOrdem, dados);
    this.formulario.reset();
    await this.snackBar.open(`${"Ordens"} ${this.ordem.nome} ${"editado com Sucesso!"}`);
    this.router.navigate(["/Buscar/OS"]);
  }
  
  

}
