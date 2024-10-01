import LogoutController from '#controllers/auth/logout_controller'
import { test } from '@japa/runner'

// Mock pour simuler le HttpContext
test('LogoutController render() should call inertia.render with the correct view', async ({
  assert,
}) => {
  const inertia = {
    render: (view) => view,
  }

  const controller = new LogoutController()
  const result = controller.render({ inertia })

  // Vérifier que la méthode inertia.render est appelée avec le bon argument
  assert.equal(result, 'logout')
})
