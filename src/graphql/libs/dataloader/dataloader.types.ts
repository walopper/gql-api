import { Options as DataloaderOptions } from 'dataloader';

export type BatchLoadFn<K, V> = (keys: K) => PromiseLike<ArrayLike<V | Error>>;
export type DataloaderFn<K, V> = (fn: BatchLoadFn<K, V>) => PromiseLike<V>;

export type DecoratorOptions<K, V> = {
    typeOrm?: string;
    dataloader?: DataloaderOptions<K, V>;
};
