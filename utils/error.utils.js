class CustomUserError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError"; // Nama untuk error custom Anda
  }
}

module.exports = CustomUserError;
