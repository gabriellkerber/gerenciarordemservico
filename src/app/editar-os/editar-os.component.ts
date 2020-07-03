import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../Services/cliente.service';
import { Cliente } from '../models/cliente.model';
import { AngularFirestore } from  '@angular/fire/firestore';
import { NgModel, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Ordem } from '../models/ordem.model';
import { OrdensService } from '../Services/ordens.service';
import { ActivatedRoute, Router } from '@angular/router';
import pdfMaker from 'pdfmake/build/pdfmake';
import { PdfMakeWrapper, Img } from 'pdfmake-wrapper';
import { style } from '@angular/animations';


@Component({
  selector: 'app-editar-os',
  templateUrl: './editar-os.component.html',
  styleUrls: ['./editar-os.component.scss']
})
export class EditarOsComponent implements OnInit {

  idOrdem: string;

  formulario = this.formBuilder.group({
    nome: new FormControl(null,),
    equipamento: new FormControl(null),
    modelo: new FormControl(null),
    defeito: new FormControl(null),
    status: new FormControl(null),
    acessorios: new FormControl(null),
    valorEntrada: new FormControl(null),
    valorTotal: new FormControl(null),
    andamento: new FormControl(null),
    funcionario: new FormControl(null),
    telefoneCliente: new FormControl(null),
  });

  ordem: Ordem;
  pdfObj = null;
  docDefinition: any;
  dados: any;

  constructor(
    private firestore: AngularFirestore,
    private ordemService: OrdensService,
    private snackBar: MatSnackBar,
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }


  async ngOnInit(){
    this.idOrdem = this.activedRoute.snapshot.paramMap.get('id');
    this.ordem = await this.ordemService.get(this.idOrdem);

    this.formulario.patchValue(this.ordem);
  }

  async onSubmit(){

    if(! this.formulario.valid){
      return;
    }

    const dados = this.formulario.value;
    this.ordemService.update(this.idOrdem, dados);
    this.formulario.reset();
    await this.snackBar.open(`${"Ordens"} ${this.ordem.nome} ${"editado com Sucesso!"}`);
    this.router.navigate(["/Buscar/OS"]);
  }
  
