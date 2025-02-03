// test/create_subtask.spec.ts
import { test } from '@japa/runner'
import Task from '#models/task'
import Database from '@adonisjs/lucid/services/db'
import CreateSubtask from '#actions/tasks/create_subtask'

test.group('CreateSubtask Action', (group) => {
  // Set up database transaction for each test to prevent data pollution
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('should create a subtask for an existing parent task', async ({ assert }) => {
    // Arrange: Create a parent task first
    const parentTask = await Task.create({
      title: 'Parent Task',
      description: 'A task with subtasks',
      columnId: 1, // Assuming you have a predefined column
    })

    // Prepare subtask data matching your validator
    const subtaskData = {
      title: 'Subtask for Parent',
    }

    // Act: Use the CreateSubtask action
    const createdSubtask = await CreateSubtask.handle({
      parentId: parentTask.id,
      data: subtaskData,
    })

    // Assert: Verify subtask properties
    assert.exists(createdSubtask.id, 'Subtask should be created')
    assert.equal(
      createdSubtask.columnId,
      parentTask.columnId,
      "Subtask should inherit parent's columnId"
    )
    assert.equal(createdSubtask.title, subtaskData.title, 'Subtask title should match input')
  })
})
