'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Article Schema
 */
var ArticleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  img: {
    type: String,
    required: false,
  },
  video: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  tourStartDate: {
    type: Date,
    required: true,
  },
  overnight: {
    type: Number,

  },
  google: {
    type: String,
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  published: {
    type: Boolean,
    required: false,
    default: false
  },
});

/**
 * Validations
 */
ArticleSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

ArticleSchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
ArticleSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Article', ArticleSchema);
