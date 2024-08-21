import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/login.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppButtonComponent } from "./components/app-button/app-button.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, HttpClientModule, AppButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  senhaFormControl = new FormControl('', [
    Validators.required,
    Validators.min(6),
  ]);
  mensgem = '';
  constructor(private login: LoginService) {}
  criarUsuario() {
    //    this.login.criarNovaConta('teste@gmail.com', '123456');
    //this.login.resetarSenha('fernando.oliveira@iffarroupilha.edu.br');
    // this.login
    //   .autenticar(this.emailUsuario, this.senhaUsuario)
    //   .then((resposta) => {
    //     // sucessoi
    //     console.log(resposta);
    //     this.mensagem = 'Sucesso!!';
    //   })
    //   .catch((erro) => {
    //     this.mensagem = 'deu erro';
    //   });
  }

  autenticar() {
    if (this.emailFormControl.valid && this.senhaFormControl.valid) {
      this.login
        .autenticar(this.emailFormControl.value!, this.senhaFormControl.value!)
        .then((resultado) => {
          this.mensgem = 'sucesso';
        })
        .catch(() => (this.mensgem = 'erro'));
    }
  }
}
