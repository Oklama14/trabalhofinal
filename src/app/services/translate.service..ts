import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private apiUrl = 'https://api.deepl.com/v2/translate';
  private authKey = '198eKyULZFzIqDHSO'; 

  constructor(private http: HttpClient) {}

  translateText(text: string[], targetLang: string) {
    const headers = new HttpHeaders({
      'Authorization': `DeepL-Auth-Key ${this.authKey}`,
    });

    const body = {
      text: text,
      target_lang: targetLang
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}