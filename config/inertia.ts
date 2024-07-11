import { defineConfig } from '@adonisjs/inertia'

export default defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    user: (ctx) => ctx.auth?.user,
    flash: (ctx) => ({
      success: ctx.session.flashMessages.get('success'),
      error: ctx.session.flashMessages.get('error'),
      info: ctx.session.flashMessages.get('info'),
      warning: ctx.session.flashMessages.get('warning'),
      all: ctx.session.flashMessages.all(),
    }),
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: false,
    entrypoint: 'inertia/app/ssr.tsx',
  },
})
