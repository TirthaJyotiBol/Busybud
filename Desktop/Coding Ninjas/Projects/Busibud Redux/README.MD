1. This Project Contains A web based E-Commerce Site.
2. Client Side is made using React JS
3. Server side is made using Node and Express js
4. Mongo DB witn mongoose is used for Database based operation.

Pages:
 - Home [Display all the Products]
 - Orders [Shows Orders on the basis of user id]
 - Cart [Whichever Product added in cart is displayed in Cart where we can increment / decrement quantity ]
 - Login [To Log in]
 - Register [New Account Creation]

 Features
    - Filter Products on the basis of Price, Product Type, Searching
    - Add to cart , where user can add items to cart from where order to be placed
    - PlaceOrder , calls an async thunk funciton to place order where axios being used to connect to server side
      where PLACE ORDER API being created to place order
    - SImilarly other API's like User Registration, Login , Fetch Products, Fetch Users are being created.

# Once User Logged in / Registered, user details are stored in local storage
# Cron is being runned after a few seconds to check if local storage contains user details which as a result displays the login/logout  