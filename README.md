# Chat Widget Example

## Instructions
* Create a chat interface using Nextjs, shadcn, tailwind css, prisma, mongodb
* You should allow the user to upload files and send it as well.
* Create 3 different pages
* When the user switches between the pages they should get different prompts on each page.
* The chat should have a widget at the bottom right of the screen and have the option to expand its size

There are no limitations on resources, feel free to use existing code, starter repos, or anything else just make a note of what you are reusing and what new code you've written.

## Install Dependencies
```bash
npm i
```

## Fill ENV Variables
```bash
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_USER_ID=
USER_ID=
DATABASE_URL=
```

## Initialize Prisma ORM
```bash
npx prisma db push
#
npx prisma generate
```

## Run App
```bash
npm run dev
```
