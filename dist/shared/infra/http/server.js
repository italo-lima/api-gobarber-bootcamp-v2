"use strict";

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _cors = _interopRequireDefault(require("cors"));

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _celebrate = require("celebrate");

var _AppError = _interopRequireDefault(require("../../errors/AppError"));

var _rateLimiter = _interopRequireDefault(require("./middlewares/rateLimiter"));

require("../typeorm");

require("../../container");

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_rateLimiter.default);
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use('/files', _express.default.static(_upload.default.tmpFolder));
app.use(_routes.default);
app.use((0, _celebrate.errors)()); //Global exception handler
// para funcionar, precisa instalar yarn add express-async-errors e chama após o express

app.use((err, req, resp, _) => {
  if (err instanceof _AppError.default) {
    return resp.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.log(err);
  return resp.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
});
app.listen(3333, () => {
  console.log('Server started on port 3333');
});