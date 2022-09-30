# Backward Jeopardy

Welcome to Backward Jeopardy, a trivia game with the novel idea that we ask the questions and you give the answers! Here's what you may want to know about this app:

## Deploy/demo

To see the app in action either [try it out for yourself](https://backward-jeopardy.herokuapp.com/) (you'll need to sign in with a second user on an incognito browser to actually play) or watch one or both of the following demos (clicking the pictures will take you to YouTube):

| [![Regular User Demo](./images/in-game-image.png)](https://youtu.be/jksncUyl4JM) |
| -------------------------------------------------------------------------------- |
| <div style="text-align:center"><p>Regular User Demo</p></div>                    |

| [![Admin User Demo](./images/admin-image.png)](https://youtu.be/Cfq0JNiC3dE)     |
| -------------------------------------------------------------------------------- |
| <div style="text-align:center"><p>Admin User Demo</p></div>                      |

## Running the app

<img
src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
style="width:300px"
/>

To run the app locally, you will need to have Postgres installed. To make sure the postgres service is running, run `sudo service postgresql start`. Install the dependencies by running `bundle install` and `npm install --prefix client`. To run the app, run `rails s` to start the server, and `npm start --prefix client` to open the app in the browser. Run `rails db:migrate` to run the migrations. To seed the database with 1500 random questions from [Open Trivia DB](https://opentdb.com/api_config.php), uncomment lines 3 - 11 in `/db/seeds.rb` and run `rails db:seed`. More later on manually adding/editing/deleting questions.

## Technologies

This app uses a Rails API backend and a React frontend, and a PostgreSQL database. Client-server communication is done via either HTTP protocol or WebSockets (using Action Cable), depending on the need. Action Mailer is used to send emails as needed.

## Admin Access

<img
src="https://media.giphy.com/media/jZuKY2yJ2dj1OJfgoN/giphy.gif"
style="width:300px"
/>

This app has the ability to grant Admin access to authorized users. When creating an account, if the user inputs the Admin Key in the "name" field, an admin account will automatically be created. Once an admin user is created, they can log in with their regular credentials. The key will need to be entered again after every login in order to authorize admin-only actions. This key can be set by assigning a value to the `ADMIN_KEY` environment variable and running the code on line 38 in `/db/seeds.rb`, either by uncommenting it there or running it in the console.

## Models/tables

<img
src="./images/database.jpg"
style="width:300px"
/>

`AdminKey` - used to set the admin key, has one row, `password_digest`, which represents the key.

`Admin` - tracks users which are admins. Contains the username and email of `users` which are admins.

`Challenge` - contains information about a challenge sent by a user. Related to user with a `has_one/belongs_to` relationship. Destroyed as soon as it's accepted by another user.

`Game` - Contains all relevant information about a game in progress, including players, winnings, turn, etc. `belongs_to` two different `users`, `player_1` and `player_2`. Also `has_and_belongs_to_many` `questions`

`Issue` - for users to report issues. Not implemented as of now.

`Question` - contains info about questions (question, answer, category etc). `has_and_belongs_to_many` `games`, mainly for the game to track the questions.

`Submission` - `belongs_to` a `user`, contains information about questions submitted by users.

`Upvote` - `belongs_to` a `user` and a `submission`, for users to upvote other users' submissions.

`User` - contains information about all users, including admins. `has_one` `challenge` (if applicable), `has_many` `games`, `has_many` `submissions`, and `has_many` `upvotes`. Password encrypted using the `bcrypt` gem.

## Channels

<img
src="https://media.giphy.com/media/MuJDYvbYKzMwONKvdO/giphy.gif"
style="width:300px"
/>

`ChallengeChannel` - all users subscribe to this channel on login by default. Provides real-time updates to the list of available challenges.

`StartChallengeChannel` - subscribed to by user upon submitting or accepting a challenge. Used to coordinate start of game.

`GameChannel` - subscribed to when beginning a game. Provides real-time updates of game progress.

`TimerChannel` - subscribed to when beginning a game. Broadcasts game timer data to players.

## Routes

<img
src="./images/routes.jpg"
style="width:300px"
/>

### WebSocket

`/cable` - the WebSocket endpoint. Handles Channel connections

### User/session routes

`post /login`- handled by `sessions#show`, logs user in and saves `user_id` to session hash

`get /me` - `users#show`, checks session hash for logged-in user

`post /admin-login` - `admins#show`, logs admin in by saving `is_admin` boolean to session hash

`get /admin-session` - `sessions#admin_create`, checks if currently logged in user is authorized as admin.

`delete /logout` - `sessions#destroy`, logs user out and clears user info from session hash

`post /signup` - `users#create` creates a new user based on login credentials and saves `user_id` to session hash

`patch /users/:id` - `users#update`, updates user information. Has admin-only ability to modify certain user attributes

### Challenges routes

Fairly standard `index`, `create`, and `destroy` actions, except with response via broadcast instead of normal `json` response.

### Games routes

Fairly standard `show`, `create`, and `destroy` actions, response for `update` action via broadcast.

Additional two routes to create/destroy a `game_id` key for the session hash to keep track of current game: `post /current-game` and `delete /current-game`

### Submissions routes

Standard full CRUD, (no `show` action), with additional admin capabilities in `update` action.

Two additional routes, `get /pending-submissions` and `get /approved-submissions` have admin-only actions to display specific submission lists

### Questions routes

Full CRUD, all admin-only.

Additional route, `post /approved-questions/:submission_id`, to create new question from approved submission. This is needed because action needs to be taken regarding the `submission` instance as well.

## Mailers

<img
src="https://media.giphy.com/media/IvWQpaLYotX9e/giphy.gif"
style="width:300px"
/>

For now, there are two mailers, which are located in `/app/mailers`: `approval_mailer`, which handles emails notifying users of approved submissions, and `addition_mailer`, to notify users if their submission was added to DB.

## Frontend

### Context

The frontend uses context for the current user, the current game, the question list (for admins), and the Action Cable consumer.

### Admins

The UI for an admin user is slightly different, with no access to challenges or submissions from the dashboard, and an app bar with links to navigate to admin-only pages, including lists of questions, submissions, and users, all capable of being modified as needed. Even if a non-admin somehow gained access to these pages, they would not be able to do anything without the admin key.

Questions or comments? I can be reached via email at [naftalikulikse@gmail.com](mailto:naftalikulikse@gmail.com), or you can connect with me on [LinkedIn](https://www.linkedin.com/in/naftali-kulik-se/).

Naftali Kulik
