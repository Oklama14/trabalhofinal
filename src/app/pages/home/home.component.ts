import { Component } from '@angular/core';
import { Database } from '@angular/fire/database';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AlunoService } from '../../services/aluno.service';
import { MatButtonModule } from '@angular/material/button';
import { AlunoComponent } from "../aluno/aluno.component";
import { AppButtonComponent } from "../../components/app-button/app-button.component";
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ToTitleCasePipe, TranslateAdvicePipe, AgeGroupPipe } from '../../pipes/toTitleCase.pipe';
import { ResponseModel } from '../../models/responseModel';
import { ApiService } from '../../services/api.service';
import { TranslationService } from '../../services/translate.service.';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    AlunoComponent, 
    AppButtonComponent, 
    MatIcon, 
    ToTitleCasePipe, 
    TranslateAdvicePipe,
    AgeGroupPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  alunos?: Observable<any>;
  advise?: string;
  hora?:ResponseModel;
  translate?:string;

  constructor(
    private alunoService: AlunoService, 
    private route:Router, 
    private apiService: ApiService, 
    private translationService: TranslationService
  ) {
    this.alunos = alunoService.listarAlunos();
  }

  apagarAluno(chave:string){
    this.alunoService.excluirAluno(chave);
  }

  atualizarAluno(chave:string){
    this.route.navigateByUrl(`aluno/${chave}`);
  }

  ngOnInit() {
    this.apiService.getAdvise().subscribe(data => {
      this.advise = data.slip.advice;
    });

    this.apiService.getData().subscribe(hora => {
      this.hora = hora;
    });

    this.translationService.translateText(['Hello, world!'], 'DE').subscribe(data => {
      this.advise = 'hello world';
    });
 
  }
}