import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const LogoutController = () => import('#controllers/auth/logout_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const ProjectsController = () => import('#controllers/projects/projects_controller')

router.get('/', [DashboardController, 'view']).use(middleware.auth())

router.get('login', [LoginController, 'view'])
router.post('login', [LoginController, 'login'])

router.get('logout', [LogoutController, 'view'])
router.post('logout', [LogoutController, 'logout']).use(middleware.auth())

router.get('create-project', [ProjectsController, 'create']).use(middleware.auth())

router.post('create-project', [ProjectsController, 'store']).use(middleware.auth())
