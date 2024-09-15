export const Languages = {
  EN: "en",
  HE: "he"
}

export const LanguageManager = {
  currentLanguage: Languages.EN,
  currentTranslation: Languages.HE,
  rtl: [Languages.HE],

  isRtl(language: string){
    return this.rtl.indexOf(language) >= 0;
  }

}
