import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const CreateTaskController = () => import('#controllers/tasks/create_task_controller')

const CreateListController = () => import('#controllers/lists/create_list_controller')

const CreateBoardController = () => import('#controllers/boards/create_board_controller')
const BoardsController = () => import('#controllers/boards/boards_controller')

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

router
  .get('user_projects', [UserProjectsController, 'index'])
  .use(middleware.auth())
  .use(middleware.shareUserProjects())
router
  .get('user_projects/:id', [UserProjectsController, 'show'])
  .as('userProjects.show')
  .use(middleware.auth())
  .use(middleware.shareUserProjects())
router
  .get('create-project', [ProjectsController, 'create'])
  .use(middleware.auth())
  .use(middleware.shareUserProjects())
router
  .post('create-project', [ProjectsController, 'store'])
  .use(middleware.auth())
  .use(middleware.shareUserProjects())

router.post('create_board', [CreateBoardController, 'handle']).use(middleware.auth())
router
  .get('user_projects/:projectId/boards/:boardId', [BoardsController, 'show'])
  .use(middleware.auth())
  .use(middleware.shareUserProjects())
router
  .post('create-list', [CreateListController])
  .use(middleware.auth())
  .use(middleware.shareUserProjects())
router
  .post('create-task', [CreateTaskController])
  .use(middleware.auth())
  .use(middleware.shareUserProjects())
