sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"VF/VF/model/models"
	
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("VF.VF.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing; create the views based on the url/hash
			// the initialize method will start the routing – it will parse the initial hash, create the needed views, 
			//start listening to hash changes and trigger the router events.
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});