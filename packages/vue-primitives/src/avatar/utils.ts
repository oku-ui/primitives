import { shallowRef, watch, type Ref } from "vue";
import type { ImageLoadingStatus } from "./Avatar";
import type { AvatarImageProps } from "./AvatarImage";
import { isClient } from "@vueuse/core";

export function useImageLoadingStatus(src: Ref<AvatarImageProps['src']> | (() => AvatarImageProps['src'])) {
    const loadingStatus = shallowRef<ImageLoadingStatus>('idle');

    watch(src, (value, _, onCleanup) => {
        if (!isClient) return

        if (!value) {
            loadingStatus.value = 'error'
            return;
        }

        let isMounted = true;
        const image = new window.Image();

        const updateStatus = (status: ImageLoadingStatus) => () => {
            if (!isMounted) return;
            loadingStatus.value = status
        };

        loadingStatus.value = 'loaded'
        // TODO: fix onload
        image.onload = updateStatus('loaded');
        image.onerror = updateStatus('error');
        image.src = value;

        onCleanup(() => {
            isMounted = false;
        })
    }, {
        immediate: true
    });

    return loadingStatus;
}