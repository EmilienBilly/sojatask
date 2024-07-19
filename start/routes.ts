import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const LogoutController = () => import('#controllers/auth/logout_controller')

const DashboardController = () => import('#controllers/dashboard_controller')
const LoginController = () => import('#controllers/auth/login_controller')

router.get('/', [DashboardController, 'render']).use(middleware.auth()).as('dashboard.render')

router.get('login', [LoginController, 'render'])
router.post('login', [LoginController, 'login'])

router.get('logout', [LogoutController, 'render'])
router.post('logout', [LogoutController, 'logout']).use(middleware.auth())
