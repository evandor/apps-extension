<template>

  <q-footer
      class="q-pa-xs q-mt-sm darkInDarkMode brightInBrightMode" style="border-top: 1px solid lightgrey"
      :style="offsetBottom()">


    <div class="row fit">
      <div class="col-6">

        <Transition name="fade" appear>
          <q-banner
              v-if="checkToasts()"
              inline-actions dense rounded
              style="font-size: smaller;text-align: center"
              :class="toastBannerClass()">
            {{ useUiStore().toasts[0]?.msg }}
            <template v-slot:action v-if="useUiStore().toasts[0]?.action">
              <q-btn flat label="Undo"
                     @click="useUiStore().callUndoActionFromCurrentToast()"/>
            </template>
          </q-banner>
        </Transition>

        <template v-if="!checkToasts() && useUiStore().progress">
          <q-linear-progress size="25px" :value="progressValue">
            <div class="absolute-full flex flex-center">
              <q-badge :label="progressLabel"/>
            </div>
          </q-linear-progress>
        </template>

        <SidePanelFooterLeftButtons
          @was-clicked="doShowSuggestionButton = true"
          :size="getButtonSize()"
          :show-suggestion-icon="false"/>


      </div>
      <div class="col text-right">



        <q-btn icon="o_settings"
               class="q-my-xs q-px-xs q-mr-none"
               :class="{ shake: animateSettingsButton }"
               flat
               :size="getButtonSize()"
               @click="openOptionsPage()">
          <q-tooltip class="tooltip" anchor="top left" self="bottom left">{{ settingsTooltip() }}</q-tooltip>
        </q-btn>

        <!--        <q-btn-->
        <!--          icon="show_chart"-->
        <!--          :class="rightButtonClass()"-->
        <!--          flat-->
        <!--          :size="getButtonSize()"-->
        <!--          @click="toggleShowStatsTable()">-->
        <!--          <q-tooltip class="tooltip" anchor="top left" self="bottom left">Show Stats</q-tooltip>-->
        <!--        </q-btn>-->

      </div>
    </div>

  </q-footer>
</template>
<script setup lang="ts">
import {SidePanelView, useUiStore} from "src/stores/uiStore";
import {onMounted, ref, watch, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import NavigationService from "src/services/NavigationService";
import {openURL, uid, useQuasar} from "quasar";
import {ToastType} from "src/models/Toast";
import SidePanelFooterLeftButtons from "components/helper/SidePanelFooterLeftButtons.vue";
import {useFeaturesStore} from "src/features/stores/featuresStore";
import {FeatureIdent} from "src/models/FeatureIdent";

const $q = useQuasar()

const router = useRouter()

const showSuggestionButton = ref(false)
const doShowSuggestionButton = ref(false)
const transitionGraceTime = ref(false)
const showWindowTable = ref(false)
const showLogin = ref(false)
const randomKey = ref<string>(uid())
const progressValue = ref<number>(0.0)
const progressLabel = ref<string>('')
const animateSettingsButton = ref<boolean>(false)

onMounted(() => {
  if (useFeaturesStore().hasFeature(FeatureIdent.WINDOWS_MANAGEMENT)) {
    windowRows.value = calcWindowRows()
  }
})

watchEffect(() => {
  showLogin.value = false//useUiStore().showLoginTable
})

watchEffect(() => {
  animateSettingsButton.value = useUiStore().animateSettingsButton
})



const openOptionsPage = () => {
  ($q.platform.is.cordova || $q.platform.is.capacitor) ?
      //Browser.open({ url: 'http://capacitorjs.com/' }).catch((err) => console.log("error", err)) :
      router.push("/settings") :
      NavigationService.openOrCreateTab([chrome.runtime.getURL('www/index.html#/mainpanel/settings')], undefined, [], true, true)
}

const settingsTooltip = () => {
  return "Open Settings of Bookmrkx " + import.meta.env.PACKAGE_VERSION
}

const rightButtonClass = () => "q-my-xs q-px-xs q-mr-none"



const checkToasts = () => {
  if (useUiStore().toasts.length > 0) {
    const useDelay = 3000
    useUiStore().delayedToastRemoval(useDelay)
    const oldShowButton = showSuggestionButton.value
    const oldDoShowButton = doShowSuggestionButton.value
    transitionGraceTime.value = true
    showSuggestionButton.value = false
    doShowSuggestionButton.value = false
    setTimeout(() => {
      if (useUiStore().toasts.length === 0) { // only if all toasts are gone
        transitionGraceTime.value = false
        showSuggestionButton.value = oldShowButton
        doShowSuggestionButton.value = oldDoShowButton
      }
    }, useDelay + 1100) // must be higher than css value in fade-leave-active

    return true
  }
  return false
}

const getButtonSize = () => useUiStore().getButtonSize('sidePanelFooter')

const toastBannerClass = () => {
  const defaults = " text-white q-py-none"
  switch (useUiStore().toasts[0]?.type) {
    case ToastType.INFO:
      return "bg-positive" + defaults
    case ToastType.WARNING:
      return "bg-warning" + defaults
    case ToastType.ERROR:
      return "bg-negative" + defaults
    default:
      return "bg-negative" + defaults
  }
}

const offsetBottom = () => ($q.platform.is.capacitor || $q.platform.is.cordova) ? 'margin-bottom:20px;' : ''
</script>

<style>
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-leave-active {
  transition: opacity 1.0s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
