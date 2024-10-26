<script setup lang="tsx">
import Animated from '../../../packages/core/src/dialog/stories/Animated.vue'
import Controlled from '../../../packages/core/src/dialog/stories/Controlled.vue'
import CustomFocus from '../../../packages/core/src/dialog/stories/CustomFocus.vue'
import FocusTrap from '../../../packages/core/src/dialog/stories/FocusTrap.vue'
import InnerScrollable from '../../../packages/core/src/dialog/stories/InnerScrollable.vue'
import NoEscapeDismiss from '../../../packages/core/src/dialog/stories/NoEscapeDismiss.vue'
import NonModal from '../../../packages/core/src/dialog/stories/NonModal.vue'
import NoPointerDownOutsideDismiss from '../../../packages/core/src/dialog/stories/NoPointerDownOutsideDismiss.vue'
import OuterScrollable from '../../../packages/core/src/dialog/stories/OuterScrollable.vue'
import Styled from '../../../packages/core/src/dialog/stories/Styled.vue'
import WithPortalContainer from '../../../packages/core/src/dialog/stories/WithPortalContainer.vue'
</script>

<template>
  <DemoList>
    <Demo title="Styled">
      <Styled />
    </Demo>
    <Demo title="NonModal">
      <NonModal />
    </Demo>
    <Demo title="Controlled">
      <Controlled />
    </Demo>
    <Demo title="FocusTrap">
      <FocusTrap />
    </Demo>
    <Demo title="CustomFocus">
      <CustomFocus />
    </Demo>
    <Demo title="NoEscapeDismiss">
      <NoEscapeDismiss />
    </Demo>
    <Demo title="NoPointerDownOutsideDismiss">
      <NoPointerDownOutsideDismiss />
    </Demo>
    <Demo title="WithPortalContainer">
      <WithPortalContainer />
    </Demo>
    <Demo title="Animated">
      <Animated />
    </Demo>
    <Demo title="InnerScrollable">
      <InnerScrollable />
    </Demo>
    <Demo title="OuterScrollable">
      <OuterScrollable />
    </Demo>
  </DemoList>
</template>
