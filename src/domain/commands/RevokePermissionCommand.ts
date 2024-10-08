import Command from "src/core/domain/Command";
import {ExecutionResult} from "src/core/domain/ExecutionResult";

class UndoCommand implements Command<boolean> {

  constructor(public permission: string) {
  }

  execute(): Promise<ExecutionResult<boolean>> {
    console.log("execution undo command", this.permission)
    return new GrantPermissionCommand(this.permission).execute()
      .then(res => new ExecutionResult(true, "Permission was granted again"))
  }

}

export class RevokePermissionCommand implements Command<boolean> {

  constructor(public permission: string) {
  }

  async execute(): Promise<ExecutionResult<boolean>> {
    useFeaturesStore().deactivateFeature(this.permission)
    return usePermissionsStore().revokePermission(this.permission)
      .then(() => {

        return new ExecutionResult(
          true,
          "Permission was revoked",
          new UndoCommand(this.permission))
      })
  }

}

RevokePermissionCommand.prototype.toString = function cmdToString() {
  return `RevokePermissionCommand: {permission=${this.permission}}`;
};
