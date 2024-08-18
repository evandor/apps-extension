import Command from "src/core/domain/Command";
import {ExecutionResult} from "src/core/domain/ExecutionResult";
import {AppFeature} from "src/models/AppFeature"


export class DeactivateFeatureCommand implements Command<any> {

  constructor(
    public feature: AppFeature) {
  }


  async execute(): Promise<ExecutionResult<any>> {
    useFeaturesStore().deactivateFeature(this.feature.ident.toLowerCase())
    return Promise.resolve(
      new ExecutionResult(
        "done",
        `Feature ${this.feature.ident.toLowerCase()} was deactivated`))
  }

}

DeactivateFeatureCommand.prototype.toString = function cmdToString() {
  return `DeactivateFeatureCommand: {feature=${this.feature.ident}}`;
};
