import { Injectable } from '@angular/core';
import { AngularFirestore } from  '@angular/fire/firestore';
import { Cliente } from '../models/cliente.model';
import { Observable } from 'rxjs';
import { idCliente } from '../models/idCliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  id: Number[] = [];

  clientes: Cliente [] = [];

  constructor(private firestore: AngularFirestore
    ){ }


  ngOnInit(): void {
    this.atualizarLista();
  }

    async adicionar(dados){
      const id = (await this.getID()).id.toString();
      await this.firestore.collection('Clientes').doc(id).set(dados);
      this.atualizarLista();
      
      const variavel = await (await this.getID());
      variavel.id = variavel.id + 1;
      await this.updateID(variavel);
      this.updateID(variavel);
    }

    atualizarLista(){
      this.firestore.collection<Cliente>('Clientes').get()
      .toPromise()
      .then(documentData => {
  
  
        this.clientes = documentData.docs.map(doc =>{ 
          return {
            id: doc.id, ...doc.data()
          } as Cliente;
        });

  
      }).catch(error => {
      });
    }

    getAll(): Promise<Cliente[]>{

      return new Promise<Cliente[]>((resolve) => {
  
        this.firestore.collection<Cliente>('Clientes',
        ref => ref.orderBy('nome')
        ).get()
          .toPromise()
          .then(documentData => {
  
            const clientes = documentData.docs.map(doc => {
              return {
                id: doc.id,
                ...doc.data()
              } as Cliente;
            });
  
            resolve(clientes);
          });
      });
    }

    getObservable(): Observable<Cliente[]>{
      return this.firestore.collection<Cliente>('Clientes'
      ).valueChanges({ idField: 'id'});
    }

    async delete(cliente: Cliente): Promise<void>{
      await this.firestore.collection('Clientes').doc(cliente.id).delete();
    }

    async update(id: string, cliente: Cliente): Promise<void> {

      await this.firestore.collection<Cliente>('Clientes').doc(id).update(cliente);
  
  }

    async get(id: string): Promise<Cliente>{
      const doc =  await this.firestore.collection<Cliente>('Clientes').doc(id).get().toPromise();
      return {
        id: doc.id,
        ...doc.data()
      } as Cliente;
    }

    async getID(): Promise<idCliente>{
      const doc = await this.firestore.collection<idCliente>('ids').doc("dU3RYpP8MbZ8HDxuzkj3").get().toPromise();
      return {
        id: doc.id,
        ...doc.data()
      } as idCliente;
    }

    async updateID(idCliente: idCliente): Promise<void> {

    await this.firestore.collection<Cliente>('ids').doc("dU3RYpP8MbZ8HDxuzkj3").update(idCliente);
    }

    getSome(searchText: string): Observable<Cliente[]> {
      return this.firestore.collection<Cliente>('Clientes', ref => ref.where('nome', '>=', searchText).where('nome', '<=', searchText+ '\uf8ff')).valueChanges({ idField: 'id' });
    }

  }
