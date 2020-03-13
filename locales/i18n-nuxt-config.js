const I18N = {
  useCookie: false,
  alwaysRedirect: true,
  locales: [
    {
      code: 'ko',
      iso: 'ko-KOR',
      name: 'Korean',
      file: 'ko/index.js'
    },
    {
      code: 'en',
      iso: 'en-US',
      name: 'English',
      file: 'en/index.js'
    },
  ],
  lazy: true,
  seo: false,
  langDir: '/locales/',
  defaultLocale: 'ko',
  parsePages: false
}

module.exports = {
  I18N
}
