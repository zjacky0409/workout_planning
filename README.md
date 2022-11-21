:) Hello, Everyone, this is my new project. 

If you want to know the details of frontend or backend, please read the README.md inside frontend or backend folder

Frontend: ReactJS (Typescript)
Backend: NestJS (Typescript)
DB: PostgreDB


To Run My Application:

!! Need Docker in your OS

1. git clone my project
2. then cd to the project
3. run docker compose build
4. then run docker compose up

Process

1. Main layout for my appplication
2. Login Systme With Jwt Authentication
3. Internationalization(i18n) for my applcation 
4. !!! really to design the database structure !!!









5. pull before or after commit --> we should pull before commit
6. For the chart: we may use the chart js
7. https://mui.com/material-ui/react-drawer/ --> for the side bar 

8. if we use context to store the sidebar content --> it doesnt work for a suitation: if we refresh the page, the context will become null, then the sidebar content will become empty.
    so we need to use another method to achieve the goal.










Basic Layout for my applciaton:
| Logo | Program | Diet         | Exercises     | Booking | Useful Resource | Progress                               |
|------|---------|--------------|---------------|---------|-----------------|----------------------------------------|
|      | Day1    | Rest Day     | Back          |         |                 | Some charts to show the process        |
|      | Day2    | Training Day | Chest         |         |                 | Volumn....                             |
|      | .....   | Macro        | ....Body Part |         |                 |                                        |