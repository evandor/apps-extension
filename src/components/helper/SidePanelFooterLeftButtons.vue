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

  <SidePanelFooterLeftButton
    :side-panel-view="SidePanelViews.API_MANAGER"
    :size="props.size"
    icon="o_api"
    tooltip="API Manager"/>

  <SidePanelFooterLeftButton
    :side-panel-view="SidePanelViews.ENTITY_MANAGER"
    :size="props.size"
    icon="o_apps"
    tooltip="Entity Manager"/>

  <SidePanelFooterLeftButton
    :side-panel-view="SidePanelViews.MASTER_DATA_MANAGER"
    :size="props.size"
    icon="o_dataset"
    tooltip="Master Data Manager"/>

  <SidePanelFooterLeftButton v-if="unreadMessagesCount > 0"
                             :side-panel-view="SidePanelViews.MESSAGES"
                             icon="o_chat"
                             :size="props.size"
                             tooltip="Your messages">
    <q-badge color="red" floating v-if="unreadMessagesCount > 0">{{ unreadMessagesCount }}</q-badge>
  </SidePanelFooterLeftButton>

</template>
<script setup lang="ts">
import {useUiStore} from "src/ui/stores/uiStore";
import {useSuggestionsStore} from "stores/suggestionsStore";
import {ref, watchEffect} from "vue";
import {SuggestionState} from "src/models/Suggestion";
import {SidePanelViews} from "src/models/SidePanelViews";
import SidePanelFooterLeftButton from "src/ui/components/SidePanelFooterLeftButton.vue";

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
