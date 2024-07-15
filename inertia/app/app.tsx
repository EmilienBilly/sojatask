/// <reference path="../../config/inertia.ts" />
/// <reference path="../../adonisrc.ts" />
import '../css/app.css'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import Layout from '~/pages/layout'
import { ComponentType } from 'react'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

interface PageModule {
  default: ComponentType<any>
}

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: async (name) => {
    const page = (await resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    )) as PageModule

    return (props: any) => (
      <Layout>
        <page.default {...props} />
      </Layout>
    )
  },

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
