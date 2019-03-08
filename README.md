# Callback Heaven

In the early days of Node, callbacks were the main way of handling asynchronicity.
In this sprint, you will have to build async functions using your knowledge of callbacks, in order to make requests to our server.

Our very own NC server has a series of endpoints from which you can gain a range of information about our adorable cats.
The server's endpoints are detailed below:

### Learning Objectives

- Learn about asynchronous nature of javascript
- Understand how to use callback functions in Node
- Understand how to deal with the most common issues that arise from using

### Available end-points:

- `/status` : responds with a status from the server, as 200 if the response is successful
- `/banner` : responds with a banner object
- `/owners` : responds with an array of owners
- `/owners/:owner/cats` : respond with an array of cats for a given owner
- `/legacy-status` : responds with a successful response only some of the time but on other occasions will respond with an error
- `/outfits/:outfit` : makes a purchase of a given outfit item

#### `checkServerStatus()`

- this function should take a callback function as its only argument.
- your function should invoke the `request` function with the path `/status` and the callback function

#### `fetchBannerContent()`

- this function should take a callback function
- your function should make a request to the `/banner` end-point which responds with a banner object
- you should pass the banner object to the final callback function

#### `fetchAllOwners()`

- this function should take a callback function as its only argument.
- it should make a request to the server at the `/owners` endpoint.
- the server will respond with an array of owners which you must pass to the callback function

#### `fetchCatsByOwner()`

- this function should take an owner name and a callback function as its arguments
- it should make a request to the server at the parametric endpoint `/owners/:owner/cats`
- the server should respond with an array of cats which you must pass to the callback function

#### `fetchAllCats()`

- this function should take a callback function as its only argument
- this function should make use of both `fetchAllOwners` and `fetchCatsByOwner` in order to retrieve an array of all the cats from the server
- Be mindful of the casing of your requests! `fetchCatsByOwner` only works with lowercase owner names
- you must finally pass the array of all those adorable cats to the callback function, sorted in alphabetical order

### `fetchOwnersWithCats()`

- this function should take a callback function as its only argument
- this function should make use of `fetchAllOwners` and `fetchCatsByOwner` in order to build an
  array of objects, each with an `owner` and `cats` key.
- the order of the objects is critical, and must be preserved - however, sorting is incredibly inefficient. Maintain the correct order without sorting
- you get the drill by now, but you must pass the array of cats and owners to the callback function

**ADVANCED**

#### `kickLegacyServerUntilItWorks()`

- this function takes a callback function as its only argument
- the legacy server will only respond with a success some of the time.
  Your function must continue to make requests to the legacy server until it gets a successful response
- it should pass the status to the callback function
  **HINT** Your function may need to make a call to itself

#### `buySingleOutfit()`

One of the biggest problems that arises from dealing with callback functions is known as **inversion of control**
In all of the problems so far we are passing a callback function to our request function
however, we are not in control of invoking this function - this is done by the server.
In other words, we are not in **control** of invoking the callback function.

The function `buySingleOutfit` will need

- to take an outfit and a callback function as its arguments
- need to make a request to the `/outfits/:outfit` end-point in order to purchase a particular outfit -
  however, there is a big problem. The person who has desgined the server for this end-point has accidentally
  triggered the purchase of the item multiple times - ouch, thats going to cost a lot.
- You need to use additional logic to prevent your final callback function from being invoked multiple times
