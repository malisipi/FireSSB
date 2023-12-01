// Components

var components = {
	input: {
		url: document.querySelector("#url"),
		name: document.querySelector("#name"),
		incognito: document.querySelector("#incognito")
	},
	controls: {
		autofill: document.querySelector("#autofill"),
		copy_url: document.querySelector("#copy-url"),
		new_bookmark: document.querySelector("#new-bookmark"),
		open_ssb: document.querySelector("#open-ssb")
	}
};

// Functions

async function active_tab_info() {
	let [tab] = await browser.tabs.query(queryOptions = { active: true, lastFocusedWindow: true });
	return ({
		name: tab.title,
		url: tab.url,
		id: tab.id
	});
};

function create_ssb_url() {
	let the_url = location.origin + 
					"/ssb.html?url=" + encodeURIComponent(components.input.url.value) +
					"&name=" + encodeURIComponent(components.input.name.value) + 
					"&incognito=" + encodeURIComponent(components.input.incognito.checked);
	the_url = the_url.replaceAll("%","=-=");
	return the_url;
}

// Event Listeners

components.controls.autofill.addEventListener("click", async function() {
	let tab_info = await active_tab_info();
	components.input.url.value = tab_info.url;
	components.input.name.value = tab_info.name;
});

components.controls.copy_url.addEventListener("click", function() {
	navigator.clipboard.writeText(create_ssb_url());
});

components.controls.new_bookmark.addEventListener("click", async function() {
	if(await browser.permissions.request({permissions: ["bookmarks"]})){
		browser.bookmarks.create({
			title: components.input.name.value,
			url: create_ssb_url()
		});
	};
});

components.controls.open_ssb.addEventListener("click", async function() {
	if(components.input.url.value == ""){
		let active_tab = await active_tab_info();
		browser.windows.create({
			tabId: active_tab.id,
			type: "popup"
		});
	} else {
		browser.windows.create({
			url: components.input.url.value,
			type: "popup"
		});
	}
});

// Check Permissions

(async () => {
	let can_access_incognito = await browser.extension.isAllowedIncognitoAccess();
	if(!can_access_incognito) {
		components.input.incognito.style.cursor = "not-allowed";
		components.input.incognito.checked = false;
		components.input.incognito.disabled = true;
		components.input.incognito.title = "Required Incognito Access";
	};
})();