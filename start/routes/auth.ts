import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')

router.get('login', [LoginController, 'render'])
router.post('login', [LoginController, 'handle'])

router.get('logout', [LogoutController, 'render'])
router.post('logout', [LogoutController, 'handle']).use(middleware.auth())
