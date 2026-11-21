// Each file collection edits the same JSON document that Next.js reads.
const input = (name, label, widget = 'string', options = {}) => ({ name, label, widget, ...options });
const uri = (name, label, required = true) => input(name, label, 'string', {
  required,
  pattern: ['^https?://[^\\s]+$', 'Укажите полный адрес, начиная с https://']
});
const image = (name = 'image', label = 'Изображение', required = true) => input(name, label, 'image', { required });
const slug = input('slug', 'Идентификатор в адресе', 'string', {
  pattern: ['^[a-z0-9]+(-[a-z0-9]+)*$', 'Используйте строчные латинские буквы, цифры и дефисы'],
  hint: 'Сохраните идентификатор опубликованной записи, чтобы прежние ссылки продолжали работать.'
});
const source = uri('source', 'Источник сведений');
const list = (name, label, fields, summary, required = false) => ({
  name, label, fields, summary, required, widget: 'list', collapsed: true, default: []
});
const file = (name, label, fields) => ({
  name, label, fields, file: 'content/' + name + '.json', format: 'json'
});

export function collections({ languages, interfaceKeys, companyInterfaceKeys, captionPaths }) {
  const tr = (name, label, widget = 'string', hint) => ({
    name, label, widget: 'object', collapsed: true,
    ...(hint ? { hint } : {}),
    fields: languages.map(({ code, label: language }) => input(code, language, widget))
  });
  const optionalTranslation = (name, label) => ({
    ...tr(name, label, 'text'), required: false,
    fields: languages.map(({ code, label: language }) => input(code, language, 'text', { required: false }))
  });
  const date = (name, label) => input(name, label, 'datetime', {
    format: 'YYYY-MM-DD', date_format: 'YYYY-MM-DD', time_format: false, required: false
  });
  const title = tr('title', 'Название');
  const body = tr('body', 'Текст', 'text');
  const summary = tr('summary', 'Краткое описание', 'text');
  const heading = '{{fields.title.ru}}';
  const library = {
    name: 'pages', label: 'Материалы сайта',
    editor: { preview: false },
    files: [
      file('home', 'Главная страница', [
        tr('title', 'Заголовок первого экрана', 'text', 'Перенос строки задаёт композицию заголовка.'),
        tr('intro', 'Вводный текст', 'text'), image('hero', 'Обложка для компьютеров'),
        image('heroMobile', 'Обложка для телефонов'), tr('heroAlt', 'Описание обложки для экранного диктора'),
        list('heroFrames', 'Фотографии первого экрана', [
          image('image', 'Широкий кадр'), image('mobile', 'Мобильный кадр'), tr('alt', 'Описание снимка'), uri('source','Корпоративный оригинал')
        ], '{{fields.alt.ru}}'),
        input('heroProject', 'Идентификатор проекта, если объект на обложке подтверждён', 'string', { required: false }), uri('film', 'Корпоративный фильм'), tr('about', 'Заголовок о компании'),
        tr('aboutText', 'О компании', 'text'), tr('expertise', 'Заголовок направлений'),
        tr('projects', 'Заголовок проектов'), tr('team', 'Заголовок команды'), image('teamImage', 'Фото команды'),
        input('teamCount', 'Численность команды'), uri('teamCountSource', 'Источник данных о численности'),
        tr('geo', 'Заголовок карты'), tr('career', 'Заголовок карьеры'), image('careerImage', 'Фото для карьеры'),
        tr('contact', 'Заголовок контактов')
      ]),
      file('services', 'Направления', [list('items', 'Направления деятельности', [
        slug, input('index', 'Индекс', 'string', { hint: 'Например, 01.' }), title, image(), summary, body,
        input('illustrative', 'Фото иллюстрирует профессию или услугу', 'boolean', { required: false, default: false }),
        tr('scope', 'Состав работ', 'text', 'Вводите каждый вид работ с новой строки.'),
        tr('approach', 'Подход к реализации', 'text')
      ], heading, true)]),
      file('projects', 'Проекты', [list('items', 'Карточки проектов', [
        slug, title, tr('country', 'Страна'),
        input('region', 'Страна на карте', 'select', { options: [
          { label: 'Бангладеш', value: 'bangladesh' }, { label: 'Египет', value: 'egypt' },
          { label: 'Венгрия', value: 'hungary' }
        ] }),
        tr('sector', 'Отрасль'), summary, optionalTranslation('context', 'Масштаб объекта'),
        uri('contextSource', 'Источник сведений о масштабе объекта', false), tr('role', 'Роль ROIN WORLD', 'text'), source, image(),
        input('services', 'Направления работ', 'list', {
          field: input('slug', 'Идентификатор направления'), hint: 'Укажите идентификаторы из раздела «Направления».'
        }),
        list('gallery', 'Фотогалерея', [image(), tr('caption', 'Подпись')], '{{fields.caption.ru}}'),
        list('videos', 'Видео и таймлапсы', [
          title, input('url', 'Адрес видео или путь к файлу', 'file', { choose_url: true }),
          input('external', 'Открывать видеотеку издателя', 'boolean', { required: false, default: false }),
          image('poster', 'Обложка', false)
        ], heading),
        list('stages', 'Этапы проекта', [title, body], heading),
        list('stories', 'Люди проекта', [input('person', 'Идентификатор сотрудника', 'string', {
          hint: 'Возьмите идентификатор из раздела «Компания и люди».'
        })], '{{fields.person}}')
      ], heading, true)]),
      file('company', 'Компания и люди', [
        list('history', 'Вехи истории', [title, body, source], heading),
        list('people', 'Люди', [
          slug, tr('name', 'Имя и фамилия'), tr('role', 'Должность'), tr('bio', 'Биография', 'text'),
          input('group', 'Группа', 'select', { options: [
            { label: 'Руководство', value: 'leadership' }, { label: 'Специалисты', value: 'team' }
          ] }), image('photo', 'Согласованный портрет', false),
          optionalTranslation('experience', 'Опыт'), optionalTranslation('achievements', 'Достижения'),
          input('interviewSlug', 'Идентификатор опубликованного интервью в новостях', 'string', {required:false}), source
        ], '{{fields.name.ru}}'),
        list('partners', 'Партнёры', [input('name', 'Название организации'), tr('detail', 'Сотрудничество', 'text'),
          input('project', 'Связанный проект (slug)', 'string', { required: false }),
          image('logo', 'Официальный логотип при наличии прав', false), source], '{{fields.name}}'),
        list('partnerDirectory', 'Организации из официального каталога', [
          input('name', 'Название организации'), input('group', 'Категория по официальному каталогу', 'select', { options: [
            { label: 'Заказчик', value: 'customer' }, { label: 'Поставщик', value: 'supplier' }, { label: 'Партнёр', value: 'partner' }
          ] }), image('logo', 'Официальный логотип'), source
        ], '{{fields.name}}'),
        list('offices', 'Офисы', [tr('label', 'Название офиса'), tr('address', 'Адрес', 'text'),
          input('email', 'Email', 'string', { required: false }), input('phone', 'Телефон', 'string', { required: false }), source
        ], '{{fields.label.ru}}')
      ]),
      file('news', 'Новости и медиа', [list('items', 'Публикации', [
        slug, title, input('date', 'Дата или год', 'string', {
          pattern: ['^\\d{4}(-\\d{2}-\\d{2})?$', 'Введите год или дату в формате ГГГГ-ММ-ДД']
        }), body, image(), optionalTranslation('category', 'Категория'),
        input('project', 'Связанный проект (slug)', 'string', { required: false }), uri('video', 'Ссылка на видео', false), source
      ], heading)]),
      file('records', 'Вакансии и сертификаты', [
        list('vacancies', 'Вакансии', [slug, title, tr('location', 'Место работы'), body,
          optionalTranslation('department', 'Направление'), optionalTranslation('responsibilities', 'Обязанности'),
          optionalTranslation('requirements', 'Требования к кандидату'), uri('source', 'Официальная публикация', false)], heading),
        list('certificates', 'Сертификаты', [slug, input('title', 'Название'),
          input('file', 'Скан или PDF', 'file', { choose_url: true }), summary, image('preview', 'Миниатюра', false),
          input('issuer', 'Орган выдачи', 'string', { required: false }), input('holder', 'Держатель по оригиналу', 'string', { required: false }), date('issued', 'Первичная регистрация'),
          date('expires', 'Срок действия по оригиналу'), uri('source', 'Официальный оригинал', false)], '{{fields.title}}')
      ])
    ]
  };
  if (interfaceKeys.length) {
    library.files.push(file('ui', 'Переводы интерфейса', interfaceKeys.map(key => tr(key, key, 'text'))));
  }
  library.files.push(file('company-ui', 'Тексты внутренних страниц', companyInterfaceKeys.map(key => tr(key, key, 'text'))));
  library.files.push(file('captions', 'Подписи фотографий', captionPaths.map(path => tr(path, path, 'text'))));
  library.files.push(file('technical-ui', 'Навигация по проектам и направлениям',
    ['countryProjects','regionRegister','exploreGeography','serviceApproach','projectRecord','cooperation','catalogue','siteMedia','openImage'].map(key => tr(key, key, 'text'))));
  library.files.push(file('section-covers', 'Обложки разделов', [
    image('about', 'О компании'),
    image('services', 'Направления'),
    image('projects', 'Проекты'),
    image('team', 'Команда'),
    image('careers', 'Карьера'),
    image('contacts', 'Контакты'),
    image('history', 'История'),
    image('leadership', 'Руководство'),
    image('geography', 'География'),
    image('partners', 'Партнёры'),
    image('certificates', 'Сертификаты'),
    image('news', 'Новости')
  ]));
  return [library];
}
