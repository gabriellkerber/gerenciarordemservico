import { Injectable } from '@angular/core';
import { AngularFirestore } from  '@angular/fire/firestore';
import { Produto } from '../models/produto.model';
import { Observable } from 'rxjs';
import { idProduto } from '../models/idProduto.model';

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
      const id = (await this.getID()).id.toString();
      await this.firestore.collection('Produtos').doc(id).set(dados);
      this.atualizarLista();
      
      const variavel = await (await this.getID());
      variavel.id = variavel.id + 1;
      await this.updateID(variavel);
      this.updateID(variavel);
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

    async delete(cliente: Produto): Promise<void>{
      await this.firestore.collection('Produtos').doc(cliente.id).delete();
    }

    async update(id: string, produto: Produto): Promise<void> {

      await this.firestore.collection<Produto>('Produtos').doc(id).update(produto);
  
  }

        async getID(): Promise<idProduto>{
      const doc = await this.firestore.collection<idProduto>('ids').doc("5pjjSipdvH6ASUH3tKDb").get().toPromise();
      return {
        id: doc.id,
        ...doc.data()
      } as idProduto;
    }

    async updateID(idCliente: idProduto): Promise<void> {

    await this.firestore.collection<Produto>('ids').doc("5pjjSipdvH6ASUH3tKDb").update(idCliente);
  
  }
  async get(id: string): Promise<Produto>{
    const doc =  await this.firestore.collection<Produto>('Produtos').doc(id).get().toPromise();
    return {
      id: doc.id,
      ...doc.data()
    } as Produto;
  }
}
