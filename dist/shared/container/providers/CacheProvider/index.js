"use strict";

var _tsyringe = require("tsyringe");

var _RedisCacheProvider = _interopRequireDefault(require("./implementations/RedisCacheProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  redis: _tsyringe.container.resolve(_RedisCacheProvider.default)
};

_tsyringe.container.registerInstance('CacheProvider', providers.redis);