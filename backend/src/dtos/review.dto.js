class CreateReviewDTO {
  constructor(body) {
    this.rating = parseInt(body.rating);
    this.comment = body.comment?.trim() || '';
  }
  validate() {
    const errors = [];
    if (!this.rating || this.rating < 1 || this.rating > 5) errors.push('Rating must be between 1 and 5');
    if (this.comment && this.comment.length > 500) errors.push('Comment cannot exceed 500 characters');
    return errors;
  }
}

class UpdateReviewDTO {
  constructor(body) {
    if (body.rating !== undefined) this.rating = parseInt(body.rating);
    if (body.comment !== undefined) this.comment = body.comment.trim();
  }
  validate() {
    const errors = [];
    if (this.rating !== undefined && (this.rating < 1 || this.rating > 5)) errors.push('Rating must be between 1 and 5');
    if (this.comment !== undefined && this.comment.length > 500) errors.push('Comment cannot exceed 500 characters');
    return errors;
  }
}

module.exports = { CreateReviewDTO, UpdateReviewDTO };
