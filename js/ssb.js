(async () => {
	let params = new URLSearchParams(location.search.replaceAll("=-=", "%"))
	let app_url = decodeURIComponent(params.get("url"));
	let app_name = decodeURIComponent(params.get("name") ?? "");
	let app_title = (app_name.length == 0) ? "" : (app_name + " | ");
	let app_incognito = decodeURIComponent(params.get("incognito")) == "true";
	let app_alternative_mode = decodeURIComponent(params.get("alternative")) == "true";

	let [tab] = await browser.tabs.query(queryOptions = { active: true, lastFocusedWindow: true });
	if(app_alternative_mode){
		let new_tab = window.open(app_url, "_blank", "popup=yes");
		if(new_tab == null){
			document.body.setAttribute("permission-requested", true);
			return;
		};
	} else {
		await browser.windows.create({url: app_url, type:"popup", titlePreface:app_title, incognito: app_incognito});
	};
	let browser_window = await browser.windows.get(tab.windowId, {populate:true});
	if(browser_window.tabs.length <= 1){
		browser.windows.remove(tab.windowId); // Close window if only tab is helper's
	} else {
		browser.tabs.remove(tab.id); // Close helper tab, if window have other tabs
	};
})();
