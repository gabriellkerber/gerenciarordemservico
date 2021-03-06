import { Injectable } from '@angular/core';
import { AngularFirestore } from  '@angular/fire/firestore';
import { Ordem } from '../models/ordem.model';
import { idOrdem } from '../models/idOrdem.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdensService {

  id: Number[] = [];

  ordens: Ordem [] = [];

  constructor(
    private firestore: AngularFirestore,
  ) { }

  async adicionar(dados){
    const id = (await this.getID()).id.toString();
    await this.firestore.collection('Ordens').doc(id).set(dados);
    this.atualizarLista();
    
    const variavel = await (await this.getID());
    variavel.id = variavel.id + 1;
    await this.updateID(variavel);
    this.updateID(variavel);
  }

  async getID(): Promise<idOrdem>{
    const doc = await this.firestore.collection<idOrdem>('ids').doc("1yjiSLb2byv4zQDwMjVk").get().toPromise();
    return {
      id: doc.id,
      ...doc.data()
    } as idOrdem
  }

  atualizarLista(){
    this.firestore.collection<Ordem>('Ordens').get()
    .toPromise()
    .then(documentData => {


      this.ordens = documentData.docs.map(doc =>{ 
        return {
          id: doc.id, ...doc.data()
        } as Ordem;
      });


    }).catch(error => {
    });
  }

  async updateID(idOrdem: idOrdem): Promise<void> {

    await this.firestore.collection<Ordem>('ids').doc("1yjiSLb2byv4zQDwMjVk").update(idOrdem);
  
  }

  getObservable(): Observable<Ordem[]>{
    return this.firestore.collection<Ordem>('Ordens'
    ).valueChanges({ idField: 'id'});
  }

  async delete(ordem: Ordem): Promise<void>{
    await this.firestore.collection('Ordens').doc(ordem.id).delete();
  }
  
  async get(id: string): Promise<Ordem>{
    const doc =  await this.firestore.collection<Ordem>('Ordens').doc(id).get().toPromise();
    return {
      id: doc.id,
      ...doc.data()
    } as Ordem;
  }

    async update(id: string, ordem: Ordem): Promise<void> {

      await this.firestore.collection<Ordem>('Ordens').doc(id).update(ordem);
    }
}
