import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const LogoutController = () => import('#controllers/auth/logout_controller')

const LandingController = () => import('#controllers/landing_controller')
const LoginController = () => import('#controllers/auth/login_controller')

router.get('/', [LandingController, 'render']).use(middleware.auth())

router.get('login', [LoginController, 'render'])
router.post('login', [LoginController, 'login'])

router.get('logout', [LogoutController, 'render'])
router.post('logout', [LogoutController, 'logout']).use(middleware.auth())
