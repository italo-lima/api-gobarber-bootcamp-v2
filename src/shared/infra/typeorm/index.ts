import { createConnections } from 'typeorm';

/* automaticamente irá procurar pelo arquivo
ormconfig.json e fazer conexão com banco postgres e mongo */
createConnections();
