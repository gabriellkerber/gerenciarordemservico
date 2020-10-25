import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Imagem } from '../dialog-photo/dialog-photo.component';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';

@Component({
  selector: 'app-edicao-imagem-produto',
  templateUrl: './edicao-imagem-produto.component.html',
  styleUrls: ['./edicao-imagem-produto.component.scss']
})
export class EdicaoImagemProdutoComponent implements OnInit, OnDestroy{

  enviando: boolean;
  carregando: boolean;
  progressoEnvio: number;

  @Input() imagem: Imagem;
  // @Input() url: string;
  // @Input() arquivo: File;
  @Input() idProduto: string;
  @Output() fileUploded: EventEmitter<Imagem> = new EventEmitter();
  @Output() fileDeleted: EventEmitter<Imagem> = new EventEmitter();

  private fileReference: AngularFireStorageReference;
  private uploadTask: AngularFireUploadTask;
  private percentageChangesSubscription: Subscription;
  private snapshotChangesSubscription: Subscription;

  constructor(
    private fireStorage: AngularFireStorage
  ) { }


  ngOnInit(): void {

    if (this.imagem.url) {

        this.carregando = true;

    } else {

        if (!this.imagem.arquivo) {
            return;
        }

        this.enviando = true;

        const nome = `${this.idProduto}_${new Date().getTime()}_${this.imagem.arquivo.name}`;


        this.fileReference = this.fireStorage.ref(nome);
        this.uploadTask = this.fireStorage.upload(nome, this.imagem.arquivo);

        this.percentageChangesSubscription = this.uploadTask.percentageChanges()
            .subscribe(x => {
                this.progressoEnvio = x;
            });

        this.snapshotChangesSubscription = this.uploadTask.snapshotChanges()
            .pipe(finalize(() => this.uploadFinalizado()))
            .subscribe();

    }

}

ngOnDestroy(): void {

    if(this.uploadTask){
            
        this.uploadTask.cancel();
    }

    if (this.percentageChangesSubscription) {
        this.percentageChangesSubscription.unsubscribe();
    }

    if (this.snapshotChangesSubscription) {
        this.percentageChangesSubscription.unsubscribe();
    }

}

private async uploadFinalizado() {

    this.enviando = false;
    this.carregando = true;

    const url = await this.fileReference.getDownloadURL().toPromise();

    this.imagem.url = url;

    this.fileUploded.emit(this.imagem);

}

    imagemCarregada() {
        this.carregando = false;
    }

    async excluirImagem(){
        const fileRef = this.fireStorage.storage.refFromURL(this.imagem.url);
        await fileRef.delete();
        this.imagem.url = null;

        this.fileDeleted.emit(this.imagem);
    }
}
