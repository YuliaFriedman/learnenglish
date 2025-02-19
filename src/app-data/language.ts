export enum Languages {
  EN = "en",
  HE = "he"
}

export const LanguageManager = {
  currentLanguage: Languages.EN,
  currentTranslation: Languages.HE,
  rtl: [Languages.HE],

  isRtl(language: Languages){
    return this.rtl.indexOf(language) >= 0;
  }

}
