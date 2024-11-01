import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';


const manifestForPlugIn :any= {
  registerType:'prompt',
  workbox: {
    clientsClaim: true,
    skipWaiting: true
  },
  includeAssests:['favicon.ico', "apple-touc-icon.png", "masked-icon.svg",'icon.png'],
  manifest:{
    name:"The Freeboard App",
    short_name:"Freeboard",
    description:"The Freeboard App",
    icons:[{
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
    }
  ],
  theme_color:'#242424',
  background_color:'#242424',
  display:"standalone",
  scope:'/',
  start_url:"/",
  orientation:'portrait'
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),VitePWA(manifestForPlugIn)],
})
