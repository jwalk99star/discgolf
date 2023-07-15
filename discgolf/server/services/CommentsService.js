import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class CommentsService {
  async getComments() {
    return await dbContext.Comments.find()
  }

  async getCommentById(commentId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (!comment) {
      throw new BadRequest(`Comment with id: ${commentId} does not exist.`)
    }
    return comment
  }

  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    return comment
  }

  async updateComment(commentId, accountId, commentData) {
    const targetComment = await this.getCommentById(commentId)

  }

  async removeComment(commentId, accountId) {

  }
}

export const commentsService = new CommentsService()