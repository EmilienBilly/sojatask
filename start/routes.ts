import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const LogoutController = () => import('#controllers/auth/logout_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const CreateProjectController = () => import('#controllers/projects/create_project_controller')

router.get('/', [DashboardController, 'view']).use(middleware.auth()).as('dashboard.render')

router.get('login', [LoginController, 'view'])
router.post('login', [LoginController, 'login'])

router.get('logout', [LogoutController, 'view'])
router.post('logout', [LogoutController, 'logout']).use(middleware.auth())

router
  .get('create-project', [CreateProjectController, 'view'])
  .use(middleware.auth())
  .as('create-project.render')

router
  .post('create-project', [CreateProjectController, 'create'])
  .use(middleware.auth())
  .as('create-project.create')
