import type { ComponentType, FC, HTMLAttributes } from "react";

export type Tag = keyof JSX.IntrinsicElements | ComponentType<any>;

export interface HTMLComponent<
  T = unknown,
  O extends keyof HTMLAttributes<HTMLElement> = never
> extends FC<Omit<HTMLAttributes<HTMLElement>, O> & T> {}

export type HTMLComponentProps<T> = Parameters<HTMLComponent<T>>[0];
