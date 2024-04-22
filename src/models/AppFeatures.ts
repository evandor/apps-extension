import _ from "lodash"
import {AppFeature, FeatureIdent, FeatureType} from "src/models/AppFeature"

export class AppFeatures {
  features: AppFeature[] = [
    //new AppFeature(FeatureIdent.WINDOWS_MANAGEMENT, FeatureType.RECOMMENDED, 'Windows Management', 'grid_view', ['bex']),
    new AppFeature(FeatureIdent.ENTITY_MANAGER, FeatureType.EXPERIMENTAL, 'Entity Management', 'o_apps', ['all']),
    new AppFeature(FeatureIdent.API_MANAGER, FeatureType.EXPERIMENTAL, 'API Management', 'o_apps', ['all'])


  ]

  getFeature(f: FeatureIdent): AppFeature | undefined {
    const found = _.filter(this.features, (feature: AppFeature) => feature.ident === f)
    if (found && found.length > 0) {
      return found[0]
    }
    return undefined
  }

  getFeatures(): AppFeature[] {
    return this.features
  }
}
