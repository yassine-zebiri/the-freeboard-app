import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';


const manifestForPlugIn :any= {
  registerType:'prompt',
  workbox: {
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 30 }
        }
      }
    ]
  },
  includeAssests:['favicon.ico', "apple-touc-icon.png", "masked-icon.svg",'icon.png'],
  manifest:{
    name:"The Freeboard App",
    short_name:"Freeboard",
    description:"The Freeboard App",
    screenshots: [
      {
        src: "/assets/screenshots/1.png",
        sizes: "1080x1920",
        type: "image/png"
      },
      {
        src: "/assets/screenshots/2.png",
        sizes: "1080x1920",
        type: "image/png"
      }
    ],
    icons:[
      {
        src: '/android-chrome-192x192.png',
        sizes:'192x192',
        type:'image/png',
        purpose:'favicon'
      },
      {
        src:'/android-chrome-512x512.png',
        sizes:'512x512',
        type:'image/png',
        purpose:'favicon'
      },
      {
        src: '/apple-touch-icon.png',
        sizes:'180x180',
        type:'image/png',
        purpose:'apple touch icon',
      },
      {
        src: '/maskable_icon.png',
        sizes:'512x512',
        type:'image/png',
        purpose:'any maskable',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
  ],
  id:'/',
  theme_color:'#242424',
  background_color:'#242424',
  display:"standalone",
  scope:'/',
  start_url:"/",
  orientation:'portrait',
  launch_handler: {
    route_to: 'existing-client-instance'
  },
  devOptions: {
    enabled: true
  },
  categories: [
    "productivity",
    "tools",
    "PWA",
    "web-app"
  ],
  dir: "rtl",
  iarc_rating_id: "01cf9477-0248-4fb3-b4ec-da48a4b393d4",
  prefer_related_applications: false,
  gcm_sender_id: "",
  scope_extensions: [
    {
        origin: "https://the-freeboard-app.vercel.app"
    }
  ],
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),VitePWA(manifestForPlugIn)],
})
