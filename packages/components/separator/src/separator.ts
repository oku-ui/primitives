import { defineComponent, h, onMounted, ref } from 'vue'
import { Primitive } from '@oku-ui/primitive'

type PrimitiveSeparatorProps = ComponentPropsWithoutRef<typeof Primitive.div>

interface SeparatorProps extends PrimitiveSeparatorProps { }
type SeparatorElement = ElementRef<typeof Primitive.div>

const NAME = 'Separator'

const separator = defineComponent<SeparatorProps>({
    name: NAME,
    inheritAttrs: false,
    setup(props, { attrs, slots, expose }) {
        const inferRef = ref<SeparatorElement>()

        expose({
            inferRef,
        })

        return () => h(Primitive.div, {
            ...attrs,
            ref: inferRef,
        },
            slots.default?.(),
        )
    }
})

const OkuSeparator = separator

export { OkuSeparator, separator }
export type { SeparatorProps }