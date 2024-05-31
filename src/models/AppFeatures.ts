import _ from "lodash"
import {Feature} from "src/features/models/Feature";
import {FeatureIdent, FeatureType} from "src/models/FeatureIdent";

export class AppFeatures {
  features: Feature[] = [

    new Feature(FeatureIdent.DEV_MODE, FeatureType.INTERNAL, "Developer Mode",
      "A feature toggle to switch between dev mode on/off", "", "", ['all']),

  ]

  getFeature(f: FeatureIdent): Feature | undefined {
    const found = _.filter(this.features, (feature: Feature) => feature.ident === f)
    if (found && found.length > 0) {
      return found[0]
    }
    return undefined
  }

  getFeatures(): Feature[] {
    return this.features
  }
}
