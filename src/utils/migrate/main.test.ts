import {describe, expect, it} from '@jest/globals';

import {migrate} from '@/utils/migrate/main';


describe('Migrating utils', () => {
  it('does not migrate when `override` is null with `original` being up-to-date', () => {
    const data = migrate({
      original: {
        version: 2,
        data: 'original',
        noteV2: 'v1',
      },
      override: null,
      migrators: [
        {
          toVersion: 1,
          migrate: (old) => ({
            ...old,
            data: 'old',
            note: 'v1',
          }),
        },
        {
          toVersion: 2,
          migrate: (old) => ({
            ...old,
            noteV2: 'v2',
          }),
        },
      ],
      migrateParams: null,
    });

    expect(data.version).toBe(2);
    expect(data.data).toBe('original');
    expect(data.noteV2).toBe('v1');
    expect(data).not.toHaveProperty('note');
  });

  it('does not migrate when `override` is an empty object with `original` being up-to-date', () => {
    const data = migrate({
      original: {
        version: 2,
        data: 'original',
        noteV2: 'v1',
      },
      override: {},
      migrators: [
        {
          toVersion: 1,
          migrate: (old) => ({
            ...old,
            data: 'old',
            note: 'v1',
          }),
        },
        {
          toVersion: 2,
          migrate: (old) => ({
            ...old,
            noteV2: 'v2',
          }),
        },
      ],
      migrateParams: null,
    });

    expect(data.version).toBe(2);
    expect(data.data).toBe('original');
    expect(data.noteV2).toBe('v1');
    expect(data).not.toHaveProperty('note');
  });

  it('migrates when `original` is older and `override` is null', () => {
    const data = migrate({
      original: {
        version: 1,
        data: 'original',
      },
      override: null,
      migrators: [
        {
          toVersion: 1,
          migrate: (old) => ({
            ...old,
            data: 'old',
            note: 'v1',
          }),
        },
        {
          toVersion: 2,
          migrate: (old) => ({
            ...old,
            noteV2: 'v2',
          }),
        },
      ],
      migrateParams: null,
    });

    expect(data.version).toBe(2);
    expect(data.data).toBe('original');
    // @ts-ignore
    expect(data.noteV2).toBe('v2');
  });

  it('migrates when `override` is older with `original` being up-to-date', () => {
    const data = migrate({
      original: {
        version: 2,
        data: 'original',
        noteV2: 'v1',
      },
      override: {
        version: 1,
        data: 'override',
      },
      migrators: [
        {
          toVersion: 1,
          migrate: (old) => ({
            ...old,
            data: 'old',
            note: 'v1',
          }),
        },
        {
          toVersion: 2,
          migrate: (old) => ({
            ...old,
            noteV2: 'v2',
          }),
        },
      ],
      migrateParams: null,
    });

    expect(data.version).toBe(2);
    expect(data.data).toBe('override');
    expect(data.noteV2).toBe('v2');
  });

  it('does not migrate `override` is up-to-date with `original` being up-to-date', () => {
    const data = migrate({
      original: {
        version: 2,
        data: 'original',
        noteV2: 'v1',
      },
      override: {
        version: 2,
        data: 'override',
        noteV2: 'v2 override',
      },
      migrators: [
        {
          toVersion: 1,
          migrate: (old) => ({
            ...old,
            data: 'old',
            note: 'v1',
          }),
        },
        {
          toVersion: 2,
          migrate: (old) => ({
            ...old,
            noteV2: 'v2',
          }),
        },
      ],
      migrateParams: null,
    });

    expect(data.version).toBe(2);
    expect(data.data).toBe('override');
    expect(data.noteV2).toBe('v2 override');
  });
});
