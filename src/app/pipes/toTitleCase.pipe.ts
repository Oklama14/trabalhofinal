import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'toTitleCase',
  standalone: true
})
export class ToTitleCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.replace(/\w\S*/g, text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
  }
}

@Pipe({
  name: 'ageGroup',
  standalone: true
})
export class AgeGroupPipe implements PipeTransform {
  transform(age: number): string {
    if (age < 18) {
      return 'menor de idade';
    } else if (age >= 18 && age < 25) {
      return 'jovem adulto';
    } else if (age >= 25 && age < 35) {
      return 'adulto';
    } else {
      return 'adulto maduro';
    }
  }
}


@Pipe({
  name: 'translateAdvice',
  standalone: true
})
export class TranslateAdvicePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: string): string {
    if (!value) return '';
    
    // aplica o toTitleCase
    let titleCasedValue = value.replace(/\w\S*/g, text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
    
    // tenta traduzir o texto completo
    let translation = this.translate.instant(titleCasedValue);
    
    // Se a tradução for igual ao original, significa que não foi encontrada
    // Neste caso, traduzimos palavra por palavra
    if (translation === titleCasedValue) {
      const words = titleCasedValue.split(' ');
      const translatedWords = words.map(word => this.translate.instant(word));
      translation = translatedWords.join(' ');
    }
    return translation;
  }
}