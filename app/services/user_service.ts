import User from '#models/user'

export default class UserService {
  static async getUserProfiles(userId: number) {
    try {
      // Récupération des profils de l'utilisateur
      const user = await User.findOrFail(userId)
      await user.load('profiles')
      return user.profiles
    } catch (error) {
      console.error("Erreur lors de la récupération des profils de l'utilisateur :", error)
      throw error
    }
  }

  static async hasAtConsultProfile(userId: number) {
    try {
      const userProfiles = await this.getUserProfiles(userId)

      return userProfiles.some((profile) => profile.name === 'at_consult')
    } catch (error) {
      console.error('Erreur lors de la vérification du profil at_consult :', error)
      throw error
    }
  }
}
