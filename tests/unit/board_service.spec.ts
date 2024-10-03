import { test } from '@japa/runner'
import BoardService from '#services/board_service'

test.group('BoardService', () => {
  test('getBoardWithListsAndTasks should return board with lists and tasks', async ({ assert }) => {
    const boardService = new BoardService()

    const boardId = 3

    const result = await boardService.getBoardWithListsAndTasks(boardId)

    assert.exists(result.id)
    assert.exists(result.title)
    assert.isArray(result.lists)
    assert.isNotEmpty(result.lists)

    if (result.lists.length > 0) {
      assert.isArray(result.lists[0].tasks)
      assert.isNotEmpty(result.lists[0].tasks)
    }
  })
})
