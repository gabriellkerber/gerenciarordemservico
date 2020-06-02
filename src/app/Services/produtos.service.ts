import { Injectable } from '@angular/core';
import { AngularFirestore } from  '@angular/fire/firestore';
import { Produto } from '../models/produto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  produtos: Produto [] = [];

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.atualizarLista();
  }

    async adicionar(dados){
      console.log(dados);
      await this.firestore.collection('Produtos').add(dados);
      this.atualizarLista();
    }

    atualizarLista(){
      this.firestore.collection<Produto>('Produtos').get()
      .toPromise()
      .then(documentData => {
  
        // console.log(documentData.docs[0].data());
  
        this.produtos = documentData.docs.map(doc =>{ 
          return {
            id: doc.id, ...doc.data()
          } as Produto;
        });
  
        console.log(this.produtos);
  
      }).catch(error => {
        console.log(error);
      });
    }
    getObservable(): Observable<Produto[]>{
      return this.firestore.collection<Produto>('Produtos',
      ref => ref.orderBy('nome')
      ).valueChanges({ idField: 'id'});
    }
}
