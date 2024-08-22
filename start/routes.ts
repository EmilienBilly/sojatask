import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UserProjectsController = () => import('#controllers/projects/user_projects_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const ProjectsController = () => import('#controllers/projects/projects_controller')

router
  .get('/', [DashboardController, 'view'])
  .use(middleware.auth())
  .use(middleware.shareUserProjects())

router.get('login', [LoginController, 'render'])
router.post('login', [LoginController, 'handle'])

router.get('logout', [LogoutController, 'render'])
router.post('logout', [LogoutController, 'handle']).use(middleware.auth())

router.get('get-user-projects', [UserProjectsController, 'index']).use(middleware.auth())
router.get('user-projects/:id', [UserProjectsController, 'show']).use(middleware.auth())
router.get('create-project', [ProjectsController, 'create']).use(middleware.auth())
router.post('create-project', [ProjectsController, 'store']).use(middleware.auth())
