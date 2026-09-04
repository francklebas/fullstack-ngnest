import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CyclesController } from './cycles/cycles.controller.js';
import { CyclesService } from './cycles/cycles.service.js';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getDbConfig(): TypeOrmModuleOptions {
  const base: Pick<TypeOrmModuleOptions, 'entities' | 'synchronize'> = {
    entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
    synchronize: true,
  };

  // Priorité à DATABASE_URL (compose + .env) – nettoie ?schema=public (syntaxe Prisma)
  const url = process.env.DATABASE_URL?.replace(/\?schema=.*$/, '');
  if (url) {
    return {
      type: 'postgres',
      url,
      ...base,
    };
  }

  return {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'db',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? 'postgres',
    database: process.env.POSTGRES_DB ?? 'nestjs_blueprint',
    ...base,
  };
}

@Module({
  imports: [TypeOrmModule.forRoot(getDbConfig()),
  ],
  controllers: [AppController, CyclesController],
  providers: [AppService, CyclesService],
})
export class AppModule {}
