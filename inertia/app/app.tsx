/// <reference path="../../config/inertia.ts" />
/// <reference path="../../adonisrc.ts" />
import '../css/app.css'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import Layout from '~/pages/layout'
import { ReactNode } from 'react'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  async resolve(name) {
    const page: any = await resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    )

    page.default.layout = page.default.layout || ((p: ReactNode) => <Layout children={p} />)
    return page
  },

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
