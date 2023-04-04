module.exports = {
  /*
  ** Headers of the page
  */
   // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
   // SSR: https://nuxtjs.org/docs/features/rendering-modes
  ssr: false,
  head: {
    title: 'finsight',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: './static/assetsAdmin/img/logo.png' },
      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' },
      // { rel: 'icon', type: 'image/x-icon', href: '/logo-w-tab.svg' }
    ]
  },
  generate: {
    fallback: true //or true
  },

  /*
  ** Customize the progress bar color
  */
  css: [],
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: false, // true causes duplicate css
    splitChunks: {
      layouts: true
    },
    postcss: null,
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  modules: ['@nuxtjs/color-mode'],
  buildModules: ["@nuxtjs/svg",'@nuxtjs/moment'],
  svg: {
    vueSvgLoader: {
        // vue-svg-loader options
    },
    svgSpriteLoader: {
        // svg-sprite-loader options
    },
    fileLoader: {
        // file-loader options
    }
  },
  recaptcha: {
    siteKey: '6Lf4oewaAAAAAL1stYH3kUHgz3KbzgW3r1ZrB4pp',
      size: 'invisible',
      hideBadge: false,
      version: 3 ,  
      action: 'contact'
  },
  modules: [
    'nuxt-i18n',
    '@nuxtjs/axios',
    '@nuxtjs/dayjs',
    'vue-sweetalert2/nuxt', 
    '@nuxtjs/recaptcha',
    ['nuxt-vuex-localstorage', { mode: 'debug', localStorage: ['localStorage']}],
    'cookie-universal-nuxt',    
  ],
  plugins: [
    { src: '~plugins/myplugin', ssr: false },
    { src : '~/plugins/vue-apexchart.js', ssr : false },
   
  ],

  i18n: {
    locales: ['en', 'jp'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {"language": "EN",
          "header": {
            "home": "home",
            "news": "news",
            "playground": "playground",
            "KeywordAnalytics": "Keyword Analytics",
            "contacts": "contacts",
            
          },
          "sidebar": {
            "home": "HOME",
            "news": "NEWS",
            "playground": "PLAYGROUND",
          
            "KeywordAnalytics": "KEYWORD ANALYTICS",
            "Documents": "Documents",
            "Information": "Information",
            "Additionaldocs": "Additional docs",
            "Pricing": "Pricing",
            "Downloads": "Downloads",
            "Email": "Email",
            "Phonenumbers": "Phone numbers",
            "Language": "Language",
            "contacts": "contacts"
          },
          "body": {
            "home": {
              "desHeader": "A portal take you to the realm of the Water God and beyond.",
              "new": "NEWS",
              "featured": "Featured",
              "News": "News",
              "map": "MAP",
              "information": "Information",
              "Area": "Area",
              "service": "SERVICE",
              "Other": "Other",
              "Services": "Services",
              "viewAll": "View All",
              "services1": "WATER CYCLE MONITORING",
              "desServices1": "A dashboard allow you to monitoring water information and see data analytics.",
              "services2": "LIVE CAMERA MONITORING",
              "desServices2": "Browsing live cameras installed in various places around the world.",
              "services3": "SURFACE WATER FLOW SIMULATION",
              "desServices3": "You can run surface water flow simulation with TeTTo application any where.",
              "launch": "Launch"
                  },
            "news": {
              "Categories": "Categories",
              "Archive": "Archive",
              "Tags": "Tags",
              "Tagais": "AI Tags",
              "Relatednews": "Related news",
              "SourceLink": "Source Link",
              "desContact1": "How we can help you!",
              "desContact2": "Ronquil coho salmon red snapper duckbill lungfish southern angelfish",
              "Contactus": "Contact us",
              "Back": "Back",
              "Next": "Next"
                  },
            "playground": {},
            "keyword": {
              "ResultSearch": "Google Search",
              "Search": "Search...",
              "KeywordSearch":" Keyword Search",
              "OverallAnalytics":"Overall Analytics",
              "wordCloud":"WORD CLOUD",
              "topKeyword":"TOP 25 KEYWORDS",
              "overviewKeyword": "OVERVIEW KEYWORD",
              "KeywordByCategory": "KEYWORD BY CATEGORY",
              "keyword":"Keyword",
              "totalKeyword":"TOTAL KEYWORD",
              "loading":"Loading",
              "keywordTreeMap":"KEYWORD TREEMAP",
              "keywordOverTime":"KEYWORD OVER TIME",
              "percentKeyword":"Percent Keyword",
              "messeage":"Sorry, we couldn't find any articles that match your selection"
                  },
            "contact": {
              "officeTokyo":"Office Tokyo",
              "sendMessage":"Send message",
              "yourName":"Your Name",
              "yourEmail":"Your Email",
              "yourPhone":"Your Phone",
              "subject":"Subject",
              "text":"Text"
                  }
          },
          "footer": {
            "location": "Location",
            "phone": "Phone",
            "email": "Email",
            "openningHours": "Openning hours",
            "mainMenu": "Main menu",
            "aboutUs": "About us",
            "pricingplan": "Pricing plan",
            "Elements": "Elements",
            "Team": "Team",
            "Warehouse": "Warehouse",
            
            "Careers": "Careers",
            "Calculator": "Calculator",
            "Sitemap": "Site map",
            "Services": "Services",
            "Contact": "Contact",
            "FAQ": "FAQ",
            "Newslatter": "News latter",
            "StayTunedForOurLatestNews": "Stay tuned for our latest news",
            "Allrightsreserved": "Copyright OYO Corporation",
            "Termsandconditions": "Terms and conditions",
            "privacyPolicy": "Privacy policy",
            "cookies": "Cookies",
            "Emailaddress": "Email address"
          }
  }, 
        jp:  {
          "language": "JP",
          "header": {
            "home": "ホーム",
            "news": "ニュース",
            "playground": "遊び場",
            "KeywordAnalytics": "キーワード分析",
            "contacts": "連絡先"
          },
          "sidebar": {
            "home": "ホーム",
            "news": "ニュース",
            "playground": "遊び場",
            "KeywordAnalytics": "キーワード分析",
            "Documents":"ドキュメント",
            "Information":"情報",
            "Additionaldocs":"追加のドキュメント",
            "Pricing":"価格設定",
            "Downloads":"ダウンロード",
            "Email": "Eメール",
            "Phonenumbers": "電話番号",
            "Language":"言語",
            "contacts": "連絡先"
          },
          "body": {
            "home": {
              "desHeader":"ポータルは、水神の領域とその先にあなたを連れて行きます。",
              "new": "新着",
              "featured": "特徴",
              "News": "ニュース",
              "map": "マップ",
              "information": "情報",
              "Area": "エリア",
              "service": "サービス",
              "Other": "他の",
              "Services": "サービス",
              "viewAll": "すべて表示",
              "services1": "水循環モニタリング",
              "desServices1":
              "ダッシュボードを使用すると、水情報を監視し、データ分析を確認できます。",
              "services2": "ライブカメラモニタリング",
              "desServices2":
              "世界中のさまざまな場所に設置されているライブカメラの閲覧。",
              "services3": "地表水流シミュレーション",
              "desServices3":
              "TeTToアプリケーションを使用して、どこでも地表水流シミュレーションを実行できます。",
              "launch": "起動"
            },
            "news": {
              "Categories": "カテゴリ",
              "Archive": "アーカイブ",
              "Tags": "タグ",
              "Relatednews": "関連ニュース",
              "SourceLink": "ソースリンク",
              "desContact1": "どのように私たちはあなたを助けることができますか！",
              "desContact2": "メダマウオギンザケ真鯛アヒルの子ハイギョサザンエンゼルフィッシュ",
              "Contactus": "お問い合わせ",
              "Back": "バック",
              "Next": "次"
            },
            "playground":{
        
            },
            "keyword": {
              "ResultSearch": "Google検索",
              "Search": "検索...",
              "KeywordSearch":"キーワード検索",
              "OverallAnalytics":"全体的な分析",
              "wordCloud":"ワードクラウド",
              "topKeyword":"トップ25キーワード",
              "keyword":"キーワード",
              "totalKeyword":"総キーワード",
              "loading":"読み込み中",
              "keywordTreeMap":"キーワードツリーマップ",
              "keywordOverTime":"時間の経過に伴うキーワード",
              "percentKeyword":"パーセントキーワード",
              "messeage":"申し訳ありませんが、選択内容に一致する記事が見つかりませんでした",
              "overviewKeyword":"概要キーワード",
              "KeywordByCategory":"カテゴリ別のキーワード"
            },
            "contact": {
              "officeTokyo":"オフィス東京",
              "sendMessage":"メッセージを送る",
              "yourName":"あなたの名前",
              "yourEmail":"あなたのEメール",
              "yourPhone":"あなたの電話",
              "subject":"主題",
              "text":"文章"
            }
          },
          "footer": {
            "location": "ロケーション",
            "phone": "電話",
            "email": "Eメール",
            "openningHours": "営業時間",
            "mainMenu": "マインメニュー",
            "aboutUs": "私たちに関しては",
            "pricingplan": "料金プラン",
            "Elements": "要素",
            "Team": "チーム",
            "Warehouse": "倉庫",
            "Contact": "連絡先",
            "Careers": "キャリア",
            "Calculator": "電卓",
            "Sitemap": "サイトマップ",
            "Services": "サービス",
            "FAQ": "よくある質問",
            "Newslatter": "ニュースレター",
            "StayTunedForOurLatestNews": "最新のニュースをお楽しみに",
            "Allrightsreserved": "Copyright OYO Corporation",
            "Termsandconditions": "規約と条件",
            "privacyPolicy": "個人情報保護方針",
            "cookies": "クッキー",
            "Emailaddress": "電子メールアドレス"
          }
        }
      }
    }
  }
}

