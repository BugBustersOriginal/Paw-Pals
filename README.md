# Pawpals

PawPals is a fun and exciting app that is perfect for anyone who loves pets! Inspired by Snapchat, PawPals allows users to share pictures of their furry friends with friends and family in a fun and interactive way. The app features instant messaging, snapping pictures, and geolocation, allowing users to see where their friends and their pets are in real-time.

# Login/Authentication

# Notifications
Notifications is a crucial feature to connect a user to the wider community of Paw Pals. Notifications allow users to accept friend requests from others and to also be notified when their friend downloads a photo that the user had sent. This feature was implemented using React to capture current user and friend data, and MongoDB to update the two user profiles. Node.js and Express was used for the API server.

Every user has a userProfile Model in the MongoDB Paw Pals collection. Each userProfile has an "incomingNotifications" property which is an array that accepts objects. Each object contains a key indicating the friendId that is notifying the user, and key "type" containing the type of notification. Paw Pals currently has two types of notifications, "friend request" and "saved photo".

When a recieving user "downloads" a photo that was sent to them, the client makes a POST request to the API, modifying the userProfile model of the sender photo, adding an object to the senders "incomingNotifications" array with an object containing the current user's "userId" and the "type": "saved photo". The same process happens when a user accepts a friend request, the client makes a POST request to the API, except now the object with the key "type" has a value of "friend request" in the incomingNotifications array.

![alt](https://res.cloudinary.com/djfpzruso/image/upload/c_scale,w_300/v1680643996/Screenshot_2023-04-04_at_3.11.48_PM_eeid0k.png)

# Friends List

The friends list is the landing page after a user logs in. It shows a list of friends, sorted by those the user has had recent chats with.  The user can scroll down to see their entire list of friends.

Users can click anywhere in the friend tile to be redirected to the chat window where they will be able to use the instant messaging feature.

User can also search for existing friends in the search bar and then click on the arrow to be redirected to the chat window to start instant messaging.

![alt](https://res.cloudinary.com/djfpzruso/image/upload/c_scale,w_300/v1680644002/Screenshot_2023-04-04_at_3.27.08_PM_ycxcik.png)


Users can search for other users and send them a friend request.

![alt](https://res.cloudinary.com/djfpzruso/image/upload/c_scale,w_300/v1680644137/Screenshot_2023-04-04_at_3.26.29_PM_od99ii.png)


If the user seachers for another use that has already sent them a friend request, the search bar will state that a friend request has been sent. The user can then select notifications where they will be able to accept the friend request. Once this is completed, the new friend will appear at the bottom of the friend list.

![alt](https://res.cloudinary.com/djfpzruso/image/upload/c_scale,w_300/v1680643999/Screenshot_2023-04-04_at_3.26.46_PM_bhrgkw.png)

# Instant Messages

PawPals' instant messaging feature is a crucial part of the app, allowing users to stay connected with their friends and family in real-time. Built using Javascript, React, and MongoDB, the messaging system is fast, efficient, and easy to use.

To implement real-time messaging, PawPals uses sockets, a technology that allows for bidirectional communication between the server and the client. This means that messages are sent and received instantly, without the need to refresh the page.

When a user sends a message, the message is immediately stored in MongoDB, a popular NoSQL database. This ensures that messages are securely stored and easily accessible to users. The messages are also organized by conversation and messages, making it easy for users to find their chat history with a specific user or group.

Users can also send pictures to one another through the messaging feature. These pictures are securely stored in MongoDB and can be viewed within the conversation thread. Additionally, users will be notified when their picture is viewed and downloaded, allowing them to keep track of who has seen their pet's latest antics.

The messaging feature also includes other useful functionalities such as read receipts, typing indicators, and message notifications. These features help users to stay on top of their conversations and respond quickly to their friends.

![alt](https://i.imgur.com/BEaOymf.png)
![alt](https://i.imgur.com/Ww92Mhl.png)
# User customization



# Team Members:

- Thomas Van
- Debra Zhang
- Mary Ann Hereford
- Michaelangelo Bellinghausen
- Tony Vo
- Andy Ma
