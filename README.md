# What it is ? and what it does ?
- it is `TaskUp for Clickup`

**View from and add tasks to all of your ClickUp workspaces in just one place in one click.**

**This extension is safe, simple and yet so useful for the click Up users, the way clickUp takes out user's pressure to manage too many productivity apps and lets a person work in more organized and well structured manner. This extension is build upon CLickUp official API and maintaing all the purpose the ClickUp should serve. The `TaskUp for ClickUp` extension extends the productivity and usefullness of the ClickUp app. How ?**

- say, if you want to take a quick glance at your pending tasks, now you don't have to got to ClickUp.com and look where the task is, with the help of TaskUp you can just do it by one click on the extension and you can continue surfing the browser.
- A task is completed ? you can simply delete it from here.
- Can look upto all the workspaces > spaces > folders > lists > tasks you have and also the folderless lists as well
- say, you remembered something that you need to add as a task to your clickUp well no worries you can just do it from the extension.
- Also you can view the available tasks in sorted manner, by priority and by due date.


**- This extension is in its starting phases, any feedbacks will be welcomed and considered**
- here is the chrome webstore link: https://chrome.google.com/webstore/detail/taskup-for-clickup/dphgbgdjhfjccmmopjhbgfejaipbbgbo

# ScreenShots of the products:
<p align="center">
    <img src="https://user-images.githubusercontent.com/68517592/198837836-c6068c18-8196-41ff-9783-cc7b61cf00eb.png">
    <img src="https://user-images.githubusercontent.com/68517592/198837883-db5ef42e-ada4-4a5c-b010-9f3e957acf2a.png">
    <img src="https://user-images.githubusercontent.com/68517592/198837900-bb90dd03-e6e7-47b9-a841-eb9f25814eb7.png">
    <img src="https://user-images.githubusercontent.com/68517592/198837920-97ebc690-3a17-4eff-a17d-12ea6448ba50.png">
p>

# What is used and how is it made ?

- well, first of all it is completely based on clickUp official API and every end points and every fetch request goes directly there
- secondly, I used pure vanilla javascript to code every functionality to run the extension on the browser side, chrome extension is unable to run on a server side (on node js)
- Though, I could have used different webPacks to compile a node js code into vanilla js to run in browser but i chose not to.

# Another less important question:
**- Why am I requesting to a heroku server instead of clickUp official API ?**
- The answer is every developer's nightmare CORS cross origin policy! For security purposes the browser does not allow xmlHTTP and fetch_API to make cross origin HTTP request to any API end point, that is why I made my own cloud based herokku server and made specific end points for API, that server request data to clickUp and fetches without any issue cause server to server, and in that (heroku server) I made each endpoint to access allow origin universally (*) and thus my extension request to that heroku server and that server brings me data from clickUp. A win win

