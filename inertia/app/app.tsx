/// <reference path="../../config/inertia.ts" />
/// <reference path="../../adonisrc.ts" />
import '../css/app.css'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { ReactNode } from 'react'
import AppLayout from '../layouts/AppLayout'

const appName = import.meta.env.VITE_APP_NAME || 'SojaTask'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  async resolve(name) {
    const page: any = await resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    )

    page.default.layout = page.default.layout || ((p: ReactNode) => <AppLayout children={p} />)
    return page
  },

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
