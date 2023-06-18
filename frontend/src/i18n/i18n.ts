import i18n from 'i18next';
import translation from './en/translation.json';
import translation_hk from './zh-hk/translation_hk.json';
import translation_cn from './zh-cn/translation_cn.json';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


// ref: https://medium.com/ms-club-of-sliit/internationalization-using-i18next-with-react-typescript-d7c443df3be4
export const resources = {
    en: {
        translation: translation,
    },
    tc: {
        translation: translation_hk
    },
    sc: {
        translation: translation_cn
    }
} as const;

const options = {
    order: ['path', 'localStorage'],
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupSessionStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    // cache user language
    caches: ['localStorage'],
    excludeCacheFor: ['cimode'],
    //cookieMinutes: 10,
    //cookieDomain: 'myDomain'
};

i18n.use(initReactI18next).use(LanguageDetector).init({
    resources,
    fallbackLng: localStorage.getItem('lang') || 'en',
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
    detection: options,
}
);

export default i18n;