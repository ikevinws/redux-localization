import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Language {
    name: string;
    code: string;
    [key: string]: any;
}

interface Translations {
    [key: string]: Record<string, string>;
}

interface Options {
    defaultLanguage?: string;
    missingTranslation: string;
    onMissingActiveLanguageTranslation?: 'default' | 'missingTranslation';
}

export interface LocalizeSliceState {
    languages: Language[];
    translations: Translations;
    options: Options;
    activeLanguage: string | null;
}

interface AddTranslationForLanguageAction {
    translations: {
        [key: string]: string;
    };
    langCode: string;
}

interface InitializePayloadAction {
    languages: Language[];
    translations?: Translations;
    options?: Partial<Options>;
}

const initialState: LocalizeSliceState = {
    languages: [],
    translations: {},
    activeLanguage: null,
    options: {
        missingTranslation: 'No default translation',
        onMissingActiveLanguageTranslation: 'default',
    },
};

export const localizationSlice = createSlice({
    name: 'localization',
    initialState,
    reducers: {
        initialize: (state, action: PayloadAction<InitializePayloadAction>) => {
            const { languages, options, translations } = action.payload;

            if (translations) state.translations = translations;
            if (options) {
                state.options = {
                    missingTranslation: 'No default translation',
                    ...options,
                };
            }
            state.languages = languages;
            state.activeLanguage =
                options?.defaultLanguage || languages[0].code;
        },
        addTranslationForLanguage: (
            state,
            action: PayloadAction<AddTranslationForLanguageAction>
        ) => {
            const { translations, langCode } = action.payload;
            const translationKeys = Object.keys(translations);

            for (const translateKey of translationKeys) {
                if (state.translations[translateKey]) {
                    state.translations[translateKey][langCode] =
                        translations[translateKey];
                } else {
                    state.translations[translateKey] = {
                        [langCode]: translations[translateKey],
                    };
                }
            }
        },
        setActiveLanguage: (state, action: PayloadAction<string>) => {
            state.activeLanguage = action.payload;
        },
        setOptions: (state, action: PayloadAction<Partial<Options>>) => {
            state.options = {
                ...state.options,
                ...action.payload,
            };
        },
    },
});

export const {
    initialize,
    addTranslationForLanguage,
    setActiveLanguage,
    setOptions,
} = localizationSlice.actions;

export const getTranslate = (state: LocalizeSliceState) => {
    return (translateId: string) => {
        if (!state.activeLanguage) return state.options.missingTranslation;

        const activeLanguageTranslation =
            state.translations[translateId]?.[state.activeLanguage];

        if (activeLanguageTranslation) {
            return activeLanguageTranslation;
        } else if (
            state.options.onMissingActiveLanguageTranslation === 'default' &&
            state.options.defaultLanguage
        ) {
            return state.translations[translateId]?.[
                state.options.defaultLanguage
            ];
        } else {
            return state.options.missingTranslation;
        }
    };
};

export const getActiveLanguage = (state: LocalizeSliceState) => {
    return state.activeLanguage;
};

export const getLanguages = (state: LocalizeSliceState) => {
    return state.languages;
};

export const getAllTranslations = (state: LocalizeSliceState) => {
    return state.translations;
};

export const getMissingTranslation = (state: LocalizeSliceState) => {
    return state.options.missingTranslation;
};

export const getDefaultLanguage = (state: LocalizeSliceState) => {
    return state.options.defaultLanguage;
};
