import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const TasksController = () => import('#controllers/tasks/tasks_controller')
const CreateTaskController = () => import('#controllers/tasks/create_task_controller')
const CreateListController = () => import('#controllers/lists/create_list_controller')
const CreateBoardController = () => import('#controllers/boards/create_board_controller')
const BoardsController = () => import('#controllers/boards/boards_controller')
const UserWorkspacesController = () => import('#controllers/workspaces/user_workspaces_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const WorkspacesController = () => import('#controllers/workspaces/workspaces_controller')

//

router
  .group(() => {
    router.get('/', [DashboardController, 'view']).use(middleware.workspace())
    router.get('/workspaces/create', [WorkspacesController, 'create']).as('workspaces.create')
    router.post('/workspaces', [WorkspacesController, 'store']).as('workspaces.store')
    router.get('/workspaces/:id', [WorkspacesController, 'active']).as('workspaces.active')
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('user_projects', [UserWorkspacesController, 'index'])
    router.get('user_projects/:id', [UserWorkspacesController, 'show']).as('userProjects.show')
    router.get('boards/create', [CreateBoardController, 'render']).as('boards.create')
    router.post('create_board', [CreateBoardController, 'handle'])
    router.get('/boards/:boardId', [BoardsController, 'show'])
    router.post('create-list', [CreateListController])
    router.post('create-task', [CreateTaskController])

    router.patch('tasks/:id/update', [TasksController, 'update'])
  })
  .use([middleware.auth(), middleware.workspace()])
