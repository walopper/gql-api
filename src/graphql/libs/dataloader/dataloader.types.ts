import { Options as DataloaderOptions } from 'dataloader';

export type BatchLoadFn<K, V> = (keys: K) => PromiseLike<ArrayLike<V | Error>>;
export type DataloaderFn<K, V> = (fn: BatchLoadFn<K, V>) => PromiseLike<V>;

export type BatchLoadRelayedFn<K, V> = (keys: K) => PromiseLike<[ArrayLike<V | Error>, number][]>;
export type DataloaderRelayedFn<K, V> = (fn: BatchLoadRelayedFn<K, V>) => PromiseLike<[V[], number]>;

export type DecoratorOptions<K, V> = {
    autoRelay?: boolean;
    typeORM?:
        | boolean
        | {
              pivotTableEntity: Function;
          };
    dataloader?: DataloaderOptions<K, V>;
};
