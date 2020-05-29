import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { AngularFirestore } from  '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  clientes: Cliente[] = [];

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
}
