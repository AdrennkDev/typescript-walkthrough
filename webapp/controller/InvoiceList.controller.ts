import { SearchField$SearchEvent } from "sap/m/SearchField";
import Controller from "sap/ui/core/mvc/Controller";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import JSONModel from "sap/ui/model/json/JSONModel";
import ListBinding from "sap/ui/model/ListBinding";
import formatter from "../model/formatter";
import UIComponent from "sap/ui/core/UIComponent";
import ObjectListItem from "sap/m/ObjectListItem";

/** 
 * @namespace ui5.walkthrough.controller
 */
export default class InvoiceList extends Controller {
	public formatter = formatter;

	onInit(): void {
		const viewModel = new JSONModel({
			currency: "EUR"
		});
		this.getView()?.setModel(viewModel, "view");
	}

	onFilterInvoices(event: SearchField$SearchEvent): void {
		// build filter array
		const filter = [];
		const query = event.getParameter("query");
		if (query) {
			filter.push(new Filter("ProductName", FilterOperator.Contains, query));
		}

		// filter binding
		const list = this.byId("invoiceList");
		const binding = list?.getBinding("items") as ListBinding;
		binding?.filter(filter);
	}

	onPress(event: Event): void {
		const item = event.getSource() as ObjectListItem;
		const invoicePath = item.getBindingContextPath().substring(1);
		const oParams = {
			invoicePath: invoicePath
		}
		const router = UIComponent.getRouterFor(this);
		router.navTo("detail", oParams);
	}
}