"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const rollbar = require("rollbar");
const rollbarToken = process.env.ROLLBAR_ACCESS_TOKEN;
const isQuiet = process.env.QUIET;
if (rollbarToken) {
    rollbar.init(rollbarToken);
}
class Logger {
    static _formatMessage(tag, message) {
        return `[${new Date()}] {${tag}} ${message}`;
    }
    static error(tag, error, payload) {
        return new Promise(resolve => {
            console.error(this._formatMessage(tag, error.message));
            if (error.stack) {
                console.error(error.stack);
            }
            if (payload) {
                console.error('PAYLOAD', payload);
            }
            if (rollbarToken) {
                if (payload) {
                    rollbar.handleErrorWithPayloadData(error, payload, resolve);
                }
                else {
                    rollbar.handleError(error, resolve);
                }
            }
        });
    }
    static important(tag, message) {
        console.log(this._formatMessage(`${process.env.INSTANCE_NUMBER}:${tag}`, message));
    }
    static info(tag, message) {
        if (isQuiet)
            return;
        console.info(this._formatMessage(`${process.env.INSTANCE_NUMBER}:${tag}`, message));
    }
    static silly(tag, message) {
        const SILLY = process.env.DEBUG_SILLY;
        if (!SILLY)
            return;
        if (SILLY === '1' || SILLY === tag || _.includes(message, SILLY)) {
            console.info(this._formatMessage(`${process.env.INSTANCE_NUMBER}:${tag}`, message));
        }
    }
}
exports.Logger = Logger;
process.on('uncaughtException', err => {
    Logger.error('PROCESS:BAD:EXCEPTION', err)
        .then(() => {
        process.exit(2);
    });
});
process.on('unhandledRejection', err => {
    Logger.error('PROCESS:BAD:REJECTION', err)
        .then(() => {
        process.exit(1);
    });
});
