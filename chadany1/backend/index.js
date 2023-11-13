//importuud

import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  fs.readFile(process.cwd() + "/data/users.json", (readError, data) => {
    if (readError) {
      res.status(404).json(readError);
    }
    res.json(JSON.parse(data));
  });
});
app.get("/chatroom/:roomid", (req, res) => {
  const { roomid } = req.params;
  fs.readFile(process.cwd() + "/data/room.json", (readError, data) => {
    const room = JSON.parse(data);

    const toReturn = room.filter((element) => {
      if (element.roomid === +roomid) {
        return element;
      }
    });
    if (readError) {
      res.status(404).json(readError);
    }
    res.json(toReturn);
  });
});
app.get("/users/:name", (req, res) => {
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
app.post("/chatroom/:roomid", (req, res) => {
  const { roomid } = req.params;
  fs.readFile(process.cwd() + "/data/room.json", (readError, data) => {
    if (readError) {
      res.status(404).json(readError);
    }
    const huTao = JSON.parse(data);
    const toReturn = huTao.filter((element) => element.roomid === +roomid);
    // const path = toReturn[0]?.chats;
    // path.push(req.body.chats);
    fs.writeFile(
      process.cwd() + "/data/room.json",
      JSON.stringify(huTao),
      (error) => {
        if (error) {
          res.send("zl");
        }
        res.json(toReturn);
      }
    );
  });
});
app.post("/users", (req, res) => {
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

app.listen(8080);
