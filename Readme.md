# LeetCode Clone

![image](./excalidraw.svg)

This is a LeetCode clone project built using React, Express.js, Redis, and PostgreSQL, the application offers instant feedback on code execution.

## Demo

https://github.com/Pulkitxm/leetclone/assets/65671483/68a79580-2b25-4b34-b73c-1232837c249d

## Features

- **Problem Set**: Includes 15 diverse coding problems for users to solve.
- **Code Execution**: Users receive instant feedback on their submitted code.
- **Authentication**: Secure authentication via JWT for user safety.
- **Two Server Types**: Separate servers handle code execution and authentication/submission.
- **Potential for UI Enhancements**: While the focus has been on functionality, there's room for UI improvements in future iterations.

## Tech Stack

- Frontend: React
- Backend: Express.js
- Database: PostgreSQL
- Queueing: Redis
- Authentication: JWT

## Getting Started

1. Clone the repository.
2. Install dependencies 
   - Run `npm install` for client, worker and server
3. Set up the PostgreSQL and Redis databases.
   - If you are using docker
     - Run `docker compose up` in the server directory
4. Configure environment variables.
   - Run `cp .env.example .env`
5. Run the servers using `npm start` or `yarn start`.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for any enhancements or bug fixes.