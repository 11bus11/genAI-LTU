# genAI-LTU

[React guide](frontend/README.md)

## Data for the database

Datan i databasen skulle kunna kräva följande:

### Users
- ID
- name
- email

### Courses
- ID
- name
- code


## Lägga till kursdata i databasen

Kursdata kan läggas till via backend med Entity Framework Core.

Just nu innehåller databasen en `Courses`-tabell med följande fält:

- id
- name
- code

Exempel på en kurs:

```text
Name: Webbutveckling
Code: D0027E

### Assignments
- ID
- title
- description
- deadline
- courseID

### StudyPlans
- ID
- userID
- tasks
- dates

### Questions / Answers
- ID
- userID
- question
- answer

### Resources
- ID
- title
- link
