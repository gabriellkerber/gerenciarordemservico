import { Injectable } from '@angular/core';
import { Marca } from '../models/marca.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  constructor(private firestore: AngularFirestore) { }

  // private convertToMarca(document: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>): Marca{
    
  // }

  async add(marca: Marca): Promise<Marca>{

   const docRef = await this.firestore.collection<Marca>('Marca').add(marca);
   const doc = await docRef.get();

   return {
     id: doc.id,
     ...doc.data()
   } as Marca;
  }

  getObservable(): Observable<Marca[]>{
    return this.firestore.collection<Marca>('Marca').valueChanges({idField: 'id'});
  };

  async get(id: string): Promise<Marca>{
    const doc =  await this.firestore.collection<Marca>('Marca').doc(id).get().toPromise();
    return {
      id: doc.id,
      ...doc.data()
    } as Marca;
  }
}
