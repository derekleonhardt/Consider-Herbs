# Consider Herbs

Web application built by group Homeopathic Homies for Consider Herbs as the final project for CEN3031 in Spring 2020.

## Getting Started

### Installing and Development Enviroment

A step by step series of examples that tell you how to get a development env running

First run `npm install` from the root.

After this you will run `npm run-script install-all` from the root.

`npm run-script dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.


## Built With

*  SQLite
*  Express
*  React
*  Node.js

## Features

### Login / User Authentication

Achieved a multi tiered user system consisting of a
    * Non logged in user
    * Logged in user
    * Premium subscription user
    * Admin

This Funcionality was achieved with the use of the Auth0 API and persists through refresh as well as restricts user-flow throughout the website depending on tier

### Herb Glossary and Recipe Searching

The herb glossary is a basic search bar located on the Browse Herbs page with output of herbs with their definitions and usages displayed. There is the ability to click on the name of any herb on the page which results in a pop-up with all of that herbs information shown.

Within the Find A Remedy page there is a body diagram with buttons positioned around the body corresponding to different locations of pain that a user might be experiencing. These buttons sort the display of recipes below based on the corresponding pain area, and display all relevant recipies and their ingredients for the user. There is also a search bar functionality which filters the recipies displayed based on ailment.

All of these functions were implemented through connection to an SQLite database that was created using Excel file provided by the client.

### Chat Functionality

Discussion board functionality implemented on the Chat With Others page lists all recent posts and their authors as well as gives the user the option to write their own post. Each post is able to be clicked which redirects to the post page where all of the post contents as well as comments are shown. The user is able to add comments, and the author of the post is able to edit the post, and delete the post. Posts are text based but a youtube video link can be embeded within the post.

This chat is powered through another SQLite database.

### Consulation Calendar Booking

Calendar implemented with React-big-calendar. On the Book Consulation page a user is able to book a consultation on a given date. The admin then confirms this date and the user is prompted for payment for the consultation through use of Stripe. The consultation will then appear on the calendar. Admin has full acess to deny or accept consulation bookings as well as add other events to the calendar such as video classes. The calendar is able to viewed in a day, week, month, or agenda view.

These bookings are handled through another SQLite database.

### Header and Footer

Header and Footer take care of all the linking around the application, as well as link to outside social media and email accounts

### Admin Functionality

The admin has access to the /Admin path which is an admin page which grants acess to edit the glossary, manage all users and their tier of subscriptinon, confirm bookings and tell which users have paid for their booking, as well as manage Text, Images, Products, and Links shows on the userhome. This gives the admin ability to change what the users are she pleases.

### API Usage

 * Auth0 - User Authentication
 * Stripe - Payment Managment
 * Rest API - payment managment
 * Database API - database managment
         
        recipe
        -	/db/recipe/name/:name	(GET)		get recipe data by name
        -	/db/recipe/id:id			(GET)		get recipe data by ID
        -	/db/recipe/			(GET)		get list of recipe
        -	/db/recipe/extended/		(GET)		get list of recipe including ingredients
        -	/db/recipe/body/:body		(GET)		search recipe by body
        -	/db/recipe/search/:query	(GET)		search recipe by name
        -	/db/recipe/insert/		(POST)	insert recipe
        -	/db/recipe/update/		(POST)	update recipe
        -	/db/recipe/delete/:id		(DELETE)	delete recipe
        
        ingredients
        -	/db/ingredients/add			(POST)	add ingredient to recipe
        -	/db/ingredients/delete/:id/:name	(DELETE)	delete ingredient from recipe

        glossary
        -	/db/glossary/name/:name		(GET)		get glossary by name
        -	/db/glossary/				(GET)		list glossary
        -	/db/glossary/search/:query		(GET)		search glossary
        -	/db/glossary/insert			(POST)	insert glossary
        -	/db/glossary/update			(POST)	update glossary
        -	/db/glossary/delete/:name		(DELETE)	delete glossary by name
        -	/db/glossary/delete/def/:def		(DELETE)	delete glossary by definition

        post
        -	/db/post/		(GET)		get list of posts
        -	/db/post/:id		(GET)		get post by id
        -	/db/post/write/		(POST)	write post
        -	/db/post/edit/:id	(POST)	edit post
        -	/db/post/delete/:id	(DELETE)	delete post

        reply
        -	/db/post/:id/reply/		(GET)		get list of reply of a post
        -	/db/post/:id/reply/write		(POST)	write reply on a post
        -	/db/post/reply/edit		(POST)	edit reply
        -	/db/post/reply/delete		(POST)	delete reply

        content - link
        -	/db/links			(GET)		get list of links
        -	/db/links/:id			(GET)		get link by id
        -	/db/links/page/:page		(GET)		get link page
        -	/db/links/insert/		(POST)	insert link
        -	/db/links/delete/:id		(DELETE)	delete link
        -	/db/links/update/:id		(PATCH)	update link

        content - image
        -	/db/images/			(GET)		get list of images
        -	/db/images/:id			(GET)		get image by id
        -	/db/images/page/:page	(GET)		get image page
        -	/db/images/insert/		(POST)	insert image
        -	/db/images/delete/:id		(DELETE)	delete image
        -	/db/images/update/:id		(PATCH)	update image

        content - product
        -	/db/products/			(GET)		get list of products
        -	/db/products/:id		(GET)		get product by id
        -	/db/products/page/:page	(GET)		get product page
        -	/db/products/insert/		(POST)	insert product
        -	/db/products/delete/:id	(DELETE)	delete product
        -	/db/products/update/:id	(PATCH)	update product

        subscription
        -	/db/subscription	(GET)		list subscriptions
