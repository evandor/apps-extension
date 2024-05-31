<template>

  <q-toolbar class="text-primary">
    <div class="row fit">
      <div class="col-xs-12 col-md-9">
        <q-toolbar-title>
          <div class="row justify-start items-baseline">
            <div class="col-1">
              {{ drawerLabel() }}
            </div>
          </div>
        </q-toolbar-title>
      </div>
      <div class="col-xs-12 col-md-3 q-ma-none q-mt-sm text-right">

        <q-icon
          v-if="!route.path.startsWith('/sidepanel/')"
          class="cursor-pointer" size="2em"
          name="chevron_right" @click="closeRightDrawer()">
          <q-tooltip class="tooltip">Hide this view</q-tooltip>
        </q-icon>

      </div>
    </div>
  </q-toolbar>

  <div class="row greyBorderTop"></div>


  <Features v-if="tab ===  DrawerTabs.FEATURES"/>

  <div v-else>unknown tab name '{{ tab }}' {{ typeof tab }}</div>

</template>

<script lang="ts" setup>
import {ref, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {DrawerTabs, useUiStore} from "src/stores/uiStore";
import Features from "src/features/components/Features.vue";

const route = useRoute()

const tab = ref<DrawerTabs>(useUiStore().rightDrawer.activeTab)
const filter = ref<string>('')

const showOnlyFolders = ref(true)

const toggleShowOnlyFolders = () => {
  showOnlyFolders.value = !showOnlyFolders.value
}

watchEffect(() => tab.value = useUiStore().rightDrawer.activeTab)

const drawerLabel = () => {
  switch (tab.value) {
    case DrawerTabs.FEATURES:
      return "Additional Features"
    default:
      return tab.value
  }
}

const cancelFilter = () => {
  console.log("cancelFilter")
  filter.value = ''
}
const setFilter2 = (newVal: string) => {
  console.log("newVal2", newVal)
  filter.value = newVal
}
// const closeCurrentView = () => useUiService().closeCurrentView()
const closeRightDrawer = () => useUiStore().rightDrawerOpen = false

</script>


