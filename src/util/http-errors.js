//Creamos un modelo de manejo de errores para no repetir código
class HttpErrors extends Error {
    constructor(message, errorCode) {
      super(message);
      this.code = errorCode;
    }
  }
  
  module.exports = HttpErrors;