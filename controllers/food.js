const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.get("/:userId/foods", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    res.render("foods/index.ejs", {
      foods: currentUser.pantry,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

//=====================================================

// stuuf here are deletable

// router.get("/:userId/crud/author", async (req, res) => {
//   try {
//     const creater = await User.findById(req.params.userId);

//     // console.log(`creater by  story` + createrbystory);
//     res.render("crud/creater.ejs", {
//       stories: creater.stories,
//       creater,
//     });
//   } catch (error) {
//     console.log(error);
//     // res.redirect("/");
//   }
// });

//=====================================================

router.get("/:userId/foods/view", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const chefs = await User.find({});
    res.render("foods/all.ejs", { chefs, currentUser });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:userId/foods/view/:chefId", async (req, res) => {
  try {
    const chef = await User.findById(req.params.chefId);
    const foods = await chef.pantry

    res.render("foods/chef.ejs", { chef ,foods});
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:userId/foods/new", async (req, res) => {
  res.render("foods/new.ejs");
});

router.post("/:userId/foods", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

  
    currentUser.pantry.push(req.body);

    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);

  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:userId/foods/:foodsId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    let userWithStory;
    const users = await User.find({});
    let story = null;
    let compare = 2;

    for (let user of users) {
      story = user.stories.id(req.params.crudId);
      userWithStory = users.find((user) => user.stories.id(req.params.userId));
      if (story) {
        compare = user;
        break;
      }
    }

    compare1 = compare.id;
    compare2 = currentUser.id;

    // const creater = userWithStory.id;

    res.render("crud/show.ejs", {
      story,
      users,
      currentUser,
      compare1,
      compare2,
      compare,
      // creater,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.delete("/:userId/foods/:foodsId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.id(req.params.foodsId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:userId/foods/:foodsId/edit", async (req, res) => {

  try {
    const currentUser = await User.findById(req.session.user._id);
    
      const foods = currentUser.pantry.id(req.params.foodsId);

      res.render("foods/edit.ejs", {
        foods,
      });
   
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
  
});

router.put("/:userId/foods/:foodsId/edit", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
   

    await currentUser.pantry.id(req.params.foodsId).set(req.body);
    await currentUser.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:userId/crud/:crudId/edit/public", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    creater = await User.findOne({
      stories: { $elemMatch: { _id: req.params.crudId } },
    });
    const story = creater.stories.id(req.params.crudId);
    //formattedDate = currentUser.stories.date.toISOString().split("T")[0];

    res.render("crud/editp.ejs", {
      story,
      // formattedDate,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.put("/:userId/crud/:crudId/edit/public", async (req, res) => {
  try {
    // const currentUser = await User.findById(req.session.user._id);
    // await currentUser.stories.id(req.params.crudId).set(req.body);

    creater = await User.findOne({
      stories: { $elemMatch: { _id: req.params.crudId } },
    });
    // const story = creater.stories.id(req.params.crudId);
    await creater.stories.id(req.params.crudId).set(req.body);
    await creater.save();
    res.redirect(`/users/${req.params.userId}/crud/${req.params.crudId}`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});


router.post("/:userId/crud/:crudId/comments", async (req, res) => {
  try {

    const currentUser = await User.findById(req.session.user._id);
    //const creater = await User.findById(req.params.userId);
    
    creater = await User.findOne({
      stories: { $elemMatch: { _id: req.params.crudId } },
    });
storyToComment= creater.stories.id(req.params.crudId)


    console.log(creater)
    console.log("1----------------")
    console.log(storyToComment)


    if(req.body.content!==""){

      const newComment = {
      content: req.body.content,
      author: currentUser.username,
      authId: currentUser.id,
    };

    storyToComment.comments.push(newComment);


    await creater.save();

    res.redirect(`/users/${req.params.userId}/crud/${req.params.crudId}`);
    }
    else{

      res.redirect(`/users/${req.params.userId}/crud/${req.params.crudId}`);
    }
    
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
