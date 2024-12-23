"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const exception_filter_1 = require("./common/filter/exception-filter");
const response_interceptor_1 = require("./common/interceptor/response/response.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
        allowedHeaders: 'Authorization, Content-Type',
    });
    app.useGlobalFilters(new exception_filter_1.AllExceptionsFilter());
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map