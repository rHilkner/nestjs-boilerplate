# nestjs-boilerplate
NestJS boilerplate

## Backend Architecture
- MVC architecture: Controllers, Services, Repositories
- Other main layers: DTOs, Models, Errors, ValidationSchemas
- Error handling: errors will be always thrown instead of returning null and setting callContext.error. This way we can also have a try/catch in the middleware layer that captures any uncaught exception and sends the exception in the response.
- Data validation: Input data will always be validated with Joi in the Controller layer (maybe create an AbstractController that automatically handles data-validation)
- Take advantage of Monorepo: all DTOs should be in a shared lib between frontend and backend
- Server initialization NestJS default framework initialization
- Integration Plugins: NestJS: they will be essentially Services, maybe with a Plugin name instead (eg: SalesforcePluginService or SalesforcePlugin)
- Logging: NestJS: instantiate at Services constructor using built-in logger
- Swagger: NestJS setup built-in Swagger integration
- User authentication: If Bearer token is sent in the header we can guarantee users permissions in the middleware of the application

## Database
- Personal preference to PostgreSQL, but I'd use any database Adarsh feels like is better for the project
- Audit columns: Every database table should have the audit columns created_by, created_dt, updated_by, updated_dt, where created_by and updated_by keep the value of the userId of the user that is in the current call context.
- Call log: Database table to keep the call-log (request and response data for each call) - each row in this table should live for 30 days. A "Call" can be an incoming call from the frontend or an outgoing request to an external API, thus there will be a column "call_type": "INCOMING" | "OUTGOING". This is great for debugging and having history of the API requests.
- Error log: Database table to keep the error-log (error name, description, stacktrace, timestamp) - each row in this table should live for 30 days.

## Stack
- NodeJS
- Typescript
- REST
- NestJS
- PostgreSQL + Prisma ORM

## Initial endpoints
- `/user/signUp` - creates new user with email (unique), role (CUSTOMER or ADMIN), password (length > 8)
- `/user/login` - logs user in with email and password
- `/user/getCurrent` - CUSTOMER or ADMIN only, get current user from Bearer token in the request header
- `/user/getAll` - ADMIN only, gets all users
- `/user/create` - ADMIN only, creates user from email, role and password
- `/currencies/currentPrice?from=USD&to=BRL` - CUSTOMER or ADMIN only, cached with TTL of 1 hour

## Initial DB tables
- User
- SysCallLog
- SysErrorLog
