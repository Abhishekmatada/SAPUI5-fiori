sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
	// "jquery.sap.global",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel"
], function (Controller, Fragment, Device, JSONModel) {
	"use strict";

	return Controller.extend("VF.VF.controller.View1", {
		onInit: function () {
			var oModel = new sap.ui.model.json.JSONModel("data.json");
			this.getView().setModel(oModel);

			var bIsPhone = Device.system.phone;
			this.getView().setModel(new JSONModel({
				imageWidth: bIsPhone ? "10em" : "10em"
			}));

			// point to the images containing folder
			var oImgModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock") + "/image.json");
			this.getView().setModel(oImgModel, "image");

		},
		//Navigation to different view from generic tile
		onPress1: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("view2");

		},
		onPress2: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("view3");
		},
		onOpenDialog: function () {
			var oView = this.getView();

			// create dialog lazily
			if (!this.byId("helloDialog")) {
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "VF.VF.fragments.Navigate",
					controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				this.byId("helloDialog").open(); //.open() is internal helper function.
			}
		},
		//fragment callbacks
		onCloseDialog: function () {
			this.byId("helloDialog").close();
		},
		onNavigate: function (oEvent) {
			sap.m.URLHelper.redirect("https://stackoverflow.com/", true);
		}
	});
});