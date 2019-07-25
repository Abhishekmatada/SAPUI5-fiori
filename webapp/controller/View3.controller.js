sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	"sap/ui/core/routing/History"
], function (jQuery, Controller, JSONModel, History) {
	"use strict";

	return Controller.extend("VF.VF.controller.View3", {
		onInit: function () {
			
			// Analytical card overview page "START"
			var cardManifests = new JSONModel();

			cardManifests.loadData(sap.ui.require.toUrl("VF/VF/model/cardManifests.json"));
			this.getView().setModel(cardManifests, "manifests");
			// Analytical card overview page "END"
		},
		onBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("view1", true);
			}
		}
	});



});
