/**
 * Store main error model.
 */
class StoreError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

/**
 * Application bad request custom error. (400)
 */
class BadRequestError extends StoreError {
    constructor(message = "Bad request") {
        super(message, 400);

    }
}

/**
 * Application not found custom error. (404)
 */
class NotFoundError extends StoreError {
    constructor(message = "Not found") {
        super(message, 404);

    }
}

module.exports = {
    StoreError,
    BadRequestError,
    NotFoundError
}