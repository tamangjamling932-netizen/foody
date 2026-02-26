class RegisterDTO {
  constructor(body) {
    this.name = body.name?.trim();
    this.email = body.email?.trim().toLowerCase();
    this.password = body.password;
  }

  validate() {
    const errors = [];
    if (!this.name || this.name.length < 2) errors.push('Name must be at least 2 characters');
    if (!this.email || !/^\S+@\S+\.\S+$/.test(this.email)) errors.push('Valid email is required');
    if (!this.password || this.password.length < 6) errors.push('Password must be at least 6 characters');
    return errors;
  }
}

class LoginDTO {
  constructor(body) {
    this.email = body.email?.trim().toLowerCase();
    this.password = body.password;
  }

  validate() {
    const errors = [];
    if (!this.email) errors.push('Email is required');
    if (!this.password) errors.push('Password is required');
    return errors;
  }
}

class UpdateProfileDTO {
  constructor(body) {
    this.name = body.name?.trim();
    this.email = body.email?.trim().toLowerCase();
  }

  validate() {
    const errors = [];
    if (this.name && this.name.length < 2) errors.push('Name must be at least 2 characters');
    if (this.email && !/^\S+@\S+\.\S+$/.test(this.email)) errors.push('Valid email is required');
    return errors;
  }
}

class UpdatePasswordDTO {
  constructor(body) {
    this.currentPassword = body.currentPassword;
    this.newPassword = body.newPassword;
  }

  validate() {
    const errors = [];
    if (!this.currentPassword) errors.push('Current password is required');
    if (!this.newPassword || this.newPassword.length < 6) errors.push('New password must be at least 6 characters');
    return errors;
  }
}

module.exports = { RegisterDTO, LoginDTO, UpdateProfileDTO, UpdatePasswordDTO };
