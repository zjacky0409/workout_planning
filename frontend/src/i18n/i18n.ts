import i18n from 'i18next';
import translation from './en/translation.json';
import translation_hk from './zh-hk/translation_hk.json';
import translation_cn from './zh-cn/translation_cn.json';
import { initReactI18next } from 'react-i18next';

// ref: https://medium.com/ms-club-of-sliit/internationalization-using-i18next-with-react-typescript-d7c443df3be4

export const resources = {
    en: {
        translation: translation,
    },
    zh_hk: {
        translation: translation_hk
    },
    zh_cn: {
        translation: translation_cn
    }
} as const;

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
}
);

export default i18n;