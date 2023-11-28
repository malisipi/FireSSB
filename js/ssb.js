(async () => {
	let params = new URLSearchParams(location.search.replaceAll("=-=", "%"))
	let app_url = decodeURIComponent(params.get("url"));
	let app_name = decodeURIComponent(params.get("name") ?? "");
	let app_title = (app_name.length == 0) ? "" : (app_name + " | ");
	let app_incognito = decodeURIComponent(params.get("incognito")) == "true";

	let [tab] = await chrome.tabs.query(queryOptions = { active: true, lastFocusedWindow: true });
	await chrome.windows.create({url: app_url, type:"popup", titlePreface:app_title, incognito: app_incognito});
	chrome.tabs.remove(tab.id);
})();
