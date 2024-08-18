import {useFeaturesStore} from "src/features/stores/featuresStore";
import {FeatureIdent} from "src/app/models/FeatureIdent";

export class SidePanelViews {

  static readonly MAIN = new SidePanelViews('main', '/sidepanel');

  static readonly TABS_LIST = new SidePanelViews('tabsList', '/sidepanel/tabslist',
    () => useFeaturesStore().hasFeature(FeatureIdent.OPEN_TABS));

  static readonly TAG = new SidePanelViews('tag', '/sidepanel/tags');

  static readonly PUBLIC_TABSETS = new SidePanelViews('categorized_tabsets', '/sidepanel/byCategory',
    () => true);

  static readonly MESSAGES = new SidePanelViews('messages', '/sidepanel/messages')

  static readonly ENTITY_MANAGER = new SidePanelViews('entityManager','sidepanel/entityManager')
  static readonly API_MANAGER = new SidePanelViews('apiManager','sidepanel/apiManager')

  private constructor(
    public readonly ident: string,
    public readonly path: any,
    public readonly showButtonFunction: Function = () => true) {
  }

  toString() {
    return this.ident;
  }

  showButton() {
    return this.showButtonFunction()
  }

}
