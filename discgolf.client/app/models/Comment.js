export class Comment {
  constructor(data) {
    this.id = data.id
    this.courseId = data.courseId
    this.accountId = data.accountId
    this.date = data.date ? new Date (data.date) : new Date()
    this.name = data.name
    this.content = data.content
  }

  get CommentTemplate() {
    return`
    <p class="fs-3">${this.content}</p>
    `
  }


get CreateCommentForm() {
  return`
  <form onsubmit="app.CommentsController.createComment(event)">
  <div class="form-group">
    <input name="content" type="text" class="form-control" id="comment-content"
      placeholder="Write Your Comment Here">
  </div>
  <button type="submit" class="btn btn-success">Submit</button>
</form>
`
}

}