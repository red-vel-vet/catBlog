import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", renderIndex);
app.post("/new", renderNewPost);
app.post("/edit", renderEditPost);
app.post("/save", savePost);
app.post("/view", viewPost);
app.post("/delete", deletePost);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function renderIndex(req, res) {
  res.render("index.ejs", { posts:posts });
}

function renderNewPost(req, res) {
  res.render("edit.ejs", { newPost:"true" });
}

function renderEditPost(req, res) {
  const post = findPostById(req.body.postId);
  res.render("edit.ejs", { post:post, newPost:req.body.newPost });
}

function savePost(req, res) {
  let post;
  if (req.body.postId === "new") {
    post = createNewPost(req.body);
    posts.push(post);
  } else {
    post = updateExistingPost(req.body);
  }
  res.render("view.ejs", { post:post });
}

function viewPost(req, res) {
  const post = findPostById(req.body.postId);
  res.render("view.ejs", { post:post });
}

function deletePost(req, res) {
  deletePostById(req.body.postId);
  res.render("index.ejs", { posts:posts });
}

function createNewPost(postData) {
  const newPost = {
    ...postData,
    id: (Number(posts[posts.length - 1]["id"]) + 1).toString(),
    createdDate: new Date().toISOString().slice(0, 10)
  };
  delete newPost.postId;
  return newPost;
}

function findPostById(postId) {
  return posts.find(post => post.id === postId);
}

function updateExistingPost(postData) {
  const postId = postData.postId;
  const post = posts.find(post => post.id === postId);
  post.content = postData.content;
  return post;
}

function deletePostById(postId) {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === postId) {
      posts.splice(i, 1);
      break;
    }
  }
}

const posts = [
  {
    id: "1",
    title: "A Morning with Squirrels",
    author: "Ally",
    content: "Meow! It's Ally here. This morning was the best! I sat on the balcony and watched the squirrels scurry around. They're so fast, but I bet I could catch one if I tried. Hunter was there too, but he was too busy thinking about breakfast to enjoy the show. Silly brother!",
    createdDate: "2024-05-18"
  },
  {
    id: "2",
    title: "The Great Food Heist",
    author: "Hunter",
    content: "Hey there, it's Hunter. I did it again! I managed to steal some of Ally's food when she wasn't looking. She was just sitting there, acting all cool, but I knew she didn't want it. So I helped myself! A prince has to eat, right?",
    createdDate: "2024-05-19"
  },
  {
    id: "3",
    title: "Chasing Shadows",
    author: "Ally",
    content: "Ally here. Today was a day of epic chases! Hunter and I were running around the house. He thought he could catch me, but I'm too fast for him. He got close once, but then he tripped over his own lazy butt. I couldn't help but hiss at him – he needs to learn to keep up!",
    createdDate: "2024-05-20"
  },
  {
    id: "4",
    title: "Lazy Prince's Nap",
    author: "Hunter",
    content: "What's up, it's Hunter. After all that running around, I needed a nap. I found the perfect sunny spot and just laid there, soaking it in. Ally says I'm lazy, but I think I'm just conserving my energy for the next big meal. Life is good.",
    createdDate: "2024-05-21"
  },
  {
    id: "5",
    title: "The Princess and the Food Bowl",
    author: "Ally",
    content: "Hi, it's Ally. I was feeling a bit peckish today, but as soon as I started eating, Hunter came over and tried to take my food. I had to give him a hiss to remind him who's the real boss around here. Being a princess isn't easy with a bully like him around!",
    createdDate: "2024-05-22"
  },
  {
    id: "6",
    title: "Hunting for Squirrels",
    author: "Hunter",
    content: "Hunter here. I spent the morning on the balcony, eyeing those squirrels. They think they're so smart, but one day I'll catch one. For now, I'll just watch and dream of the feast I'll have. Maybe Ally will join me, but she usually just likes to sit and watch.",
    createdDate: "2024-05-23"
  },
  {
    id: "7",
    title: "The Fast and the Furry-ous",
    author: "Ally",
    content: "Ally reporting in. Hunter and I had another race today. As usual, I was winning until he tried to cheat by taking a shortcut. I hissed at him, of course. He may be bigger, but I'm the fastest and the smartest. He'll never catch me!",
    createdDate: "2024-05-24"
  },
  {
    id: "8",
    title: "Food Glorious Food",
    author: "Hunter",
    content: "Hey, it's Hunter. You know what I love? Food. Today I got an extra treat because Ally was too busy watching a squirrel. More for me! I might be clumsy, but when it comes to food, I'm unstoppable.",
    createdDate: "2024-05-25"
  },
  {
    id: "9",
    title: "A Princess's Life",
    author: "Ally",
    content: "Hello, it's Ally. Being a princess isn't easy. I have to deal with Hunter's bullying and stealing my food, but I always come out on top. Today I found a new hiding spot where I can watch the world in peace. It's good to be the princess.",
    createdDate: "2024-05-26"
  },
  {
    id: "10",
    title: "The Lazy Prince",
    author: "Hunter",
    content: "Hunter here. I might be clumsy, but I know how to enjoy life. Today I found the perfect spot to lounge and watch the world go by. Ally was running around as usual, but I just relaxed. Sometimes, being lazy is the best way to be.",
    createdDate: "2024-05-27"
  },
  {
    id: "11",
    title: "Balcony Adventures",
    author: "Ally",
    content: "Hi, it's Ally. I love spending time on the balcony, especially in the morning. The fresh air and the sight of those squirrels running around make me feel so alive. Hunter doesn't get it; he's too busy thinking about food. But for me, it's the perfect way to start the day.",
    createdDate: "2024-05-28"
  },
  {
    id: "12",
    title: "The Art of Falling",
    author: "Hunter",
    content: "Hey, it's Hunter. Today I perfected my falling technique. You see, when you're as lazy as me, sometimes your butt just can't keep up. So, I took a tumble, but no worries – I landed gracefully, like the prince I am. Ally just shook her head, but I know she was impressed.",
    createdDate: "2024-05-29"
  }
];
