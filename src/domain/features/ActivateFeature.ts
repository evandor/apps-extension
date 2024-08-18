import Command from "src/core/domain/Command";
import {ExecutionResult} from "src/core/domain/ExecutionResult";
import {AppFeature} from "src/models/AppFeature"


export class ActivateFeatureCommand implements Command<any> {

  constructor(
    public feature: AppFeature) {
  }


  async execute(): Promise<ExecutionResult<any>> {
    console.log("this.feature", this.feature.ident.toLowerCase())
    useFeaturesStore().activateFeature(this.feature.ident.toLowerCase())
    return Promise.resolve(
      new ExecutionResult(
        "done",
        `Feature ${this.feature.ident.toLowerCase()} was activated`))
  }

}

ActivateFeatureCommand.prototype.toString = function cmdToString() {
  return `ActivateFeatureCommand: {feature=${this.feature.ident}}`;
};
