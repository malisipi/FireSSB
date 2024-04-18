// Operating System Check for OS specific features
if(navigator.userAgent.toLowerCase().includes("linux")){
    document.body.setAttribute("linux", true);
};

// Components

var components = {
	warning: {
		_: document.querySelector("#warning"),
		description: document.querySelector("#warning #description")
	},
	input: {
		url: document.querySelector("#input #url"),
		name: document.querySelector("#input #name"),
		incognito: document.querySelector("#input #incognito")
	},
	controls: {
		autofill: document.querySelector("#controls #autofill"),
		copy_url: document.querySelector("#controls #copy-url"),
		new_bookmark: document.querySelector("#controls #new-bookmark"),
		open_ssb: document.querySelector("#controls #open-ssb"),
		add_desktop_entry: document.querySelector("#controls #add-desktop-entry")
	}
};

// Localization

["uiURL", "uiName", "uiIncognito", "uiAutofillFromTab", "uiCopyURL", "uiNewBookmark", "uiOpenSSB", "uiOpenGuide", "uiExtOnGitHub", "uiCreateDesktopFile"].forEach(name => {
	document.querySelectorAll(`.local-${name}`).forEach((element) => {
		let class_list = Array.from(element.classList);
		if(class_list.includes("local-inner")){
			element.innerText = browser.i18n.getMessage(name);
		}
		if(class_list.includes("local-title")){
			element.title = browser.i18n.getMessage(name);
		}
	})
})

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
};

function show_warning(uiKey) {
	let warning_id = (window.last_warning_id ?? 0) + 1;
	window.last_warning_id = warning_id;
	components.warning.description.innerText = browser.i18n.getMessage(uiKey);
	components.warning._.setAttribute("open", true);
	setTimeout((the_id = warning_id) => {
		if(window.last_warning_id == the_id){
			if(components.warning._.hasAttribute("open")){
				components.warning._.removeAttribute("open");
			};
		};
	}, 3000);
};

function sanitize_input(input) { // Sanitizer function the input that comes from the user
    return input.replace(/[\`\"\'\,\.\:\;\$\[\]\\\(\)\{\}\#\<\>\&\|\!\/\-\_\=\n\r\t\?\@]*/g, "");
};

function download_file(url, name){ // Download helper to download desktop files
    let link = document.createElement("a");
    link.target = "_blank";
    link.download = name;
    link.href = url;
    document.body.append(link);
    link.click();
    remove(link);
};

// Event Listeners

components.controls.autofill.addEventListener("click", async function() {
	let tab_info = await active_tab_info();
	components.input.url.value = tab_info.url;
	components.input.name.value = tab_info.name;
});

components.controls.copy_url.addEventListener("click", function() {
	if(components.input.url.value == "") return show_warning("warningEmptyURL");
	navigator.clipboard.writeText(create_ssb_url());
});

components.controls.new_bookmark.addEventListener("click", async function() {
	if(components.input.url.value == "") return show_warning("warningEmptyURL");
	if(components.input.name.value == "") return show_warning("warningEmptyName");

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

components.controls.add_desktop_entry.addEventListener("click", async function() {
	if(components.input.url.value == "") return show_warning("warningEmptyURL");
	if(components.input.name.value == "") return show_warning("warningEmptyName");

    let name = sanitize_input(components.input.name.value);
    let ssb_url = create_ssb_url();
    let application = sanitize_input(prompt("File executable", "firefox"));
	let desktop_entry = `[Desktop Entry]
Encoding=UTF-8
Version=1.0
Type=Application
Terminal=false
Exec="${application}" "${ssb_url}"
Name=${name}
Icon=applications-internet`;
    download_file("data:application/octet-stream," + encodeURIComponent(desktop_entry), name + ".desktop");
});

// Check Permissions

(async () => {
	let can_access_incognito = await browser.extension.isAllowedIncognitoAccess();
	if(!can_access_incognito) {
		components.input.incognito.style.cursor = "not-allowed";
		components.input.incognito.checked = false;
		components.input.incognito.disabled = true;
		components.input.incognito.title = browser.i18n.getMessage("uiRequiredIncognito");
	};
})();
