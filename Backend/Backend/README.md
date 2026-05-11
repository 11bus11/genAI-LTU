# .NET quick start guide
The backend runs on localhost:5000 and the swagger is found on the extention /swagger.

## Start backend application
- Run the backend: dotnet run
- Build the backend: dotnet build

## Database
- Migrate: dotnet ef migrations add name-of-migration
- Remove migration: dotnet ef migrations remove
- Build/update database from migration: dotnet ef database update name-of-migration
- Drop database: dotnet ef database drop


