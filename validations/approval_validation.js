const { body } = require('express-validator');

const request_approval_validation_rules = [
//   body('user_id').isMongoId(),
  body('request_reason').isString(),
];

const approve_request_validation_rules = [
  body('approval_id').isMongoId(),
//   body('status').isIn(['approved', 'rejected']),
];

module.exports = { request_approval_validation_rules, approve_request_validation_rules };
