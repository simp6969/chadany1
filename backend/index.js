//importuud

import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(express.json());
app.use(cors());
app.get("/users", function (req, res) {
  fs.readFile(process.cwd() + "/data/users.json", (readError, data) => {
    if (readError) {
      res.status(404).json(readError);
    }
    res.json(JSON.parse(data));
  });
});
app.get("/users/:name", function (req, res) {
  let { name } = req.params;
  fs.readFile(process.cwd() + "/data/users.json", (readError, data) => {
    if (readError) {
      res.status(404).json(readError);
    }
    let converted = JSON.parse(data);
    const userData = converted.filter((element) => {
      if (element.username === name) {
        return element;
      }
    });
    res.json(userData);
  });
});
app.post("/users", function (req, res) {
  fs.readFile(process.cwd() + "/data/users.json", (readError, data) => {
    if (readError) {
      res.status(404).json(readError);
    }

    const savedData = JSON.parse(data);
    const id = Math.floor(Math.random() * 10000);
    fs.writeFile(
      process.cwd() + "/data/users.json",

      JSON.stringify([...savedData, { ...req.body, uid: id }]),

      res.send(JSON.stringify([...savedData, { ...req.body, uid: id }])),

      () => {}
    );
  });
});

app.post("/users/chat/:username", function (req, res) {
  let { username } = req.params;
  fs.readFile(process.cwd() + "/data/users.json", (readError, data) => {
    if (readError) {
      res.status(404).json(readError);
    }
    const savedData = JSON.parse(data);
    const equal = savedData.filter((element) => element.username === username);
    const notequal = savedData.filter(
      (element) => element.username !== username
    );
    const addedChat = [...equal[0].chats, { value: req.body.value }];
    fs.writeFile(
      process.cwd() + "/data/users.json",

      JSON.stringify([
        ...notequal,
        {
          username: equal[0].username,
          password: equal[0].password,
          uid: equal[0].uid,
          age: equal[0].age,
          chats: addedChat,
        },
      ]),

      (error) => {
        if (error) {
          res.send("zlo");
        } else {
          res.send(
            JSON.stringify([
              ...notequal,
              {
                username: equal[0].username,
                password: equal[0].password,
                uid: equal[0].uid,
                age: equal[0].age,
                chats: addedChat,
              },
            ])
          );
        }
      }
    );
  });
});

app.delete("/users/:name", (req, res) => {
  let { name } = req.params;

  fs.readFile(process.cwd() + "/data/users.json", (readError, data) => {
    const array = JSON.parse(data);

    let filt = array.filter((element) => {
      if (element.name !== name) {
        return element;
      }
    });

    fs.writeFile(
      process.cwd() + "/data/users.json",

      JSON.stringify(filt),

      (writeError) => {
        if (writeError) {
          res.json({
            status: "error",
          });
        } else {
          res.json(filt);
        }
      }
    );
  });
});

app.patch("/users/:name", (req, res) => {
  let { name } = req.params;
  fs.readFile(process.cwd() + "/data/users.json", (readError, data) => {
    const array = JSON.parse(data);

    let filt = array.filter((element) => element.username === name);
    let removed = array.filter((element) => element.username !== name);
    fs.writeFile(
      process.cwd() + "/data/users.json",

      JSON.stringify([
        ...removed,
        {
          username: req.body.username,
          password: filt[0].password,
          uid: filt[0].uid,
        },
      ]),

      (writeError) => {
        if (writeError) {
          res.json({
            status: "error",
          });
        } else {
          res.json([
            ...removed,
            {
              username: req.body.username,
              password: filt.password,
              uid: filt.uid,
            },
          ]);
        }
      }
    );
  });
});

app.get("/", (req, res) => {
  res.json({
    subDomain: "/users",
    method: "GET, POST, DELETE, PATCH",
  });
});

app.listen(8080);
