import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Controller from "sap/ui/core/mvc/Controller";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

export default {
  statusText(this: Controller, status: "A" | "B" | "C"): string | undefined {
    const resourceBundle = (this?.getOwnerComponent()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;

    const oStatus = {
      A: "invoiceStatusA",
      B: "invoiceStatusB",
      C: "invoiceStatusC"
    }

    return resourceBundle.getText(oStatus[status]) || undefined;
  }
}