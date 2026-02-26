class CreateOrderDTO {
  constructor(body) {
    this.tableNumber = body.tableNumber?.trim() || '';
    this.notes = body.notes?.trim() || '';
  }

  validate() {
    return [];
  }
}

class UpdateOrderStatusDTO {
  constructor(body) {
    this.status = body.status;
  }

  validate() {
    const valid = ['pending', 'confirmed', 'preparing', 'served', 'completed', 'cancelled'];
    if (!this.status || !valid.includes(this.status)) {
      return ['Invalid status. Must be: ' + valid.join(', ')];
    }
    return [];
  }
}

class OrderQueryDTO {
  constructor(query) {
    this.page = parseInt(query.page) || 1;
    this.limit = parseInt(query.limit) || 10;
    this.status = query.status || '';
    this.search = query.search || '';
  }

  toFilter(userId = null) {
    const filter = {};
    if (userId) filter.user = userId;
    if (this.status) filter.status = this.status;
    if (this.search) {
      filter.$or = [
        { 'items.name': { $regex: this.search, $options: 'i' } },
        { tableNumber: { $regex: this.search, $options: 'i' } },
      ];
    }
    return filter;
  }
}

module.exports = { CreateOrderDTO, UpdateOrderStatusDTO, OrderQueryDTO };
