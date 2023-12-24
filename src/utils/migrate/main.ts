import {Migratable, MigrateOpts} from '@/types/migrate';
import {cloneMerge} from '@/utils/object/cloneMerge';


export const migrate = <TMigratable extends Migratable, TParams>({
  original,
  override,
  migrators,
  migrateParams,
}: MigrateOpts<TMigratable, TParams>) => {
  const latestVersion = migrators.length;
  if (!latestVersion) {
    throw new Error('`migrators` should have at least 1 migrator');
  }

  if (override === null && original.version >= latestVersion) {
    return original;
  }

  let data: MigrateOpts<TMigratable, TParams>['original'] = cloneMerge(original, override);
  let migratedVersion = original.version;

  for (const singleMigrator of migrators.sort((a, b) => a.toVersion - b.toVersion)) {
    if ((override?.version ?? original.version) >= singleMigrator.toVersion) {
      continue;
    }

    data = singleMigrator.migrate(data, migrateParams);
    migratedVersion = singleMigrator.toVersion;
  }

  return {
    ...data,
    version: migratedVersion,
  } satisfies MigrateOpts<TMigratable, TParams>['original'];
};
