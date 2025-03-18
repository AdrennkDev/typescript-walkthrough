import Controller from "sap/ui/core/mvc/Controller";
import History from "sap/ui/core/routing/History";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import UIComponent from "sap/ui/core/UIComponent";
import ProductRating from "../control/ProductRating";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";

/** 
 * @namespace ui5.walkthrough.controller
 */
export default class Detail extends Controller {

	onInit(): void {
		const viewModel = new JSONModel({
			currency: "EUR"
		});
		this.getView()?.setModel(viewModel, "view");


		const router = UIComponent.getRouterFor(this);
		router.getRoute("detail")?.attachPatternMatched(this.onObjectMatched, this);
	}

	onObjectMatched(event: Route$PatternMatchedEvent): void {

		(this.byId("rating") as ProductRating).reset();

		const sPath = "/" + window.decodeURIComponent((event.getParameter("arguments") as any).invoicePath);
		this.getView()?.bindElement({
			path: sPath,
			model: "invoice"
		})
	}

	onNavBack(): void {
		const history = History.getInstance();
		const previousHash = history.getPreviousHash();

		if (previousHash !== undefined) {
			window.history.go(-1);
		} else {
			const router = UIComponent.getRouterFor(this);
			router.navTo("overview", {}, true)
		}
	}

	onRatingChange(event: ProductRating$ChangeEvent): void {
		const value = event.getParameter("value");
		const resourceBundle = (this?.getView()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;
		const sMessage = resourceBundle.getText("ratingConfirmation", [value]);

		MessageToast.show(sMessage);
	}
}