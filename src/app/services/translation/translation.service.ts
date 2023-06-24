import {Inject, Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AppSettings} from '../../app.settings';
import {Observable, ReplaySubject} from 'rxjs';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  public currentLanguageCode: string | undefined;

  private languageChangeSource = new ReplaySubject<{language: string}>(1);

  private userPreferenceLanguage: string | undefined;

  constructor(private translateService: TranslateService, @Inject(DOCUMENT) private document: Document) {
    this.translateService.setDefaultLang(AppSettings.defaultLanguageCode);
    this.initDefaultLanguage();
  }

  changeLanguage(language: string) {
    if (language === this.currentLanguageCode) {
      return;
    }

    this.setCurrentLanguage(language);
  }

  watchLanguageChange(): Observable<{language: string}> {
    return this.languageChangeSource;
  }

  private initDefaultLanguage() {
    if (this.currentLanguageCode) {
      // Already set
      return;
    }

    this.setCurrentLanguage(this.userPreferenceLanguage);
  }

  private setCurrentLanguage(language?: string) {
    if (!language) {
      return;
    }
    this.currentLanguageCode = language;
    this.translateService.use(this.currentLanguageCode);
    this.updateHTMLTag();
    this.languageChangeSource.next({
      language: this.currentLanguageCode,
    });
  }

  private updateHTMLTag() {
    this.currentLanguageCode && this.document.documentElement.setAttribute('lang', this.currentLanguageCode);
  }
}
