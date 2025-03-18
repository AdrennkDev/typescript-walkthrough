import MessageToast from "sap/m/MessageToast";
import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Dialog from "sap/m/Dialog";

/** 
 * @namespace ui5.walkthrough.controller
 */
export default class HelloPanel extends Controller {

	onShowHello(): void {
		// read msg from i18n model
		// functions with generic return values require casting
		const resourceBundle = (this.getView()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
		const recipient = (this.getView()?.getModel() as JSONModel)?.getProperty("/recipient/name");
		const msg = resourceBundle.getText("helloMsg", [recipient]);

		// show message
		MessageToast.show(msg);
	}

	async onOpenDialog(): Promise<void> {
		this.dialog ??= await this.loadFragment({
			name: "ui5.walkthrough.view.HelloDialog"
		}) as Dialog;
		this.dialog.open();
	}

	onCloseDialog(): void {
		// note: We don't need to chain to the pDialog promise, since this event-handler
		// is only called from within the loaded dialog itself.
		(this.byId("helloDialog") as Dialog)?.close();
	}
}