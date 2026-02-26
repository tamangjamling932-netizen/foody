class CreateBillDTO {
  constructor(body) {
    this.paymentMethod = body.paymentMethod || 'cash';
  }

  validate() {
    const valid = ['cash', 'card', 'upi'];
    if (!valid.includes(this.paymentMethod)) {
      return ['Payment method must be: ' + valid.join(', ')];
    }
    return [];
  }
}

class BillQueryDTO {
  constructor(query) {
    this.page = parseInt(query.page) || 1;
    this.limit = parseInt(query.limit) || 10;
    this.isPaid = query.isPaid;
  }

  toFilter() {
    const filter = {};
    if (this.isPaid !== undefined) filter.isPaid = this.isPaid === 'true';
    return filter;
  }
}

module.exports = { CreateBillDTO, BillQueryDTO };
