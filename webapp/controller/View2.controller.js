sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/ui/integration/library",
	"sap/m/MessageToast"

], function (jQuery, Controller, History, JSONModel, library, MessageToast) {
	"use restrict";
	return Controller.extend("VF.VF.controller.View2", {
		onInit: function () {

			//List card with url action "START"
			var sManifestPath = sap.ui.require.toUrl("VF/VF") + "/model/actionCard.json";
			this.getView().byId("listCardSample").setManifest(sManifestPath);
			//List card with url action "END"

			//card control "START"
			var oModel1 = new JSONModel({

				"productItems": [{
					"title": "Notebook HT",
					"subtitle": "ID23452256-D44",
					"revenue": "27.25K EUR",
					"status": "success",
					"statusSchema": "Success"
				}, {
					"title": "Notebook XT",
					"subtitle": "ID27852256-D47",
					"revenue": "7.35K EUR",
					"status": "exceeded",
					"statusSchema": "Error"
				}, {
					"title": "Notebook ST",
					"subtitle": "ID123555587-I05",
					"revenue": "22.89K EUR",
					"status": "warning",
					"statusSchema": "Warning"
				}]
			});
			this.getView().setModel(oModel1);
			//card control "END"

	
			// quickview using data binding inside INFO button "START"
			var that = this;

			//A hyperlink control used to navigate to other apps and web pages or to trigger actions.
			//On hover, it changes its style to underlined text to provide additional feedback to the user.
			var oLink = new sap.m.Link({
				text: "Show more information",
				href: "http://www.inkyourcode.com/",
				target: "_blank"
			});

			var oMessageTemplate = new sap.m.MessageItem({
				type: '{type}',
				title: '{title}',
				description: '{description}',
				subtitle: '{subtitle}',
				counter: '{counter}',
				markupDescription: '{markupDescription}',
				link: oLink
			});

			var aMockMessages = [{
				type: 'Error',
				title: 'Error message',
				description: 'First Error message description. \n' +
					'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
				subtitle: 'Example of subtitle',
				counter: 1
			}, {
				type: 'Warning',
				title: 'Warning without description',
				description: ''
			}, {
				type: 'Success',
				title: 'Success message',
				description: 'First Success message description',
				subtitle: 'Example of subtitle',
				counter: 1
			}, {
				type: 'Error',
				title: 'Error message',
				description: 'Second Error message description',
				subtitle: 'Example of subtitle',
				counter: 2
			}, {
				type: 'Information',
				title: 'Information message',
				description: 'First Information message description',
				subtitle: 'Example of subtitle',
				counter: 1
			}];

			var oModel = new JSONModel();

			oModel.setData(aMockMessages);

			this.oMessageView = new sap.m.MessageView({
				showDetailsPageHeader: false,
				itemSelect: function () {
					oBackButton.setVisible(true);
				},
				items: {
					path: "/",
					template: oMessageTemplate
				}
			});

			var oBackButton = new sap.m.Button({
				icon: sap.ui.core.IconPool.getIconURI("nav-back"),
				visible: false,
				press: function () {
					that.oMessageView.navigateBack();
					this.setVisible(false);
				}
			});

			this.oMessageView.setModel(oModel);

			this.oDialog = new sap.m.Dialog({
				resizable: true,
				content: this.oMessageView,
				state: "Error",
				beginButton: new sap.m.Button({
					press: function () {
						this.getParent().close();
					},
					text: "Close"
				}),
				customHeader: new sap.m.Bar({
					contentMiddle: [
						new sap.m.Text({
							text: "Error"
						})
					],
					contentLeft: [oBackButton]
				}),
				contentHeight: "300px",
				contentWidth: "500px",
				verticalScrolling: false
			});
		},
		handleDialogPress: function (oEvent) {
			this.oMessageView.navigateBack();
			this.oDialog.open();
		},
		// quickview using data binding inside INFO button "END"
		
		// Navigation to previous view by clicking on back button "START"
		onBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("view1", true);
			}
		},
		// Navigation to previous view by clicking on back button "END"
		
		//List card with url action "START"
		onAction: function (oEvent) {

				if (oEvent.getParameter("type") === library.CardActionType.Navigation) {
					MessageToast.show("Relative URL: " + oEvent.getParameter("manifestParameters").url);
				}
			}
		//List card with url action "END"

	});
});