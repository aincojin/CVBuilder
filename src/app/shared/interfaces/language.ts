export interface LanguageInterface {
  id?: number;
  nameId?: number;
  levelId?: number;
  name: {
    id?: number;
    name: string;
  };
  level: {
    id?: number;
    name: string;
  };
}

export interface LanguageDtoInterface {
  name: {
    name: string;
  };
  level: {
    name: string;
  };
}

export interface LanguageFormInterface {
  name: string;
  level: string;
}