  imprimirOs(){
    this.dados = this.formulario.value;
    const pdf = new PdfMakeWrapper();
     this.docDefinition = {
       pageSize:"A4",
       pageMargins: [ 40, 60, 60, 0 ],
       header: {
        columns: [
        { text: 'Ordem de Serviço Gerada as : ' + this.dataHoje(), alignment: 'right', margin:[0, 15, 15, 0] },]
      },


      content:[
        {
          columns:[
            
            {image: 'data:image/jpeg;base64,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',
            style:'imagem',fit:[280, 280]},[
            {text: "Clinica do Celular e Notebook", style:'cont', fontSize: 17, bold:true},
            {text: "Rua Presidente Getulio Vargas, 1765", style:'cont'},
            {text: "Telefone: (42) 99909-5885", style:'cont'},
            {text: "Centro - Guarapuava", style:'cont'}]
          ]
        },
        
        {
          table:{
            widths:['60%','40%'],
            body:[
              [
                [{text:'Ordem de Serviço Nº: '+ this.idOrdem, bold: true, fontSize:17, alignment:'center'},
              ],
              [
                {text:'Atendente: '+ this.dados.funcionario, bold: true, fontSize:14, alignment:'center'},
              ]
              ],
            ]

            }
        },
        {
          columns:[
            [
              {text:'Cliente: '+ this.dados.nome, margin:[0,15,0,0]},
              {text:'Equipamento: '+ this.dados.equipamento, margin:[0,20,0,0]},
              {text:'Defeito/Melhoria: ', margin:[0,15,0,0]},
              {text: this.dados.defeito, margin:[0,10,0,0]},
              {text:'Acessorios: ' + this.dados.acessorios, margin:[0,20,0,0]},
              {text:'Valor de Entrada R$: '+ this.dados.valorEntrada, margin:[0,10,0,0]}
            ],
            [
              {text:'Telefone: '+ this.dados.telefoneCliente, margin:[50,15,0,0]},
              {text:'Modelo: '+ this.dados.modelo, margin:[50,20,0,0]},
              {text:'Valor Total R$: '+ this.dados.valorTotal, margin:[50,100,0,0]}
            ],
          ]
        },
        {
          columns:[
            [
            {text:'- O Aparelho somente será entregue mediante a apresentação desta Ordem de Serviço.', margin:[0,15,0,0]},
            {text:'- Ciente que o aparelho não retirado no prazo de 90 dias, será descartado para o Lixo Eletrônico.', margin:[0,5,0,0]},
            {text:'- Declaro que é de minha inteira responsabilidade a procedência deste aparelho.', margin:[0,5,0,0]},
            {text:'- DECLARO, QUE CONCORDO, COM OS TERMOS DESCRITO NESTA ORDEM DE SERVIÇO', margin:[0,5,0,0]}
          ]
        ]
        },
        {
          columns:[
            [
              {text:'________________________________________', alignment:'right', margin:[0,30,0,0]},
              {text:'Assinatura do Cliente', alignment:'right', margin:[0,0,50,0]},
              {text:'Via do Cliente -------------------------------------------------------------------'+
              '-----------------------------------------------------------'}
            ]
          ]
        },
        {
          columns:[
            
            {image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEQEBISDxIWFhAVFhYXGBUSFRgWFRUVFhYYFiAWFhcYHSggGBolHRYVIjEiJSotLi4uGR8zODMuNygtLisBCgoKDg0OGxAQGy0gICMrNS0tNy8tLS0rLS8tKy0tLzAtLi0tLTYtLS8tLy0tLy0tLy0tLS0tLS0tLS4tLS0rLf/AABEIAIoBbQMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcBAgj/xABEEAACAQIDBgMGBAEICgMAAAABAgADEQQFEgYTITFBYSJRgQcjMnGRoRRCscHRFTNSYnKCkrIIJDZDc7TC4vDxJTQ1/8QAGgEBAAIDAQAAAAAAAAAAAAAAAAIDAQQFBv/EACsRAAICAQMDAgYCAwAAAAAAAAABAhEDEiExBBNBcfAiUYGRwdEFYTJCsf/aAAwDAQACEQMRAD8A5lEROmcgREQBERAEREAS77E5XoQ13HifgvZPP1P2A85WMiy04msqfl5ufJR+55es6cqgAACwAsAOQA4Wkoo1OqyUtK8nsREmaAk1srle/rAsPd07M3kT0X7X9O8hkUkgAXJIAA6k8LTpuRZcMPRVPzc2Pmx5/Tl6SjPk0xpcs3ug6fu5LfCJERETnHoxERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQD8gxETpnIEREAREQBESc2Syvf1tTD3dOxPkW6L+/p3gjKSirZadlcr3FAFh7ypZm8wOi+l/qTJqIlqOTKTk7YiJmweGarUWmnxMbDt3PYC5hujCTbpFh2JyzW5ruPCnBe7dT6D7ntLxNfAYRaNNaafCot8+57k8ZsTl5J65Weo6XAsONR8+fURESs2BERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQD8q7SZUcLiGp/kPiQ+aH9xxHpIudU2yyf8ThyUHvad2TzI6p6j7gTlU6ZxoS1I9iIgkIiIB6iFiFUXJIAA6k8AJ0/JMuGGorTHxc2I6sefp0+QlY2IyvU5ruPCnBO7dT6A/U9pdpOKNHqslvQhERJGmJdNicr0qa7jxNwTsvU+p+w7ys5Ll5xFZaY+Hmx8lHP16es6dSQKAqiwAAA8gOFpq9TkpaUdX+M6fVLuPhcep9xETRO4IiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIBy4YlfP7Tmm2uUbitvKY9zVJI4cA44sv3B9e0v9KmWYKOZNpJZ/kSYrCNh+AIF0Y/lqDk3rcg9iZ05UjzvTSlJu+DhkT6rUmRmVwQykqQeYINiD6z5g2xM+BwrVqi00+Jjb5eZPYC59Jgl32JyvQhruPE/BOydT6n7DvMpWV5cmiNliweGWjTWmnwqLDv3PcnjM0RLDlN2IiTOyuWb+sCw93Tszdz0X7X9JGUlFWyWPG8klGPLLTslle4o6mHvKlifMDov7/Mydnlp7OXKTk7Z6rFjWOCivAiIkSwReeXkJtbjXpYf3Zs7sEBHMXBJt9LeslGOp0QyZFjg5PwSdbMKKGz1UU+TOoP3MzUqysLqwYeakEfaV1sjwWFoNVxVtKKWqVHYgC3EmwP25yJyzZAYpalevvsPvP5ijTqujUEHwvVF7VKrfEVe6rwW3Akyah82VRnmb3S+7/Re4lT2cz8pu8Li2BckpRxAuKeIKkgob8aVcWsaTceBtfja1tykGqZenas1hmVG7DeL4QSePILz+nWZK9cKVB5s2kcRzsT17KZDLUvgzRCvvVoFSuhviCWIvaxueXnNrEVxUegUDHTVuboy2BpVRfxAdf1ElpKFldfb39DepYym4BV1IJ0gg8C3Ow78J8VMxoqFLVFAYXHHmPMdu8hcFRZPwy6WswpOfCfCy0ijav6PDRz7zLlb7nQaisAaFJQdDGxUvdTYGx8S8DMuCMLNJ1exMti6YZULjUwuBfiR5j6H6GMRiUpgGowUE2Fza552H0MhsTTqtvaqqLBlZQdQqFaNjYC3U6/8U3syfS1ByCVWoSdKlrA0qguQBfmR9ZjSiSyOn78mwcfS0B94ugmwNxYnyHmeB4TLQrrUXUjBl8wb8R0kInCrvijCkarkeBri9Kmuora4F1YXt17yQyviaz2IV6l11AqSBTRb2PHmphxSEMjbp+/79DfiIkC8REQBERAEREAREQBERAEREAREQBERAOb5Lh+BqH5D9z+31kpPEQKAByAtPZvt27OJjhojRzP2o5FocYumPC9lqW6Pbg3qBb5gecoM/QWY4JMRSejVF0dSp/iO4NiO4nB82y98NWqUanxIbX6Ecww7EWPrJRZYZcjy44mstP8vNj5KOfqeA9Z05ECgACwAAAHQDhaQ2yeV7ijqYe8qWY9h0X73+Zk3Lkjm9Rk1SpcIRETJrnqKSQALkkAAcyTwtOm5Flww9FU/NzYjqx5+g5ekrGxWV63Ndh4U4L3fz9B9z2l4mj1OS3pR3P4zp9Me6/PHoIiJqnVE+XcAEngBxPyE+ppZ2f9Wr/8Kp/kMylbojJ6YtkHh8VjMaWeg4o0ASFJALNb5j+HrI/aHC4qmtPf1xUp7wW4BSGseJ4crX6yw7Ji2Dpf3v8AO0ic7epmFV8PhgppYcne1W5NX02FCmfMBrs3IeEcybbCnU62pHPlgc8Gq25NXz9eOD7wi/ypWWu3/wCfRa9BTyxNVT/9hh1pKfgHU+PostRlZwufVKKLTrYSqGUBfdr4TYW4dB6cJq5viMZiwu5oVaaLxN20sxPLnbgOP1kO0299kXPq4KNxTb+VO/8AhP4/JMNW3m+pgrUXTUBJCsBYhmA/OthZ+Y6GR+xOJeph3JqNVoLVdaFap8dWgtrOxt4vFrUP+ZVVuN7mOG+x9sEWP4ekAuMqg/zr8/wiN14W3jDp4eZNra9MLTKqAFCkAAWAAFgAOglb22NmLv4qo5C+1ebZviqtLKGWlh6f5jpF1uQHd2ViC1iQFHLzteWnYrDZ3RxRTMqi1cKabEOpRtNQMlhcKrcQX5gjh061n/R7I040df8AV/0qzsEsyPS9KRDEnJamzh+U7Q59mlfEfgcQqLTYHQRSVUVmYKAWQlj4TzMt2ymA2gTF02zDEK+FGvWoNK58Dafhpg/Fp6zm2wWV5liKmKGWYhaJXRvNTsmoE1NPwq17Wb6zquw2TZth61RsyxS1qRp2VVqM9n1A3sUW3AGSyUuK/JDHb5v8EXs9tFi6u0OKwlSsWwqCrpp6UAXTu7eILqPM8z1nRsUSEcjmFJHzAnJdlP8AarG/2a360p1nGfzb/wBlv0MryLdehbjbafqc+9jO0GKx1HEtjKxqsjUwpKotgVJPwKJi9oO0eLw2bYChh6xSjV3OtAqENqxBQ3LKSLrw4GaP+j4fcYv+3S/yNNf2pn/53LB3w33xRllLuNFep9tP3yS22O0eLoZ7gcLRrFcNUGH10wqENrrOrcSpYXCgcDOmTj/tA/2ly35YX/mKs6+ZXNJKPoTg23L1KT7WNqamXYRfw7acRWYqrWBKKo1M4B4E/COI/NK3s1tBmeCzShg81q7xMSilb6ToL6tJDBQb6lKFeXEW7xXtazqn/LGGWtdqGFFMuq2LEswqMo1EDiopjifORftA26w+YVcJXwtOqlbDsT73RZvErrbQ5Nwyn6y2MNkq5Kp5Pibvg6f7WNoq+AwSPhmC1KlZaesgMVGh3JAYEX8FuI6yoUE2peguITEhqbUxVC+41FSuoeE07XseV5I+2vFLWyrB1UN0qV6bqf6r0KrD7GVTH7V53g8Jh0qgUsNUoqtFwlNi1MItrMCbNpI52P0mIR+FVX1Mzl8Tu+PB0v2X7W1MzwzmuFFakwVigsHVhdWt0PMEdu9hc5SPZRswcBgyXdHqVytS9I6kCafCA35uBJv/AFu15d5TOtToux3pViIiRJiIiAIiIAiIgCIiAcWXbtuuHHpU/wC2ZV27XrQb0cH/AKZSEa4BE9noOxj+R5jv5F5L4u3NHrSqemk/uJB53i8HjsVhns6VQSpDqtqigFgpIJ5N9bkeUr8hMVii1TUptp+E9RY3v878ZTlxQgtuS7FOeS1Z1aJH5HmIxNFan5uTjycc/Q8D6yQkTQknF0xM2DwzVai00+JjYdu57AXMwy6bEZXpU13HFuCdl6n1P2HeV5Z6I2X9NgebIo+PPoWPAYRaNNaafCot8/MnuTxmxETlt2eoSSVIREQZE18wo7yjUQc2Rl+qkTYiEYatUymZfj2OX1sPSqLSxq06yUzUIW1QhtJufJiPlblM2TZ3haGBVaC7tqY0biqbVBUv4tZ467sSxqAkNcm5vJ7G5Nh6x1VaYLeYuD6kc5GZjsnSZB+GJo1lOpH4uuodKiMbOh6jgfIg2MucoN27NSOPPCOhVsqve/sbeQZo2ID61AKkcVvYgi/Xkf4iaufZhUqVBgsG2nEOuqrVAuMNQJtvPLeNxCKet2PBTfRTPq9KmcOuBZcf8KolNzhGJ/32/VdK0upDWfhaxNrzeQZQMLTILGpWqNrrVm+KrUPNj5ACwVeSqABykJVdl+NS0pN2zZyrLqeGopRorppoLAXuTc3LMTxZiSSSeJJJm3ESBaclzD2bY/CYp6+TYlaauSdDMUKBjfR8LK6g8rgW4c+cn9isizenijXzTFiogpsi0lckamZTrICqosFIvYnj0l7iTeRtUytY0naOOUvZrm2ErVmy7GU0pueet0ZlBJUOAhFxc9fPzlg2U2fzuji6dTHY1auGGrUgquxN0YDgaYBsxB59J0OJl5G+QsSXByraH2e5j/KNbGZdiadM1STcu6OuoAMvhRgQSL/+pJbKbPZ3RxdKpjsatXDDXrQVXYtdGA4GmAbMVPPpOhxMdxtUO2rs5JivZxmOCxFSrk2KVKb38DNpKre4QjSyuoubE2I+pOzs3sDiRjkxucYpalZCGVA2osy/CWYgAKp4hVHO3cHqUiMUlsQWIOkpTAO6NS9me4uAdPMfWSWRshOCjuvmVD2ibD4nG4uhisHXSnWpoq2qMykbt2dXRlB4guenlNTKNnM9XE0TicyU0A6s6pWYs6KblQDTF72tz6y94+k293gUnQqche4JdWAtz8LXt2E06VAimUam29bdaToJA0pTHx2sukq3An9ZlSdUVydSexXdm9kqqZrisfjHoOtTebtUYuVDMLagygDSigdeZk1trs/Sx2Bq0KO6So2ko5soDowaxZQSAQCD85IYnCeHEaU5vTIsl/CBSvYDmODcO0w16dyhAOnTVBP4ZuZNO3gt5A8eXCY5admXJpNV7uin5zsVja+UYPANUofiKFW9y7BDSVaqqFOi5IDoOXQyz5hszTxWVpgK7LvKdCkoZTfd1aaABxfja47XBI6zOlAimyNSbesKeg6S1rU0Hx8l0sGPE959VaV1Cim29DVSW0EAhhU467WbVqXgCef0y7MKX9e/2R/s3yfHYHDnDYx6TotjSNJ2ZlVr3QhkHhB4g9yOglwkdllMpqDKdRsdXRl6DtpHC3r1kjK5buzYx/4iIiRJiIiAIiIAiIgCIiAflvCVONvP9ZtSNBm8tUadR5DnPRQlseZyw3tGtmlfSukc2/T/AM/eREyV6pdix6/pMc08k9UrNvHDRGia2UzTcV9LH3dSyt5A9G/b5GdFnIJ0PZPNN/R0sfeU7KfMr0b7W+YmIvwa3VY/919S1ZLl5xFZaY+Hmx8lHP8Ah6zp1KmFAVRYAAADoB0kLslle4o6mHvKlifML0X9/WTs0c+TVKvCOt0HT9rHb5YiIlBvCIiAIiIAiIgCIiAIiIAiaOdYlqVCo1PjUtpQcONRyEQceHxMvOR1DMalHD4pnV9WHDuoqsC7Ju94uoqSOepb3/LM0Ysn4lZbN6rbxFqUqiqlV95TVgraET3a2qHS13+IHhytfjPs5liSLo1IL7wANTdiN0gPFt4L3N/l35xQsscSppn1aqzAqqqHUabgVFH4imgbw1dZDKS3FFFiOY55Gz+qGw6+EtVNJigS1qdaposrGpdig1ElVPK5CgxRjUi0TyVJ9pMT/Kv4TTTFAMFs/Cq6mjvN7TYv4gGOjSEI8LHUOUjsftXWpVK5VQ1al+KVqR3gVadJvcuV1WBfWLtbxAWFrTOljWi/Rac+xW0WLp1nFRKb1sOuLXVTWstN9KYOoH3QqNwArte+o+A6StyJtUtrK5xWFoo9GtTqaA70qRQOWNT3lEmsx0KFUHwsAb+Icg0sxrReLTy09iRJnlotPYgCIiAIiIAiIgCIiAIiIAiIgHKW2IwJ/wB2w+VR/wBzKFt5hsNhqow+G1agA1Qs+oAn4V7G3E/NZ1DPc0TCYepXfko4D+kx4BfU/a84Ti8S9V3qVDd3Ysx8yTedJSk/Jx6RiiImTIkrsvmowmKpVnXVSVhvF/pU7i/zI526kSKiGD9c4autRFemwZGUMrDiGVhcEdiDMs5V7EdqN5SbAVW8dMF6JPWlfin90m/yb+rOqznTjpdHVhLVGxERIkhERAEREAREQBERAEREATFiaC1EZHF0cFWHmrCxH0MyxAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAPzp7TM831cYemfdUT4rcmq8j/hHD5lpTJ67Ekkm5PEk8yT1M8nTqjkCIiAIiIBuZPmVTC4iliKJtUpMGHkehU9iCQexM/UWQ5rTxmGpYiifBUUG3VTyKnuCCD3E/KM7j7BHJwOIBJsMQbAngL0qZ4eXGa/UR2s2umk70nTYiJqG6IiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAf//Z',
            style:'imagem',fit:[280, 280]},[
            {text: "Clinica do Celular e Notebook", style:'cont', fontSize: 17, bold:true},
            {text: "Rua Presidente Getulio Vargas, 1765", style:'cont'},
            {text: "Telefone: (42) 99909-5885", style:'cont'},
            {text: "Centro - Guarapuava", style:'cont'}]
          ]
        },
        {
          columns:[
            [
              {text:'Cliente: '+ this.dados.nome, margin:[0,15,0,0]},
              {text:'Equipamento: '+ this.dados.equipamento, margin:[0,20,0,0]},
              {text:'Acessorios: ' + this.dados.acessorios, margin:[0,20,0,0]},
              {text:'Valor de Entrada R$: '+ this.dados.valorEntrada, margin:[0,10,0,0]}
            ],
            [
              {text:'Telefone: '+ this.dados.telefoneCliente, margin:[50,15,0,0]},
              {text:'Modelo: '+ this.dados.modelo, margin:[50,20,0,0]},
              {text:'Valor Total R$: '+ this.dados.valorTotal, margin:[50,45,0,0]}
            ],
          ]
        },
        {
          columns:[
            {text:'Acesse o site https://clinicacelular-a03a6.firebaseapp.com, digite '+
            'o número ======> '+this.idOrdem+' e tenha acesso ao andamento de seu serviço!', margin:[0,15,0,0], bold: true, fontSize:15, alignment:"center"}
          ]
        }
      ],
      styles:{
        imagem:{
          alignment: 'center',
          
        },
        cont:{
          fit:[100, 100],
          lineHeight: 1.5
        },
      }
    }

    this.pdfObj = pdfMaker.createPdf(this.docDefinition).print();
    
    }

    dataHoje() {
      var data = new Date();
      var dia = data.getDate();
      var mes = data.getMonth() + 1;
      var ano = data.getFullYear();
      var hora = data.getHours();
      var minutos = data.getMinutes();
      var dias = [dia, mes, ano].join('/');
      var horas = [hora, minutos].join(':');
      return [dias, horas + " hrs"].join(' - ');
  } 
}
  
