![image](https://user-images.githubusercontent.com/110364637/190943931-c8f01e80-1594-4c6a-954d-c6cb41ea88cb.png)

## E-learning Application

The E-learning application is a platform for people who wished to learn and expand their vocabularies and grammar. It allows them to answer series of words depending on the lesson chosen. This application is built on top of Laravel and React framework with the help of Redux Toolkit (RTK) Query.

## Main Features

- User can register and login
- User can follow/unfollow other users
- User can view and update own profile
- User can see activities of other users
- User can choose lessons and answer respective quiz
- User can view result and new learned words
- Admins can configure and manage lessons and quizzes to be answered by other users

## Technologies Used

- ReactJS
- Redux Toolkit (RTK) Query
- Bootstrap 5
- Laravel

## Visit the website

- https://www.gtrack.life

## Try it out

- Clone the project
- Create and setup `.env` files in reference to `.env.example` in both frontend and backend root directory
- Create a database and add the respective db name and respective details to the `.env` on backend
- Navigate to backend directory and run:
  - `composer install`
  - `php artisan migrate`
  - `php artisan db:seed`
  - `php artisan serve`
- Navigate to frontend directory and run:
  - `npm install`
  - `npm start`
