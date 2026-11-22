# ROIN WORLD · аудит текстов и типографики

22 ноября 2026 года. Для сравнения использована опубликованная версия `de36437`. В аудит вошли главная и 31 внутренняя страница на русском, английском, арабском, испанском и венгерском языках. Отдельно проверены фотокредиты и страница ошибки.

## Шапка и заголовки

У логотипа в основной шапке обнаружилось смещение вверх на 3,3–3,8 CSS-пикселя. Между ссылкой и встроенным изображением образовывался дополнительный интервал базовой линии. Для ссылки включено вертикальное центрирование через flex. Проверены границы непрозрачных пикселей фирменного знака и надписи в SVG. В настольной и мобильной шапках и открытом меню отклонение видимого знака и надписи составляет менее 0,1 CSS-пикселя. В арабском меню логотип занимает своё место справа. На странице фотокредитов заданы симметричные вертикальные поля строки.

Слоган «СОЗДАЁМ МАСШТАБ. СТРОИМ БУДУЩЕЕ.» сохраняет исходные слова и пунктуацию. Во всех пяти версиях он хранится и выводится одной строкой текста. Ширина колонки и возможности браузера определяют перенос. На широких экранах заголовок направлений теперь учитывает ширину собственной колонки. Для истории и направлений расширена колонка титула, а для длинного названия юридической страницы настроен мобильный размер.

## Удалённые надзаголовки

| Страница или блок | Прежняя подпись | Как теперь передаётся смысл |
|---|---|---|
| Главная, первый экран | Международная строительная и инжиниринговая компания | Профиль компании раскрывают введение и поисковый заголовок. |
| Главная, карта | Международное присутствие | Заголовок «География проектов» открывает раздел. |
| Главная, проекты | Избранные проекты | Раздел представляет заголовок «Проекты в атомной энергетике». |
| Главная, услуги | Направления деятельности | Заголовок и названия четырёх направлений объясняют содержание. |
| Главная, карьера | Карьера | Заголовок «Работа в ROIN WORLD» и ссылка на вакансии. |
| Главная, команда | Люди ROIN WORLD | Заголовок «Команда на стройплощадке». |
| Главная, обращение | Контакты | Заголовок, адрес и форма образуют единый блок. |
| Биография | Руководство / Из истории компании | Должность уже указана на первом экране, а год и событие читаются вместе. |
| Страница ошибки | ROIN WORLD / 404 или отдельное число 404 | Код ошибки входит в заголовок. |

Убраны компонент Tag, стили надзаголовков, декоративные отрезки и отступы. Сохранены хлебные крошки, страны, отрасли, категории и даты, должности, подписи документов и поля фильтров. В детальной новости дата и рубрика остались на первом экране. Карточки публикаций и описание для поиска используют законченные анонсы. Редактор сайта может изменить анонс отдельно от полного текста.

## Изменения по страницам

Русские примеры приведены целиком. Символ ↵ обозначает прежний ручной перенос. Поле со стабильным корпоративным фактом иногда сохраняет исходную формулировку. Изменения меток, интерфейса и остальных языков приведены ниже.

| Страница | Было | Стало | Основание |
|---|---|---|---|
| Главная (/ru/) | За каждым проектом — ↵ наша команда. | Команда на стройплощадке | Заголовок называет людей и место работы, читатель получает цельную фразу. |
| О компании (/ru/about/) | На «Руппуре» в Бангладеш бригада выполнила железобетонные основания под тренажёры учебного корпуса. В египетском Эль-Дабаа ROIN WORLD сотрудничает с KHNP и Doosan Enerbility на объектах турбинного острова. | На АЭС «Руппур» в Бангладеш бригада ROIN WORLD построила железобетонные основания под тренажёры учебного корпуса. В Египте компания работает с KHNP и Doosan Enerbility на объектах турбинного острова АЭС «Эль-Дабаа». | Описание опирается на работы компании в Бангладеш и Египте. |
| История (/ru/history/) | События из открытого архива ROIN WORLD — от работы на площадке до международного сотрудничества. | Публикации о строительстве АЭС «Руппур» и документы о переносе юридического адреса в Дубай отражают разные этапы истории ROIN WORLD. | Введение называет площадку и документы, с которыми можно ознакомиться. |
| Руководство (/ru/leadership/) | Люди, определяющие направление развития компании. | Роин Бараташвили основал ROIN WORLD и сегодня возглавляет компанию в качестве генерального директора. | Указаны имя и должность руководителя. |
| Команда (/ru/team/) | Инженеры, строители и специалисты по логистике работают над общими задачами на международных площадках. | В репортажах с АЭС «Руппур» наша бригада бетонирует основания под тренажёры, а специалисты ROIN WORLD участвуют в противопожарных учениях. | Введение связывает рассказ о команде с двумя материалами о её работе. |
| Направления (/ru/services/) | Компетенции ROIN WORLD охватывают сам процесс строительства и обеспечение объекта — от перевозки оборудования до повседневной работы команд. | Мы выполняем строительные и инженерные работы, организуем перевозку оборудования, поставляем материалы и обеспечиваем питание на стройплощадках. | Перечислены строительные работы и услуги на площадке. |
| Проекты (/ru/projects/) | От цеха предсборки на АЭС «Руппур» до объектов турбинного острова «Эль-Дабаа». Работы ROIN WORLD на трёх международных площадках. | ROIN WORLD участвует в строительстве АЭС «Руппур» в Бангладеш, «Эль-Дабаа» в Египте и «Пакш II» в Венгрии. Выберите проект, чтобы подробнее узнать о работах нашей команды. | Две разрозненные фразы заменены предложением о трёх объектах. |
| География (/ru/geography/) | Выберите страну, чтобы увидеть проекты ROIN WORLD. | На карте представлены проекты ROIN WORLD в Бангладеш, Египте и Венгрии. Выберите страну, чтобы узнать о работе компании на площадке. | Подсказка объясняет выбор страны и переход к объекту. |
| Партнёры (/ru/partners/) | Организации, сотрудничество с которыми отмечено в материалах ROIN WORLD. | ROIN WORLD работает с заказчиками, поставщиками и строительными компаниями. Среди примеров сотрудничества — работы на турбинном острове АЭС «Эль-Дабаа» и совместные учения на «Руппуре». | Введение уточняет принцип группировки организаций. |
| Сертификаты (/ru/certificates/) | Документы из открытого архива компании. Область сертификации, даты и сведения об организации указаны в каждом документе. | В архиве собраны сертификаты систем менеджмента ROIN WORLD. В оригиналах указаны область сертификации, организация-держатель и срок действия. | Читателю объясняется, где открыть и сверить реквизиты. |
| Карьера (/ru/careers/) | Познакомьтесь с работой на международных строительных площадках и свяжитесь с командой по вопросам трудоустройства. | Посмотрите вакансии филиала в Бангладеш, от начальника участка до помощника переводчика. В описании каждой должности указано, куда направить резюме. | Читатель видит, где искать вакансии и куда обращаться. |
| Новости и медиа (/ru/news/) | Корпоративный фильм, кадры со стройплощадок и события из архива компании. | Посмотрите корпоративный фильм ROIN WORLD и репортажи о работе нашей команды на строительстве АЭС «Руппур». | Введение называет конкретные материалы архива. |
| Контакты (/ru/contacts/) | Выберите представительство или направьте обращение команде ROIN WORLD. | Найдите телефон и электронную почту нужного офиса или напишите в ROIN WORLD через форму обращения. | Различены обращения и сведения о представительствах. |
| Конфиденциальность (/ru/privacy/) | Форма запрашивает имя, электронную почту и текст обращения. При включённом приёме эти сведения сохраняются на сервере оператора для ответа на обращение. Если приём закрыт, данные формы не сохраняются. Для просмотра страниц регистрация не требуется. Внешний видеоплеер подключается после выбора просмотра. При переходе по внешним ссылкам действуют правила соответствующего сервиса. | Форма запрашивает имя, электронную почту и сообщение. Название компании можно указать по желанию. При отправке через сайт эти сведения поступают на сервер для ответа на обращение. В режиме подготовки письма форма создаёт черновик на вашем устройстве. Отправляете его вы из своей почтовой программы. Внешний видеоплеер загружается после нажатия кнопки просмотра. | Уточнён порядок работы формы и внешнего плеера. |
| Строительство и инженерные работы (/ru/services/engineering/) | Инженерная подготовка и организация строительных работ. | Планируем строительные работы и координируем бригады на площадке. | В описании обозначен состав услуги. |
| Логистика и транспорт (/ru/services/logistics/) | Доставка оборудования и материалов на площадку. | Организуем доставку оборудования и материалов на стройплощадку. | В описании обозначен состав услуги. |
| Снабжение и комплектация (/ru/services/supply/) | Материалы и комплектация под задачи объекта. | Организуем закупку материалов для каждого этапа строительства. | В описании обозначен состав услуги. |
| Питание и обслуживание персонала (/ru/services/catering/) | Питание и повседневные сервисы для команд на объекте. | Организуем питание и повседневное обслуживание работников стройплощадки. | В описании обозначен состав услуги. |
| АЭС «Руппур» (/ru/projects/rooppur/) | На площадке 4.1 ROIN WORLD завершила работы в цехе предварительной сборки. Площадь производственного корпуса — 4 300 м². В нём установлены пять мостовых кранов. | На участке 4.1 ROIN WORLD завершила работы в цехе предварительной сборки. В здании площадью 4 300 м² установлены пять мостовых кранов. | Формулировка ограничена ролью подрядчика, указанной в материалах компании. |
| АЭС «Эль-Дабаа» (/ru/projects/el-dabaa/) | ROIN WORLD выполняет подготовительные и строительные работы. С KHNP и Doosan Enerbility компания заключила соглашение о строительстве объектов турбинного острова. На площадке ROIN WORLD также организует питание персонала. | ROIN WORLD выполняет подготовительные и строительные работы на площадке станции. Соглашение с KHNP и Doosan Enerbility охватывает строительство объектов турбинного острова. Компания также организует питание работников площадки. | Формулировка ограничена ролью подрядчика, указанной в материалах компании. |
| АЭС «Пакш II» (/ru/projects/paks-ii/) | Компания указывает этот объект в перечне строящихся АЭС, в которых принимает участие. | ROIN WORLD указывает «Пакш II» среди атомных электростанций, в строительстве которых участвует. | Формулировка ограничена ролью подрядчика, указанной в материалах компании. |
| Помощник переводчика (русский и английский языки) (/ru/careers/interpreter-assistant/) | Позиция «Помощник переводчика RU–EN» опубликована ROIN WORLD для филиала в Бангладеш. | ROIN WORLD опубликовала вакансию для помощника переводчика в Бангладеш. Рабочие языки — русский и английский. | Филиал и содержание позиции указаны без обещания, что набор продолжается сегодня. |
| Начальник участка (/ru/careers/head-of-section/) | Позиция «Начальник участка» опубликована ROIN WORLD для филиала в Бангладеш. | ROIN WORLD опубликовала вакансию начальника строительного участка в филиале в Бангладеш. | Филиал и содержание позиции указаны без обещания, что набор продолжается сегодня. |
| Прораб (/ru/careers/building-foreman/) | Позиция «Производитель строительных работ» опубликована ROIN WORLD для филиала в Бангладеш. | В перечне вакансий ROIN WORLD для Бангладеш есть должность производителя строительных работ. | Филиал и содержание позиции указаны без обещания, что набор продолжается сегодня. |
| Главный инженер производственно-технического отдела (/ru/careers/head-engineer-ptd/) | Позиция «Главный инженер производственно-технического отдела» опубликована ROIN WORLD для филиала в Бангладеш. | Место работы — производственно-технический отдел филиала ROIN WORLD в Бангладеш. | Филиал и содержание позиции указаны без обещания, что набор продолжается сегодня. |
| Бухгалтер по первичной документации (/ru/careers/primary-documentation-accountant/) | Позиция «Бухгалтер по первичной документации» опубликована ROIN WORLD для филиала в Бангладеш. | ROIN WORLD опубликовала вакансию бухгалтера для работы с первичными документами в филиале в Бангладеш. | Филиал и содержание позиции указаны без обещания, что набор продолжается сегодня. |
| Инженер-электрик по контрольно-измерительным приборам (/ru/careers/instrumentation-engineer/) | Позиция «Инженер-электрик по контрольно-измерительным приборам» опубликована ROIN WORLD для филиала в Бангладеш. | ROIN WORLD опубликовала эту инженерную вакансию для филиала в Бангладеш. Работа связана с контрольно-измерительными приборами. | Филиал и содержание позиции указаны без обещания, что набор продолжается сегодня. |
| Руководитель службы уборки (/ru/careers/cleaning-services-manager/) | Позиция «Руководитель клининговой службы» опубликована ROIN WORLD для филиала в Бангладеш. | ROIN WORLD опубликовала вакансию руководителя службы уборки в Бангладеш. | Филиал и содержание позиции указаны без обещания, что набор продолжается сегодня. |
| Корпоративный фильм ROIN WORLD (/ru/news/corporate-film-2026/) | Корпоративный фильм ROIN WORLD 2026 года знакомит с компанией. Посмотреть фильм целиком можно на YouTube. | Фильм 2026 года знакомит с работой ROIN WORLD. Полная версия доступна на YouTube. | Текст называет событие или фильм и источник. Краткий анонс вынесен в отдельное поле. |
| Фундаменты для тренажёров на АЭС «Руппур» (/ru/news/rooppur-training-building/) | В учебно-производственном корпусе АЭС «Руппур» бригада ROIN WORLD построила железобетонную плиту и основания под тренажёры. Для этих работ использовали бетон класса B25. По данным компании, объём бетонирования превысил 400 м³; на площадке работали около 40 местных рабочих под руководством двух прорабов. | В учебно-производственном корпусе АЭС «Руппур» бригада ROIN WORLD отлила железобетонную плиту и основания для тренажёров. По данным компании, для работ потребовалось более 400 м³ бетона класса B25. На площадке работали около 40 местных рабочих под руководством двух прорабов. | Текст называет событие или фильм и источник. Краткий анонс вынесен в отдельное поле. |
| Противопожарные учения на стройплощадке АЭС «Руппур» (/ru/news/rooppur-fire-drill/) | Сотрудники ROIN WORLD и «Атомстройэкспорта» провели совместные противопожарные учения на площадке АЭС «Руппур» в Бангладеш. В тренировке участвовали специалисты ROIN WORLD со спецтехникой компании. Ход учений зафиксирован в видеорепортаже. | На стройплощадке АЭС «Руппур» в Бангладеш сотрудники ROIN WORLD и «Атомстройэкспорта» отработали действия при пожаре. Команда ROIN WORLD использовала собственную спецтехнику. | Текст называет событие или фильм и источник. Краткий анонс вынесен в отдельное поле. |
| Роин Бараташвили (/ru/team/roin-baratashvili/) | Роин Бараташвили основал ROIN WORLD. Компания объединила специалистов по строительству энергетических объектов, логистике и поставкам оборудования. | Роин Бараташвили основал ROIN WORLD. Компания объединила специалистов по строительству энергетических объектов, логистике и поставкам оборудования. | В биографии сохранены имя и подтверждённая роль. |

## Функциональные тексты и поисковая выдача

В контактной форме уточнены действия с черновиком письма, ошибки ввода и подтверждение приёма. Подпись стран рядом с числом относится к представленным в портфолио проектам. В фотокредитах исправлен текст на пяти языках, сохранены ссылки на источники и блоки атрибуции. Для новостей и вакансий устранено обрезание метаописания на 180-м символе. Заголовки страниц, канонические адреса и языковые альтернативы по-прежнему используют общую схему сайта.

## Проверка в браузере и сборка

Microsoft Edge открыл 160 локализованных страниц. Проверялись ширины 360, 390, 768, 1074, 1440 и 1920 px. Во всех 960 состояниях проверены язык, направление письма, единственный видимый H1, наличие title и description, позиция логотипа и отсутствие прежних надзаголовков и ручных переносов. В стабилизированной вёрстке проверки не обнаружили горизонтальной прокрутки, обрезания проверенных заголовков и предложений или разрыва непрерывного буквенного слова в заголовке. Проверка карты отдельно учитывала положение выносных подписей относительно карты. Скриншоты главной и основных внутренних страниц при 390 и 1440 px приложены к результату.

| Проверка | Результат |
|---|---|
| TypeScript, ESLint и проверка локализованного содержимого | Прошли |
| Модульные тесты | 5 из 5 |
| Production build и статическая сборка GitHub Pages | Прошли |
| Браузерные тесты маршрутов, меню, форм, доступности и переходов | 42 из 42 |
| Фотокредиты на пяти языках и страница 404 | 12 проверок на 360 и 1440 px |

## Что требует согласования

Все пять локализаций имеют статус draft. Для официального утверждения отраслевому и языковому редакторам заказчика стоит сверить проектную терминологию, названия подразделений и должностей с корпоративным справочником. Особенно важны арабские и венгерские инженерные термины. Утверждение переводов в объём этой проверки не входило.

