<template>

  <q-btn v-if="props.showSuggestionIcon"
         @click.stop="emits('wasClicked')"
         icon="o_lightbulb"
         class="q-my-xs q-ml-xs q-px-xs"
         flat
         color="warning"
         :size="props.size">
    <q-tooltip class="tooltip">{{ suggestionsLabel() }}</q-tooltip>
  </q-btn>

  <q-btn
         icon="o_view_list"
         :size="props.size"
         class="q-my-xs q-ml-xs q-mr-none q-px-xs"
         flat>
    <q-menu>
      <q-list dense>
        <!--        <q-item dense clickable v-close-popup>-->
        <!--          <q-item-section>new window</q-item-section>-->
        <!--        </q-item>-->

        <SidePanelFooterViewMenuItem :side-panel-view="SidePanelView.ENTITY_MANAGER"
                                     label="Entity Manager"
                                     icon="o_apps"
                                     :size="buttonSize"
                                     tooltip="Define your own Entities to manage"/>
        <SidePanelFooterViewMenuItem :side-panel-view="SidePanelView.API_MANAGER"
                                     label="API Manager"
                                     icon="o_apps"
                                     :size="buttonSize"
                                     tooltip="Access APIs"/>

        <!-- :disable="useUiStore().sidePanelActiveViewIs(SidePanelView.MAIN)" -->
        <SidePanelFooterViewMenuItem :side-panel-view="SidePanelView.MAIN"
                                     label="Default View"
                                     icon=""
                                     :size="buttonSize"
                                     tooltip="Back to Default View"/>

      </q-list>
    </q-menu>
  </q-btn>

<!--  <SidePanelFooterLeftButton-->
<!--    :side-panel-view="SidePanelView.TABS_LIST"-->
<!--    :size="props.size"-->
<!--    icon="o_playlist_add"-->
<!--    tooltip="All your browser's open tabs"/>-->

  <SidePanelFooterLeftButton v-if="unreadMessagesCount > 0"
                             :side-panel-view="SidePanelView.MESSAGES"
                             icon="o_chat"
                             :size="props.size"
                             tooltip="Your messages">
    <q-badge color="red" floating v-if="unreadMessagesCount > 0">{{ unreadMessagesCount }}</q-badge>
  </SidePanelFooterLeftButton>

</template>
<script setup lang="ts">
import {SidePanel, SidePanelView, useUiStore} from "stores/uiStore";
import SidePanelFooterLeftButton from "components/helper/SidePanelFooterLeftButton.vue";
import {usePermissionsStore} from "stores/permissionsStore";
import {useSuggestionsStore} from "stores/suggestionsStore";
import {ref, watchEffect} from "vue";
import {SuggestionState} from "src/models/Suggestion";
import SidePanelFooterViewMenuItem from "components/helper/SidePanelFooterViewMenuItem.vue";

const props = defineProps({
  showSuggestionIcon: {type: Boolean, required: true},
  size: {type: String, default: "10px"}
})

const emits = defineEmits(['wasClicked'])

const buttonSize = ref('15px')
const unreadMessagesCount = ref(0)
const animateBookmarksButton = ref(false)

watchEffect(() => {
  buttonSize.value = useUiStore().getButtonSize('sidePanelFooter')
})


watchEffect(() => {
  animateBookmarksButton.value = useUiStore().animateBookmarksButton
})

const suggestionsLabel = () => {
  const suggestions = useSuggestionsStore().getSuggestions([SuggestionState.NEW, SuggestionState.DECISION_DELAYED])
  return suggestions.length === 1 ?
    suggestions.length + " New Suggestion" :
    suggestions.length + " New Suggestions"

}

</script>

<script setup lang="ts">
</script>
