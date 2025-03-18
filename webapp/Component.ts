import UIComponent from "sap/ui/core/UIComponent";
import Device from "sap/ui/Device";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace ui5.walkthrough
 */
export default class Component extends UIComponent {
	public static metadata = {
		interfaces: ["sap.ui.core.IAsyncContentCreation"],
		"manifest": "json"
	};

	init(): void {
		// call the init function of the parent
		super.init();

		// set the data model
		const data = {
			recipient: {
				name: "World",
			},
		};

		const dataModel = new JSONModel(data);
		this.setModel(dataModel);

		// set device model
		const deviceModel = new JSONModel(Device);
		deviceModel.setDefaultBindingMode("OneWay");
		this.setModel(deviceModel, "device");

		// create the views based on the url/hash
		this.getRouter().initialize();
	}

	getContentDensityClass(): string {
		return Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact";
	}
}
