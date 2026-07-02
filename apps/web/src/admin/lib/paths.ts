// Dot-path helpers for the schema-driven page editors. Documents are plain
// JSON (objects/arrays/primitives), so a tiny immutable get/set is enough.
import type { FieldSpec } from '../pageSchemas';

export function getAt(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, seg) => {
    if (acc == null || typeof acc !== 'object') return undefined;
    return (acc as Record<string, unknown>)[seg];
  }, obj);
}

/** Immutable set: clones every object along `path`, leaves siblings shared. */
export function setAt<T>(obj: T, path: string, value: unknown): T {
  const segs = path.split('.');
  const clone = (node: unknown, i: number): unknown => {
    if (i === segs.length) return value;
    const key = segs[i];
    const base =
      node != null && typeof node === 'object'
        ? node
        : {};
    if (Array.isArray(base)) {
      const arr = [...base];
      arr[Number(key)] = clone(arr[Number(key)], i + 1);
      return arr;
    }
    return { ...(base as Record<string, unknown>), [key]: clone((base as Record<string, unknown>)[key], i + 1) };
  };
  return clone(obj, 0) as T;
}

/** Blank item for a repeater "add" action, derived from its field specs. */
export function emptyItem(fields: FieldSpec[]): Record<string, unknown> {
  const item: Record<string, unknown> = {};
  for (const f of fields) {
    switch (f.kind) {
      case 'toggle':
        item[f.path] = false;
        break;
      case 'stringList':
      case 'repeater':
        item[f.path] = [];
        break;
      default:
        item[f.path] = '';
    }
  }
  return item;
}
