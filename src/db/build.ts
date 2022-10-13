import { User, Post, Like, Animal, Tag, sequelize } from '.'
import data from './seeds.json'
import environment from '../config/environment'

const buildDB = async () => {
  await sequelize.sync({ force: true })
  await User.bulkCreate(data.User)
  await Post.bulkCreate(data.Post)
  await Like.bulkCreate(data.Like)
  await Animal.bulkCreate(data.Animal)
  await Tag.bulkCreate(data.Tag)
}

if (environment.nodeEnv !== 'test') {
  buildDB()
}

export default buildDB
