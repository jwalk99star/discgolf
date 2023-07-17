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
    <p class="fs-5">${this.date.toLocaleString()}
    <p class="fs-3">${this.content}</p>
    `
  }

}