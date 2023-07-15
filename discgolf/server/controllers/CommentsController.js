import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .get('', this.getComments)
      .get('/:commentId', this.getCommentById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .put('/:commentId', this.updateComment)
      .delete('/:commentId', this.removeComment)
  }

  async getComments(req, res, next) {
    try {
      return res.send(await commentsService.getComments())
    } catch (error) {
      next(error)
    }
  }

  async getCommentById(req, res, next) {
    try {
      const commentId = req.params.commentId
      return res.send(await commentsService.getCommentById(commentId))
    } catch (error) {
      next(error)
    }
  }

  async createComment(req, res, next) {
    try {
      const commentData = req.body
      commentData.accountId = req.userInfo.id
      return res.send(await commentsService.createComment(commentData))
    } catch (error) {
      next(error)
    }
  }

  async updateComment(req, res, next) {
    try {
      const commentId = req.params.commentId
      const accountId = req.userInfo.id
      const commentData = req.body
      return res.send(await commentsService.updateComment(commentId, accountId, commentData))
    } catch (error) {
      next(error)
    }
  }

  async removeComment(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }
}