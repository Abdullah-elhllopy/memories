const postMessage = require('../model/postMessage');
const factory = require('./handlerFactory');

exports.getAllBlogPosts  = factory.getAll(postMessage);
exports.addBlogPost = factory.createOne(postMessage);
exports.getSinglePost = factory.getOne(postMessage);
exports.updateSingleBlogPost = factory.updateOne(postMessage);
exports.removeSingleBlogPost = factory.deleteOne(postMessage);
exports.likeBlogPost  = factory.likeBlogPost(postMessage)

