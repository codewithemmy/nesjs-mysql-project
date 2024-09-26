import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions & { cli: any } = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'user_product_db',
  entities: [User, Product],
  synchronize: true,
  migrations: ['src/migration/**/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
};

export default config;
