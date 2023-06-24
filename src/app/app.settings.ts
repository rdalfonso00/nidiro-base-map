import {TranslateLoader} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

/**
 * AoT compilation requires an exported function for factories. This one is
 * used for i18n.
 */
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json?v=' + Date.now());
}

export class AppSettings {
  /**
   * The fallback language in case the language setting is not set by the user.
   */
  public static get defaultLanguageCode(): string {
    return 'en';
  }

  public static get translationConfig() {
    return {
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    };
  }
}
