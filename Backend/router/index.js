const express = require("express");
const router = express.Router();
const hashedPassword =
  "$2b$10$V7ZUhYwQBlWzjx/NxlyxKObJnmsCK9XWdGtL1RlOZtvYd70m7rmDu";
const bcrypt = require("bcrypt");
const {
  Validation,
  postUser,
  // getUser,
  putUser,
  deleteUser,
  LoginApi,
  profileGet,
  profilePut,
  profilePost,
  listGet,
  listPut,
  feedback,
  ListingUsers
} = require("../function/function");
const VarifyUserToken = require("../auth/auth");
const knex = require("../database/db");

router.post("/post/create", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailRegex = await Validation(email);

    const hashedPassword = await bcrypt.hash(password, 10);

    if (emailRegex) {
      const data = await postUser(name, email, hashedPassword);
      res
        .status(201)
        .json({ status: true, message: "create Success", data: data });
    } else {
      res.status(201).json({ status: false, message: "Something went wrong" });
    }
  } catch (err) {
    res.status(500).json({ status: false, err: err.message });
  }
});

// router.get("/get/users", VarifyUserToken, async (req, res) => {
//   try {
//     const page = parseInt(req.body.page) || 1;
//     const limit = parseInt(req.body.limit) || 10; 
    
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
//     const users = await getUser();
//     const paginatedUsers = users.slice(startIndex, endIndex);
//     const totalPages = Math.ceil(users.length / limit);
//     console.log(paginatedUsers, "52");
//     res.json({
//       totalPages,
//       currentPage: page,
//       users: paginatedUsers,
//     });
//   } catch (err) {
//     res.status(500).json({ status: false, err: err.message });
//   }
// });

router.put("/put/users", async (req, res) => {
  try {
    const { id, name, email, hashedPassword } = req.body;
    const data = await putUser(id, name, email, hashedPassword);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ status: false, err: err.message });
  }
});

router.delete("/delete/users", async (req, res) => {
  try {
    const { id } = req.body;
    const data = await deleteUser(id);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ status: false, err: err.message });
  }
});

router.post("/post/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const data = await LoginApi(name, password);
    res.status(201).json(data);
  } catch (err) {
    res.status(401).json({ status: false, err: err.message });
  }
});

router.get("/get/profile", async (req, res) => {
  try {
    const users = await profileGet();
    res.status(201).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, err: "Error retriving error" });
  }
});

router.post("/post/profile", async (req, res) => {
  try {
    const { name, email, hobbies } = req.body;
    const users = await profilePost(name, email, hobbies);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: users,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: false, message: "Profile was not cretated" });
  }
});

router.put("/put/profile", async (req, res) => {
  try {
    const { id, name, email, hobbies } = req.body;
    const users = await profilePut(id, name, email, hobbies);
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json({ status: false, err: err.message });
  }
});

router.get("/get/listprofile", VarifyUserToken, async (req, res) => {
  try {
    const users = await listGet();
    res.status(201).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
});

// router.put('/profile/update', async (req, res) => {
//   const {id, name, email, hobbies } = req.body;

//   try {
//     const result = await listPut(id, name, email, hobbies);

//     if (result) {
//       res.json({ success: true, message: 'Profile data updated successfully' });
//     } else {
//       res.status(404).json({ success: false, message: 'Profile not found' });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Unable to update profile data' });
//   }
// });

router.put("/profile/put", async (req, res) => {
  try {
    //   const { id } = req.params;
    const { id, name, email, hobbies } = req.body;

    const result = await listPut(id, name, email, hobbies);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/post/feedback", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const data = await feedback(name, email, message);
    res.status(201).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: "feedback not send", err: err });
  }
});

router.post('/listing/users', async (req, res) => {
  try {
    const { page, limit, searchQuery } = req.body;
    const users = await ListingUsers(page, limit, searchQuery);
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
