import { Component, inject, OnInit } from '@angular/core';
import { AppInputComponent } from '../../components/app-input/app-input.component';
import { AppButtonComponent } from '../../components/app-button/app-button.component';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import { AlunoService } from '../../services/aluno.service';
import { Aluno } from '../../models/aluno';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-aluno',
  standalone: true,
  imports: [AppInputComponent, AppButtonComponent, ReactiveFormsModule],
  templateUrl: './aluno.component.html',
  styleUrl: './aluno.component.scss',
})

export class AlunoComponent {
  form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    sobrenome: new FormControl('', [Validators.required]),
    idade: new FormControl('', [Validators.required]),
  }
  );

  chave: any
  constructor(
    protected alunoService: AlunoService,
    private route: Router, 
    private activatedRoute: ActivatedRoute,
    ) {
      this.chave = this.activatedRoute.snapshot.paramMap.get('chave')
      if (this.chave) {
        alunoService.buscarAluno(this.chave).subscribe((
          data => this.form.setValue({
              nome: data?.['nome'],
              sobrenome: data?.['sobrenome'],
              idade: data?.['idade']
            })))
      }
  }
  voltarParaHome() {
    this.route.navigate(['/inicio']);
  }
  
  salvar() {
    if (this.form.valid) {
      const aluno = this.form.value as unknown as Aluno;
      this.alunoService.salvarAluno(aluno, this.chave).then(() =>
        this.route.navigate(['/inicio']))
    }
  }
}

