import { defineConfig } from '@adonisjs/inertia'
import '@adonisjs/inertia/types'
import WorkspaceDto from '#dtos/workspace'
import { InferSharedProps } from '@adonisjs/inertia/types'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    user: async (ctx) => {
      if (!ctx?.auth?.user) {
        return null
      }
      return ctx.auth.user.toJSON()
    },
    errors: (ctx) => {
      const errors = ctx.session?.flashMessages.get('errors') ?? {}
      return Object.keys(errors).reduce(
        (obj, key) => ({
          ...obj,
          [key]: errors[key].join(', '),
        }),
        {}
      )
    },
    flash: (ctx) => ({
      success: ctx.session.flashMessages.get('success'),
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

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {
    workspaces: WorkspaceDto[]
    activeWorkspace: WorkspaceDto
  }
}
