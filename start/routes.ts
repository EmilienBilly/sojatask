import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const TasksController = () => import('#controllers/tasks/tasks_controller')

const CreateTaskController = () => import('#controllers/tasks/create_task_controller')

const CreateListController = () => import('#controllers/lists/create_list_controller')

const CreateBoardController = () => import('#controllers/boards/create_board_controller')
const BoardsController = () => import('#controllers/boards/boards_controller')

const UserWorkspacesController = () => import('#controllers/workspaces/user_workspaces_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const WorkspacesController = () => import('#controllers/workspaces/workspaces_controller')

router.get('/', [DashboardController, 'view']).use(middleware.auth())

router.get('login', [LoginController, 'render'])
router.post('login', [LoginController, 'handle'])

router.get('logout', [LogoutController, 'render'])
router.post('logout', [LogoutController, 'handle']).use(middleware.auth())

router.get('user_projects', [UserWorkspacesController, 'index']).use(middleware.auth())
router
  .get('user_projects/:id', [UserWorkspacesController, 'show'])
  .as('userProjects.show')
  .use(middleware.auth())
router.get('create-project', [WorkspacesController, 'create']).use(middleware.auth())
router.post('create-project', [WorkspacesController, 'store']).use(middleware.auth())

router.post('create_board', [CreateBoardController, 'handle']).use(middleware.auth())
router
  .get('user_projects/:projectId/boards/:boardId', [BoardsController, 'show'])
  .use(middleware.auth())
router.post('create-list', [CreateListController]).use(middleware.auth())
router.post('create-task', [CreateTaskController]).use(middleware.auth())

router.patch('tasks/:id/update', [TasksController, 'update']).use(middleware.auth())
