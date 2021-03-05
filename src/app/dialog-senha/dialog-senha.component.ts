import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CadOSComponent, DialogData } from '../cad-os/cad-os.component';

@Component({
  selector: 'app-dialog-senha',
  templateUrl: './dialog-senha.component.html',
  styleUrls: ['./dialog-senha.component.scss']
})
export class DialogSenhaComponent implements OnInit {

  senha: String;

  constructor(public dialogRef: MatDialogRef<CadOSComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  
  }
  checkMyKey(event) {
    if (event.keyCode === 13){
      document.getElementById("btOk").click(); 
    }
  }


}