Компания подтверждает актуальность вакансий, должности руководителя и периода, к которому относится показатель 800+ специалистов. Юридический текст о порядке обработки и хранения обращений и актуальность реквизитов утверждает оператор сайта. В кейсе «Пакш II» названо опубликованное участие компании. Конкретный состав работ на этом объекте в исходных материалах не указан. Для описания АЭС «Эль-Дабаа» в качестве источника сведений о станции указан официальный раздел вопросов и ответов египетского заказчика. [Источник сведений о станции](https://nppa.gov.eg/FAQs/aboutus)

## Журнал по языкам

Ниже приведены фактические изменения в 14 словарях сайта. Всего 836 изменённых, добавленных или удалённых пар «поле — язык». Идентификаторы записей связывают вариант текста с его маршрутом или компонентом. Содержательные переносы в списках также обозначены ↵.

<details>
<summary>Главная и представление компании · 40 изменений</summary>

Файл содержимого <code>content/home.json</code>.

| Поле или запись | Язык | Было | Стало |
|---|---|---|---|
| about | AR | تحديات كبيرة. ↵ وحلول عملية. | كيف نعمل في مواقع البناء |
| about | EN | Complex challenges. ↵ Practical solutions. | How we work on site |
| about | ES | Retos complejos. ↵ Soluciones prácticas. | Cómo trabajamos en obra |
| about | HU | Összetett feladatok. ↵ Gyakorlati megoldások. | Hogyan dolgozunk az építkezéseken? |
| about | RU | Большие задачи. ↵ Сильные решения. | Как мы работаем на стройплощадке |
| aboutText | AR | نعمل حيث تتحول القرارات الهندسية إلى منشآت صناعية. تجمع مواقع البناء فرق التنفيذ وتوريد المواد وخدمات الأفراد، وتربط ROIN WORLD بين هذه الأعمال في المشاريع الدولية. | تنسّق ROIN WORLD أعمال البناء وتوريد المواد والخدمات المقدّمة للعاملين في مواقع مشاريعها الدولية. |
| aboutText | EN | We work where engineering decisions become industrial facilities. Construction crews, material deliveries and site services come together on every site. ROIN WORLD connects these disciplines on international projects. | ROIN WORLD coordinates construction work, material deliveries and services for site personnel on international projects. |
| aboutText | ES | Trabajamos allí donde los proyectos de ingeniería se convierten en instalaciones industriales. En cada obra coinciden los equipos de construcción, el suministro de materiales y los servicios de apoyo. ROIN WORLD coordina estas actividades en proyectos internacionales. | En sus proyectos internacionales, ROIN WORLD coordina los trabajos de construcción, el suministro de materiales y los servicios al personal de obra. |
| aboutText | HU | Ott dolgozunk, ahol a mérnöki tervekből ipari létesítmények születnek. Minden építkezésen össze kell hangolni a kivitelezőcsapatok munkáját, az anyagszállítást és a helyszíni szolgáltatásokat. A ROIN WORLD ezt a feladatot nemzetközi projektekben végzi. | Nemzetközi beruházásain a ROIN WORLD összehangolja a kivitelezést, az anyagellátást és a helyszínen dolgozók ellátását. |
| aboutText | RU | Мы работаем там, где решения инженеров становятся промышленными объектами. На одной площадке сходятся строительные команды, поставки материалов и сервисы для людей. ROIN WORLD объединяет эти направления в международных проектах. | ROIN WORLD координирует строительные работы, поставки материалов и обслуживание персонала на международных площадках. |
| career | AR | تطوّر مهنياً مع ROIN WORLD | العمل في ROIN WORLD |
| career | EN | Grow with ROIN WORLD | Careers at ROIN WORLD |
| career | ES | Crece con ROIN WORLD | Trabajar en ROIN WORLD |
| career | HU | Fejlődjön a ROIN WORLD csapatában | Álláslehetőségek a ROIN WORLD-nél |
| career | RU | Развивайтесь вместе с ROIN WORLD | Работа в ROIN WORLD |
| contact | AR | لنتحدث عن مشروعكم | تواصلوا مع ROIN WORLD |
| contact | EN | Discuss a project | Contact ROIN WORLD |
| contact | ES | Hablemos de tu proyecto | Contacto con ROIN WORLD |
| contact | HU | Beszéljünk a projektjéről | Kapcsolat a ROIN WORLD munkatársaival |
| contact | RU | Обсудить сотрудничество | Свяжитесь с ROIN WORLD |
| intro | AR | تتولى ROIN WORLD أعمال البناء والهندسة في مشاريع الطاقة والبنية التحتية حول العالم. | تنفّذ ROIN WORLD أعمال البناء والهندسة في مشاريع الطاقة والبنية التحتية في عدد من البلدان. |
| intro | EN | ROIN WORLD provides construction and engineering services for energy and infrastructure projects worldwide. | ROIN WORLD provides construction and engineering services for energy and infrastructure projects in several countries. |
| intro | ES | ROIN WORLD presta servicios de construcción e ingeniería en proyectos de energía e infraestructura a escala internacional. | ROIN WORLD presta servicios de construcción e ingeniería para proyectos de energía e infraestructuras en varios países. |
| intro | HU | A ROIN WORLD nemzetközi energetikai és infrastrukturális projektekben végez építési és mérnöki munkát. | A ROIN WORLD több országban végez építési és mérnöki munkát energetikai és infrastrukturális beruházásokon. |
| intro | RU | ROIN WORLD ведёт строительные и инженерные работы на международных проектах в энергетике и инфраструктуре. | ROIN WORLD выполняет строительные и инженерные работы на объектах энергетики и инфраструктуры в разных странах. |
| projects | AR | أبرز مشاريعنا الدولية | مشاريع الطاقة النووية |
| projects | EN | Key international projects | Nuclear energy projects |
| projects | ES | Proyectos internacionales clave | Proyectos de energía nuclear |
| projects | HU | Kiemelt nemzetközi projektek | Atomerőművi projektek |
| projects | RU | Ключевые международные проекты | Проекты в атомной энергетике |
| team | AR | وراء كل مشروع ↵ فريقنا. | فرقنا في مواقع البناء |
| team | EN | Behind every project ↵ is our team. | Our teams on site |
| team | ES | Detrás de cada proyecto ↵ está nuestro equipo. | Nuestros equipos en obra |
| team | HU | Minden projektünk mögött ↵ egy csapat áll. | Csapataink az építkezéseken |
| team | RU | За каждым проектом — ↵ наша команда. | Команда на стройплощадке |
| title | AR | نصنع الفارق. ↵ ونبني المستقبل. | نصنع الفارق. ونبني المستقبل. |
| title | EN | CREATING SCALE. ↵ BUILDING THE FUTURE. | CREATING SCALE. BUILDING THE FUTURE. |
| title | ES | PROYECTOS DE GRAN ESCALA. ↵ CONSTRUIMOS EL FUTURO. | PROYECTOS DE GRAN ESCALA. CONSTRUIMOS EL FUTURO. |
| title | HU | NAGY LÉPTÉKBEN DOLGOZUNK. ↵ A JÖVŐT ÉPÍTJÜK. | NAGY LÉPTÉKBEN DOLGOZUNK. A JÖVŐT ÉPÍTJÜK. |
| title | RU | СОЗДАЁМ МАСШТАБ. ↵ СТРОИМ БУДУЩЕЕ. | СОЗДАЁМ МАСШТАБ. СТРОИМ БУДУЩЕЕ. |

</details>

<details>
<summary>Главная, направления и цифры · 5 изменений</summary>

Файл содержимого <code>content/landing-ui.json</code>.

| Поле или запись | Язык | Было | Стало |
|---|---|---|---|
| expertise | AR | حلول متكاملة للمشاريع الكبرى | البناء وخدمات المواقع |
| expertise | EN | Integrated services for major projects | Construction and site services |
| expertise | ES | Soluciones integrales para grandes proyectos | Construcción y servicios de obra |
| expertise | HU | Átfogó megoldások nagyberuházásokhoz | Kivitelezés és helyszíni szolgáltatások |
| expertise | RU | Комплексные решения для крупных проектов | Строительство и обеспечение площадок |

</details>

<details>
<summary>Общие разделы, метаданные, навигация и действия · 159 изменений</summary>

Файл содержимого <code>content/ui.json</code>.

| Поле или запись | Язык | Было | Стало |
|---|---|---|---|
| allServices | AR | جميع المجالات | جميع مجالات العمل |
| allServices | EN | All expertise | All services |
| careerLink | AR | اعمل مع ROIN WORLD | الاطلاع على الوظائف |
| careerLink | EN | Careers at ROIN WORLD | View job listings |
| careerLink | ES | Trabajar en ROIN WORLD | Ver ofertas de empleo |
| careerLink | HU | Karrier a ROIN WORLD-nél | Álláslehetőségek |
| careerLink | RU | Карьера в ROIN WORLD | Посмотреть вакансии |
| careerText | AR | تعرف على العمل في مواقع البناء الدولية وتواصل مع الفريق بشأن فرص التوظيف. | اطّلع على الوظائف التي أعلن عنها فرع بنغلاديش، من مدير الموقع إلى مساعد المترجم. يوضح كل إعلان أين ترسل سيرتك الذاتية. |
| careerText | EN | Explore work on international construction sites and contact the team about career opportunities. | Browse roles advertised by our Bangladesh branch, from site manager to interpreter’s assistant. Each listing explains where to send your CV. |
| careerText | ES | Descubre cómo trabajamos en obras internacionales y consulta con nuestro equipo las oportunidades de empleo. | Consulta los puestos anunciados por la delegación de Bangladés, desde responsable de obra hasta asistente de interpretación. Cada ficha indica dónde enviar el currículum. |
| careerText | HU | Ismerje meg nemzetközi építkezéseinken végzett munkánkat, és érdeklődjön csapatunknál az álláslehetőségekről. | A bangladesi kirendeltség hirdetései között az építésvezetői és a tolmácsasszisztensi munkakör is szerepel. A leírásokban megtalálja, hová küldheti önéletrajzát. |
| careerText | RU | Познакомьтесь с работой на международных строительных площадках и свяжитесь с командой по вопросам трудоустройства. | Посмотрите вакансии филиала в Бангладеш, от начальника участка до помощника переводчика. В описании каждой должности указано, куда направить резюме. |
| careers | AR | المسارات المهنية | الوظائف |
| certificateIntro | AR | وثائق من أرشيف الشركة. تُذكر جهة الإصدار والتواريخ ونطاق الشهادة في كل وثيقة. | يضم الأرشيف شهادات نظم الإدارة لدى ROIN WORLD. تبيّن الوثائق الأصلية نطاق كل شهادة والجهة الحاصلة عليها ومدة سريانها. |
| certificateIntro | EN | Documents from the corporate archive. Each document sets out its scope, dates and issuing organisation. | The archive contains ROIN WORLD’s management system certificates. Each original lists the scope of certification, the certificate holder and the period of validity. |
| certificateIntro | ES | Documentos del archivo de la empresa. Cada uno indica su alcance, sus fechas y la entidad emisora. | El archivo reúne los certificados de los sistemas de gestión de ROIN WORLD. Cada original indica el alcance de la certificación, su titular y el periodo de validez. |
| certificateIntro | HU | A vállalati archívum dokumentumai. Mindegyikben szerepel az alkalmazási kör, a dátumok és a kiállító szervezet. | Az archívumban a ROIN WORLD irányítási rendszereinek tanúsítványai találhatók. Az eredeti dokumentumokban szerepel a tanúsítás hatálya, a jogosult szervezet és az érvényességi idő. |
| certificateIntro | RU | Документы из открытого архива компании. Область сертификации, даты и сведения об организации указаны в каждом документе. | В архиве собраны сертификаты систем менеджмента ROIN WORLD. В оригиналах указаны область сертификации, организация-держатель и срок действия. |
| companyDetails | AR | ملف الشركة | نبذة عن الشركة |
| companyDetails | RU | О компании подробнее | Подробнее о компании |
| contactIntro | AR | اختر مكتباً تمثيلياً أو تواصل مع فريق ROIN WORLD. | يمكنك العثور على رقم الهاتف والبريد الإلكتروني للمكتب المطلوب، أو استخدام النموذج لمراسلة ROIN WORLD. |
| contactIntro | EN | Find a representative office or contact the ROIN WORLD team. | Find a phone number or email address for an office, or use the form to contact ROIN WORLD. |
| contactIntro | ES | Busca una oficina de representación o ponte en contacto con el equipo de ROIN WORLD. | Busca el teléfono o el correo electrónico de la oficina que necesitas, o utiliza el formulario para escribir a ROIN WORLD. |
| contactIntro | HU | Keresse meg képviseletünket, vagy lépjen kapcsolatba a ROIN WORLD munkatársaival. | Itt találja irodáink telefonszámát és e-mail-címét. Az űrlappal közvetlenül is írhat a ROIN WORLD munkatársainak. |
| contactIntro | RU | Выберите представительство или направьте обращение команде ROIN WORLD. | Найдите телефон и электронную почту нужного офиса или напишите в ROIN WORLD через форму обращения. |
| externalVideo | HU | Eredeti videó megnyitása | Az eredeti videó megnyitása |
| externalVideo | RU | Открыть у источника | Открыть оригинал видео |
| factsRegions | AR | دول في مجموعة المشاريع | دول في محفظة المشاريع المعروضة |
| factsRegions | EN | countries in this project selection | countries in our project portfolio |
| factsRegions | ES | países en esta selección de proyectos | países representados en la cartera de proyectos |
| factsRegions | HU | ország a bemutatott projektekben | ország a projektválogatásban |
| factsRegions | RU | страны в обзоре проектов | страны в каталоге проектов |
| factsTeam | HU | a ROIN WORLD szakemberei | szakember a ROIN WORLD-nél |
| geoTag | AR | مواقع المشاريع | 〈удалено〉 |
| geoTag | EN | Project locations | 〈удалено〉 |
| geoTag | ES | Ubicación de los proyectos | 〈удалено〉 |
| geoTag | HU | Projekthelyszínek | 〈удалено〉 |
| geoTag | RU | География проектов | 〈удалено〉 |
| geoText | AR | اختر دولة للاطلاع على مشاريع ROIN WORLD. | تُظهر الخريطة مشاريع ROIN WORLD في بنغلاديش ومصر والمجر. اختر دولة للتعرّف على أعمال الشركة في الموقع. |
| geoText | EN | Select a country to explore ROIN WORLD projects. | The map features ROIN WORLD projects in Bangladesh, Egypt and Hungary. Select a country to see our work on site. |
| geoText | ES | Selecciona un país para ver los proyectos de ROIN WORLD. | El mapa muestra proyectos de ROIN WORLD en Bangladés, Egipto y Hungría. Selecciona un país para conocer nuestro trabajo en la obra. |
| geoText | HU | Válasszon országot a ROIN WORLD projektjeinek megtekintéséhez. | A térkép a ROIN WORLD bangladesi, egyiptomi és magyarországi projektjeit mutatja be. Válasszon országot a helyszíni munkák megtekintéséhez. |
| geoText | RU | Выберите страну, чтобы увидеть проекты ROIN WORLD. | На карте представлены проекты ROIN WORLD в Бангладеш, Египте и Венгрии. Выберите страну, чтобы узнать о работе компании на площадке. |
| geography | AR | الانتشار الجغرافي | مواقع المشاريع |
| geography | EN | Our locations | Project locations |
| geography | HU | Helyszíneink | Projekthelyszínek |
| geography | RU | География | География проектов |
| historyIntro | AR | محطات من أرشيف ROIN WORLD، من العمل الميداني إلى التعاون الدولي. | تُبرز تقارير العمل في روبور ووثائق نقل مقر الشركة المسجّل إلى دبي محطات مختلفة من تاريخ ROIN WORLD. |
| historyIntro | EN | Milestones from ROIN WORLD’s public archive, from work on site to international cooperation. | Reports from Rooppur and official records of the company’s move to a registered office in Dubai trace different stages of ROIN WORLD’s history. |
| historyIntro | ES | Hitos del archivo público de ROIN WORLD, desde los trabajos en obra hasta la cooperación internacional. | Los reportajes de Rooppur y los documentos sobre el traslado del domicilio social a Dubái recogen distintas etapas de la historia de ROIN WORLD. |
| historyIntro | HU | Mérföldkövek a ROIN WORLD nyilvános archívumából, a helyszíni munkáktól a nemzetközi együttműködésig. | A ruppuri helyszíni beszámolók és a székhely Dubajba költözéséről szóló dokumentumok a ROIN WORLD történetének egy-egy szakaszát mutatják be. |
| historyIntro | RU | События из открытого архива ROIN WORLD — от работы на площадке до международного сотрудничества. | Публикации о строительстве АЭС «Руппур» и документы о переносе юридического адреса в Дубай отражают разные этапы истории ROIN WORLD. |
| interviewsPending | AR | ستُنشر المقابلات هنا بعد موافقة المختصين على قصصهم. | لم تُنشر مقابلات مع أعضاء الفريق حتى الآن. |
| interviewsPending | EN | Interviews will appear here once the specialists have approved their stories. | Interviews with the team are not yet available. |
| interviewsPending | ES | Los testimonios se publicarán aquí cuando las personas entrevistadas los hayan aprobado. | Aún no se han publicado entrevistas con el equipo. |
| interviewsPending | HU | Az interjúk az érintett munkatársak jóváhagyása után jelennek meg. | Munkatársainkkal egyelőre nem jelent meg interjú. |
| interviewsPending | RU | Раздел готовится к публикации. Здесь появятся интервью со специалистами с их согласия. | Интервью со специалистами пока не опубликованы. |
| leadIntro | AR | الأشخاص الذين يرسمون مسار الشركة. | أسّس روين باراتاشفيلي شركة ROIN WORLD ويتولى إدارتها بصفته الرئيس التنفيذي. |
| leadIntro | EN | The people shaping the company’s direction. | Roin Baratashvili founded ROIN WORLD and leads the company as its chief executive. |
| leadIntro | ES | Las personas que marcan el rumbo de la empresa. | Roin Baratashvili fundó ROIN WORLD y dirige la empresa como director general. |
| leadIntro | HU | Vállalatunk irányításáért felelős szakemberek. | A ROIN WORLD alapítója, Roin Baratashvili vezérigazgatóként irányítja a vállalatot. |
| leadIntro | RU | Люди, определяющие направление развития компании. | Роин Бараташвили основал ROIN WORLD и сегодня возглавляет компанию в качестве генерального директора. |
| mediaIntro | AR | فيلم الشركة ولقطات المواقع وفعاليات من الأرشيف. | شاهد الفيلم التعريفي بشركة ROIN WORLD وتقارير فريقنا من موقع بناء محطة روبور النووية. |
| mediaIntro | EN | The corporate film, site footage and events from the company archive. | Watch the ROIN WORLD company film and reports from our team at the Rooppur nuclear construction site. |
| mediaIntro | ES | El vídeo corporativo, imágenes de las obras y acontecimientos del archivo de la empresa. | Descubre el vídeo corporativo de ROIN WORLD y los reportajes sobre el trabajo de nuestro equipo en la central nuclear de Rooppur. |
| mediaIntro | HU | Vállalati filmünk, helyszíni felvételek és események a cég archívumából. | Nézze meg a ROIN WORLD bemutatkozó filmjét és a Ruppuri Atomerőmű építkezéséről szóló helyszíni beszámolókat. |
| mediaIntro | RU | Корпоративный фильм, кадры со стройплощадок и события из архива компании. | Посмотрите корпоративный фильм ROIN WORLD и репортажи о работе нашей команды на строительстве АЭС «Руппур». |
| more | AR | اعرف المزيد | عرض التفاصيل |
| more | EN | Explore | View details |
| more | ES | Ver más | Ver detalles |
| notFoundText | AR | استخدم القائمة أو عد إلى الصفحة الرئيسية. | تحقّق من عنوان الصفحة أو عُد إلى الصفحة الرئيسية. |
| notFoundText | EN | Use the navigation or return to the home page. | Check the address or return to the home page. |
| notFoundText | ES | Utiliza el menú o vuelve a la página de inicio. | Comprueba la dirección o vuelve a la página de inicio. |
| notFoundText | HU | Használja a menüt, vagy térjen vissza a kezdőlapra. | Ellenőrizze a címet, vagy térjen vissza a kezdőlapra. |
| notFoundText | RU | Воспользуйтесь навигацией или вернитесь на главную страницу. | Проверьте адрес страницы или вернитесь на главную. |
| partners | ES | Colaboradores | Socios |
| partnersIntro | AR | جهات توثّق ROIN WORLD التعاون معها. | تعمل ROIN WORLD مع عملاء ومورّدين وشركات مقاولات. ومن أمثلة التعاون أعمال جزيرة التوربينات في الضبعة وتدريب مشترك على مكافحة الحرائق في روبور. |
| partnersIntro | EN | Organisations whose collaboration is documented by ROIN WORLD. | ROIN WORLD works with clients, suppliers and other contractors. Our collaborations include the turbine island at El Dabaa and joint fire safety training at Rooppur. |
| partnersIntro | ES | Organizaciones cuya colaboración con ROIN WORLD consta en el archivo de la empresa. | ROIN WORLD trabaja con clientes, proveedores y otras constructoras. Entre las colaboraciones figuran los trabajos en la isla de turbinas de El Dabaa y el simulacro de incendio en Rooppur. |
| partnersIntro | HU | Szervezetek, amelyekkel a ROIN WORLD dokumentáltan együttműködött. | A ROIN WORLD megrendelőkkel, beszállítókkal és más kivitelezőkkel dolgozik együtt. Az együttműködés példái közé tartozik az egyiptomi turbinasziget építése és a ruppuri tűzvédelmi gyakorlat. |
| partnersIntro | RU | Организации, сотрудничество с которыми отмечено в материалах ROIN WORLD. | ROIN WORLD работает с заказчиками, поставщиками и строительными компаниями. Среди примеров сотрудничества — работы на турбинном острове АЭС «Эль-Дабаа» и совместные учения на «Руппуре». |
| partnersLink | AR | الشركاء والمشاريع | عرض الشركاء |
| partnersLink | EN | Partners and projects | View partners |
| partnersLink | ES | Colaboradores y proyectos | Ver socios |
| partnersLink | HU | Partnerek és projektek | Partnereink megtekintése |
| partnersLink | RU | Организации и проекты | Посмотреть партнёров |
| photoCredits | AR | حقوق الصور | مصادر الصور وحقوقها |
| photoCredits | HU | Fotók forrásai | Fotók és forrásaik |
| photoCredits | RU | Авторы фотографий | Авторы и источники фотографий |
| privacyIntro | AR | معلومات عن معالجة المراسلات في هذه النسخة من الموقع. | توضح هذه الصفحة البيانات التي يطلبها نموذج المراسلة ومتى يتصل الموقع بخدمات خارجية. |
| privacyIntro | EN | How this version of the website handles enquiries. | Find out what information the enquiry form asks for and when the site connects to external services. |
| privacyIntro | ES | Cómo se gestionan las consultas en esta versión del sitio. | En esta página se explica qué datos solicita el formulario de contacto y cuándo se conecta el sitio a servicios externos. |
| privacyIntro | HU | Hogyan kezeljük a weboldalon keresztül érkező megkereséseket? | Itt olvashat arról, milyen adatokat kér a kapcsolatfelvételi űrlap, és mikor kapcsolódik a webhely külső szolgáltatásokhoz. |
| privacyIntro | RU | Информация об обработке обращений в этой версии сайта. | Здесь описано, какие данные запрашивает форма обращения и когда сайт подключает внешние сервисы. |
| privacyPending | AR | قبل الإطلاق سينشر المشغّل السياسة المعتمدة وفترات الاحتفاظ وقنوات التواصل المتعلقة بالبيانات. | تنتظر سياسة الخصوصية الكاملة الاعتماد. للاستفسار عن مدة الاحتفاظ بالبيانات أو عن رسالة سابقة، تواصل مع أحد مكاتب ROIN WORLD. |
| privacyPending | EN | Before launch, the operator must publish its approved policy, retention periods and privacy contact details. | The full privacy policy is awaiting approval. Contact a ROIN WORLD office if you have questions about data retention or a previous enquiry. |
| privacyPending | ES | Antes del lanzamiento, el responsable debe publicar su política aprobada, los plazos de conservación y los datos de contacto para cuestiones de privacidad. | La política de privacidad completa está pendiente de aprobación. Si tienes preguntas sobre la conservación de los datos o una consulta anterior, contacta con una oficina de ROIN WORLD. |
| privacyPending | HU | Az indulás előtt az üzemeltetőnek közzé kell tennie a jóváhagyott adatkezelési tájékoztatót, a megőrzési időket és az adatvédelemmel kapcsolatos elérhetőségeket. | A teljes adatkezelési tájékoztató jóváhagyásra vár. Az adatmegőrzésről és a korábban elküldött megkeresésekről a ROIN WORLD irodáinál érdeklődhet. |
| privacyPending | RU | Перед запуском оператору предстоит опубликовать утверждённую политику, сроки хранения и порядок обращения по вопросам персональных данных. | Полная политика обработки персональных данных ожидает утверждения. Вопросы о хранении данных и о ранее отправленном обращении можно направить в офис ROIN WORLD. |
| privacyText | AR | يطلب النموذج الاسم والبريد الإلكتروني ونص الرسالة. عند تفعيل الاستلام تُحفظ هذه البيانات في خادم المشغّل للرد. عند إيقاف الاستلام لا تُحفظ الرسائل. لا يتطلب التصفح التسجيل. يتم تحميل مشغلات الفيديو الخارجية عند الطلب وتخضع الروابط الخارجية لسياسات خدماتها. | يطلب النموذج اسمك وبريدك الإلكتروني ونص رسالتك. ويمكنك إضافة اسم شركتك. عند الإرسال عبر الموقع، تُحفظ هذه البيانات على الخادم ليتمكن الفريق من الرد. وفي وضع البريد الإلكتروني، يُعدّ النموذج مسودة على جهازك ترسلها بنفسك من تطبيق البريد. ولا يُحمّل مشغّل الفيديو الخارجي إلا عند طلب المشاهدة. |
| privacyText | EN | The form requests a name, email address and message. When submissions are enabled, the operator’s server stores these details to respond. When closed, the form stores no submissions. Browsing requires no registration. External video players load on request. External services apply their own policies. | The form asks for your name, email address and message. Your company name is optional. If you submit an enquiry through the site, the server stores these details so the team can reply. In email mode, the form prepares a draft on your device. You send it from your email app. External video players load when you choose to play a video. |
| privacyText | ES | El formulario solicita nombre, correo electrónico y mensaje. Si está habilitado el envío, el servidor del responsable almacena estos datos para responder. Cuando el envío está deshabilitado, el formulario no guarda consultas. Puedes consultar el sitio sin registrarte. Los reproductores de vídeo externos se cargan a petición del usuario. Los servicios externos aplican sus propias políticas. | El formulario solicita tu nombre, tu correo electrónico y un mensaje. El nombre de la empresa es opcional. Si envías la consulta desde el sitio, el servidor guarda esos datos para que el equipo pueda responder. En el modo de correo electrónico, el formulario prepara en tu dispositivo un borrador que envías desde tu aplicación de correo. El reproductor externo se carga cuando eliges ver un vídeo. |
| privacyText | HU | Az űrlap a nevet, az e-mail-címet és az üzenetet kéri. Ha a beküldés engedélyezett, az üzemeltető szervere a válaszadás céljából tárolja ezeket az adatokat. Ha a beküldés le van zárva, az űrlap nem tárol megkereséseket. A böngészéshez nem kell regisztrálni. A külső videólejátszók kérésre töltődnek be. A külső szolgáltatók saját adatkezelési szabályzatot alkalmaznak. | Az űrlap a nevét, az e-mail-címét és az üzenetét kéri. A cégnevet tetszés szerint megadhatja. Ha a webhelyen küldi el az üzenetet, a szerver a válaszadáshoz tárolja az adatokat. Levelezőprogram használatakor az űrlap az eszközén készíti elő a levéltervezetet, amelyet Ön küld el. A külső videólejátszó a lejátszás indításakor töltődik be. |
| privacyText | RU | Форма запрашивает имя, электронную почту и текст обращения. При включённом приёме эти сведения сохраняются на сервере оператора для ответа на обращение. Если приём закрыт, данные формы не сохраняются. Для просмотра страниц регистрация не требуется. Внешний видеоплеер подключается после выбора просмотра. При переходе по внешним ссылкам действуют правила соответствующего сервиса. | Форма запрашивает имя, электронную почту и сообщение. Название компании можно указать по желанию. При отправке через сайт эти сведения поступают на сервер для ответа на обращение. В режиме подготовки письма форма создаёт черновик на вашем устройстве. Отправляете его вы из своей почтовой программы. Внешний видеоплеер загружается после нажатия кнопки просмотра. |
| projectHeading | AR | مشاريع مختارة | 〈удалено〉 |
| projectHeading | EN | Selected projects | 〈удалено〉 |
| projectHeading | ES | Proyectos destacados | 〈удалено〉 |
| projectHeading | HU | Kiemelt projektek | 〈удалено〉 |
| projectHeading | RU | Избранные проекты | 〈удалено〉 |
| projectsIntro | AR | من ورشة التجميع المسبق في روبور إلى منشآت جزيرة التوربينات في الضبعة. تعرّف على أعمال ROIN WORLD في ثلاثة مواقع لبناء محطات نووية. | تشارك ROIN WORLD في بناء محطات روبور النووية في بنغلاديش والضبعة في مصر وباكش الثانية في المجر. تعرّف على دور فرقنا في كل مشروع. |
| projectsIntro | EN | From the pre-assembly workshop at Rooppur to the turbine island at El Dabaa. Explore ROIN WORLD’s work across three nuclear construction sites. | ROIN WORLD contributes to the construction of Rooppur in Bangladesh, El Dabaa in Egypt and Paks II in Hungary. Explore our work at each nuclear power plant. |
| projectsIntro | ES | Del taller de premontaje de Rooppur a la isla de turbinas de El Dabaa. Conoce el trabajo de ROIN WORLD en tres centrales nucleares en construcción. | ROIN WORLD participa en la construcción de las centrales nucleares de Rooppur en Bangladés, El Dabaa en Egipto y Paks II en Hungría. Conoce el trabajo de nuestros equipos en cada proyecto. |
| projectsIntro | HU | A ruppuri előszerelő műhelytől az el-dabaai turbinaszigetig. A ROIN WORLD munkája három atomerőmű-építés helyszínén. | A ROIN WORLD a bangladesi Ruppur, az egyiptomi El-Dabaa és a magyarországi Paks II. atomerőmű építésében vesz részt. Bemutatjuk, milyen feladatokon dolgoznak csapataink az egyes helyszíneken. |
| projectsIntro | RU | От цеха предсборки на АЭС «Руппур» до объектов турбинного острова «Эль-Дабаа». Работы ROIN WORLD на трёх международных площадках. | ROIN WORLD участвует в строительстве АЭС «Руппур» в Бангладеш, «Эль-Дабаа» в Египте и «Пакш II» в Венгрии. Выберите проект, чтобы подробнее узнать о работах нашей команды. |
| scope | AR | نطاق الخدمات | الأعمال المشمولة |
| scope | EN | Scope of services | Scope of work |
| scope | ES | Alcance de los servicios | Qué hacemos |
| scope | HU | A szolgáltatások köre | A feladatok köre |
| scope | RU | Состав направления | Что входит в работу |
| scroll | AR | انتقل للأسفل | الانتقال إلى أسفل الصفحة |
| scroll | EN | Scroll to explore | Scroll down |
| scroll | ES | Desplázate para descubrir más | Desplazarse hacia abajo |
| scroll | HU | További tartalom lejjebb | Görgetés lefelé |
| scroll | RU | Листайте вниз | Прокрутить вниз |
| servicesHeading | AR | مجالات عملنا | 〈удалено〉 |
| servicesHeading | EN | Our expertise | 〈удалено〉 |
| servicesHeading | ES | Nuestros servicios | 〈удалено〉 |
| servicesHeading | HU | Szakterületeink | 〈удалено〉 |
| servicesHeading | RU | Направления деятельности | 〈удалено〉 |
| servicesIntro | AR | تجمع ROIN WORLD بين أعمال البناء ودعم المواقع، من نقل المعدات إلى الخدمات اليومية لفرق العمل. | نتولى أعمال البناء والهندسة، وننظم نقل المعدات وتوريد المواد وتقديم الوجبات للعاملين في المواقع. |
| servicesIntro | EN | ROIN WORLD brings together construction and site support, from equipment transport to everyday services for the people on site. | We carry out construction and engineering work, arrange equipment transport, supply materials and provide meals for site teams. |
| servicesIntro | ES | ROIN WORLD coordina la construcción y el apoyo en obra, desde el transporte de equipos hasta los servicios cotidianos para el personal. | Ejecutamos obras de construcción e ingeniería, organizamos el transporte de equipos, suministramos materiales y prestamos servicios de comedor en obra. |
| servicesIntro | HU | A ROIN WORLD az építési munkákat a helyszíni feladatokkal hangolja össze, a berendezések szállításától a dolgozók napi ellátásáig. | Építési és mérnöki munkákat végzünk, gondoskodunk a berendezések szállításáról, az anyagellátásról és a helyszínen dolgozók étkeztetéséről. |
| servicesIntro | RU | Компетенции ROIN WORLD охватывают сам процесс строительства и обеспечение объекта — от перевозки оборудования до повседневной работы команд. | Мы выполняем строительные и инженерные работы, организуем перевозку оборудования, поставляем материалы и обеспечиваем питание на стройплощадках. |
| teamLink | EN | Meet our people | Meet our team |
| teamLink | RU | Знакомьтесь с командой | Познакомиться с командой |
| teamTag | AR | أفراد ROIN WORLD | المتخصصون |
| teamTag | EN | People of ROIN WORLD | Specialists |
| teamTag | ES | Las personas de ROIN WORLD | Especialistas |
| teamTag | HU | A ROIN WORLD munkatársai | Szakembereink |
| teamTag | RU | Люди ROIN WORLD | Специалисты |
| teamText | AR | يتعاون المهندسون وفرق البناء وأخصائيو النقل في مواقع دولية. | تُظهر تقاريرنا من محطة روبور فرقنا وهي تصبّ أساسات أجهزة المحاكاة وتشارك في تدريب على مكافحة الحرائق في الموقع. |
| teamText | EN | Engineers, construction crews and logistics specialists work together on international sites. | Reports from Rooppur show our crews casting foundations for training simulators and taking part in a fire drill at the plant. |
| teamText | ES | Nuestros equipos de ingeniería, construcción y logística trabajan juntos en obras de distintos países. | Los reportajes de Rooppur muestran a nuestros equipos mientras hormigonan las bases de los simuladores y participan en un simulacro de incendio. |
| teamText | HU | Mérnökeink, építőcsapataink és logisztikai szakembereink több ország építkezésein dolgoznak együtt. | Ruppuri beszámolóinkban munkatársaink a szimulátorok alapjait betonozzák, és részt vesznek a helyszíni tűzvédelmi gyakorlaton. |
| teamText | RU | Инженеры, строители и специалисты по логистике работают над общими задачами на международных площадках. | В репортажах с АЭС «Руппур» наша бригада бетонирует основания под тренажёры, а специалисты ROIN WORLD участвуют в противопожарных учениях. |
| topic | AR | ناقش التعاون | تواصل معنا بشأن مشروع |
| topic | ES | Hablemos de tu proyecto | Consultar sobre un proyecto |
| topic | HU | Beszéljünk a projektjéről | Egyeztetés a projektről |
| topic | RU | Обсудить сотрудничество | Обсудить проект |
| vacancies | AR | الوظائف الشاغرة | الوظائف |
| vacancies | EN | Open positions | Job listings |
| vacancies | ES | Vacantes | Ofertas de empleo |
| vacancies | HU | Nyitott állások | Álláslehetőségek |
| vacancyEmpty | AR | لا توجد إعلانات وظائف منشورة هنا حالياً. يمكن التواصل مع الفريق لمعرفة الفرص المتاحة. | لا توجد وظائف منشورة حالياً. يمكنك التواصل مع أحد مكاتب ROIN WORLD للاستفسار عن فرص العمل. |
| vacancyEmpty | EN | There are currently no listings in this catalogue. Contact the team for available opportunities. | There are no job listings at the moment. Contact a ROIN WORLD office to ask about opportunities. |
| vacancyEmpty | ES | En este momento no hay vacantes publicadas en este catálogo. Consulta al equipo las oportunidades disponibles. | Por el momento no hay puestos publicados. Contacta con una oficina de ROIN WORLD para consultar las oportunidades disponibles. |
| vacancyEmpty | HU | Jelenleg nincs meghirdetett állás a jegyzékben. Az elérhető lehetőségekről munkatársaink adnak tájékoztatást. | Jelenleg nincs meghirdetett állás. A lehetőségekről a ROIN WORLD irodáinál érdeklődhet. |
| vacancyEmpty | RU | В этом каталоге пока нет опубликованных вакансий. Уточните актуальные возможности у команды компании. | Сейчас вакансии не опубликованы. О возможностях работы в ROIN WORLD можно узнать в нашем офисе. |

</details>

<details>
<summary>Карта на главной и страница географии · 36 изменений</summary>

Файл содержимого <code>content/atlas-ui.json</code>.

| Поле или запись | Язык | Было | Стало |
|---|---|---|---|
| countryProjects | AR | مشاريع هذا البلد | المشاريع في هذا البلد |
| countryProjects | ES | Proyectos del país | Proyectos en este país |
| countryProjects | HU | Projektek az országban | Projektek ebben az országban |
| countryProjects | RU | Проекты страны | Проекты в этой стране |
| heading | AR | جغرافيا المشاريع | مواقع المشاريع |
| heading | ES | Geografía de los proyectos | Ubicación de los proyectos |
| intro | AR | تشارك ROIN WORLD في مشاريع البناء والهندسة في قطاعَي الطاقة النووية والبنية التحتية. | تشارك شركة ROIN WORLD في بناء محطات للطاقة النووية في بنغلاديش ومصر والمجر. |
| intro | EN | ROIN WORLD contributes to construction and engineering projects in nuclear energy and infrastructure. | ROIN WORLD takes part in nuclear power plant construction in Bangladesh, Egypt and Hungary. |
| intro | ES | ROIN WORLD participa en proyectos de construcción e ingeniería en los sectores de la energía nuclear y las infraestructuras. | ROIN WORLD participa en la construcción de centrales nucleares en Bangladés, Egipto y Hungría. |
| intro | HU | A ROIN WORLD nukleáris energetikai és infrastrukturális projektek építési és mérnöki munkáiban vesz részt. | A ROIN WORLD Bangladesben, Egyiptomban és Magyarországon vesz részt atomerőművek építésében. |
| intro | RU | ROIN WORLD участвует в строительных и инженерных проектах в сфере атомной энергетики и инфраструктуры. | ROIN WORLD участвует в строительстве атомных электростанций в Бангладеш, Египте и Венгрии. |
| pause | AR | إيقاف التنقل التلقائي بين الدول مؤقتًا | إيقاف عرض البلدان مؤقتاً |
| pause | EN | Pause automatic country changes | Pause country slideshow |
| pause | ES | Pausar el cambio automático de país | Pausar el recorrido por países |
| pause | HU | Az automatikus országváltás szüneteltetése | Az országok bemutatásának szüneteltetése |
| pause | RU | Приостановить автоматическую смену стран | Приостановить показ стран |
| presence | AR | الحضور الدولي | 〈удалено〉 |
| presence | EN | International presence | 〈удалено〉 |
| presence | ES | Presencia internacional | 〈удалено〉 |
| presence | HU | Nemzetközi jelenlét | 〈удалено〉 |
| presence | RU | Международное присутствие | 〈удалено〉 |
| projectNotes.el-dabaa | AR | أبرمت ROIN WORLD اتفاقًا مع KHNP وDoosan Enerbility لبناء منشآت جزيرة التوربينات في محطة الضبعة النووية. | يشمل اتفاق شركة ROIN WORLD مع KHNP وDoosan Enerbility بناء مرافق جزيرة التوربينات في محطة الضبعة النووية. |
| projectNotes.el-dabaa | EN | ROIN WORLD signed an agreement with KHNP and Doosan Enerbility to build facilities on the turbine island at El Dabaa nuclear power plant. | At El Dabaa nuclear power plant, ROIN WORLD’s agreement with KHNP and Doosan Enerbility covers construction of turbine island facilities. |
| projectNotes.el-dabaa | ES | ROIN WORLD firmó un acuerdo con KHNP y Doosan Enerbility para construir instalaciones en la isla de turbinas de la central nuclear de El Dabaa. | El acuerdo de ROIN WORLD con KHNP y Doosan Enerbility abarca la construcción de instalaciones en la isla de turbinas de la central nuclear de El Dabaa. |
| projectNotes.el-dabaa | HU | A ROIN WORLD a KHNP és a Doosan Enerbility vállalattal kötött megállapodást az El-Dabaa atomerőmű turbinaszigetének építési munkáiról. | A ROIN WORLD a KHNP-vel és a Doosan Enerbilityvel az El-Dabaa Atomerőmű turbinaszigetének építési munkáiról kötött megállapodást. |
| projectNotes.el-dabaa | RU | ROIN WORLD заключила с KHNP и Doosan Enerbility соглашение о строительстве объектов турбинного острова АЭС «Эль-Дабаа». | Соглашение ROIN WORLD с KHNP и Doosan Enerbility касается строительства объектов турбинного острова АЭС «Эль-Дабаа». |
| projectNotes.rooppur | AR | أنجزت ROIN WORLD أعمالها في ورشة التجميع المسبق في موقع محطة روبور للطاقة النووية. | أنهت شركة ROIN WORLD أعمالها في ورشة التجميع المسبق بالموقع 4.1 في محطة روبور النووية. |
| projectNotes.rooppur | EN | At Rooppur nuclear power plant, ROIN WORLD completed work on the pre-assembly workshop. | ROIN WORLD completed work on the pre-assembly workshop at site 4.1 of Rooppur nuclear power plant. |
| projectNotes.rooppur | ES | En la central nuclear de Rooppur, ROIN WORLD concluyó los trabajos en el taller de premontaje. | ROIN WORLD terminó los trabajos en el taller de premontaje de la zona 4.1 de la central nuclear de Rooppur. |
| projectNotes.rooppur | HU | A ruppuri atomerőmű területén a ROIN WORLD befejezte az előszerelő csarnokban végzett munkát. | A ROIN WORLD befejezte munkáit a Ruppuri Atomerőmű 4.1-es építési területének előszerelő csarnokában. |
| projectNotes.rooppur | RU | На площадке АЭС «Руппур» ROIN WORLD завершила работы в цехе предварительной сборки. | На АЭС «Руппур» ROIN WORLD завершила работы в цехе предварительной сборки на участке 4.1. |
| resume | AR | استئناف التنقل التلقائي بين الدول | متابعة عرض البلدان |
| resume | EN | Resume automatic country changes | Resume country slideshow |
| resume | ES | Reanudar el cambio automático de país | Reanudar el recorrido por países |
| resume | HU | Az automatikus országváltás folytatása | Az országok bemutatásának folytatása |
| resume | RU | Возобновить автоматическую смену стран | Продолжить показ стран |

</details>

<details>
<summary>Каталог и три страницы объектов · 73 изменений</summary>

Файл содержимого <code>content/projects.json</code>.

| Поле или запись | Язык | Было | Стало |
|---|---|---|---|
| items.el-dabaa.context | AR | تقع الضبعة على ساحل مصر المطل على البحر المتوسط. ووفقاً لهيئة المحطات النووية لتوليد الكهرباء، يضم المشروع أربع وحدات بقدرة إجمالية تبلغ ٤٫٨ غيغاواط. | تُبنى محطة الضبعة النووية على ساحل البحر المتوسط في مصر. ويشمل المشروع أربع وحدات بقدرة إجمالية تبلغ ٤٫٨ غيغاواط. |
| items.el-dabaa.context | EN | El Dabaa is on Egypt’s Mediterranean coast. The Egyptian Nuclear Power Plants Authority describes a four-unit project with a combined capacity of 4.8 GW. | El Dabaa is under construction on Egypt’s Mediterranean coast. The plant is designed to have four reactor units with a combined capacity of 4.8 GW. |
| items.el-dabaa.context | ES | El Dabaa se encuentra en la costa mediterránea de Egipto. Según la Autoridad Egipcia de Centrales Nucleares, el proyecto consta de cuatro unidades con una potencia total de 4,8 GW. | La central nuclear de El Dabaa se construye en la costa mediterránea de Egipto. El proyecto prevé cuatro unidades con una potencia total de 4,8 GW. |
| items.el-dabaa.context | HU | El-Dabaa Egyiptom földközi-tengeri partvidékén található. Az egyiptomi atomerőmű-hatóság tájékoztatása szerint a projekt négy, együttesen 4,8 GW teljesítményű blokkból áll. | Az El-Dabaa Atomerőmű Egyiptom földközi-tengeri partvidékén épül. A tervek szerint a négy blokk együttes teljesítménye 4,8 GW lesz. |
| items.el-dabaa.context | RU | «Эль-Дабаа» строится на средиземноморском побережье Египта. По данным египетского Управления атомных электростанций, проект предусматривает четыре энергоблока общей мощностью 4,8 ГВт. | АЭС «Эль-Дабаа» строится на средиземноморском побережье Египта. Проект предусматривает четыре энергоблока общей мощностью 4,8 ГВт. |
| items.el-dabaa.role | AR | تنفذ ROIN WORLD أعمال التحضير والإنشاء. وتشمل اتفاقيتها مع KHNP وDoosan Enerbility منشآت جزيرة التوربينات. كما تقدم خدمات الإعاشة للعاملين في الموقع. | تتولى شركة ROIN WORLD أعمال تهيئة الموقع وتشارك في أعمال البناء. ويشمل اتفاقها مع KHNP وDoosan Enerbility إنشاء مرافق جزيرة التوربينات. كما تقدم الوجبات للعاملين في الموقع. |
| items.el-dabaa.role | EN | ROIN WORLD undertakes preparatory and construction work. Its agreement with KHNP and Doosan Enerbility covers turbine island facilities. The company also provides catering for site personnel. | ROIN WORLD carries out site preparation and construction work. Its agreement with KHNP and Doosan Enerbility covers construction of turbine island facilities. The company also provides meals for site workers. |
| items.el-dabaa.role | ES | ROIN WORLD realiza trabajos de preparación y construcción. Su acuerdo con KHNP y Doosan Enerbility abarca las instalaciones de la isla de turbinas. La empresa también presta servicios de alimentación al personal de obra. | ROIN WORLD realiza trabajos de preparación del terreno y de construcción. Su acuerdo con KHNP y Doosan Enerbility abarca la construcción de instalaciones en la isla de turbinas. La empresa también se encarga de las comidas del personal de obra. |
| items.el-dabaa.role | HU | A ROIN WORLD előkészítési és kivitelezési munkákat végez. A KHNP-vel és a Doosan Enerbilityvel kötött megállapodása a turbinasziget létesítményeire terjed ki. A vállalat a helyszíni személyzet étkeztetéséről is gondoskodik. | A ROIN WORLD részt vesz a terület előkészítésében és a kivitelezésben. A KHNP-vel és a Doosan Enerbilityvel kötött megállapodása a turbinasziget létesítményeinek építésére vonatkozik. A vállalat a helyszínen dolgozók étkeztetéséről is gondoskodik. |
| items.el-dabaa.role | RU | ROIN WORLD выполняет подготовительные и строительные работы. С KHNP и Doosan Enerbility компания заключила соглашение о строительстве объектов турбинного острова. На площадке ROIN WORLD также организует питание персонала. | ROIN WORLD выполняет подготовительные и строительные работы на площадке станции. Соглашение с KHNP и Doosan Enerbility охватывает строительство объектов турбинного острова. Компания также организует питание работников площадки. |
| items.el-dabaa.summary | AR | تشارك الشركة في مصر في مشروع بناء محطة الضبعة للطاقة النووية على ساحل البحر المتوسط. | تشارك شركة ROIN WORLD في أعمال البناء وتقدم الوجبات للعاملين في موقع محطة الضبعة النووية في مصر. |
| items.el-dabaa.summary | EN | In Egypt, the company participates in the El Dabaa nuclear power plant project on the Mediterranean coast. | ROIN WORLD carries out construction work and provides meals for workers at Egypt’s El Dabaa nuclear power plant. |
| items.el-dabaa.summary | ES | En Egipto, la empresa participa en el proyecto de la central nuclear de El Dabaa, en la costa mediterránea. | ROIN WORLD participa en la construcción de la central nuclear de El Dabaa, en Egipto, y se encarga de la alimentación del personal de obra. |
| items.el-dabaa.summary | HU | A vállalat Egyiptomban részt vesz a Földközi-tenger partján épülő El-Dabaa Atomerőmű beruházásában. | A ROIN WORLD részt vesz az egyiptomi El-Dabaa Atomerőmű építésében, és gondoskodik az építkezésen dolgozók étkeztetéséről. |
| items.el-dabaa.summary | RU | В Египте компания участвует в проекте строительства АЭС «Эль-Дабаа» на побережье Средиземного моря. | На площадке АЭС «Эль-Дабаа» в Египте ROIN WORLD участвует в строительстве и организует питание персонала. |
| items.el-dabaa.videos.1.title | AR | تقارير مصورة من الضبعة · هيئة المحطات النووية | فيديوهات هيئة المحطات النووية عن أعمال البناء في الضبعة |
| items.el-dabaa.videos.1.title | EN | El Dabaa video reports · NPPA | El Dabaa construction videos from Egypt’s Nuclear Power Plants Authority |
| items.el-dabaa.videos.1.title | ES | Vídeos de El Dabaa · NPPA | Vídeos de la autoridad nuclear egipcia (NPPA) sobre las obras de El Dabaa |
| items.el-dabaa.videos.1.title | HU | Videóbeszámolók El-Dabaából · NPPA | Az egyiptomi atomerőmű-hatóság (NPPA) videói az El-Dabaa építéséről |
| items.el-dabaa.videos.1.title | RU | Видеорепортажи с «Эль-Дабаа» · NPPA | Видеорепортажи о строительстве «Эль-Дабаа» от NPPA |
| items.paks-ii.context | AR | يوسّع مشروع باكس ٢ موقع محطة باكس القائمة. وتنص اتفاقيات الإنشاء على إضافة وحدتين جديدتين بقدرة ١٢٠٠ ميغاواط لكل منهما. | ينص مشروع باكس ٢ على بناء وحدتين جديدتين في موقع محطة باكس القائمة، بقدرة ١٢٠٠ ميغاواط لكل منهما. |
| items.paks-ii.context | EN | Paks II extends the existing Paks nuclear power site. The construction agreements provide for two new units rated at 1,200 MW each. | The expansion plan for Paks nuclear power plant includes two new reactor units with a capacity of 1,200 MW each. |
| items.paks-ii.context | ES | Paks II amplía el emplazamiento nuclear existente en Paks. Los contratos de construcción prevén dos nuevas unidades de 1.200 MW cada una. | Paks II prevé añadir dos unidades de 1200 MW cada una en el emplazamiento de la central nuclear de Paks. |
| items.paks-ii.context | HU | A Paks II. beruházás a meglévő paksi atomerőmű telephelyének bővítése. A kivitelezési megállapodások két új, egyenként 1200 MW teljesítményű blokkról szólnak. | A Paks II. beruházásban két új, egyenként 1200 MW teljesítményű blokkot terveznek a Paksi Atomerőmű telephelyére. |
| items.paks-ii.context | RU | Проект «Пакш II» расширяет площадку существующей АЭС «Пакш». Соглашения о строительстве предусматривают два новых энергоблока мощностью 1 200 МВт каждый. | На площадке действующей АЭС «Пакш» проект предусматривает строительство двух новых энергоблоков мощностью по 1 200 МВт. |
| items.paks-ii.role | AR | تدرج الشركة هذه المحطة ضمن مشاريع البناء النووي التي تشارك فيها. | تذكر شركة ROIN WORLD مشروع باكس ٢ ضمن مشروعات المحطات النووية التي تشارك في بنائها. |
| items.paks-ii.role | EN | ROIN WORLD lists this plant among the nuclear construction projects in which it participates. | ROIN WORLD identifies Paks II as one of the nuclear power plants it is helping to build. |
| items.paks-ii.role | ES | ROIN WORLD incluye esta central entre los proyectos de construcción nuclear en los que participa. | ROIN WORLD incluye Paks II entre las centrales nucleares en cuya construcción participa. |
| items.paks-ii.role | HU | A ROIN WORLD saját tájékoztatása szerint részt vesz az atomerőmű építésében. | A ROIN WORLD tájékoztatása szerint részt vesz a Paks II. beruházás kivitelezésében. |
| items.paks-ii.role | RU | Компания указывает этот объект в перечне строящихся АЭС, в которых принимает участие. | ROIN WORLD указывает «Пакш II» среди атомных электростанций, в строительстве которых участвует. |
| items.paks-ii.summary | AR | يندرج مشروع باكس ٢ في المجر ضمن المشاريع الدولية التي تشارك فيها ROIN WORLD في قطاع البناء النووي. | تشارك شركة ROIN WORLD في مشروع باكس ٢ لتوسعة محطة باكس النووية القائمة في المجر. |
| items.paks-ii.summary | EN | The Paks II project in Hungary is part of ROIN WORLD’s international nuclear construction portfolio. | ROIN WORLD is involved in Paks II, the expansion of Hungary’s Paks nuclear power plant. |
| items.paks-ii.summary | ES | El proyecto de Paks II, en Hungría, forma parte de la cartera internacional de construcción nuclear de ROIN WORLD. | ROIN WORLD participa en Paks II, el proyecto de ampliación de la central nuclear de Paks, en Hungría. |
| items.paks-ii.summary | HU | A magyarországi Paks II. a ROIN WORLD nemzetközi atomerőmű-építési projektjei közé tartozik. | A ROIN WORLD részt vesz a Paksi Atomerőmű bővítésében, a Paks II. beruházásban. |
| items.paks-ii.summary | RU | Венгерский проект «Пакш II» входит в географию участия ROIN WORLD в международном атомном строительстве. | «Пакш II» — проект расширения действующей АЭС «Пакш» в Венгрии, в котором участвует ROIN WORLD. |
| items.paks-ii.videos.1.title | AR | أفلام عن البناء · شركة باكش ٢ | فيديوهات شركة باكس ٢ عن تقدم أعمال البناء |
| items.paks-ii.videos.1.title | EN | Construction films · Paks II Ltd. | Construction updates from Paks II Ltd. |
| items.paks-ii.videos.1.title | ES | Vídeos de la construcción · Paks II Ltd. | Vídeos de Paks II Ltd. sobre el avance de las obras |
| items.paks-ii.videos.1.title | HU | Építési filmek · Paks II. Zrt. | A Paks II. Zrt. videói az építkezésről |
| items.paks-ii.videos.1.title | RU | Хроника строительства · Paks II Ltd. | Видеохроника строительства от Paks II Ltd. |
| items.rooppur.context | AR | روبور هي أول محطة للطاقة النووية في بنغلاديش. ويصف التقرير الوطني المقدم إلى الوكالة الدولية للطاقة الذرية مشروعاً يضم وحدتين لتوليد الكهرباء. | روبور أول محطة للطاقة النووية في بنغلاديش. ويتضمن المشروع إنشاء وحدتين لتوليد الكهرباء. |
| items.rooppur.context | EN | Rooppur is Bangladesh’s first nuclear power plant. The country’s national report to the IAEA describes a two-unit project. | Rooppur is Bangladesh’s first nuclear power plant. The project calls for two reactor units. |
| items.rooppur.context | ES | Rooppur es la primera central nuclear de Bangladés. El informe nacional presentado al OIEA describe un proyecto de dos unidades. | Rooppur es la primera central nuclear de Bangladés. El proyecto contempla la construcción de dos unidades. |
| items.rooppur.context | HU | A ruppuri létesítmény Banglades első atomerőműve. Az ország a NAÜ-nek benyújtott nemzeti jelentésében kétblokkos beruházást ismertet. | A Ruppuri Atomerőmű Banglades első atomerőműve. A tervek szerint két blokk épül. |
| items.rooppur.context | RU | «Руппур» — первая атомная электростанция Бангладеш. Национальный доклад страны для МАГАТЭ описывает проект из двух энергоблоков. | «Руппур» — первая атомная электростанция Бангладеш. Проект предусматривает два энергоблока. |
| items.rooppur.gallery.1.caption | AR | موقع البناء وأبراج التبريد في محطة روبور النووية، بنغلاديش | موقع البناء وأبراج التبريد في محطة روبور النووية في بنغلاديش |
| items.rooppur.gallery.1.caption | EN | Construction site and cooling towers at Rooppur nuclear power plant, Bangladesh | Construction site and cooling towers at Rooppur nuclear power plant in Bangladesh |
| items.rooppur.gallery.1.caption | ES | Obras y torres de refrigeración de la central nuclear de Rooppur, Bangladés | Obras y torres de refrigeración de la central nuclear de Rooppur en Bangladés |
| items.rooppur.gallery.1.caption | HU | A ruppuri atomerőmű építési területe és hűtőtornyai, Banglades | A Ruppuri Atomerőmű építési területe és hűtőtornyai Bangladesben |
| items.rooppur.gallery.1.caption | RU | Строительная площадка и градирни АЭС „Руппур“, Бангладеш | Строительная площадка и градирни АЭС «Руппур» в Бангладеш |
| items.rooppur.gallery.2.caption | AR | أبراج التبريد في محطة روبور النووية في بنغلاديش ليلاً | أبراج التبريد في محطة روبور النووية بعد غروب الشمس |
| items.rooppur.gallery.2.caption | EN | Cooling towers at Rooppur nuclear power plant in Bangladesh at night | Cooling towers at Rooppur nuclear power plant after sunset |
| items.rooppur.gallery.2.caption | ES | Torres de refrigeración de la central de Rooppur en Bangladés, de noche | Torres de refrigeración de la central nuclear de Rooppur tras la puesta de sol |
| items.rooppur.gallery.2.caption | HU | A bangladesi Ruppuri Atomerőmű hűtőtornyai éjszaka | A Ruppuri Atomerőmű hűtőtornyai napnyugta után |
| items.rooppur.gallery.2.caption | RU | Ночная панорама градирен АЭС «Руппур» в Бангладеш | Градирни АЭС «Руппур» после заката |
| items.rooppur.gallery.3.caption | AR | أبراج التبريد في محطة روبور | أبراج التبريد في محطة روبور النووية |
| items.rooppur.gallery.3.caption | EN | Rooppur cooling towers | Cooling towers at Rooppur nuclear power plant |
| items.rooppur.gallery.3.caption | ES | Torres de refrigeración de Rooppur | Torres de refrigeración de la central nuclear de Rooppur |
| items.rooppur.role | AR | أنجزت ROIN WORLD أعمال ورشة التجميع المسبق في الموقع 4.1. تبلغ مساحة مبنى الإنتاج 4,300 متر مربع، ويضم خمس رافعات جسرية. | أنهت شركة ROIN WORLD أعمالها في ورشة التجميع المسبق بالموقع 4.1. تبلغ مساحة المبنى ٤٣٠٠ متر مربع ويضم خمس رافعات جسرية. |
| items.rooppur.role | EN | At site 4.1, ROIN WORLD completed work on the pre-assembly workshop. The 4,300 m² production building is equipped with five overhead cranes. | ROIN WORLD completed work on the pre-assembly workshop at site 4.1. The 4,300 m² building has five overhead cranes. |
| items.rooppur.role | ES | En la zona 4.1, ROIN WORLD terminó los trabajos del taller de premontaje. La nave de 4.300 m² está equipada con cinco puentes grúa. | ROIN WORLD terminó los trabajos en el taller de premontaje de la zona 4.1. La nave tiene una superficie de 4300 m² y cuenta con cinco puentes grúa. |
| items.rooppur.role | HU | A ROIN WORLD a 4.1-es területen befejezte az előszerelő műhely munkálatait. A 4300 m²-es üzemcsarnokban öt híddaru működik. | A ROIN WORLD a 4.1-es építési területen befejezte az előszerelő csarnokban végzett munkáit. A 4300 m²-es csarnokban öt híddaru található. |
| items.rooppur.role | RU | На площадке 4.1 ROIN WORLD завершила работы в цехе предварительной сборки. Площадь производственного корпуса — 4 300 м². В нём установлены пять мостовых кранов. | На участке 4.1 ROIN WORLD завершила работы в цехе предварительной сборки. В здании площадью 4 300 м² установлены пять мостовых кранов. |
| items.rooppur.summary | AR | يُعد بناء محطة روبور للطاقة النووية في بنغلاديش أحد مشاريع الطاقة الدولية التي تشارك فيها ROIN WORLD. | نفذت شركة ROIN WORLD أعمالاً في ورشة التجميع المسبق بمحطة روبور النووية في بنغلاديش. |
| items.rooppur.summary | EN | Construction of the Rooppur nuclear power plant in Bangladesh is among ROIN WORLD’s international energy projects. | ROIN WORLD worked on the pre-assembly workshop at the Rooppur nuclear power plant in Bangladesh. |
| items.rooppur.summary | ES | La construcción de la central nuclear de Rooppur, en Bangladés, forma parte de los proyectos energéticos internacionales de ROIN WORLD. | ROIN WORLD participó en las obras del taller de premontaje de la central nuclear de Rooppur, en Bangladés. |
| items.rooppur.summary | HU | A bangladesi Ruppuri Atomerőmű építése a ROIN WORLD nemzetközi energetikai projektjei közé tartozik. | A ROIN WORLD a bangladesi Ruppuri Atomerőmű előszerelő csarnokán dolgozott. |
| items.rooppur.summary | RU | Строительство АЭС «Руппур» в Бангладеш входит в число международных проектов ROIN WORLD в атомной энергетике. | В Бангладеш ROIN WORLD участвовала в строительстве цеха предварительной сборки для АЭС «Руппур». |
| items.rooppur.videos.1.title | AR | أساسات أجهزة المحاكاة في روبور | أساسات لأجهزة المحاكاة في محطة روبور |
| items.rooppur.videos.1.title | EN | Foundations for the Rooppur simulators | Foundations for training simulators at Rooppur |
| items.rooppur.videos.1.title | ES | Cimentaciones para los simuladores de Rooppur | Cimentaciones para los simuladores de la central de Rooppur |
| items.rooppur.videos.1.title | HU | A ruppuri szimulátorok alapozása | A szimulátorok alapozása a ruppuri atomerőműben |
| items.rooppur.videos.1.title | RU | Основания для тренажёров на «Руппуре» | Фундаменты для тренажёров на АЭС «Руппур» |

</details>

<details>
<summary>Обзор направлений и страницы услуг · 83 изменений</summary>

Файл содержимого <code>content/services.json</code>.

| Поле или запись | Язык | Было | Стало |
|---|---|---|---|
| items.catering.approach | AR | تحدد جداول المناوبات وقت تقديم الخدمات ومكانها. ويساعد توزيع مناطق العمل وعدد أفراد كل مناوبة على تقدير احتياجات الوجبات والخدمات اليومية. | نحدد مواعيد تقديم الوجبات وأماكنها وفق عدد العاملين في كل مناوبة ومواقع عملهم. |
| items.catering.approach | EN | Shift patterns determine where and when services are needed. The layout of work areas and the size of each shift inform catering and daily service needs. | The number of people on each shift and where they work determine when and where meals are served. |
| items.catering.approach | ES | Los turnos determinan dónde y cuándo se necesitan los servicios. La distribución de las zonas de trabajo y el número de personas de cada turno permiten calcular las necesidades de alimentación y de atención diaria. | El número de personas de cada turno y la ubicación de sus puestos de trabajo determinan dónde y cuándo se sirven las comidas. |
| items.catering.approach | HU | A műszakbeosztás határozza meg, hogy hol és mikor van szükség az egyes szolgáltatásokra. Az étkeztetést és a napi ellátást a munkaterületek elrendezése és a műszak létszáma alapján tervezzük. | A műszak létszáma és a munkavégzés helye alapján tervezzük meg az étkezések idejét és helyszínét. |
| items.catering.approach | RU | График смен определяет время и место обслуживания. Расположение рабочих зон и численность смены помогают рассчитать потребность в питании и повседневных сервисах. | Учитываем, сколько человек работает в каждой смене и где находятся их рабочие места. Это помогает определить, где и когда организовать питание. |
| items.catering.body | AR | يعتمد سير المناوبات على تلبية الاحتياجات اليومية. وتراعي خدمات الإعاشة جداول الفرق ومناطق العمل والظروف المحلية. | نخطط للوجبات والخدمات اليومية وفق مواعيد المناوبات ومواقع العمل والظروف المحلية. |
| items.catering.body | EN | A working shift depends on how everyday needs are met. Catering and site services take account of team schedules, work areas and local conditions. | We plan meals and site services around shift times, work locations and local conditions. |
| items.catering.body | ES | El desarrollo de un turno depende también de la atención a las necesidades diarias del personal. La alimentación y los servicios de obra se adaptan a los horarios de los equipos, las zonas de trabajo y las condiciones locales. | Adaptamos las comidas y los servicios diarios a los horarios de los turnos, la distribución de las zonas de trabajo y las condiciones locales. |
| items.catering.body | HU | A műszak zavartalan lebonyolításához a mindennapi ellátást is meg kell szervezni. Az étkeztetés és a helyszíni szolgáltatások a csapatok beosztásához, a munkaterületekhez és a helyi körülményekhez igazodnak. | Az étkeztetést és a napi ellátást a műszakbeosztáshoz, a munkaterületek elhelyezkedéséhez és a helyi körülményekhez igazítjuk. |
| items.catering.body | RU | Рабочая смена зависит и от того, как устроен повседневный быт. Организация питания и сервисов учитывает график команд, расположение рабочих зон и местные условия. | Питание и обслуживание на площадке зависят от графика смен, расположения рабочих зон и местных условий. |
| items.catering.scope | AR | تنظيم الوجبات ↵ خدمات الفرق ↵ دعم المناوبات | تقديم الوجبات ↵ الخدمات اليومية للعاملين ↵ خدمة العاملين بنظام المناوبات |
| items.catering.scope | EN | Catering operations ↵ Team services ↵ Shift support | Catering ↵ Day-to-day staff services ↵ Support for shift workers |
| items.catering.scope | ES | Servicios de alimentación ↵ Servicios para el personal ↵ Apoyo durante los turnos | Servicio de comidas ↵ Atención diaria al personal ↵ Servicios para el personal a turnos |
| items.catering.scope | HU | Étkeztetés biztosítása ↵ A munkatársak ellátása ↵ Műszakok támogatása | Étkeztetés ↵ A dolgozók napi ellátása ↵ A műszakban dolgozók kiszolgálása |
| items.catering.scope | RU | Организация питания ↵ Сервисы для команд ↵ Обеспечение рабочих смен | Организация питания ↵ Повседневное обслуживание персонала ↵ Обслуживание рабочих смен |
| items.catering.summary | AR | الوجبات والخدمات اليومية لفرق العمل. | نقدم الوجبات والخدمات اليومية للعاملين في موقع البناء. |
| items.catering.summary | EN | Catering and daily support for teams on site. | We provide meals and day-to-day support for site workers. |
| items.catering.summary | ES | Alimentación y apoyo diario al personal de obra. | Organizamos las comidas y los servicios diarios para el personal de obra. |
| items.catering.summary | HU | Az építkezésen dolgozók étkeztetése és napi ellátása. | Gondoskodunk az építkezésen dolgozók étkezéséről és napi ellátásáról. |
| items.catering.summary | RU | Питание и повседневные сервисы для команд на объекте. | Организуем питание и повседневное обслуживание работников стройплощадки. |
| items.catering.title | ES | Alimentación y servicios de obra | Alimentación y servicios para el personal |
| items.catering.title | RU | Организация питания и сервисов | Питание и обслуживание персонала |
| items.engineering.approach | AR | يبدأ ترتيب الأعمال من المخططات. ويربط التحضير الهندسي بين مهام الفرق وجاهزية الموقع وترتيب عمليات البناء. | قبل تحديد جدول المرحلة التالية، يتحقق المهندسون من جاهزية مناطق العمل ويحددون المهام التي ينبغي إنجازها أولاً. |
| items.engineering.approach | EN | Work sequencing begins with the drawings. Engineering preparation connects crew assignments with site readiness and the order in which construction can proceed. | Before scheduling the next stage, engineers check which work areas are ready and which tasks need to happen first. |
| items.engineering.approach | ES | La secuencia de ejecución se define a partir de los planos. Durante la preparación técnica se asignan tareas a las cuadrillas según el estado de la obra y el orden en que pueden realizarse los trabajos. | Antes de programar la siguiente fase, los ingenieros comprueban qué zonas están listas y qué trabajos deben hacerse primero. |
| items.engineering.approach | HU | A munkafolyamatok sorrendjét a tervek alapján határozzuk meg. A műszaki előkészítés során a csapatok feladatait a terület készültségéhez és a kivitelezés lehetséges sorrendjéhez igazítjuk. | A következő szakasz ütemezésekor a mérnökök felmérik, mely munkaterületek állnak készen, és mely feladatokat kell először elvégezni. |
| items.engineering.approach | RU | Последовательность работ начинается с чертежей. Инженерная подготовка связывает задачи бригад с готовностью участка и очередностью строительных операций. | При планировании очередного этапа инженеры проверяют, какие участки готовы к работе и какие операции нужно выполнить в первую очередь. |
| items.engineering.body | AR | في المواقع الكبرى تتشارك فرق عديدة في تنفيذ التصاميم. ويربط المهندسون المخططات وتسلسل الأعمال بمهام فرق البناء. | يدرس المهندسون المخططات لتحديد تسلسل الأعمال وتنسيق مهام فرق البناء. |
| items.engineering.body | EN | On a large site, design decisions pass through many teams. Engineers connect drawings and work sequences with the tasks of construction crews. | Our engineers use the drawings to plan the sequence of work and coordinate the crews carrying it out. |
| items.engineering.body | ES | En una obra de gran escala, las decisiones de diseño pasan por varios equipos. Los ingenieros relacionan los planos y la secuencia de ejecución con las tareas de las cuadrillas de obra. | Los ingenieros estudian los planos para definir el orden de los trabajos y coordinar las tareas de las cuadrillas. |
| items.engineering.body | HU | Egy nagy építkezésen a tervezői döntések több csapat munkáját is érintik. A mérnökök a kiviteli terveket és a munkafolyamatok sorrendjét a kivitelezőcsapatok feladataival hangolják össze. | Mérnökeink a kiviteli tervek alapján határozzák meg a munkák sorrendjét és hangolják össze a kivitelezőcsapatok feladatait. |
| items.engineering.body | RU | На крупном объекте проектные решения проходят через десятки рабочих групп. Инженеры связывают чертежи, последовательность работ и задачи строительных бригад. | Инженеры изучают чертежи, определяют последовательность работ и согласуют задачи строительных бригад. |
| items.engineering.scope | AR | الإعداد الهندسي ↵ تنسيق الموقع ↵ أعمال البناء | الإعداد الهندسي ↵ تنسيق الأعمال في الموقع ↵ تنفيذ أعمال البناء |
| items.engineering.scope | EN | Engineering preparation ↵ Site coordination ↵ Construction work | Construction planning ↵ Site coordination ↵ Construction work |
| items.engineering.scope | ES | Preparación técnica ↵ Coordinación en obra ↵ Ejecución de obras | Preparación técnica ↵ Coordinación de los trabajos en obra ↵ Ejecución de obras |
| items.engineering.scope | HU | Műszaki előkészítés ↵ Helyszíni koordináció ↵ Kivitelezés | Műszaki előkészítés ↵ A helyszíni munkák összehangolása ↵ Kivitelezés |
| items.engineering.scope | RU | Инженерная подготовка ↵ Координация на площадке ↵ Строительные работы | Инженерная подготовка ↵ Координация работ на площадке ↵ Строительные работы |
| items.engineering.summary | AR | التحضير الهندسي وتنظيم أعمال البناء. | نخطط لأعمال البناء وننسق عمل الفرق في الموقع. |
| items.engineering.summary | EN | Engineering preparation and construction operations. | We plan construction work and coordinate crews on site. |
| items.engineering.summary | ES | Preparación técnica y ejecución de obras. | Planificamos la ejecución de la obra y coordinamos el trabajo de las cuadrillas. |
| items.engineering.summary | HU | Műszaki előkészítés és kivitelezés. | Megtervezzük a kivitelezés menetét, és összehangoljuk a helyszíni csapatok munkáját. |
| items.engineering.summary | RU | Инженерная подготовка и организация строительных работ. | Планируем строительные работы и координируем бригады на площадке. |
| items.logistics.approach | AR | ينطلق تخطيط النقل من موعد الحاجة إلى الشحنة في الموقع. وعلى أساسه يُحدَّد المسار وترتيب الشحنات ووقت الاستلام. | نبدأ بتحديد موعد الحاجة إلى الشحنة في الموقع، ثم نحسب مدة النقل ونتفق مع الموردين على ترتيب الإرسال. |
| items.logistics.approach | EN | Transport planning works back from the date a load is needed on site. That date shapes the route, dispatch sequence and delivery window. | We start with the date the site needs the load, then work back to allow for transit and agree the dispatch sequence with suppliers. |
| items.logistics.approach | ES | La planificación parte de la fecha en que la carga debe estar en obra. Esa fecha determina la ruta, el orden de las expediciones y el plazo de entrega. | Partimos de la fecha en que se necesita la carga en obra. Con ese plazo calculamos el tiempo de transporte y acordamos con los proveedores el orden de los envíos. |
| items.logistics.approach | HU | A szállítást attól az időponttól visszafelé tervezzük, amikor a rakománynak a helyszínre kell érnie. Ez alapján határozzuk meg az útvonalat, a fuvarok indítási sorrendjét és a szállítási időablakot. | A tervezés kiindulópontja az a nap, amikor a rakományra szükség lesz az építkezésen. Ebből számoljuk vissza a fuvaridőt, majd egyeztetjük a feladás sorrendjét a beszállítókkal. |
| items.logistics.approach | RU | Планирование ведётся от момента, когда груз понадобится на объекте. От этой даты зависят маршрут, очередность отгрузок и время приёмки на площадке. | Сначала определяем, когда груз понадобится на площадке. От этой даты отсчитываем время на перевозку и согласуем с поставщиками порядок отгрузки. |
| items.logistics.body | AR | تتبع عمليات التسليم برنامج البناء. ويتطلب الشحن والاستلام التنسيق بين الموردين والناقلين وفريق الموقع. | ينسق الموردون والناقلون وفريق الموقع مسارات الشحن ومواعيد الإرسال والاستلام وفقاً لجدول البناء. |
| items.logistics.body | EN | Deliveries follow the construction programme. Routes, dispatch and site reception depend on coordination between suppliers, carriers and the site team. | Suppliers, carriers and site teams coordinate routes, dispatch and unloading to fit the construction schedule. |
| items.logistics.body | ES | Las entregas siguen el programa de construcción. Para organizar rutas, expediciones y recepción en obra, los proveedores, los transportistas y el equipo de obra coordinan sus tareas. | Los proveedores, los transportistas y el personal de obra acuerdan las rutas, las fechas de expedición y la recepción de los materiales según el calendario de construcción. |
| items.logistics.body | HU | A szállítások a kivitelezés ütemtervéhez igazodnak. Az útvonalakról, az indításról és a helyszíni átvételről a beszállítók, a fuvarozók és a kivitelezőcsapat egyeztetnek. | A beszállítók, a fuvarozók és a helyszíni csapat a kivitelezés ütemtervéhez igazítja az útvonalat, a feladást és az áru átvételét. |
| items.logistics.body | RU | Доставка материалов связана с графиком строительства. Маршрут, порядок отгрузки и приёмка требуют согласования между поставщиками, перевозчиками и командой на объекте. | Поставщики, перевозчики и сотрудники площадки согласуют маршрут, время отгрузки и приёмку груза с учётом графика строительства. |
| items.logistics.scope | AR | تخطيط النقل ↵ التوصيل الدولي ↵ تنسيق الشحنات | تخطيط النقل ↵ الشحن الدولي ↵ تنسيق إرسال الشحنات |
| items.logistics.scope | EN | Transport planning ↵ International delivery ↵ Dispatch coordination | Transport planning ↵ International freight ↵ Dispatch coordination |
| items.logistics.scope | ES | Planificación del transporte ↵ Entregas internacionales ↵ Coordinación de expediciones | Planificación del transporte ↵ Transporte internacional de mercancías ↵ Coordinación de envíos |
| items.logistics.scope | HU | Szállítástervezés ↵ Nemzetközi szállítás ↵ A fuvarindítások összehangolása | Fuvartervezés ↵ Nemzetközi áruszállítás ↵ A szállítmányok indításának összehangolása |
| items.logistics.scope | RU | Планирование перевозок ↵ Международная доставка ↵ Координация отгрузок | Планирование перевозок ↵ Международные перевозки ↵ Координация отгрузок |
| items.logistics.summary | AR | نقل المعدات والمواد إلى الموقع. | ننظم نقل المعدات والمواد إلى مواقع البناء. |
| items.logistics.summary | EN | Moving equipment and materials to site. | We arrange delivery of equipment and materials to construction sites. |
| items.logistics.summary | ES | Transporte de equipos y materiales hasta la obra. | Organizamos el transporte de equipos y materiales hasta la obra. |
| items.logistics.summary | HU | Berendezések és anyagok helyszínre szállítása. | Megszervezzük a berendezések és az anyagok szállítását az építkezésre. |
| items.logistics.summary | RU | Доставка оборудования и материалов на площадку. | Организуем доставку оборудования и материалов на стройплощадку. |
| items.supply.approach | AR | تحدد احتياجات المواد محتوى كل توريد. وتُراجع بنود الشحنة وفق المواصفات قبل تجهيزها للتسليم إلى فريق البناء. | نراجع محتويات الشحنة وفق المواصفات قبل تسليم المواد إلى فريق البناء. |
| items.supply.approach | EN | Material requirements define each delivery. The procurement team checks the package against the specification and prepares it for handover to the construction team. | Before handing materials over to the construction crew, we check the delivery against the specification. |
| items.supply.approach | ES | Cada entrega responde a unas necesidades concretas de materiales. El equipo de aprovisionamiento comprueba que el suministro cumpla las especificaciones y prepara su entrega al equipo de construcción. | Antes de entregar los materiales a la cuadrilla, comprobamos que la remesa se ajuste a las especificaciones. |
| items.supply.approach | HU | Az egyes szállítmányok tartalmát az anyagigény határozza meg. A beszerzési csapat összeveti a szállítmányt a műszaki előírásokkal, majd előkészíti az átadást a kivitelezőknek. | Mielőtt átadjuk az anyagokat a kivitelezőknek, összevetjük a szállítmány tartalmát a műszaki előírásokkal. |
| items.supply.approach | RU | Потребность в материалах задаёт состав поставки. При комплектации важно сверить перечень позиций со спецификацией и подготовить их к передаче строительной команде. | Перед передачей материалов строительной бригаде сверяем состав поставки со спецификацией. |
| items.supply.body | AR | يبدأ التجهيز بحصر المواد اللازمة لكل مرحلة. وتحدد احتياجات الموقع مواعيد الشراء والتسليم لفرق التنفيذ. | يعتمد الفريق على قائمة المواد لكل مرحلة ليحدد ما يجب طلبه ومتى، ويرتب تسليم المواد إلى الموقع. |
| items.supply.body | EN | Procurement starts with material requirements for each stage. Site needs inform purchasing schedules, deliveries and handover to the teams doing the work. | The team uses the materials list for each stage to plan orders and schedule deliveries to the site. |
| items.supply.body | ES | El aprovisionamiento parte de los materiales necesarios en cada fase. Las necesidades de obra determinan el calendario de compras, las entregas y la puesta a disposición de los equipos que ejecutan los trabajos. | A partir de la lista de materiales de cada fase, el equipo decide qué pedir, cuándo hacerlo y en qué orden entregar los materiales en obra. |
| items.supply.body | HU | A beszerzés alapja az egyes munkaszakaszok anyagszükséglete. A beszerzési ütemtervet, a szállításokat és az anyagok átadását a kivitelezőcsapatok helyszíni igényeihez igazítjuk. | A csapat az egyes építési szakaszok anyagjegyzéke alapján ütemezi a megrendeléseket és a helyszíni átadást. |
| items.supply.body | RU | Комплектация начинается с перечня материалов для конкретного этапа. Потребности площадки определяют состав поставки, сроки закупки и порядок передачи материалов в работу. | По перечню материалов для каждого этапа команда определяет, что и когда заказать и в какой последовательности передать материалы на площадку. |
| items.supply.scope | AR | احتياجات المواد ↵ تنسيق الموردين ↵ تجهيز التوريدات | تحديد احتياجات المواد ↵ التنسيق مع الموردين ↵ تجهيز الشحنات |
| items.supply.scope | EN | Material requirements ↵ Supplier coordination ↵ Supply planning | Identifying material requirements ↵ Coordinating suppliers ↵ Preparing deliveries |
| items.supply.scope | ES | Necesidades de materiales ↵ Coordinación de proveedores ↵ Planificación del suministro | Determinación de las necesidades de materiales ↵ Coordinación con proveedores ↵ Preparación de los suministros |
| items.supply.scope | HU | Anyagszükséglet felmérése ↵ Beszállítók koordinálása ↵ Ellátástervezés | Az anyagszükséglet felmérése ↵ Egyeztetés a beszállítókkal ↵ A szállítmányok összeállítása |
| items.supply.scope | RU | Потребность в материалах ↵ Работа с поставщиками ↵ Комплектация поставок | Определение потребности в материалах ↵ Работа с поставщиками ↵ Комплектация поставок |
| items.supply.summary | AR | توفير المواد وفق احتياجات الموقع. | نوفر المواد اللازمة لكل مرحلة من مراحل البناء. |
| items.supply.summary | EN | Sourcing materials to meet site requirements. | We source materials for each stage of construction. |
| items.supply.summary | ES | Aprovisionamiento de materiales según las necesidades de la obra. | Gestionamos la compra de materiales para cada fase de la obra. |
| items.supply.summary | HU | Anyagbeszerzés az építkezés igényei szerint. | Gondoskodunk az egyes építési szakaszokhoz szükséges anyagok beszerzéséről. |
| items.supply.summary | RU | Материалы и комплектация под задачи объекта. | Организуем закупку материалов для каждого этапа строительства. |
| items.supply.title | ES | Suministro y aprovisionamiento | Compras y suministro de materiales |

</details>

<details>
<summary>Каталоги, кейсы и направления · 31 изменений</summary>

Файл содержимого <code>content/technical-ui.json</code>.

| Поле или запись | Язык | Было | Стало |
|---|---|---|---|
| cooperation | AR | تواصل بشأن التعاون | للتواصل بشأن مشروع |
| cooperation | EN | Discuss working together | Discuss a project |
| cooperation | ES | Hablemos de colaboración | Hablemos de su proyecto |
| cooperation | HU | Együttműködési lehetőségek | Kapcsolatfelvétel |
| cooperation | RU | Обсудить сотрудничество | Обсудить проект |
| countryProjects | AR | مشاريع هذا البلد | المشاريع في هذا البلد |
| countryProjects | HU | Projektek az országban | Projektek ebben az országban |
| countryProjects | RU | Проекты страны | Проекты в этой стране |
| exploreGeography | AR | استكشف مواقع المشاريع | عرض المشاريع على الخريطة |
| exploreGeography | EN | Explore project locations | View projects on the map |
| exploreGeography | ES | Ver dónde se ubican los proyectos | Ver los proyectos en el mapa |
| exploreGeography | HU | A projektek helyszínei | Projektek a térképen |
| exploreGeography | RU | География проектов | Показать проекты на карте |
| openImage | EN | Open photograph | Open photo |
| projectRecord | AR | عن الموقع | نبذة عن المشروع |
| projectRecord | EN | The site | Project overview |
| projectRecord | ES | El emplazamiento | Descripción del proyecto |
| projectRecord | HU | A létesítmény | A beruházásról |
| regionRegister | AR | البلدان والمواقع | المشاريع حسب البلد |
| regionRegister | EN | Countries and sites | Projects by country |
| regionRegister | ES | Países y emplazamientos | Proyectos por país |
| regionRegister | HU | Országok és helyszínek | Projektek országonként |
| serviceApproach | AR | نهج التنفيذ | كيف نعمل |
| serviceApproach | EN | Delivery approach | How we work |
| serviceApproach | HU | Így dolgozunk | Hogyan dolgozunk |
| serviceApproach | RU | Подход к работе | Как мы работаем |
| siteMedia | AR | من موقع العمل | الصور ومقاطع الفيديو |
| siteMedia | EN | From the site | Photos and videos |
| siteMedia | ES | Imágenes de la obra | Fotografías y vídeos |
| siteMedia | HU | Képek az építkezésről | Fényképek és videók |
| siteMedia | RU | Съёмка на площадке | Фотографии и видео |

</details>

<details>
<summary>Подписи к архивным и иллюстративным фотографиям · 80 изменений</summary>

Файл содержимого <code>content/captions.json</code>.

| Поле или запись | Язык | Было | Стало |
|---|---|---|---|
| /images/archive-briefing.webp | AR | اجتماع فريق العمل في الموقع | اجتماع الفريق في موقع البناء |
| /images/archive-briefing.webp | EN | A team briefing on site | Team briefing at the construction site |
| /images/archive-briefing.webp | ES | Reunión de trabajo en la obra | Reunión del equipo en la obra |
| /images/archive-briefing.webp | HU | Helyszíni munkaértekezlet | Munkamegbeszélés az építkezésen |
| /images/archive-briefing.webp | RU | Рабочая встреча на строительной площадке | Совещание на строительной площадке |
| /images/archive-field-team.webp | AR | فريق يصب الخرسانة على بلاطة مسلحة | فريق يصب الخرسانة لبلاطة مسلحة |
| /images/archive-field-team.webp | EN | Crew placing concrete on a reinforced slab | A crew pours concrete for a reinforced slab |
| /images/archive-field-team.webp | ES | Equipo de obra vertiendo hormigón en una losa armada | Una cuadrilla hormigona una losa armada |
| /images/archive-field-team.webp | HU | Egy vasalt lemez betonozása | A kivitelezők egy vasalt lemezt betonoznak |
| /images/archive-field-team.webp | RU | Бригада укладывает бетон на армированную плиту | Бригада бетонирует армированную плиту |
| /images/archive-roof.webp | AR | ألواح السقف فوق هيكل فولاذي واسع البحور | ألواح سقف على هيكل فولاذي واسع البحور |
| /images/archive-roof.webp | EN | Roof panels over a wide-span steel frame | Roof panels on a wide-span steel frame |
| /images/archive-roof.webp | RU | Монтаж кровли над пролётами стального каркаса | Кровельные панели на стальном каркасе здания |
| /images/archive-rooppur-workshop.webp | AR | ورشة التجميع المسبق في الموقع 4.1 بمحطة روبور، 2019 | ورشة التجميع المسبق في الموقع 4.1 بمحطة روبور النووية، ٢٠١٩ |
| /images/archive-rooppur-workshop.webp | EN | Pre-assembly workshop at Rooppur NPP site 4.1, 2019 | Pre-assembly workshop at site 4.1 of Rooppur nuclear power plant, 2019 |
| /images/archive-rooppur-workshop.webp | ES | Taller de premontaje en la zona 4.1 de las obras de la central de Rooppur, 2019 | Taller de premontaje en la zona 4.1 de la central nuclear de Rooppur, 2019 |
| /images/archive-rooppur-workshop.webp | HU | Előszerelő műhely a Ruppuri Atomerőmű 4.1-es építési területén, 2019 | Előszerelő csarnok a Ruppuri Atomerőmű 4.1-es építési területén, 2019 |
| /images/archive-rooppur-workshop.webp | RU | Цех предварительной сборки на площадке 4.1 АЭС «Руппур», 2019 | Цех предварительной сборки на участке 4.1 АЭС «Руппур», 2019 год |
| /images/catering.webp | AR | إعداد الطعام في مطبخ مهني. صورة توضيحية | إعداد الطعام في مطبخ مهني (صورة توضيحية) |
| /images/catering.webp | EN | Food preparation in a professional kitchen. Illustrative photograph | Food preparation in a professional kitchen (illustrative photo) |
| /images/catering.webp | ES | Preparación de alimentos en una cocina profesional. Fotografía ilustrativa | Preparación de alimentos en una cocina profesional (fotografía ilustrativa) |
| /images/catering.webp | HU | Ételkészítés üzemi konyhában. Illusztráció | Ételkészítés üzemi konyhában (illusztráció) |
| /images/catering.webp | RU | Приготовление пищи на профессиональной кухне. Иллюстративное фото | Приготовление блюд на профессиональной кухне (иллюстративное фото) |
| /images/crew-reinforcement.webp | AR | فريق يتعامل مع حديد التسليح في موقع البناء | عمّال يحملون قضبان التسليح في موقع البناء |
| /images/crew-reinforcement.webp | EN | Crew handling reinforcement at the construction site | Workers handling reinforcing steel on site |
| /images/crew-reinforcement.webp | ES | Equipo trabajando con armaduras en la obra | Trabajadores manipulando barras de armadura en la obra |
| /images/crew-reinforcement.webp | HU | Munkacsapat betonacéllal dolgozik az építési területen | A munkások betonacéllal dolgoznak az építkezésen |
| /images/crew-reinforcement.webp | RU | Бригада работает с арматурой на строительной площадке | Рабочие с арматурой на строительной площадке |
| /images/film-official-poster.webp | AR | الغلاف الرسمي للفيلم التعريفي لشركة ROIN WORLD | صورة غلاف الفيلم التعريفي لشركة ROIN WORLD |
| /images/film-official-poster.webp | EN | Official cover of the ROIN WORLD corporate film | Cover image for ROIN WORLD’s corporate film |
| /images/film-official-poster.webp | ES | Portada oficial de la película corporativa de ROIN WORLD | Imagen de portada del vídeo corporativo de ROIN WORLD |
| /images/film-official-poster.webp | HU | A ROIN WORLD vállalati filmjének hivatalos borítóképe | A ROIN WORLD vállalati filmjének borítóképe |
| /images/film-official-poster.webp | RU | Официальная обложка корпоративного фильма ROIN WORLD | Обложка корпоративного фильма ROIN WORLD |
| /images/hero-2.webp | EN | Industrial basins and infrastructure seen from the air | Aerial view of industrial basins and infrastructure |
| /images/hero-2.webp | ES | Vista aérea de balsas industriales e infraestructuras | Vista aérea de balsas e instalaciones industriales |
| /images/hero-2.webp | HU | Ipari medencék és infrastruktúra madártávlatból | Ipari medencék és műszaki létesítmények madártávlatból |
| /images/hero-2.webp | RU | Промышленные водоёмы и инженерные сооружения с высоты | Промышленные водоёмы и инженерные сооружения, вид с воздуха |
| /images/hero-3.webp | AR | رافعات برجية فوق موقع إنشاء صناعي في ضوء المساء | رافعات برجية في موقع بناء عند الغروب |
| /images/hero-3.webp | EN | Tower cranes over an industrial construction site in evening light | Tower cranes at a construction site at dusk |
| /images/hero-3.webp | ES | Grúas torre en una obra industrial al atardecer | Grúas torre en una obra al atardecer |
| /images/hero-3.webp | HU | Toronydaruk egy ipari építkezésen az alkonyi fényben | Toronydaruk az építkezésen alkonyatkor |
| /images/hero-3.webp | RU | Панорама стройплощадки с башенными кранами в вечернем свете | Башенные краны на стройплощадке в вечернем свете |
| /images/hero-dusk.webp | AR | أبراج تبريد محطة روبور بعد غروب الشمس | أبراج التبريد في محطة روبور النووية بعد غروب الشمس |
| /images/hero-dusk.webp | EN | Cooling towers at Rooppur NPP after sunset | Cooling towers at Rooppur nuclear power plant after sunset |
| /images/hero-dusk.webp | ES | Torres de refrigeración de la central de Rooppur después del atardecer | Torres de refrigeración de la central nuclear de Rooppur tras la puesta de sol |
| /images/hero.webp | AR | موقع محطة روبور في بنغلاديش. أرشيف الوكالة الدولية للطاقة الذرية، ٢٠٢٣ | موقع محطة روبور النووية في بنغلاديش. أرشيف الوكالة الدولية للطاقة الذرية، ٢٠٢٣ |
| /images/hero.webp | EN | Rooppur NPP site, Bangladesh. IAEA archive, 2023 | Rooppur nuclear power plant site in Bangladesh. IAEA archive, 2023 |
| /images/hero.webp | ES | Obras de la central nuclear de Rooppur, Bangladés. Archivo del OIEA, 2023 | Obras de la central nuclear de Rooppur en Bangladés. Archivo del OIEA, 2023 |
| /images/hero.webp | HU | A Ruppuri Atomerőmű építkezése Bangladesben. A NAÜ archívuma, 2023 | A Ruppuri Atomerőmű építési területe Bangladesben. A NAÜ archívuma, 2023 |
| /images/hero.webp | RU | Площадка АЭС «Руппур», Бангладеш. Архив МАГАТЭ, 2023 | Площадка АЭС «Руппур» в Бангладеш. Архив МАГАТЭ, 2023 год |
| /images/project-bd.webp | AR | أبراج التبريد في محطة روبور | أبراج التبريد في محطة روبور النووية |
| /images/project-bd.webp | EN | Rooppur cooling towers | Cooling towers at Rooppur nuclear power plant |
| /images/project-bd.webp | ES | Torres de refrigeración de Rooppur | Torres de refrigeración de la central nuclear de Rooppur |
| /images/project-eg.webp | EN | El Dabaa nuclear construction site | Construction site at El Dabaa nuclear power plant |
| /images/project-eg.webp | RU | Площадка АЭС «Эль-Дабаа» | Строительная площадка АЭС «Эль-Дабаа» |
| /images/project-hu.webp | AR | محطة باكس العاملة. أرشيف الوكالة الدولية للطاقة الذرية، ٢٠١٢ | محطة باكس النووية القائمة في المجر. صورة من أرشيف الوكالة الدولية للطاقة الذرية، ٢٠١٢ |
| /images/project-hu.webp | EN | Operating Paks NPP. IAEA archive, 2012 | The existing Paks nuclear power plant in Hungary. IAEA archive, 2012 |
| /images/project-hu.webp | ES | Central nuclear de Paks en funcionamiento. Archivo del OIEA, 2012 | La central nuclear de Paks en servicio, Hungría. Archivo del OIEA, 2012 |
| /images/project-hu.webp | HU | A működő Paksi Atomerőmű. A NAÜ archívuma, 2012 | A már működő Paksi Atomerőmű a NAÜ 2012-es archív felvételén |
| /images/project-hu.webp | RU | Действующая АЭС «Пакш». Архив МАГАТЭ, 2012 | Действующая АЭС «Пакш», Венгрия. Фото МАГАТЭ, 2012 год |
| /images/rooppur-towers-panorama.webp | AR | موقع البناء وأبراج التبريد في محطة روبور النووية، بنغلاديش | موقع البناء وأبراج التبريد في محطة روبور النووية في بنغلاديش |
| /images/rooppur-towers-panorama.webp | EN | Construction site and cooling towers at Rooppur nuclear power plant, Bangladesh | Construction site and cooling towers at Rooppur nuclear power plant in Bangladesh |
| /images/rooppur-towers-panorama.webp | ES | Obras y torres de refrigeración de la central nuclear de Rooppur, Bangladés | Obras y torres de refrigeración de la central nuclear de Rooppur en Bangladés |
| /images/rooppur-towers-panorama.webp | HU | A ruppuri atomerőmű építési területe és hűtőtornyai, Banglades | A Ruppuri Atomerőmű építési területe és hűtőtornyai Bangladesben |
| /images/rooppur-towers-panorama.webp | RU | Строительная площадка и градирни АЭС „Руппур“, Бангладеш | Строительная площадка и градирни АЭС «Руппур» в Бангладеш |
| /images/rooppur-towers-portrait.webp | AR | موقع البناء وأبراج التبريد في محطة روبور النووية، بنغلاديش | موقع البناء وأبراج التبريد في محطة روبور النووية في بنغلاديش |
| /images/rooppur-towers-portrait.webp | EN | Construction site and cooling towers at Rooppur nuclear power plant, Bangladesh | Construction site and cooling towers at Rooppur nuclear power plant in Bangladesh |
| /images/rooppur-towers-portrait.webp | ES | Obras y torres de refrigeración de la central nuclear de Rooppur, Bangladés | Obras y torres de refrigeración de la central nuclear de Rooppur en Bangladés |
| /images/rooppur-towers-portrait.webp | HU | A ruppuri atomerőmű építési területe és hűtőtornyai, Banglades | A Ruppuri Atomerőmű építési területe és hűtőtornyai Bangladesben |
| /images/rooppur-towers-portrait.webp | RU | Строительная площадка и градирни АЭС „Руппур“, Бангладеш | Строительная площадка и градирни АЭС «Руппур» в Бангладеш |
| /images/supply.webp | AR | بضائع على رفوف مستودع. صورة توضيحية | مواد على رفوف مستودع (صورة توضيحية) |
| /images/supply.webp | EN | Goods on warehouse racks. Illustrative photograph | Materials on warehouse shelves (illustrative photo) |
| /images/supply.webp | ES | Mercancía en estanterías de almacén. Fotografía ilustrativa | Materiales en las estanterías de un almacén (fotografía ilustrativa) |
| /images/supply.webp | HU | Áru a raktári polcokon. Illusztráció | Anyagok a raktári polcokon (illusztráció) |
| /images/supply.webp | RU | Хранение материалов на складских стеллажах. Иллюстративное фото | Материалы на складских стеллажах (иллюстративное фото) |
| /images/team.webp | AR | متخصصون يعملون معاً في الموقع | أفراد الفريق في موقع البناء |
| /images/team.webp | EN | Site personnel working together | Team members at the construction site |
| /images/team.webp | ES | Personal de obra trabajando en equipo | Personal en la obra |
| /images/team.webp | HU | Közös munka az építési területen | Munkatársak az építkezésen |
| /images/team.webp | RU | Специалисты за совместной работой на площадке | Сотрудники на строительной площадке |

</details>

<details>
<summary>История, люди, партнёры и представительства · 37 изменений</summary>

Файл содержимого <code>content/company.json</code>.

| Поле или запись | Язык | Было | Стало |
|---|---|---|---|
| history.1.body | AR | أسّس روين باراتاشفيلي شركة ROIN WORLD وجمع فيها متخصصين في إنشاء المحطات النووية والعقارات والخدمات اللوجستية وتوريد المواد والمعدات. | أسّس روين باراتاشفيلي شركة ROIN WORLD وجمع فيها متخصصين في بناء المحطات النووية والعقارات والخدمات اللوجستية وتوريد المواد والمعدات. |
| history.1.body | EN | Roin Baratashvili founded ROIN WORLD, bringing together specialists in nuclear construction, real estate, logistics, materials and equipment supply. | Roin Baratashvili founded ROIN WORLD, bringing together specialists in nuclear power plant construction, real estate, logistics and the supply of materials and equipment. |
| history.1.body | ES | Roin Baratashvili fundó ROIN WORLD y reunió a especialistas en construcción nuclear, sector inmobiliario, logística y suministro de materiales y equipos. | Roin Baratashvili fundó ROIN WORLD y reunió a especialistas en construcción de centrales nucleares, sector inmobiliario, logística y suministro de materiales y equipos. |
| history.1.body | HU | Roin Baratashvili alapította a ROIN WORLD vállalatot. Az atomenergetikai építés, az ingatlanpiac, a logisztika, valamint az anyag- és eszközellátás szakembereit hozta össze. | Roin Baratashvili megalapította a ROIN WORLD vállalatot, amely az atomerőmű-építés, az ingatlanszakma, a logisztika, valamint az anyag- és eszközellátás szakembereit fogta össze. |
| history.1.body | RU | Роин Бараташвили основал ROIN WORLD. Компания объединила специалистов по строительству АЭС, недвижимости, логистике и поставкам оборудования и материалов. | Роин Бараташвили основал компанию, которая объединила специалистов по строительству АЭС, недвижимости, логистике и поставкам материалов и оборудования. |
| history.1.title | AR | 2011 · تأسيس ROIN WORLD | ٢٠١١ · تأسيس ROIN WORLD |
| history.1.title | EN | 2011 · ROIN WORLD founded | 2011 · Founding of ROIN WORLD |
| history.2.body | AR | نظّم فريقا ROIN WORLD وأتوم ستروي إكسبورت تدريباً لمكافحة الحرائق في موقع روبور، شاركت فيه الشركة بمعداتها المتخصصة. | أجرت ROIN WORLD وأتوم ستروي إكسبورت تدريباً على مكافحة الحرائق في موقع بناء محطة روبور. واستخدم فريق ROIN WORLD معداته المتخصصة. |
| history.2.body | EN | ROIN WORLD and Atomstroyexport held a fire drill at the Rooppur site. ROIN WORLD brought its own specialist equipment to the exercise. | ROIN WORLD and Atomstroyexport held a fire drill at the Rooppur construction site. The ROIN WORLD crew used its own specialist equipment. |
| history.2.body | ES | ROIN WORLD y Atomstroyexport realizaron un simulacro de incendio en la obra de Rooppur. ROIN WORLD participó con equipos especializados propios. | ROIN WORLD y Atomstroyexport realizaron un simulacro de incendio en las obras de la central de Rooppur. El equipo de ROIN WORLD utilizó su propio material especializado. |
| history.2.body | HU | A ROIN WORLD és az Atomstroyexport közös tűzvédelmi gyakorlatot tartott a ruppuri építkezésen. A ROIN WORLD saját speciális felszerelést biztosított a gyakorlathoz. | A ROIN WORLD és az Atomstroyexport közös tűzvédelmi gyakorlatot tartott a ruppuri építkezésen. A ROIN WORLD csapata a saját felszerelését használta. |
| history.2.body | RU | На площадке АЭС «Руппур» сотрудники ROIN WORLD и «Атомстройэкспорта» провели противопожарные учения. Команда ROIN WORLD задействовала собственную спецтехнику. | ROIN WORLD и «Атомстройэкспорт» провели противопожарные учения на стройплощадке АЭС «Руппур». Бригада ROIN WORLD использовала собственную спецтехнику. |
| history.3.body | AR | أنجز فريق البناء بلاطة من الخرسانة المسلحة وأساسات لأجهزة المحاكاة في مبنى التدريب في روبور. | في مبنى التدريب بمحطة روبور، صبّ فريق البناء بلاطة من الخرسانة المسلّحة وأساسات لأجهزة المحاكاة. |
| history.3.body | EN | The construction crew completed a reinforced concrete slab and foundations for simulators in the training building at Rooppur. | At Rooppur’s training building, the crew cast a reinforced concrete slab and foundations for simulators. |
| history.3.body | ES | El equipo de obra terminó la losa de hormigón armado y las cimentaciones de los simuladores del edificio de formación de Rooppur. | En el edificio de formación de Rooppur, el equipo de obra ejecutó una losa de hormigón armado y las cimentaciones para los simuladores. |
| history.3.body | HU | Az építőcsapat elkészítette a vasbeton lemezt és a szimulátorok alapjait a ruppuri oktatóépületben. | A ruppuri oktatóépületben a kivitelezők elkészítették a vasbeton lemezt és a szimulátorok alapjait. |
| history.3.body | RU | Строительная бригада подготовила железобетонную плиту и основания под тренажёры для учебно-производственного корпуса АЭС «Руппур». | Бригада отлила железобетонную плиту и основания для тренажёров в учебно-производственном корпусе АЭС «Руппур». |
| history.4.body | AR | في أكتوبر سُجّل نقل مقر الشركة المسجّل من فينيسترات في إسبانيا إلى المنطقة الحرة بجبل علي في دبي. | في أكتوبر، قيّد سجل دبي انتقال المقرّ القانوني للشركة من فينيسترات في إسبانيا إلى المنطقة الحرة في جبل علي. |
| history.4.body | EN | In October the Dubai register recorded the transfer of the company’s registered office from Finestrat, Spain, to the Jebel Ali Free Zone. | In October, Dubai’s register recorded the move of the company’s registered office from Finestrat in Spain to the Jebel Ali Free Zone. |
| history.4.body | ES | En octubre, el registro de Dubái inscribió el traslado de la sede social desde Finestrat, España, a la zona franca de Jebel Ali. | En octubre, el registro de Dubái inscribió el traslado del domicilio social de ROIN WORLD desde Finestrat, en España, a la zona franca de Jebel Ali. |
| history.4.body | HU | A dubaji nyilvántartásba októberben jegyezték be a vállalat székhelyének áthelyezését a spanyolországi Finestratból a Jebel Ali szabadkereskedelmi övezetbe. | Októberben a dubaji nyilvántartásba bejegyezték, hogy a vállalat a spanyolországi Finestratból a Jebel Ali szabadkereskedelmi övezetbe helyezte át a székhelyét. |
| history.4.body | RU | В октябре в реестре Дубая зарегистрирован перенос юридического адреса компании из испанского Финестрата в свободную экономическую зону Джебель-Али. | В октябре реестр Дубая зафиксировал смену юридического адреса ROIN WORLD. Компания перенесла его из Финестрата в Испании в свободную экономическую зону Джебель-Али. |
| history.4.title | AR | ٢٠٢٣ · التسجيل في دبي | ٢٠٢٣ · نقل المقرّ المسجّل إلى دبي |
| history.4.title | EN | 2023 · Registration in Dubai | 2023 · Registered office moves to Dubai |
| history.4.title | ES | 2023 · Inscripción en Dubái | 2023 · Traslado del domicilio social a Dubái |
| history.4.title | HU | 2023 · Bejegyzés Dubajban | 2023 · A székhely áthelyezése Dubajba |
| history.4.title | RU | 2023 · Регистрация в Дубае | 2023 · Перенос юридического адреса в Дубай |
| offices.3.address | HU | 7030 Paks, Ipari Park 4710/60., Magyarország. Leveleiket kérjük e-mailben küldjék. | Magyarország, 7030 Paks, Ipari Park 4710/60. Kérjük, leveleit e-mailben küldje. |
| partners.2.detail | AR | تدرج ROIN WORLD شركة دوسان إنربيليتي ضمن شركائها في إنشاء مرافق جزيرة التوربينات بالضبعة. | تذكر ROIN WORLD دوسان إنربيليتي ضمن شركائها في أعمال جزيرة التوربينات بمحطة الضبعة النووية. |
| partners.2.detail | EN | ROIN WORLD lists Doosan Enerbility among its partners for the turbine island facilities at El Dabaa. | ROIN WORLD names Doosan Enerbility as a partner on the turbine island at the El Dabaa nuclear power plant. |
| partners.2.detail | ES | ROIN WORLD incluye a Doosan Enerbility entre sus colaboradores en las instalaciones de la isla de turbinas de El Dabaa. | ROIN WORLD señala a Doosan Enerbility como uno de sus colaboradores en la isla de turbinas de la central nuclear de El Dabaa. |
| partners.2.detail | HU | A ROIN WORLD a Doosan Enerbilityt az el-dabaai turbinasziget létesítményein dolgozó partnerei között tartja számon. | A ROIN WORLD a Doosan Enerbilityt az El-Dabaa atomerőmű turbinaszigetén végzett munkákban részt vevő partnerei között említi. |
| partners.2.detail | RU | Doosan Enerbility — одна из компаний, с которыми ROIN WORLD сотрудничает по объектам турбинного острова АЭС «Эль-Дабаа». | ROIN WORLD указывает Doosan Enerbility в числе партнёров по работам на турбинном острове АЭС «Эль-Дабаа». |
| people.roin-baratashvili.bio | AR | أسّس روين باراتاشفيلي شركة ROIN WORLD التي جمعت متخصصين في إنشاء منشآت الطاقة والخدمات اللوجستية وتوريد المعدات. | أسّس روين باراتاشفيلي شركة ROIN WORLD، التي تجمع خبرات في بناء منشآت الطاقة والخدمات اللوجستية وتوريد المعدات. |
| people.roin-baratashvili.bio | EN | Roin Baratashvili founded ROIN WORLD, bringing together specialists in energy construction, logistics and equipment supply. | Roin Baratashvili founded ROIN WORLD. Its team brings together specialists in energy construction, logistics and equipment supply. |
| people.roin-baratashvili.bio | ES | Roin Baratashvili fundó ROIN WORLD y reunió a especialistas en construcción de instalaciones energéticas, logística y suministro de equipos. | Roin Baratashvili fundó ROIN WORLD, que reúne a especialistas en construcción de instalaciones energéticas, logística y suministro de equipos. |
| people.roin-baratashvili.bio | HU | Roin Baratashvili a ROIN WORLD alapításakor az energetikai létesítmények építése, a logisztika és a berendezésellátás szakembereit hozta össze. | Roin Baratashvili alapította a ROIN WORLD vállalatot, ahol energetikai létesítmények építésével, logisztikával és eszközellátással foglalkozó szakemberek dolgoznak együtt. |

</details>

<details>
<summary>Корпоративные страницы и их интерфейс · 117 изменений</summary>

Файл содержимого <code>content/company-ui.json</code>.

| Поле или запись | Язык | Было | Стало |
|---|---|---|---|
| application | AR | طريقة التقدم | كيفية التقدّم للوظيفة |
| application | ES | Cómo presentar tu candidatura | Cómo enviar tu candidatura |
| application | HU | Jelentkezés | Hogyan jelentkezhet? |
| application | RU | Порядок отклика | Как откликнуться |
| applicationText | AR | أرسل سيرتك الذاتية إلى ROIN WORLD بالبريد الإلكتروني مع ذكر اسم الوظيفة في عنوان الرسالة. يرجى التأكد من توافر الشاغر وشروط العمل لدى فريق التوظيف. | أرسل سيرتك الذاتية بالبريد الإلكتروني واكتب اسم الوظيفة في عنوان الرسالة. يمكنك سؤال فريق التوظيف عمّا إذا كانت الوظيفة ما زالت شاغرة وعن شروط العمل. |
| applicationText | EN | Email your CV to ROIN WORLD and include the role in the subject. Ask the recruitment team to confirm availability and employment terms. | Email your CV with the job title in the subject line. The recruitment team can confirm whether the position is still open and explain the terms of employment. |
| applicationText | ES | Envía tu currículum por correo electrónico a ROIN WORLD e indica el puesto en el asunto. Consulta al equipo de selección la disponibilidad y las condiciones de contratación. | Envía tu currículum por correo electrónico e indica el puesto en el asunto. El equipo de selección puede confirmarte si sigue vacante y explicarte las condiciones de contratación. |
| applicationText | HU | Önéletrajzát e-mailben küldje el a ROIN WORLD részére, a tárgymezőben jelölje meg a pozíciót. Az állás elérhetőségéről és a foglalkoztatás feltételeiről a toborzási csapat ad tájékoztatást. | Küldje el önéletrajzát e-mailben, és a tárgyban adja meg a munkakör nevét. A toborzási csapattól megtudhatja, hogy lehet-e még jelentkezni, és milyen feltételekkel jár az állás. |
| applicationText | RU | Направьте резюме в ROIN WORLD по электронной почте. Укажите название позиции в теме письма и уточните у команды подбора актуальность вакансии и условия работы. | Отправьте резюме по электронной почте и укажите вакансию в теме письма. У отдела подбора можно уточнить, открыт ли набор и каковы условия работы. |
| archiveMore | AR | المزيد من الأرشيف | مواد أخرى من الأرشيف |
| archiveMore | ES | Más del archivo | Otras publicaciones |
| archiveMore | HU | További archív anyagok | További írások |
| archiveMore | RU | Ещё из архива | Другие публикации |
| companyProfileText | AR | في روبور ببنغلاديش، نفّذ فريق البناء الأساسات الخرسانية المسلحة لأجهزة المحاكاة في مبنى التدريب. وفي الضبعة بمصر، تتعاون ROIN WORLD مع شركتي KHNP ودوسان إنربيليتي في منشآت جزيرة التوربينات. | في محطة روبور النووية في بنغلاديش، أنشأ فريق ROIN WORLD أساسات خرسانية مسلّحة لأجهزة المحاكاة في مبنى التدريب. وفي مصر تعمل الشركة مع KHNP ودوسان إنربيليتي على منشآت جزيرة التوربينات بمحطة الضبعة. |
| companyProfileText | EN | At Rooppur in Bangladesh, the construction crew built reinforced concrete foundations for simulators in the training building. At El Dabaa in Egypt, ROIN WORLD works with KHNP and Doosan Enerbility on the turbine island facilities. | At the Rooppur nuclear power plant in Bangladesh, a ROIN WORLD crew built reinforced concrete foundations for simulators in the training building. In Egypt, the company works with KHNP and Doosan Enerbility on the turbine island at El Dabaa. |
| companyProfileText | ES | En Rooppur, Bangladés, el equipo de construcción ejecutó las cimentaciones de hormigón armado de los simuladores del edificio de formación. En El Dabaa, Egipto, ROIN WORLD trabaja con KHNP y Doosan Enerbility en las instalaciones de la isla de turbinas. | En la central nuclear de Rooppur, en Bangladés, un equipo de ROIN WORLD construyó las cimentaciones de hormigón armado para los simuladores del edificio de formación. En Egipto, la empresa trabaja con KHNP y Doosan Enerbility en la isla de turbinas de la central de El Dabaa. |
| companyProfileText | HU | A bangladesi Ruppurban az építőcsapat elkészítette az oktatóépület szimulátorainak vasbeton alapjait. Az egyiptomi El-Dabaában a ROIN WORLD a KHNP-vel és a Doosan Enerbilityvel együtt dolgozik a turbinasziget létesítményein. | A bangladesi ruppuri atomerőműben a ROIN WORLD csapata készítette el az oktatóépület szimulátorainak vasbeton alapjait. Egyiptomban a vállalat a KHNP-vel és a Doosan Enerbilityvel dolgozik együtt az El-Dabaa atomerőmű turbinaszigetén. |
| companyProfileText | RU | На «Руппуре» в Бангладеш бригада выполнила железобетонные основания под тренажёры учебного корпуса. В египетском Эль-Дабаа ROIN WORLD сотрудничает с KHNP и Doosan Enerbility на объектах турбинного острова. | На АЭС «Руппур» в Бангладеш бригада ROIN WORLD построила железобетонные основания под тренажёры учебного корпуса. В Египте компания работает с KHNP и Doosan Enerbility на объектах турбинного острова АЭС «Эль-Дабаа». |
| culture | AR | ثقافة العمل | الفرق في مواقع العمل |
| culture | EN | Working culture | Teams on site |
| culture | ES | Cultura de trabajo | Los equipos en la obra |
| culture | HU | Munkakultúránk | Csapataink az építkezésen |
| culture | RU | Профессиональная культура | Работа бригад на площадке |
| cultureText | AR | في روبور عملت فرق بناء محلية بإشراف مراقبي الموقع. ويوثّق أرشيف الشركة أعمال الأساسات وتدريباً مشتركاً على مكافحة الحرائق. | في موقع محطة روبور، صبّ العمال المحليون بإشراف مراقبي البناء أساسات أجهزة المحاكاة. وتعرض التقارير المصورة من الموقع هذه الأعمال وتدريباً مشتركاً على مكافحة الحرائق. |
| cultureText | EN | At Rooppur, local construction crews worked under site foremen. The company archive documents foundation works and a joint fire drill. | At Rooppur, local workers and their foremen cast the foundations for training simulators. Reports from the site show this work and a joint fire drill. |
| cultureText | ES | En Rooppur, los equipos de construcción locales trabajaron bajo la dirección de los encargados de obra. El archivo de la empresa recoge los trabajos de cimentación y un simulacro de incendio conjunto. | En Rooppur, un equipo local construyó los cimientos de los simuladores bajo la dirección de los encargados de obra. Los reportajes muestran esos trabajos y un simulacro de incendio conjunto en la misma obra. |
| cultureText | HU | Ruppurban helyi építőcsapatok dolgoztak az építésvezetők irányításával. A vállalati archívum az alapozási munkákat és egy közös tűzvédelmi gyakorlatot is dokumentál. | A ruppuri építkezésen a helyi munkások művezetők irányításával betonozták a szimulátorok alapjait. A helyszíni beszámolók az alapozást és egy közös tűzvédelmi gyakorlatot mutatnak be. |
| cultureText | RU | На «Руппуре» местные строительные бригады работали под руководством мастеров участка. В архиве компании — репортажи об устройстве оснований и совместных учениях по пожарной безопасности. | На стройке АЭС «Руппур» местная бригада под руководством прорабов бетонировала основания для тренажёров. В репортажах с площадки можно увидеть эти работы и совместные противопожарные учения. |
| directoryOfPartners | AR | الجهات والأعمال المشتركة | العمل مع الشركاء في المواقع |
| directoryOfPartners | EN | Organisations and shared work | Working with partners on site |
| directoryOfPartners | ES | Organizaciones y trabajos conjuntos | Colaboración en las obras |
| directoryOfPartners | HU | Szervezetek és közös munkák | Közös munka a helyszínen |
| directoryOfPartners | RU | Организации и совместные работы | Совместная работа на объектах |
| documentsEmpty | AR | تواصل مع أحد المكاتب لطلب الوثائق الحالية الخاصة بالمشتريات أو المشروع. | يمكن طلب الوثائق السارية اللازمة للمشتريات أو للمشروع من أحد مكاتب ROIN WORLD. |
| documentsEmpty | EN | Contact an office to request current documents for your procurement process or project. | Contact a ROIN WORLD office for the current documents you need for procurement or a project. |
| documentsEmpty | ES | Contacta con una oficina para solicitar los documentos vigentes que necesites para una compra o un proyecto. | Para solicitar la documentación vigente para una compra o un proyecto, contacta con una oficina de ROIN WORLD. |
| documentsEmpty | HU | Beszerzéshez vagy projekthez szükséges hatályos dokumentumokért forduljon valamelyik irodánkhoz. | Az adott beszerzéshez vagy projekthez szükséges érvényes dokumentumokat a ROIN WORLD irodáitól kérheti. |
| documentsEmpty | RU | Запросите у офиса актуальные документы для вашей закупки или проекта. | Обратитесь в офис ROIN WORLD за действующими документами для закупки или проекта. |
| expires | AR | تاريخ الانتهاء الوارد في الوثيقة | ساري المفعول حتى |
| expires | EN | Expiry stated on document | Valid until |
| expires | ES | Vencimiento indicado en el documento | Válido hasta |
| expires | HU | A dokumentumban megjelölt lejárat | Érvényesség vége |
| expires | RU | Срок действия по документу | Действителен до |
| generalMail | AR | البريد العام للمكتب | البريد الإلكتروني للمكتب |
| generalMail | EN | General office mailbox | Office email |
| generalMail | ES | Correo general de la oficina | Correo electrónico de la oficina |
| generalMail | HU | Az iroda központi e-mail-címe | Az iroda e-mail-címe |
| generalMail | RU | Общая почта офиса | Электронная почта офиса |
| historyLead | AR | من تاريخ الشركة | تاريخ الشركة |
| historyLead | EN | From the company’s history | Company history |
| historyLead | ES | De la historia de la empresa | Historia de la empresa |
| historyLead | HU | Vállalatunk történetéből | A vállalat története |
| historyLead | RU | Из истории компании | История компании |
| holder | RU | Организация | Держатель сертификата |
| imageCredit | AR | بيانات الصورة | مصادر الصور |
| imageCredit | EN | Photography credits | Photo credits |
| imageCredit | ES | Créditos fotográficos | Créditos de las fotografías |
| imageCredit | HU | Fotók forrásai | A fényképek forrásai |
| imageCredit | RU | Сведения о фотографии | Источники фотографий |
| internationalWork | AR | مواقع مشاريعنا | المواقع التي نعمل فيها |
| internationalWork | EN | Our project sites | Where we work |
| internationalWork | ES | Dónde se desarrollan nuestros proyectos | Dónde trabajamos |
| internationalWork | HU | Projektjeink helyszínei | Ahol dolgozunk |
| internationalWork | RU | Наши проектные площадки | Объекты, на которых мы работаем |
| issuer | AR | جهة الإصدار | الجهة المانحة |
| issuer | EN | Issuing body | Issued by |
| issuer | RU | Орган выдачи | Кем выдан |
| loadMap | AR | عرض خرائط Google | عرض خريطة Google |
| loadMap | EN | Show Google Maps | Show Google map |
| loadMap | ES | Mostrar Google Maps | Mostrar el mapa de Google |
| loadMap | HU | Google Térkép megjelenítése | Google-térkép megjelenítése |
| loadMap | RU | Показать Google Maps | Показать карту Google |
| mapPrivacy | AR | لا تُحمَّل الخريطة من خرائط Google في صفحة التواصل إلا عندما تختار عرضها. | تتصل صفحة التواصل بخدمة خرائط Google عندما تختار عرض الخريطة. |
| mapPrivacy | EN | The contact page loads a map from Google Maps when you choose to view it. | The contact page connects to Google Maps when you choose to show a map. |
| mapPrivacy | ES | La página de contacto carga el mapa de Google Maps cuando eliges mostrarlo. | La página de contacto se conecta a Google Maps cuando eliges mostrar un mapa. |
| mapPrivacy | HU | A kapcsolati oldal akkor tölti be a Google Térképet, amikor megnyitja a térképet. | A kapcsolati oldal akkor kapcsolódik a Google Térképhez, amikor Ön megnyit egy térképet. |
| mapPrivacy | RU | Карта в разделе контактов загружается с Google Maps после нажатия кнопки показа. | На странице контактов карта загружается с Google Maps, когда вы нажимаете «Показать карту Google». |
| missionText | AR | نربط بين تهيئة الموقع والبناء والتشغيل، وننظّم العمل وفق متطلبات المشروع للجودة والجدول الزمني والتكلفة. | تنسّق ROIN WORLD العمل من تهيئة الموقع مروراً بالبناء وحتى وضع المنشأة في الخدمة. وتراعي في التخطيط متطلبات الجودة والجدول الزمني وميزانية كل مشروع. |
| missionText | EN | Connect site preparation, construction and commissioning. ROIN WORLD organises its work around the project’s quality, schedule and cost requirements. | ROIN WORLD coordinates work from site preparation through construction to commissioning. It plans around each project’s quality requirements, schedule and budget. |
| missionText | ES | Coordinar la preparación de la obra, la construcción y la puesta en marcha. ROIN WORLD organiza su trabajo de acuerdo con los requisitos de calidad, plazo y coste de cada proyecto. | ROIN WORLD coordina las obras desde la preparación del terreno hasta la puesta en marcha de las instalaciones. Planifica cada proyecto en función de sus requisitos de calidad, plazos y presupuesto. |
| missionText | HU | Összehangoljuk a helyszín előkészítését, a kivitelezést és az üzembe helyezést. A ROIN WORLD a munkát a projekt minőségi, ütemezési és költségkövetelményeihez igazítja. | A ROIN WORLD a helyszín előkészítésétől az építésen át az üzembe helyezésig összehangolja a munkát. A tervezés során figyelembe veszi a minőségi követelményeket, a határidőket és a költségkeretet. |
| missionText | RU | Связать подготовку площадки, строительные работы и ввод объекта в эксплуатацию. ROIN WORLD выстраивает работу вокруг требований проекта к качеству, срокам и стоимости. | ROIN WORLD координирует работы от подготовки площадки до ввода объекта в эксплуатацию. При планировании компания учитывает требования к качеству, срокам и бюджету проекта. |
| noMatches | AR | لا توجد نتائج تطابق هذه الخيارات. | لا توجد نتائج مطابقة. جرّب تغيير خيارات البحث. |
| noMatches | EN | No matches for these filters. | No matches. Try a different filter. |
| noMatches | ES | No hay resultados para estos filtros. | No hay coincidencias. Prueba con otro filtro. |
| noMatches | HU | Nincs a szűrőknek megfelelő találat. | Nincs találat. Módosítsa a szűrőket. |
| noMatches | RU | По выбранным параметрам ничего не найдено. | Совпадений нет. Измените фильтры. |
| officialRecruitment | AR | صفحة التوظيف في ROIN WORLD | الوظائف على موقع ROIN WORLD |
| officialRecruitment | EN | ROIN WORLD recruitment page | Jobs on the ROIN WORLD website |
| officialRecruitment | ES | Página de empleo de ROIN WORLD | Ofertas de empleo en ROIN WORLD |
| officialRecruitment | HU | A ROIN WORLD karrieroldala | Állásajánlatok a ROIN WORLD honlapján |
| officialRecruitment | RU | Страница подбора ROIN WORLD | Вакансии на сайте ROIN WORLD |
| partnershipText | AR | تسترشد الشركة بالشفافية والنزاهة وتحمل المسؤولية في تعاملها مع عملائها. | تعتمد ROIN WORLD في تعاملها مع عملائها على الشفافية والنزاهة وتحمل المسؤولية. |
| partnershipText | EN | Transparency, integrity and responsibility guide how the company works with its clients. | ROIN WORLD values openness, integrity and accountability in its work with clients. |
| partnershipText | ES | La transparencia, la integridad y la responsabilidad guían la relación con nuestros clientes. | ROIN WORLD basa su relación con los clientes en la transparencia, la integridad y la responsabilidad. |
| partnershipText | HU | Az ügyfeleinkkel való együttműködés átláthatóságon, tisztességen és felelősségvállaláson alapul. | A ROIN WORLD számára a megrendelőkkel végzett közös munka alapja az átláthatóság, a tisztesség és a felelősségvállalás. |
| partnershipText | RU | В основе отношений с заказчиками компания называет прозрачность, добросовестность и ответственность. | В отношениях с заказчиками ROIN WORLD придерживается принципов открытости, добросовестности и ответственности. |
| policyStatus | AR | حالة السياسة | نشر سياسة الخصوصية |
| policyStatus | EN | Policy status | Publication of the privacy policy |
| policyStatus | ES | Estado de la política de privacidad | Publicación de la política de privacidad |
| policyStatus | HU | Az adatkezelési tájékoztató állapota | Az adatkezelési tájékoztató közzététele |
| policyStatus | RU | Статус политики | Публикация политики конфиденциальности |
| qualityText | AR | تعتبر الشركة جودة الأعمال والخدمات مسؤولية مشتركة بين جميع المشاركين في المشروع. | يتحمّل كل من يعمل في المشروع نصيبه من المسؤولية عن جودة الأعمال والخدمات. |
| qualityText | EN | The company describes the quality of its work and services as a responsibility shared by everyone on a project. | Everyone working on a project shares responsibility for the quality of the work and services delivered. |
| qualityText | ES | La empresa considera que todas las personas que participan en un proyecto comparten la responsabilidad por la calidad de los trabajos y servicios. | Todas las personas que participan en un proyecto comparten la responsabilidad por la calidad de las obras y los servicios. |
| qualityText | HU | A vállalat álláspontja szerint a munka és a szolgáltatások minőségéért a projekt minden résztvevője felel. | A munka és a szolgáltatások minőségéért a projekt minden résztvevője felel. |
| qualityText | RU | Компания относит качество работ и услуг к обязанностям каждого участника проекта. | За качество работ и услуг отвечает каждый участник проекта. |
| vacancySource | AR | الوظائف المنشورة من الشركة | وظائف ROIN WORLD |
| vacancySource | EN | Positions listed by the company | ROIN WORLD vacancies |
| vacancySource | ES | Puestos publicados por la empresa | Vacantes de ROIN WORLD |
| vacancySource | HU | A vállalat által meghirdetett állások | A ROIN WORLD állásajánlatai |
| vacancySource | RU | Позиции, опубликованные компанией | Вакансии ROIN WORLD |
| viewAll | AR | جميع المنشورات | جميع المواد المنشورة |
| viewAll | HU | Összes kiadvány | Összes közlemény |
| workInCompany | AR | العمل في موقع دولي | العمل في مشروع إنشاءات دولي |
| workInCompany | EN | Working on an international site | Working on an international construction site |
| workInCompany | RU | Работа на международной площадке | Работа на международной стройке |

</details>

<details>
<summary>Архив и страницы публикаций · 44 изменений</summary>

Файл содержимого <code>content/news.json</code>.

| Поле или запись | Язык | Было | Стало |
|---|---|---|---|
| items.corporate-film-2026.body | AR | يعرّف فيلم الشركة لعام ٢٠٢٦ بشركة ROIN WORLD. يمكن مشاهدة الفيلم كاملاً على يوتيوب. | يعرض الفيلم، الصادر عام ٢٠٢٦، أعمال ROIN WORLD. وتتوفر نسخته الكاملة على يوتيوب. |
| items.corporate-film-2026.body | EN | The 2026 corporate film introduces ROIN WORLD. Watch the full film on YouTube. | ROIN WORLD presents its work in this 2026 film. The full version is available on YouTube. |
| items.corporate-film-2026.body | ES | El vídeo corporativo de 2026 presenta ROIN WORLD. La versión completa está disponible en YouTube. | Este vídeo de 2026 presenta la actividad de ROIN WORLD. La versión completa está disponible en YouTube. |
| items.corporate-film-2026.body | HU | A 2026-os vállalati film bemutatja a ROIN WORLD tevékenységét. A teljes film a YouTube-on tekinthető meg. | A 2026-os film a ROIN WORLD munkáját mutatja be. A teljes változat a YouTube-on nézhető meg. |
| items.corporate-film-2026.body | RU | Корпоративный фильм ROIN WORLD 2026 года знакомит с компанией. Посмотреть фильм целиком можно на YouTube. | Фильм 2026 года знакомит с работой ROIN WORLD. Полная версия доступна на YouTube. |
| items.corporate-film-2026.summary | AR | 〈добавлено〉 | النسخة الكاملة متاحة على يوتيوب. |
| items.corporate-film-2026.summary | EN | 〈добавлено〉 | Watch the full film on YouTube. |
| items.corporate-film-2026.summary | ES | 〈добавлено〉 | La versión completa está disponible en YouTube. |
| items.corporate-film-2026.summary | HU | 〈добавлено〉 | A teljes film a YouTube-on nézhető meg. |
| items.corporate-film-2026.summary | RU | 〈добавлено〉 | Полная версия доступна на YouTube. |
| items.corporate-film-2026.title | AR | ROIN WORLD. فيلم الشركة | فيلم تعريفي بشركة ROIN WORLD |
| items.corporate-film-2026.title | EN | ROIN WORLD. The corporate film | The ROIN WORLD corporate film |
| items.corporate-film-2026.title | ES | ROIN WORLD. El vídeo corporativo | El vídeo corporativo de ROIN WORLD |
| items.corporate-film-2026.title | HU | ROIN WORLD. Vállalati film | A ROIN WORLD vállalati filmje |
| items.corporate-film-2026.title | RU | ROIN WORLD. Корпоративный фильм | Корпоративный фильм ROIN WORLD |
| items.rooppur-fire-drill.body | AR | أجرى فريقا ROIN WORLD وأتوم ستروي إكسبورت تدريباً مشتركاً على مكافحة الحرائق في موقع إنشاء محطة روبور في بنغلاديش. وشارك متخصصو ROIN WORLD بمعدات الشركة. ويوثّق تقرير مصور مجريات التدريب. | تدرّب فريقا ROIN WORLD وأتوم ستروي إكسبورت على الاستجابة للحريق في موقع بناء محطة روبور في بنغلاديش. واستخدم فريق ROIN WORLD معداته المتخصصة. |
| items.rooppur-fire-drill.body | EN | ROIN WORLD and Atomstroyexport teams held a joint fire drill at the Rooppur construction site in Bangladesh. ROIN WORLD specialists took part with the company’s own equipment. A video report documents the exercise. | ROIN WORLD and Atomstroyexport teams practised responding to a fire at the Rooppur construction site in Bangladesh. The ROIN WORLD crew used its own specialist equipment. |
| items.rooppur-fire-drill.body | ES | Los equipos de ROIN WORLD y Atomstroyexport realizaron un simulacro conjunto de incendio en las obras de Rooppur, en Bangladés. Los especialistas de ROIN WORLD utilizaron equipos propios de la empresa. El ejercicio quedó recogido en un reportaje en vídeo. | Los equipos de ROIN WORLD y Atomstroyexport ensayaron cómo actuar ante un incendio en las obras de la central de Rooppur, en Bangladés. El equipo de ROIN WORLD utilizó su propio material especializado. |
| items.rooppur-fire-drill.body | HU | A ROIN WORLD és az Atomstroyexport csapatai közös tűzvédelmi gyakorlatot tartottak a bangladesi Ruppur építkezésén. A ROIN WORLD szakemberei a vállalat saját felszerelésével vettek részt. A gyakorlatról videóbeszámoló készült. | A ROIN WORLD és az Atomstroyexport csapatai a tűz esetén szükséges teendőket gyakorolták a bangladesi ruppuri építkezésen. A ROIN WORLD szakemberei saját felszerelésüket használták. |
| items.rooppur-fire-drill.body | RU | Сотрудники ROIN WORLD и «Атомстройэкспорта» провели совместные противопожарные учения на площадке АЭС «Руппур» в Бангладеш. В тренировке участвовали специалисты ROIN WORLD со спецтехникой компании. Ход учений зафиксирован в видеорепортаже. | На стройплощадке АЭС «Руппур» в Бангладеш сотрудники ROIN WORLD и «Атомстройэкспорта» отработали действия при пожаре. Команда ROIN WORLD использовала собственную спецтехнику. |
| items.rooppur-fire-drill.summary | AR | 〈добавлено〉 | تدرّب فريقا ROIN WORLD وأتوم ستروي إكسبورت معاً في بنغلاديش. |
| items.rooppur-fire-drill.summary | EN | 〈добавлено〉 | Teams from ROIN WORLD and Atomstroyexport held a joint drill in Bangladesh. |
| items.rooppur-fire-drill.summary | ES | 〈добавлено〉 | Los equipos de ROIN WORLD y Atomstroyexport realizaron un ejercicio conjunto en Bangladés. |
| items.rooppur-fire-drill.summary | HU | 〈добавлено〉 | A ROIN WORLD és az Atomstroyexport csapatai közös gyakorlatot tartottak Bangladesben. |
| items.rooppur-fire-drill.summary | RU | 〈добавлено〉 | Команды ROIN WORLD и «Атомстройэкспорта» провели совместные учения в Бангладеш. |
| items.rooppur-fire-drill.title | AR | تدريب على مكافحة الحرائق في موقع روبور | تدريب على مكافحة الحرائق في موقع بناء محطة روبور |
| items.rooppur-fire-drill.title | EN | Fire drill at the Rooppur site | Fire drill at the Rooppur construction site |
| items.rooppur-fire-drill.title | ES | Simulacro de incendio en las obras de Rooppur | Simulacro de incendio en las obras de la central de Rooppur |
| items.rooppur-fire-drill.title | RU | Противопожарные учения на стройплощадке | Противопожарные учения на стройплощадке АЭС «Руппур» |
| items.rooppur-training-building.body | AR | في مبنى التدريب بمحطة روبور، صبّ فريق ROIN WORLD بلاطة خرسانية مسلّحة وأساسات لأجهزة المحاكاة. وتفيد الشركة بأن حجم خرسانة B25 المستخدمة تجاوز 400 متر مكعب، وأن نحو 40 عاملاً محلياً شاركوا في الأعمال تحت إشراف مراقبَي إنشاء. | صبّ فريق ROIN WORLD في مبنى التدريب بمحطة روبور بلاطة من الخرسانة المسلّحة وأساسات لأجهزة المحاكاة. ووفقاً للشركة، استخدم الفريق أكثر من ٤٠٠ متر مكعب من خرسانة فئة B25. وشارك في الأعمال نحو ٤٠ عاملاً محلياً بإشراف مراقبَين. |
| items.rooppur-training-building.body | EN | At Rooppur’s training building, a ROIN WORLD crew cast a reinforced concrete slab and foundations for the simulators. The company reports using more than 400 m³ of B25 concrete. Around 40 local workers carried out the work under two foremen. | A ROIN WORLD crew cast a reinforced concrete slab and foundations for simulators in the Rooppur training building. The company reports that the work took more than 400 m³ of B25 concrete. Two foremen supervised a crew of around 40 local workers. |
| items.rooppur-training-building.body | ES | En el edificio de formación de la central de Rooppur, un equipo de ROIN WORLD ejecutó una losa de hormigón armado y las cimentaciones para los simuladores. Según la empresa, se vertieron más de 400 m³ de hormigón de clase B25. Participaron unos 40 trabajadores locales dirigidos por dos encargados de obra. | En el edificio de formación de la central de Rooppur, el equipo de ROIN WORLD construyó una losa de hormigón armado y las cimentaciones de los simuladores. Según la empresa, se vertieron más de 400 m³ de hormigón de clase B25. Participaron unos 40 trabajadores locales bajo la dirección de dos encargados de obra. |
| items.rooppur-training-building.body | HU | A ruppuri atomerőmű oktatóépületében a ROIN WORLD csapata elkészítette a vasbeton lemezt és a szimulátorok alapjait. A vállalat beszámolója szerint több mint 400 m³ B25-ös betont használtak fel. A munkát mintegy 40 helyi munkás végezte két művezető irányításával. | A ROIN WORLD csapata a ruppuri atomerőmű oktatóépületében elkészítette a vasbeton lemezt és a szimulátorok alapjait. A vállalat beszámolója szerint több mint 400 m³ B25-ös betont használtak fel. A munkát mintegy 40 helyi munkás végezte két művezető irányításával. |
| items.rooppur-training-building.body | RU | В учебно-производственном корпусе АЭС «Руппур» бригада ROIN WORLD построила железобетонную плиту и основания под тренажёры. Для этих работ использовали бетон класса B25. По данным компании, объём бетонирования превысил 400 м³; на площадке работали около 40 местных рабочих под руководством двух прорабов. | В учебно-производственном корпусе АЭС «Руппур» бригада ROIN WORLD отлила железобетонную плиту и основания для тренажёров. По данным компании, для работ потребовалось более 400 м³ бетона класса B25. На площадке работали около 40 местных рабочих под руководством двух прорабов. |
| items.rooppur-training-building.summary | AR | 〈добавлено〉 | صبّ فريق البناء بلاطة وأساسات لأجهزة المحاكاة في مبنى التدريب. |
| items.rooppur-training-building.summary | EN | 〈добавлено〉 | The crew cast a slab and foundations for simulators in the training building. |
| items.rooppur-training-building.summary | ES | 〈добавлено〉 | El equipo de obra construyó la losa y las cimentaciones de los simuladores del edificio de formación. |
| items.rooppur-training-building.summary | HU | 〈добавлено〉 | A csapat az oktatóépületben kialakította a vasbeton lemezt és a szimulátorok alapjait. |
| items.rooppur-training-building.summary | RU | 〈добавлено〉 | В учебном корпусе бригада отлила плиту и основания под тренажёры. |
| items.rooppur-training-building.title | AR | أساسات أجهزة المحاكاة في روبور | أساسات لأجهزة المحاكاة في محطة روبور |
| items.rooppur-training-building.title | EN | Foundations for the Rooppur simulators | Foundations for training simulators at Rooppur |
| items.rooppur-training-building.title | ES | Cimentaciones para los simuladores de Rooppur | Cimentaciones para los simuladores de la central de Rooppur |
| items.rooppur-training-building.title | HU | A ruppuri szimulátorok alapozása | A szimulátorok alapozása a ruppuri atomerőműben |
| items.rooppur-training-building.title | RU | Основания для тренажёров на «Руппуре» | Фундаменты для тренажёров на АЭС «Руппур» |

</details>

<details>
<summary>Вакансии и реестр документов · 47 изменений</summary>

Файл содержимого <code>content/records.json</code>.

| Поле или запись | Язык | Было | Стало |
|---|---|---|---|
| vacancies.building-foreman.body | AR | أدرجت ROIN WORLD وظيفة «مراقب أعمال البناء» لفرعها في بنغلاديش. | تتضمن إعلانات التوظيف في فرع ROIN WORLD ببنغلاديش وظيفة مراقب لأعمال البناء. |
| vacancies.building-foreman.body | EN | ROIN WORLD lists the role of Building Foreman for its Bangladesh branch. | The company lists a building foreman position at its Bangladesh branch. |
| vacancies.building-foreman.body | ES | ROIN WORLD incluye el puesto de encargado de obra entre las vacantes de su delegación de Bangladés. | La delegación de ROIN WORLD en Bangladés ha publicado una oferta para el puesto de encargado de obra. |
| vacancies.building-foreman.body | HU | A ROIN WORLD bangladesi kirendeltsége építésvezetői állást hirdet. | A ROIN WORLD a bangladesi kirendeltségére építésvezetői állást hirdetett. |
| vacancies.building-foreman.body | RU | Позиция «Производитель строительных работ» опубликована ROIN WORLD для филиала в Бангладеш. | В перечне вакансий ROIN WORLD для Бангладеш есть должность производителя строительных работ. |
| vacancies.building-foreman.title | RU | Производитель строительных работ | Прораб |
| vacancies.cleaning-services-manager.body | AR | أدرجت ROIN WORLD وظيفة «مدير خدمات النظافة» لفرعها في بنغلاديش. | أعلنت ROIN WORLD عن وظيفة لإدارة خدمات النظافة في فرعها ببنغلاديش. |
| vacancies.cleaning-services-manager.body | EN | ROIN WORLD lists the role of Cleaning Services Manager for its Bangladesh branch. | ROIN WORLD has advertised a cleaning services management role at its Bangladesh branch. |
| vacancies.cleaning-services-manager.body | ES | ROIN WORLD incluye el puesto de responsable de servicios de limpieza entre las vacantes de su delegación de Bangladés. | ROIN WORLD ha publicado una vacante para dirigir los servicios de limpieza en su delegación de Bangladés. |
| vacancies.cleaning-services-manager.body | HU | A ROIN WORLD bangladesi kirendeltsége takarítási szolgáltatásvezetői állást hirdet. | A ROIN WORLD takarítási szolgálatvezetői állást hirdetett a bangladesi kirendeltségén. |
| vacancies.cleaning-services-manager.body | RU | Позиция «Руководитель клининговой службы» опубликована ROIN WORLD для филиала в Бангладеш. | ROIN WORLD опубликовала вакансию руководителя службы уборки в Бангладеш. |
| vacancies.cleaning-services-manager.title | HU | Takarítási szolgáltatásvezető | A takarítási szolgálat vezetője |
| vacancies.cleaning-services-manager.title | RU | Руководитель клининговой службы | Руководитель службы уборки |
| vacancies.head-engineer-ptd.body | AR | أدرجت ROIN WORLD وظيفة «كبير مهندسي قسم الإنتاج والشؤون الفنية» لفرعها في بنغلاديش. | الوظيفة في قسم الإنتاج والشؤون الفنية بفرع ROIN WORLD في بنغلاديش. |
| vacancies.head-engineer-ptd.body | EN | ROIN WORLD lists the role of Head Engineer, Production and Technical Department for its Bangladesh branch. | This role is in the production and technical department at ROIN WORLD’s Bangladesh branch. |
| vacancies.head-engineer-ptd.body | ES | ROIN WORLD incluye el puesto de ingeniero jefe del departamento técnico y de producción entre las vacantes de su delegación de Bangladés. | El puesto pertenece al departamento técnico y de producción de la delegación de ROIN WORLD en Bangladés. |
| vacancies.head-engineer-ptd.body | HU | A ROIN WORLD bangladesi kirendeltsége vezető mérnököt keres a termelési és műszaki osztályra. | A munkakör a ROIN WORLD bangladesi kirendeltségének termelési és műszaki osztályához tartozik. |
| vacancies.head-engineer-ptd.body | RU | Позиция «Главный инженер производственно-технического отдела» опубликована ROIN WORLD для филиала в Бангладеш. | Место работы — производственно-технический отдел филиала ROIN WORLD в Бангладеш. |
| vacancies.head-engineer-ptd.title | EN | Head Engineer, Production and Technical Department | Head Engineer in the Production and Technical Department |
| vacancies.head-of-section.body | AR | أدرجت ROIN WORLD وظيفة «رئيس قسم» لفرعها في بنغلاديش. | أعلنت ROIN WORLD عن وظيفة رئيس قسم للإنشاءات في فرعها ببنغلاديش. |
| vacancies.head-of-section.body | EN | ROIN WORLD lists the role of Head of Section for its Bangladesh branch. | ROIN WORLD advertised this construction section head role for its Bangladesh branch. |
| vacancies.head-of-section.body | ES | ROIN WORLD incluye el puesto de jefe de sección de obra entre las vacantes de su delegación de Bangladés. | ROIN WORLD ha publicado una vacante de jefe de sección de obra en su delegación de Bangladés. |
| vacancies.head-of-section.body | HU | A ROIN WORLD bangladesi kirendeltsége építési részlegvezetői állást hirdet. | A ROIN WORLD építési részlegvezetői állást hirdetett a bangladesi kirendeltségén. |
| vacancies.head-of-section.body | RU | Позиция «Начальник участка» опубликована ROIN WORLD для филиала в Бангладеш. | ROIN WORLD опубликовала вакансию начальника строительного участка в филиале в Бангладеш. |
| vacancies.instrumentation-engineer.body | AR | أدرجت ROIN WORLD وظيفة «مهندس كهرباء لأجهزة القياس والتحكم والاختبار» لفرعها في بنغلاديش. | أعلنت ROIN WORLD عن وظيفة في الهندسة الكهربائية بفرعها في بنغلاديش، في مجال أجهزة القياس والتحكم والاختبار. |
| vacancies.instrumentation-engineer.body | EN | ROIN WORLD lists the role of Electrical Engineer, Control and Testing Instrumentation for its Bangladesh branch. | ROIN WORLD advertised this electrical engineering role for work with control and test instruments at its Bangladesh branch. |
| vacancies.instrumentation-engineer.body | ES | ROIN WORLD incluye el puesto de ingeniero eléctrico de instrumentación de control y ensayo entre las vacantes de su delegación de Bangladés. | ROIN WORLD ha publicado un puesto de ingeniería eléctrica especializado en instrumentos de control y ensayo en su delegación de Bangladés. |
| vacancies.instrumentation-engineer.body | HU | A ROIN WORLD bangladesi kirendeltsége ellenőrző- és vizsgálóműszerekkel foglalkozó villamosmérnöki állást hirdet. | A vállalat bangladesi kirendeltségére ellenőrző- és vizsgálóműszerekkel foglalkozó villamosmérnöki állást hirdetett. |
| vacancies.instrumentation-engineer.body | RU | Позиция «Инженер-электрик по контрольно-измерительным приборам» опубликована ROIN WORLD для филиала в Бангладеш. | ROIN WORLD опубликовала эту инженерную вакансию для филиала в Бангладеш. Работа связана с контрольно-измерительными приборами. |
| vacancies.instrumentation-engineer.title | EN | Electrical Engineer, Control and Testing Instrumentation | Electrical Engineer for Control and Test Instruments |
| vacancies.instrumentation-engineer.title | HU | Ellenőrző- és vizsgálóműszerekkel foglalkozó villamosmérnök | Villamosmérnök ellenőrző- és vizsgálóműszerek területére |
| vacancies.interpreter-assistant.body | AR | أدرجت ROIN WORLD وظيفة «مساعد مترجم للروسية والإنجليزية» لفرعها في بنغلاديش. | نشرت ROIN WORLD إعلاناً لوظيفة مساعد مترجم في فرعها ببنغلاديش. لغتا العمل هما الروسية والإنجليزية. |
| vacancies.interpreter-assistant.body | EN | ROIN WORLD lists the role of Interpreter Assistant, Russian–English for its Bangladesh branch. | ROIN WORLD has advertised an interpreter’s assistant role at its Bangladesh branch. The working languages are Russian and English. |
| vacancies.interpreter-assistant.body | ES | ROIN WORLD incluye el puesto de asistente de interpretación de ruso e inglés entre las vacantes de su delegación de Bangladés. | ROIN WORLD ha publicado una vacante de asistente de interpretación en su delegación de Bangladés. Los idiomas de trabajo son el ruso y el inglés. |
| vacancies.interpreter-assistant.body | HU | A ROIN WORLD bangladesi kirendeltsége orosz–angol tolmácsasszisztensi állást hirdet. | A ROIN WORLD tolmácsasszisztensi állást hirdetett bangladesi kirendeltségén. A munka nyelve az orosz és az angol. |
| vacancies.interpreter-assistant.body | RU | Позиция «Помощник переводчика RU–EN» опубликована ROIN WORLD для филиала в Бангладеш. | ROIN WORLD опубликовала вакансию для помощника переводчика в Бангладеш. Рабочие языки — русский и английский. |
| vacancies.interpreter-assistant.title | AR | مساعد مترجم للروسية والإنجليزية | مساعد مترجم للغتين الروسية والإنجليزية |
| vacancies.interpreter-assistant.title | EN | Interpreter Assistant, Russian–English | Interpreter’s Assistant (Russian and English) |
| vacancies.interpreter-assistant.title | RU | Помощник переводчика RU–EN | Помощник переводчика (русский и английский языки) |
| vacancies.primary-documentation-accountant.body | AR | أدرجت ROIN WORLD وظيفة «محاسب الوثائق الأولية» لفرعها في بنغلاديش. | أعلنت ROIN WORLD عن وظيفة محاسب للتعامل مع المستندات المحاسبية الأولية في فرعها ببنغلاديش. |
| vacancies.primary-documentation-accountant.body | EN | ROIN WORLD lists the role of Primary Documentation Accountant for its Bangladesh branch. | ROIN WORLD has advertised an accounting role at its Bangladesh branch for work with source documents. |
| vacancies.primary-documentation-accountant.body | ES | ROIN WORLD incluye el puesto de contable responsable de documentación primaria entre las vacantes de su delegación de Bangladés. | ROIN WORLD ha publicado una vacante de contabilidad para trabajar con documentos justificativos en su delegación de Bangladés. |
| vacancies.primary-documentation-accountant.body | HU | A ROIN WORLD bangladesi kirendeltsége számviteli bizonylatok feldolgozására könyvelői állást hirdet. | A ROIN WORLD a bangladesi kirendeltségére számviteli bizonylatokkal foglalkozó könyvelői állást hirdetett. |
| vacancies.primary-documentation-accountant.body | RU | Позиция «Бухгалтер по первичной документации» опубликована ROIN WORLD для филиала в Бангладеш. | ROIN WORLD опубликовала вакансию бухгалтера для работы с первичными документами в филиале в Бангладеш. |
| vacancies.primary-documentation-accountant.title | AR | محاسب الوثائق الأولية | محاسب للمستندات المحاسبية الأولية |
| vacancies.primary-documentation-accountant.title | EN | Primary Documentation Accountant | Accountant for Source Documents |
| vacancies.primary-documentation-accountant.title | ES | Contable de documentación primaria | Contable de documentación justificativa |

</details>

<details>
<summary>Форма, согласие и сообщения об ошибках · 74 изменений</summary>

Файл содержимого <code>content/contact-ui.json</code>.

| Поле или запись | Язык | Было | Стало |
|---|---|---|---|
| closed | AR | استقبال الاستفسارات عبر النموذج متوقف حاليًا. | لا يستقبل الموقع الرسائل حالياً. يمكنك مراسلة المكتب عبر البريد الإلكتروني. |
| closed | EN | The enquiry form is currently closed. | Online submissions are currently closed. You can email the office. |
| closed | ES | El formulario de consultas está cerrado por el momento. | El envío desde el sitio está desactivado temporalmente. Puedes escribir a la oficina. |
| closed | HU | Az űrlap jelenleg nem fogad üzeneteket. | Az űrlap jelenleg nem fogad üzenetet. E-mailben elérheti az irodát. |
| closed | RU | Приём обращений через форму пока закрыт. | Приём обращений через сайт временно закрыт. Вы можете написать в офис. |
| consent | AR | أوافق على معالجة بياناتي وفقًا لما ورد في | أوافق على معالجة بياناتي على النحو الوارد في |
| consent | EN | I agree to the processing of my data in accordance with the | I agree to the use of my personal data as described in the |
| consent | ES | Acepto el tratamiento de mis datos de acuerdo con la | Acepto que mis datos se traten de acuerdo con la |
| consent | HU | Hozzájárulok adataim kezeléséhez, és elfogadom az | Hozzájárulok az adatkezeléshez, és elolvastam az |
| invalid | AR | راجع البيانات وأكّد موافقتك على معالجتها. | تحقّق من الاسم والبريد الإلكتروني ونص الرسالة وخانة الموافقة. |
| invalid | EN | Check your details and confirm your consent. | Check your name, email address, message and consent. |
| invalid | ES | Revisa los datos y confirma que aceptas su tratamiento. | Revisa tu nombre, tu correo electrónico, el mensaje y la casilla de consentimiento. |
| invalid | HU | Ellenőrizze az adatokat, és erősítse meg hozzájárulását az adatkezeléshez. | Ellenőrizze a nevet, az e-mail-címet, az üzenetet és a hozzájárulásra vonatkozó jelölést. |
| invalid | RU | Проверьте заполнение полей и согласие на обработку данных. | Проверьте имя, адрес почты, текст сообщения и отметку о согласии. |
| invalidEmail | AR | أدخل عنوان بريد إلكتروني كاملًا. | أدخل عنوان بريد إلكتروني كاملاً، مثل name@example.com. |
| invalidEmail | EN | Enter a complete email address. | Enter a complete email address, such as name@example.com. |
| invalidEmail | ES | Introduce una dirección de correo electrónico completa. | Introduce una dirección de correo completa, por ejemplo name@example.com. |
| invalidEmail | HU | Adjon meg egy teljes e-mail-címet. | Adjon meg egy teljes e-mail-címet, például name@example.com. |
| invalidEmail | RU | Укажите полный адрес электронной почты. | Укажите полный адрес электронной почты, например name@example.com. |
| invalidMessage | AR | أدخل رسالة يتراوح طولها بين 10 و4000 حرف. | اكتب رسالة يتراوح طولها بين ١٠ و٤٠٠٠ حرف. |
| invalidMessage | EN | Enter a message between 10 and 4,000 characters. | Write a message of 10 to 4,000 characters. |
| invalidMessage | HU | Az üzenet hossza 10 és 4000 karakter között legyen. | Az üzenet 10–4000 karakter hosszú lehet. |
| invalidMessage | RU | Введите сообщение длиной от 10 до 4000 символов. | Сообщение должно содержать от 10 до 4 000 символов. |
| invalidName | AR | أدخل اسمًا يتراوح طوله بين حرفين و100 حرف. | أدخل اسماً يتراوح طوله بين حرفين و١٠٠ حرف. |
| invalidName | EN | Enter a name between 2 and 100 characters. | Enter a name of 2 to 100 characters. |
| invalidName | ES | Introduce un nombre de entre 2 y 100 caracteres. | Escribe un nombre de entre 2 y 100 caracteres. |
| invalidName | HU | A név hossza 2 és 100 karakter között legyen. | Adjon meg egy 2–100 karakter hosszú nevet. |
| invalidName | RU | Введите имя длиной от 2 до 100 символов. | Укажите имя длиной от 2 до 100 символов. |
| js | AR | فعّل JavaScript للتحقق من النموذج أو تواصل مع أحد مكاتبنا. | فعّل JavaScript لاستخدام النموذج، أو راسل المكتب مباشرة. |
| js | EN | Enable JavaScript to check this form, or contact an office directly. | Enable JavaScript to use this form, or email the office directly. |
| js | ES | Activa JavaScript para comprobar el formulario o ponte en contacto con una de nuestras oficinas. | Activa JavaScript para utilizar el formulario o escribe directamente a la oficina. |
| js | HU | Az űrlap ellenőrzéséhez engedélyezze a JavaScriptet, vagy forduljon közvetlenül valamelyik irodánkhoz. | Az űrlap használatához engedélyezze a JavaScriptet, vagy írjon közvetlenül az irodának. |
| js | RU | Для проверки формы включите JavaScript. Вы также можете связаться с офисом. | Чтобы воспользоваться формой, включите JavaScript. Вы также можете написать нам напрямую. |
| large | AR | الرسالة طويلة جدًا. اختصر النص وحاول مجددًا. | رسالتك أطول من الحد المسموح. اختصرها ثم حاول مرة أخرى. |
| large | EN | The message is too long. Shorten it and try again. | Your enquiry is too long. Shorten it and try again. |
| large | ES | El mensaje es demasiado largo. Acórtalo y vuelve a intentarlo. | La consulta es demasiado larga. Acórtala y vuelve a intentarlo. |
| large | RU | Сообщение слишком длинное. Сократите текст и попробуйте ещё раз. | Текст обращения слишком длинный. Сократите его и попробуйте снова. |
| limit | AR | تم بلوغ الحد المسموح للاستفسارات. حاول لاحقًا أو راسلنا عبر البريد الإلكتروني. | وصلتنا عدة رسائل خلال فترة قصيرة. حاول لاحقاً أو راسل المكتب بالبريد الإلكتروني. |
| limit | EN | The enquiry limit has been reached. Try again later or contact us by email. | Several enquiries have already been submitted. Try again later or email the office. |
| limit | ES | Se ha alcanzado el límite de consultas. Inténtalo más tarde o escríbenos por correo electrónico. | Ya se han enviado varias consultas en poco tiempo. Inténtalo más tarde o escribe a la oficina por correo electrónico. |
| limit | HU | Elérte a küldési korlátot. Próbálja újra később, vagy írjon nekünk e-mailt. | Rövid időn belül több üzenet érkezett. Próbálja újra később, vagy írjon e-mailt az irodának. |
| limit | RU | Достигнут лимит обращений. Попробуйте позже или напишите нам по почте. | За короткое время поступило несколько обращений. Попробуйте позже или напишите нам по почте. |
| mailMode | AR | يمكنك إعداد رسالة للمكتب هنا ثم إرسالها من تطبيق البريد الإلكتروني. | استخدم النموذج لإعداد مسودة ثم أرسلها من تطبيق البريد، أو راسل المكتب مباشرة. |
| mailMode | EN | Prepare an enquiry for our office here, then send it using your email app. | Use this form to prepare a draft. Send it from your email app, or email the office directly. |
| mailMode | ES | Prepara tu consulta para la oficina y envíala desde tu aplicación de correo. | Prepara un borrador con el formulario y envíalo desde tu aplicación de correo. También puedes escribir directamente a la oficina. |
| mailMode | HU | Készítse el üzenetét az irodának, majd küldje el a levelezőprogramjából. | Az űrlappal levéltervezetet készíthet, amelyet a levelezőprogramjából küldhet el. Közvetlenül is írhat az irodának. |
| mailMode | RU | Здесь можно подготовить письмо для офиса. Его отправка выполняется в вашей почтовой программе. | Здесь можно подготовить письмо для офиса. Отправьте его из своей почтовой программы или напишите нам напрямую. |
| openDraft | AR | فتح الرسالة في تطبيق البريد | فتح المسودة في تطبيق البريد |
| openDraft | EN | Open the email in your mail app | Open draft in email app |
| openDraft | ES | Abrir el mensaje en el correo | Abrir borrador en la aplicación de correo |
| openDraft | HU | Levél megnyitása a levelezőprogramban | Piszkozat megnyitása a levelezőprogramban |
| placeholder | AR | كيف يمكننا مساعدتك؟ | ما الموضوع الذي تودّ الاستفسار عنه؟ |
| placeholder | EN | How can we help? | What would you like to discuss? |
| placeholder | ES | ¿En qué podemos ayudarte? | ¿Sobre qué tema quieres consultarnos? |
| placeholder | HU | Miben segíthetünk? | Milyen ügyben keres minket? |
| placeholder | RU | Чем мы можем помочь? | Расскажите, по какому вопросу вы обращаетесь. |
| received | AR | تلقّينا استفسارك. شكرًا لتواصلك معنا. | تلقّينا رسالتك. |
| received | EN | We have received your enquiry. Thank you for getting in touch. | We have received your enquiry. |
| received | ES | Hemos recibido tu consulta. Gracias por ponerte en contacto con nosotros. | Hemos recibido tu consulta. |
| received | HU | Megkaptuk az üzenetét. Köszönjük, hogy kapcsolatba lépett velünk. | Megkaptuk az üzenetét. |
| received | RU | Обращение принято. Спасибо за сообщение. | Мы получили ваше обращение. |
| title | AR | راسل ROIN WORLD | مراسلة ROIN WORLD |
| title | EN | Write to ROIN WORLD | Contact ROIN WORLD |
| title | HU | Írjon a ROIN WORLD csapatának | Írjon a ROIN WORLD munkatársainak |
| unavailable | AR | تعذّر تأكيد استلام استفسارك. حاول مجددًا أو تواصل مع أحد مكاتبنا. | تعذّر تأكيد استلام رسالتك. حاول مجدداً أو راسل المكتب بالبريد الإلكتروني. |
| unavailable | EN | We could not confirm receipt of your enquiry. Try again or contact an office. | We couldn’t confirm receipt of your enquiry. Try again or email the office. |
| unavailable | ES | No hemos podido confirmar la recepción de tu consulta. Inténtalo de nuevo o contacta con una de nuestras oficinas. | No hemos podido confirmar la recepción de tu consulta. Inténtalo de nuevo o escribe a la oficina. |
| unavailable | HU | Az üzenet beérkezését nem sikerült megerősíteni. Próbálja újra, vagy lépjen kapcsolatba valamelyik irodánkkal. | Az üzenet beérkezését nem sikerült megerősíteni. Próbálja újra, vagy írjon az irodának. |
| unavailable | RU | Сейчас не удалось подтвердить приём обращения. Попробуйте ещё раз или свяжитесь с офисом. | Не удалось подтвердить, что обращение получено. Повторите попытку или напишите в офис. |
| verified | AR | مسودة رسالتك جاهزة. افتحها في تطبيق البريد الإلكتروني لإرسال استفسارك. | مسودتك جاهزة. افتحها في تطبيق البريد لإرسالها. |
| verified | EN | Your details are complete. Open the prepared email and send it from your mail app. | Your draft is ready. Open it in your email app to send it. |
| verified | ES | El borrador está listo. Ábrelo en tu aplicación de correo para enviar la consulta. | El borrador está listo. Ábrelo en tu aplicación de correo para enviarlo. |
| verified | HU | A levéltervezet elkészült. Nyissa meg a levelezőprogramjában, és küldje el az üzenetet. | A piszkozat elkészült. Az elküldéshez nyissa meg a levelezőprogramjában. |
| verified | RU | Черновик готов. Откройте его в почтовой программе, чтобы отправить обращение. | Черновик готов. Чтобы отправить его, откройте письмо в почтовой программе. |

</details>

<details>
<summary>Фильм и элементы управления фотопоказом · 10 изменений</summary>

Файл содержимого <code>content/showcase-ui.json</code>.

| Поле или запись | Язык | Было | Стало |
|---|---|---|---|
| film | AR | شاهد فيلم الشركة | شاهد الفيلم التعريفي بالشركة |
| film | EN | Watch the corporate film | Watch the company film |
| film | HU | Vállalati film megtekintése | A vállalati film megtekintése |
| illustration | RU | Иллюстративное фото | Иллюстративная фотография |
| pause | AR | إيقاف العرض التلقائي مؤقتاً | إيقاف عرض الصور مؤقتاً |
| pause | HU | Diavetítés szüneteltetése | A diavetítés szüneteltetése |
| pause | RU | Приостановить автопоказ | Приостановить показ |
| resume | AR | استئناف العرض التلقائي | متابعة عرض الصور |
| resume | HU | Diavetítés folytatása | A diavetítés folytatása |
| resume | RU | Возобновить автопоказ | Продолжить показ |

</details>
