import { collections } from './schema.mjs';

const status = document.getElementById('status');
const message = document.getElementById('message');
const local = ['localhost', '127.0.0.1'].includes(location.hostname);
const proxy = 'http://127.0.0.1:8081/api/v1';

async function openEditor() {
  const response = await fetch(new URL('./settings.json', import.meta.url), { cache: 'no-store' });
  if (!response.ok) throw new Error('Настройки редактора отсутствуют. Выполните node scripts/cms-config.mjs.');
  const settings = await response.json();
  if (local) {
    try {
      const available = await fetch(proxy, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'info', params: {} }), signal: AbortSignal.timeout(3500)
      });
      if (!available.ok) throw new Error();
    } catch {
      throw new Error('Запустите npm run cms в отдельном терминале из корня проекта, затем обновите страницу.');
    }
  } else if (!settings.backend) {
    throw new Error('Для этого сайта требуется подключить корпоративный GitHub и вход редакторов. Настройка описана в docs/cms.md проекта.');
  }

  window.CMS_MANUAL_INIT = true;
  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = new URL('./vendor/decap-3.18.0/decap-cms.js', import.meta.url).href;
    script.onload = resolve;
    script.onerror = () => reject(new Error('Не удалось загрузить редактор. Обновите страницу.'));
    document.head.append(script);
  });
  window.initCMS({ config: {
    load_config_file: false,
    backend: local ? { name: 'git-gateway' } : settings.backend,
    ...(local ? { local_backend: { url: proxy } } : { publish_mode: 'editorial_workflow' }),
    locale: 'ru',
    media_folder: 'public/images',
    public_folder: '/images',
    display_url: new URL('../', import.meta.url).href,
    show_preview_links: false,
    collections: collections(settings)
  } });
  status.remove();
}

openEditor().catch(error => { message.textContent = error.message; });
