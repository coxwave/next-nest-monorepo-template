import {
  INestApplication,
  Module,
  DynamicModule,
  ModuleMetadata,
} from '@nestjs/common';
import { StatusModule } from './status/status.module';
import cookieParser from 'cookie-parser';

declare global {
  namespace Express {
    interface Response {
      body: any;
    }
  }
}

@Module({})
export class AppModule {
  static async getModuleMetadata(): Promise<ModuleMetadata> {
    return {
      imports: [StatusModule],
    };
  }

  static async forRootAsync(): Promise<DynamicModule> {
    const metadata = await AppModule.getModuleMetadata();
    return {
      module: AppModule,
      ...metadata,
    };
  }
}

export async function applyGlobalPipelines(app: INestApplication) {
  // TODO: Logger

  //
  app.use(cookieParser());

  // TODO: Guards
  // const moduleRef = app.get(ModuleRef);
  // const reflector = app.get(Reflector);
  // app.useGlobalGuards();

  return app;
}
