import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ordem } from '../models/ordem.model';
import { OrdensService } from '../Services/ordens.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-buscar-ordem',
  templateUrl: './buscar-ordem.component.html',
  styleUrls: ['./buscar-ordem.component.scss']
})
export class BuscarOrdemComponent implements OnInit {

  idOrdem: string;

  ordens: Ordem;

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
    idUsuario: new FormControl(null),
  });

  constructor(
    private activedRoute: ActivatedRoute,
    private ordemService: OrdensService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  async ngOnInit(){



    this.idOrdem = this.activedRoute.snapshot.paramMap.get('id');
    this.ordens = await this.ordemService.get(this.idOrdem);
    if(!this.ordens.nome){
      this.router.navigateByUrl("/Login");
    }

    // this.formulario.disable();
    this.formulario.patchValue(this.ordens);
  }

}
