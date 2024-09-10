import Post from "../models/Post.js";
import { v4 as uuidv4 } from "uuid";
import Comment from "../models/Comment.js";
export const createPost = async (req, res, next) => {
  try {
    const post = new Post({
      Title: "sample title",
      Caption: "sample caption",
      slug: uuidv4(),
      body: {
        type: "doc",
        content: [],
      },
      photo: "",
      user: req.user._id,
    });

    const newPost = await post.save();
    return res.json(newPost);
  } catch (error) {
    next(error);
    console.log(error)
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      const error = new Error("Post not found");
      next(error);
      return;
    }

    const upload = uploadPicture.single("postPicture");

    const handleupdatePostData = async (data) => {
      const { Title, Caption, slug, body, tags, categories } = JSON.parse(data);

      post.Title = Title || post.Title;
      post.Caption = Caption || post.Caption;
      post.slug = slug || post.slug;
      post.body = body || post.body;
      post.tags = tags || post.tags;
      post.categories = categories || post.categories;
      const updatedpost = await post.save();
      return res.json(updatedpost);
    };

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error("An Unknown Erro Occured When Uploading");
        next(error);
      } else {
        if (req.file) {
          let filename;
          filename = post.photo;
          if (filename) {
            fileRemover(filename);
          }
          post.photo = req.file.filename;
          handleupdatePostData(req.body.document);
        } else {
          let filename;
          filename = post.photo;
          post.photo = "";
          fileRemover(filename);
          handleupdatePostData(req.body.document);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });
    if (!post) {
      const error = new Error("Post was not found");
      return next(error);
    }

    await Comment.deleteMany({ post: post._id });

    return res.json({
      message: "Post was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate([
      {
        path: "user",
        select: ["name", "avatar"],
      },
      {
        path: "Comment",
        match: {
          check: true,
          parent: null,
        },
        populate: [
          {
            path: "user",
            select: ["name", "avatar"],
          },
          {
            path: "replies",
            match: {
              check: true,
            },
          },
        ],
      },
    ]);
    if (!post) {
      const error = new Error("Post was not found");
      return next(error);
    }

    return res.json(post);
  } catch (error) {
    next(error);
  }
};

export const getAllpost = async (req, res, next) => {
  try {
    const post = await Post.find({}).populate([{ path: "user", select: ["avatar", "name", "verified"] }]);
    res.json(post);
  } catch (error) {
  next(error);
  }
};
