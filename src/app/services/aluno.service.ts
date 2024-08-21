import { Injectable } from '@angular/core';
import { 
addDoc, 
collection, 
collectionData, 
deleteDoc, 
getDoc, 
doc, 
Firestore, 
docData, 
updateDoc } from '@angular/fire/firestore';
import { Aluno } from '../models/aluno';

@Injectable({
  providedIn: 'root'
})


export class AlunoService {
  private _collection;
  private _loading=false;


  constructor(private db: Firestore) {
    this._collection = collection(db, 'alunos');
  }

  buscarAluno(chave: string){
    const alunoRef = doc(this.db, 'alunos', chave);
    return docData(alunoRef)
  }


  listarAlunos() {
    return collectionData(this._collection, {
      idField:'chave'
    });
  }

  excluirAluno(chave: string) {
    const alunoRef = doc(this.db, 'alunos', chave);
    return deleteDoc(alunoRef);
  }
  async criarAluno(aluno:Aluno){
    this._loading=true;
    addDoc(this._collection, aluno).finally(()=> {
    this._loading=false;
  })    ;
  }

  async updateAluno(aluno:Aluno, chave: string){
    this._loading=true;
    const alunoRef = doc(this.db, 'alunos', chave);
    updateDoc(alunoRef, { ...aluno } ).finally(()=> {
    this._loading=false;
  })    ;
  }

  async salvarAluno(aluno: Aluno, chave:any = null){
  if (chave){
    this.updateAluno(aluno, chave)
  }
  else{
    this.criarAluno(aluno)
  }
}

  get loading(){
    return this._loading;
  }
  }
