"use strict";

var _typeorm = require("typeorm");

/* automaticamente irá procurar pelo arquivo
ormconfig.json e fazer conexão com banco postgres e mongo */
(0, _typeorm.createConnections)();