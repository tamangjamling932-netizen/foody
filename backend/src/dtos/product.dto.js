class CreateProductDTO {
  constructor(body) {
    this.name = body.name?.trim();
    this.description = body.description?.trim() || '';
    this.price = Number(body.price);
    this.category = body.category;
    this.isVeg = body.isVeg === 'true' || body.isVeg === true;
    this.isAvailable = body.isAvailable !== 'false' && body.isAvailable !== false;

    // Discount & Promotional Fields
    this.discountType = body.discountType || 'none';
    this.discountValue = body.discountValue ? Number(body.discountValue) : 0;
    this.bogoConfig = body.bogoConfig ? {
      buyQuantity: Number(body.bogoConfig.buyQuantity) || 0,
      getQuantity: Number(body.bogoConfig.getQuantity) || 0,
    } : { buyQuantity: 0, getQuantity: 0 };
    this.comboItems = Array.isArray(body.comboItems) ? body.comboItems : [];
    this.comboPrice = body.comboPrice ? Number(body.comboPrice) : 0;
    this.isFeatured = body.isFeatured === 'true' || body.isFeatured === true;
    this.isHotDeal = body.isHotDeal === 'true' || body.isHotDeal === true;
    this.isDailySpecial = body.isDailySpecial === 'true' || body.isDailySpecial === true;
    this.isChefSpecial = body.isChefSpecial === 'true' || body.isChefSpecial === true;
    this.offerLabel = body.offerLabel?.trim() || '';
    this.offerValidUntil = body.offerValidUntil ? new Date(body.offerValidUntil) : null;
  }

  validate() {
    const errors = [];
    if (!this.name || this.name.length < 2) errors.push('Product name is required');
    if (!this.price || this.price <= 0) errors.push('Valid price is required');
    if (!this.category) errors.push('Category is required');
    if (this.discountType && !['none', 'percentage', 'fixed', 'bogo', 'combo'].includes(this.discountType)) {
      errors.push('Invalid discount type');
    }
    if (this.discountValue < 0) errors.push('Discount value cannot be negative');
    return errors;
  }
}

class UpdateProductDTO {
  constructor(body) {
    if (body.name) this.name = body.name.trim();
    if (body.description !== undefined) this.description = body.description.trim();
    if (body.price) this.price = Number(body.price);
    if (body.category) this.category = body.category;
    if (body.isVeg !== undefined) this.isVeg = body.isVeg === 'true' || body.isVeg === true;
    if (body.isAvailable !== undefined) this.isAvailable = body.isAvailable !== 'false' && body.isAvailable !== false;

    // Discount & Promotional Fields
    if (body.discountType !== undefined) this.discountType = body.discountType;
    if (body.discountValue !== undefined) this.discountValue = Number(body.discountValue);
    if (body.bogoConfig !== undefined) {
      this.bogoConfig = body.bogoConfig ? {
        buyQuantity: Number(body.bogoConfig.buyQuantity) || 0,
        getQuantity: Number(body.bogoConfig.getQuantity) || 0,
      } : { buyQuantity: 0, getQuantity: 0 };
    }
    if (body.comboItems !== undefined) this.comboItems = Array.isArray(body.comboItems) ? body.comboItems : [];
    if (body.comboPrice !== undefined) this.comboPrice = Number(body.comboPrice);
    if (body.isFeatured !== undefined) this.isFeatured = body.isFeatured === 'true' || body.isFeatured === true;
    if (body.isHotDeal !== undefined) this.isHotDeal = body.isHotDeal === 'true' || body.isHotDeal === true;
    if (body.isDailySpecial !== undefined) this.isDailySpecial = body.isDailySpecial === 'true' || body.isDailySpecial === true;
    if (body.isChefSpecial !== undefined) this.isChefSpecial = body.isChefSpecial === 'true' || body.isChefSpecial === true;
    if (body.offerLabel !== undefined) this.offerLabel = body.offerLabel?.trim() || '';
    if (body.offerValidUntil !== undefined) this.offerValidUntil = body.offerValidUntil ? new Date(body.offerValidUntil) : null;
  }

  validate() {
    const errors = [];
    if (this.price !== undefined && this.price <= 0) errors.push('Valid price is required');
    if (this.discountType && !['none', 'percentage', 'fixed', 'bogo', 'combo'].includes(this.discountType)) {
      errors.push('Invalid discount type');
    }
    if (this.discountValue !== undefined && this.discountValue < 0) errors.push('Discount value cannot be negative');
    return errors;
  }
}

class ProductQueryDTO {
  constructor(query) {
    this.page = parseInt(query.page) || 1;
    this.limit = parseInt(query.limit) || 12;
    this.search = query.search || '';
    this.category = query.category || '';
    this.isVeg = query.isVeg;
    this.minPrice = query.minPrice ? Number(query.minPrice) : null;
    this.maxPrice = query.maxPrice ? Number(query.maxPrice) : null;
    this.sortBy = query.sortBy || 'createdAt';
    this.order = query.order === 'asc' ? 1 : -1;
    // Promotional filters
    this.isFeatured = query.isFeatured;
    this.isHotDeal = query.isHotDeal;
    this.isDailySpecial = query.isDailySpecial;
    this.isChefSpecial = query.isChefSpecial;
    this.onOffer = query.onOffer;
  }

  toFilter() {
    const filter = {};
    if (this.search) {
      filter.$or = [
        { name: { $regex: this.search, $options: 'i' } },
        { description: { $regex: this.search, $options: 'i' } },
      ];
    }
    if (this.category) filter.category = this.category;
    if (this.isVeg !== undefined) filter.isVeg = this.isVeg === 'true';
    if (this.minPrice || this.maxPrice) {
      filter.price = {};
      if (this.minPrice) filter.price.$gte = this.minPrice;
      if (this.maxPrice) filter.price.$lte = this.maxPrice;
    }
    // Promotional filters
    if (this.isFeatured === 'true' || this.isFeatured === true) filter.isFeatured = true;
    if (this.isHotDeal === 'true' || this.isHotDeal === true) filter.isHotDeal = true;
    if (this.isDailySpecial === 'true' || this.isDailySpecial === true) filter.isDailySpecial = true;
    if (this.isChefSpecial === 'true' || this.isChefSpecial === true) filter.isChefSpecial = true;
    if (this.onOffer === 'true' || this.onOffer === true) filter.discountType = { $ne: 'none' };
    return filter;
  }
}

module.exports = { CreateProductDTO, UpdateProductDTO, ProductQueryDTO };
