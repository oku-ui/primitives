import type { Ref } from "vue";
import type { PrimitiveProps } from "../primitive/index.ts";
import { createContext } from "../hooks/createContext.ts";

export interface AvatarProps extends PrimitiveProps { }

export type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface AvatarContext {
    imageLoadingStatus: Ref<ImageLoadingStatus>;
    onImageLoadingStatusChange(status: ImageLoadingStatus): void;
};

export const [provideAvatarContext, useAvatarContext] = createContext<AvatarContext>('Avatar');

