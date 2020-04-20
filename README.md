# Chatter App!

This is a simple app to store new words a baby learns to to keep track of their progress! # this is the server side.

#Technologies used.

Javascript, Node, PostgreSql, Express. 

# What does the app do?


1. Users can register and creat an account. 
2. Users can login in securely.
3. Users can add name of child, and add new words to data base.
4. The graphical representation of the word count is presented to the user.
5. User can create multiple children.

# There are several endpoints for this project. They are descrived below.

1. The endpoint to validate users is '/api/auth/login.' This endpoing validates username and password and checks agains database to see if there is an existing user. If there is a match and password is correct, access is granted to the user.

2. The endpoint for users to register is '/api/users.' User details such as, email, name, username, password as stored in database and used to validate user logins.

3. The endpoint to retrieve userdata regarding their children is '/api/children/:user_name.' This endpoint allows the retrieval of the users children.

4. The endpoing to retrieve words by child and to post new words is ''/api/words/:user_name.' Data is retrieved based on user_name. New words are posted to the corresponding child_id.

#Links to site and repo.
The live app can be found at 'https://chatter-app.juanbaltazar.now.sh'.

Link to the server repo can be found at 'https://github.com/Tubidaor/chatter-server'.

Screenshot of the app can be found at https://github.com/Tubidaor/chatter-server/issues/2.