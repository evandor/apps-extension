import IndexedDbPersistenceService from "src/services/IndexedDbPersistenceService";
import {QVueGlobals, useQuasar} from "quasar";
import {LocalStoragePersistenceService} from "src/services/storage/LocalStoragePersistenceService";
import PersistenceService from "src/services/PersistenceService";
import FeaturesPersistence from "src/features/persistence/FeaturesPersistence";
import {LocalStorageFeaturesPersistence} from "src/features/persistence/LocalStorageFeaturesPersistence";
import AppsPersistence from "src/apps/persistence/AppsPersistence";
import IndexedDbAppsStorage from "src/apps/persistence/IndexedDbAppsStorage";

export function useDB(quasar: QVueGlobals | undefined = undefined) {

  const db: PersistenceService = IndexedDbPersistenceService

  var localDb = undefined as unknown as PersistenceService

  var indexedDbAppsPersistence = IndexedDbAppsStorage


  let featuresLocalStorage: FeaturesPersistence = undefined as unknown as FeaturesPersistence
  if (quasar) {
    localDb = new LocalStoragePersistenceService(quasar)
    featuresLocalStorage = new LocalStorageFeaturesPersistence(quasar)
  }

  return {
    db, localDb, featuresLocalStorage, indexedDbAppsPersistence
  }

}
