import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ordem } from '../models/ordem.model';
import { OrdensService } from '../Services/ordens.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-buscar-os',
  templateUrl: './buscar-os.component.html',
  styleUrls: ['./buscar-os.component.scss']
})
export class BuscarOSComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'equipamento', 'modelo','valorEntrada', 'valorTotal','acoes'];
  ordens: Observable<Ordem[]>;
  dataSource;

  constructor(
    private firestore: AngularFirestore,
    private ordensService: OrdensService
  ) { }

  ngOnInit(): void {
    this.ordens = this.ordensService.getObservable();
    this.dataSource = this.ordens;
  }

  async deletar(ordens: Ordem) {

    await this.ordensService.delete(ordens);
  }

}
