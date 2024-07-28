#!/bin/bash

# Generate Prisma Client
npx prisma generate

#push to db
npx prisma db push

#seed data
npm run seed

#start app
npm run start