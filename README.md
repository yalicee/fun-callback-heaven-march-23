# Callback Heaven

In the early days of Node, callbacks were the main way of handling asynchronicity.
In this sprint, you will have to build async functions using your knowledge of callbacks making requests to our own "server"

Our very own NC server has a series of endpoints from which you can gain a range of information about our adorable cats. 
The server you are making requests to has the following endpoints available:


#### `checkServerStatus()`

- this function should take a callback function as its only argument.
- your function should invoke the `request` function with the path (`/status`) and the callback function

#### `fetchAllOwners()`

- this function should take a callback function as its only argument. 
- it should make a request to the server at the `/owners` endpoint.
- the server will respond with an array of owner objects which you must pass to the callback function

#### `fetchCatsByOwner()`

- this function should take an owner name and a callback function as its arguments
- it should make a request to the server at the parametric endpoint `/owners/:owner/cats`
- the server should respond with an array of cat objects which you must pass to the callback function

#### `fetchAllCats()`

- this function should take a callback function as its only argument
- this function should make use of both `fetchAllOwners` and `fetchCatsByOwner` in order to retrieve an array of all the cats from the server
- you must finally pass the array of all those adorable cats to the callback function


### `fetchOwnersWithCats()`

- this function should take a callback function as its only argument
- this function should make use of `fetchAllOwners` and `fetchCatsByOwner` in order to build an 
array of objects, each object including an owner and their array of cats
- you get the drill by now, but you must pass the array of cats and owners to the callback function 



