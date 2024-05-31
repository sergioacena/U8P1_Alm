class BaseException extends Error {
  constructor(message = "", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "BaseException";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseException);
    }
  }
}

class InvalidAccessConstructorException extends BaseException {
  constructor(fileName, lineNumber) {
    super(
      "El constructor no puede ser llamado como una función.",
      fileName,
      lineNumber
    );
    this.name = "InvalidAccessConstructorException";
  }
}

class AbstractClassException extends BaseException {
  constructor(fileName, lineNumber) {
    super("La clase no puede ser abstracta", fileName, lineNumber);
    this.name = "AbstractClassException";
  }
}

class EmptyValueException extends BaseException {
  constructor(fileName, lineNumber) {
    super("Debe introducirse un valor", fileName, lineNumber);
    this.name = "EmptyValueException";
  }
}

class AlreadyExistsException extends BaseException {
  constructor(fileName, lineNumber) {
    super("El elemento introducido ya existe", fileName, lineNumber);
    this.name = "AlreadyExistsException";
  }
}

class NotExistingException extends BaseException {
  constructor(fileName, lineNumber) {
    super(
      "El elemento introducido no existe actualmente",
      fileName,
      lineNumber
    );
    this.name = "NotExistingException";
  }
}

class NullException extends BaseException {
  constructor(fileName, lineNumber) {
    super("El elemento introducido no puede ser null", fileName, lineNumber);
    this.name = "NullException";
  }
}

class NotRegisteredElementException extends BaseException {
  constructor(fileName, lineNumber) {
    super(
      "El elemento introducido no está registrado en la colección",
      fileName,
      lineNumber
    );
    this.name = "NotRegisteredElementException";
  }
}

class InvalidTypeException extends BaseException {
  constructor(fileName, lineNumber) {
    super(
      "El tipo introducido para este objeto no es válido",
      fileName,
      lineNumber
    );
    this.name = "InvalidTypeException";
  }
}

//Exportación de excepciones
export {
  AbstractClassException,
  InvalidAccessConstructorException,
  EmptyValueException,
  AlreadyExistsException,
  NotExistingException,
  NullException,
  NotRegisteredElementException,
  InvalidTypeException,
};
