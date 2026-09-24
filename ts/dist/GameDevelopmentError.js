"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameDevelopmentError = void 0;
class GameDevelopmentError extends Error {
    isGameDevelopmentError = true;
    sdk = 'GameDevelopment';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.GameDevelopmentError = GameDevelopmentError;
//# sourceMappingURL=GameDevelopmentError.js.map