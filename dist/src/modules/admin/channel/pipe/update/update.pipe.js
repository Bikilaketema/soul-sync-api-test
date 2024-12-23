"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePipe = void 0;
const common_1 = require("@nestjs/common");
let UpdatePipe = class UpdatePipe {
    transform(value, metadata) {
        if (!value.name || value.name.trim() === '') {
            throw new common_1.BadRequestException('Channel name is required');
        }
        if (!value.configuration || typeof value.configuration !== 'string' || value.configuration.trim() === '') {
            throw new common_1.BadRequestException('Configuration is required and must be a non-empty JSON string');
        }
        if (!value.metadata || typeof value.metadata !== 'string' || value.metadata.trim() === '') {
            throw new common_1.BadRequestException('Metadata is required and must be a non-empty JSON string');
        }
        try {
            value.configuration = JSON.parse(value.configuration);
        }
        catch (error) {
            throw new common_1.BadRequestException('Configuration must be a valid JSON string');
        }
        try {
            value.metadata = JSON.parse(value.metadata);
        }
        catch (error) {
            throw new common_1.BadRequestException('Metadata must be a valid JSON string');
        }
        return value;
    }
};
exports.UpdatePipe = UpdatePipe;
exports.UpdatePipe = UpdatePipe = __decorate([
    (0, common_1.Injectable)()
], UpdatePipe);
//# sourceMappingURL=update.pipe.js.map