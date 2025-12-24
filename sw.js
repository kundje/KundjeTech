​Persona: Atue como Desenvolvedor Full-Stack Sênior e Especialista em UX. Objetivo: Criar um PWA completo (HTML, CSS via Tailwind, JS) para o app "Kundje Tech".​Requisitos de Design:​Tema: Dark Mode profundo (Fundo #000000).​Destaque: Amarelo Neon (#CCFF00) para botões, ícones e bordas.​Layout: Estilo Dashboard mobile com menu de navegação fixo na parte inferior.​Idioma: Toda a interface deve ser em Português de Moçambique/Brasil.​Estrutura e Funcionalidades:​PWA: Gerar o código do manifest.json e do sw.js (Service Worker) para instalação e funcionamento offline.​Notificações: Incluir lógica para solicitar permissão de "Notificações Push" com um aviso elegante no topo.​Área de Apoio Flutuante: Criar dois botões circulares flutuantes (Lado direito):​Botão Verde (M-Pesa): Abre modal com o texto "Apoiar no M-pesa: 857452790".​Botão Azul (PayPal): Abre modal com o texto "Apoiar com PayPal: kundjetech@gmail.com".​Cofre Pro (Links): Organizar em categorias. Cada app deve ter um botão "VER". Ao clicar, expande para mostrar o botão de "Baixar Agora".​Links obrigatórios (Botão Baixar Direto):​Futebol da Hora: https://play.google.com/store/apps/details?id=com.vivofutmax.futboool​Cricfy: https://cricfy.net/android-6-apk-97/​Yacine TV: https://play.google.com/store/apps/details?id=com.yacinetv.marouaneai​INT VPN: https://play.google.com/store/apps/details?id=com.wyrhub.intvpn​Wyr Vpn Lite: https://play.google.com/store/apps/details?id=com.wyrhub.lite​Psiphon Pro: https://play.google.com/store/apps/details?id=com.psiphon3.subscription.​Ferramenta de Velocidade (Speedtest): Um módulo funcional com botão "Iniciar Teste". Deve medir o Ping em tempo real e a velocidade de Download (Mbps) usando uma requisição real de arquivo (ex: Cloudflare ou imagem pesada).​Navegação Inferior: Ícones para (Início, Ferramentas, Cofre Pro, Perfil).​Instrução Técnica: Forneça o código em um bloco único para facilitar a cópia, garantindo que o JavaScript controle a troca de abas e a lógica do velocímetro de forma fluída e sem erros.

right arrow
Buy Credits


User Avatar
Robot
Hey Suadique, Quick input needed :
Ask Question
Agent will continue working after your reply
Aqui estão os arquivos completos:

index.html
<!doctype html>
<html lang="pt-BR">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Kundje Tech - Seu portal de apps, VPNs e ferramentas de teste de internet" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <title>Kundje Tech</title>
    </head>
    <body>
        <noscript>Você precisa habilitar JavaScript para usar este app.</noscript>
        <div id="root"></div>
        <script>
            // Register Service Worker
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js')
                        .then(registration => {
                            console.log('SW registered:', registration);
                        })
                        .catch(error => {
                            console.log('SW registration failed:', error);
                        });
                });
            }
        </script>
    </body>
</html>
manifest.json
{
  "short_name": "Kundje Tech",
  "name": "Kundje Tech - Apps & Ferramentas",
  "description": "Seu portal de apps, VPNs e ferramentas de teste de internet",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192",
      "purpose": "any maskable"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512",
      "purpose": "any maskable"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#CCFF00",
  "background_color": "#000000",
  "orientation": "portrait",
  "scope": "/",
  "lang": "pt-BR",
  "categories": ["utilities", "productivity"]
}
sw.js (Service Worker)
const CACHE_NAME = 'kundje-tech-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.log('Cache error:', err);
      })
  );
  self.skipWaiting();
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Push notification event
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação do Kundje Tech!',
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Kundje Tech', options)
  );
});