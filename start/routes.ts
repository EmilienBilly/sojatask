import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const LoginController = () => import('#controllers/auth/login_controller')

router
  .on('/')
  .renderInertia('home', { version: 6 })
  .as('home')
  .use(
    middleware.auth({
      guards: ['web'],
    })
  )

router.get('login', [LoginController, 'render'])
router.post('login', [LoginController, 'login'])
