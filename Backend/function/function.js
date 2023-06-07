const knex = require("../database/db");
const bcrypt = require("bcrypt");
const { query } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// email validation
async function Validation(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Invalid Email";
  }

  const user = await knex("users").where({ email }).first();

  if (user) {
    return false;
  } else {
    return true;
  }
}

// register users
async function postUser(name, email, password) {
  try {
    new Date();
    const user = await knex("users").insert({
      name,
      email,
      password,
      created_at: new Date(),
    });
    // return user;
    let jwtSecretkey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      userData: user,
    };
    const token = jwt.sign(data, jwtSecretkey);
    return { message: "Register Successfull", token: token };
  } catch (err) {
    throw new Error(err);
  }
}

// async function getUser() {
//   try {
//     const user = await knex("users")
//     .join("profile", "profile.id", "=", "users.id")
//       .select(
//         "users.id",
//         "users.name",
//         "users.email",
//         "users.password",
//         "profile.hobbies"
//       )
//     let tempValue = user.hobbies;
// console.log(tempValue, "165")
//     tempValue = JSON.stringify(tempValue);
//     user.hobbies = tempValue;
//     return user;
//   } catch (err) {
//     throw new Error(err);
//   }
// }

// put users
async function putUser(id, name, email, hashedPassword) {
  try {
    const user = await knex("users")
      .update({ name, email, hashedPassword })
      .where({ id });
    return user;
  } catch (err) {
    throw new Error(err);
  }
}

//delete users
async function deleteUser(id) {
  try {
    const user = await knex("users").del().where({ id });
    return user;
  } catch (err) {
    throw new Error(err);
  }
}

// Login API
async function LoginApi(name, password) {
  try {
    const user = await knex("users")
      .where("name", "like", `%${name}%`)
      .orWhere("email", "like", `%${name}%`)
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Invalid password");
    } else {
      let jwtSecretkey = process.env.JWT_SECRET_KEY;
      let data = {
        time: Date(),
        userData: user,
      };
      const token = jwt.sign(data, jwtSecretkey);
      return { message: "Login Successfull", token: token };
    }
  } catch (err) {
    throw new Error(err);
  }
}

//profile get
async function profileGet() {
  try {
    const users = await knex("profile").first();
    // let tempValue = users.hobbies;
    // console.log(users.hobbies, "110")
    // tempValue = JSON.stringify(tempValue);
    // users.hobbies = tempValue;
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Error retriving users from database");
  }
}

//profile create
async function profilePost(name, email, hobbies) {
  try {
    new Date();
    const users = await knex("profile").insert({
      name,
      email,
      hobbies: JSON.stringify(hobbies),
      created_at: new Date(),
    });
    return users;
  } catch (err) {
    throw new Error("Profile was not created");
  }
}

//simple profile update
async function profilePut(id, name, email, hobbies) {
  try {
    new Date();
    const users = await knex("profile")
      .where({ id })
      .update({
        name,
        email,
        hobbies: JSON.stringify(hobbies),
        updated_at: new Date(),
      });
    return users;
  } catch (err) {
    return err;
  }
}

// Profile get with two table
async function listGet() {
  try {
    const users = await knex("users")
      .join("profile", "profile.id", "=", "users.id")
      .select(
        "users.id",
        "users.name",
        "users.email",
        "users.password",
        "profile.hobbies"
      )
      .first();
    let tempValue = users.hobbies;
    // console.log(tempValue, "165")
    tempValue = JSON.parse(tempValue);
    users.hobbies = tempValue;
    return users;
  } catch (err) {
    return err;
  }
}

//Profile update
async function listPut(id, name, email, hobbies) {
  try {
    const result = await knex("users").where("users.id", "=", id).update({
      "users.name": name,
      "users.email": email,
      "users.updated_at": new Date(),
    });

    const profileResult = await knex("profile")
      .where("profile.id", "=", id)
      .update({
        hobbies: JSON.stringify(hobbies),
        updated_at: new Date(),
      });

    if (result && profileResult) {
      return res.status(200).json({ message: "User updated successfully." });
    } else {
      return res.status(400).json({ message: "User update failed." });
    }
  } catch (err) {
    return err;
  }
}

// post feedback
async function feedback(name, email, message) {
  try {
    const data = await knex("fdback").insert({ name, email, message });
    return data;
  } catch (err) {
    return err;
  }
}

// listing users
async function ListingUsers(page = 1, limit = 10, searchQuery) {
  try {
    const offset = (page - 1) * limit;
    let query = knex("users")
      .join("profile", "users.id", "=", "profile.id")
      .select("*")
      .limit(limit)
      .offset(offset);

    let queryCount = knex("users").count("users.id as totalUserCount").join("profile", "users.id", "=", "profile.id").first();
    // console.log(queryCount)

    if (searchQuery) {
      query = query.where("name", "like", `%${searchQuery}%`);
      query = query.orWhere("email", "like", `%${searchQuery}%`);
      queryCount = queryCount.where("name", "like", `%${searchQuery}%`);
      queryCount = queryCount.orWhere("email", "like", `%${searchQuery}%`);
      query = query.where("email", "like", `%${searchQuery}%`);
      query = query.orWhere("hobbies", "like", `%${searchQuery}%`);
      queryCount = queryCount.where("email", "like", `%${searchQuery}%`);
      queryCount = queryCount.orWhere("hobbies", "like", `%${searchQuery}%`);
    }

    let users = await query;
    users = users.map(row => (row.hobbies = JSON.parse(row.hobbies), row));
    // console.log(users, "254")
    const totalUser = await queryCount;
    const finalData = {};
    finalData["totalUser"] = totalUser.totalUserCount;
    finalData["users"] = users;
    return finalData;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  Validation,
  postUser,
  // getUser,
  putUser,
  deleteUser,
  LoginApi,
  profileGet,
  profilePost,
  profilePut,
  listGet,
  listPut,
  feedback,
  ListingUsers,
};
