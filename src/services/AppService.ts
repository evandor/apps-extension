import {usePermissionsStore} from "stores/permissionsStore";
import ChromeListeners from "src/services/ChromeListeners";
import IndexedDbPersistenceService from "src/services/IndexedDbPersistenceService";
import {useDB} from "src/services/usePersistenceService";
import ChromeApi from "src/services/ChromeApi";
import {useSettingsStore} from "stores/settingsStore";
import {Router} from "vue-router";
import {useAppStore} from "stores/appStore";
import PersistenceService from "src/services/PersistenceService";
import {useUiStore} from "stores/uiStore";
import {useFeaturesStore} from "src/features/stores/featuresStore";
import {useEntitiesStore} from "src/apps/stores/entitiesStore";
import {useApisStore} from "src/apps/stores/apisStore";

class AppService {

  router: Router = null as unknown as Router
  initialized = false

  async init(quasar: any, router: Router, forceRestart = false) {

    console.log(`%cinitializing AppService: first start=${!this.initialized}, forceRestart=${forceRestart}, quasar set=${quasar !== undefined}, router set=${router !== undefined}`, forceRestart ? "font-weight:bold" : "")

    if (this.initialized && !forceRestart) {
      console.debug("stopping AppService initialization; already initialized and not forcing restart")
      return Promise.resolve()
    }

    if (this.initialized) {
      await ChromeListeners.resetListeners()
    }

    this.initialized = true

    const appStore = useAppStore()
    const settingsStore = useSettingsStore()
    const uiStore = useUiStore()
    this.router = router

    uiStore.appLoading = "loading bookmrkx..."

    appStore.init()

    // init of stores and some listeners
    await usePermissionsStore().initialize(useDB(quasar).localDb)
    await ChromeListeners.initListeners()

    settingsStore.initialize(quasar.localStorage);

    // init db
    await IndexedDbPersistenceService.init("db")

    // init services
    // useSuggestionsStore().init(useDB(undefined).db)

    await this.initCoreSerivces(quasar, useDB(undefined).db, this.router)

  }

  private async initCoreSerivces(quasar: any, store: PersistenceService, router: Router) {
    ChromeApi.init(router)

    /**
     * features store: passing storage for better testing.
     * make sure features are not used before this line in code.
     */
    await useFeaturesStore().initialize(useDB(quasar).featuresLocalStorage)

    await useEntitiesStore().initialize(useDB().indexedDbAppsPersistence)
    await useApisStore().initialize(useDB().indexedDbAppsPersistence)

    useUiStore().appLoading = undefined
  }

}

export default new AppService();

