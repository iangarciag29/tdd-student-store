class ApplicationError extends Error {
    constructor(status, message) {
        super();
        this.message = message;
        this.status = status;
    }
}

class BadRequestException extends ApplicationError {
    constructor(message = "Bad request.") {
        super(400, message);
    }
}

class NotFoundException extends ApplicationError {
    constructor(message = "Not found.") {
        super(404, message);
    }
}

module.exports = {
    ApplicationError, BadRequestException, NotFoundException
}