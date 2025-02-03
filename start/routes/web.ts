import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const ColumnsController = () => import('#controllers/columns/columns_controller')

const TasksController = () => import('#controllers/tasks/tasks_controller')
const CreateTaskController = () => import('#controllers/tasks/create_task_controller')
const CreateColumnController = () => import('#controllers/columns/create_column_controller')
const CreateBoardController = () => import('#controllers/boards/create_board_controller')
const BoardsController = () => import('#controllers/boards/boards_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const WorkspacesController = () => import('#controllers/workspaces_controller')

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
    // Boards
    router.get('boards/create', [CreateBoardController, 'render']).as('boards.create')
    router.post('create_board', [CreateBoardController, 'handle'])
    router.get('/boards/:boardId/:taskId?', [BoardsController, 'show'])
    router.post('/boards/:boardId/columns/', [CreateColumnController])
    router.patch('/boards/:boardId/tasks/order', [TasksController, 'order']).as('tasks.order')
    router.patch('/boards/:boardId/columns/order', [ColumnsController, 'order']).as('columns.order')

    // Tasks
    router.post('create-task', [CreateTaskController])
    router.put('/tasks/:id', [TasksController, 'update']).as('tasks.update')
    router.post('/tasks/:id/subtasks', [TasksController, 'createSubtask']).as('tasks.createSubtask')
  })
  .use([middleware.auth(), middleware.workspace()])
