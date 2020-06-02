import { Injectable } from '@angular/core';
import { AngularFirestore } from  '@angular/fire/firestore';
import { Cliente } from '../models/cliente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  id: Number[] = [];

  clientes: Cliente [] = [];

  constructor(private firestore: AngularFirestore){ }


  ngOnInit(): void {
    this.atualizarLista();
  }

    async adicionar(dados){
      console.log(dados);
      await this.firestore.collection('Clientes').add(dados);
      this.atualizarLista();
    }

    atualizarLista(){
      this.firestore.collection<Cliente>('Clientes').get()
      .toPromise()
      .then(documentData => {
  
        // console.log(documentData.docs[0].data());
  
        this.clientes = documentData.docs.map(doc =>{ 
          return {
            id: doc.id, ...doc.data()
          } as Cliente;
        });
  
        console.log(this.clientes);
  
      }).catch(error => {
        console.log(error);
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
      return this.firestore.collection<Cliente>('Clientes',
      ref => ref.orderBy('nome')
      ).valueChanges({ idField: 'id'});
    }

    pegarID(): Number{
        this.id.push(1);
        return this.id.length;
        
    }
  }
