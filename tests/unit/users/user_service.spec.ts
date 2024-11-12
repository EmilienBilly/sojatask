import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import User from '#models/user'
import Profile from '#models/profile'
import UserService from '#services/user_service'

test.group('Users user service', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('getUserProfiles should return the profiles of a user', async ({ assert }) => {
    const user = await User.create({ id: 6000, username: 'testuser' })
    const profiles = await Profile.createMany([{ name: 'at_consult' }, { name: 'admin' }])

    await user.related('profiles').attach([profiles[0].id, profiles[1].id])

    const userProfiles = await UserService.getUserProfiles(user.id)
    assert.equal(userProfiles.length, 2)
    assert.isTrue(userProfiles.some((p) => p.name === 'at_consult'))
    assert.isTrue(userProfiles.some((p) => p.name === 'admin'))
  })

  test('hasAtConsultProfile should return true if the user has the at_consult profile', async ({
    assert,
  }) => {
    const user = await User.create({ username: 'testuser' })
    const profiles = await Profile.createMany([{ name: 'at_consult' }, { name: 'admin' }])
    await user.related('profiles').attach([profiles[0].id, profiles[1].id])

    const hasAtConsultProfile = await UserService.hasAtConsultProfile(user.id)
    assert.isTrue(hasAtConsultProfile)
  })
})
