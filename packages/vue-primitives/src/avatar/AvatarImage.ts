import type { PrimitiveProps } from "../primitive";
import type { ImageLoadingStatus } from "./Avatar";

export interface AvatarImageProps extends PrimitiveProps {
    src?: string
}

// eslint-disable-next-line ts/consistent-type-definitions
export type AvatarImageEmits = {
    loadingStatusChange: [status: ImageLoadingStatus]
}