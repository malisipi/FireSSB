async function active_tab_info() {
	let [tab] = await chrome.tabs.query(queryOptions = { active: true, lastFocusedWindow: true });
	return ({
		name: tab.title,
		url: tab.url
	});
}

function copy_text(the_text) {
	navigator.clipboard.writeText(the_text);
}

let url_container = document.querySelector("#url_container");
let copy_url = document.querySelector("#copy_url");

let input_url = document.querySelector("#url");
let input_name = document.querySelector("#name");
let input_incognito = document.querySelector("#incognito");

copy_url.addEventListener("click", () => {
	copy_text(copy_url.getAttribute("app_url"));
});

document.querySelector("#fill").addEventListener("click", async () => {
	let tab_info = await active_tab_info();
	input_url.value = tab_info.url;
	input_name.value = tab_info.name;
});

document.querySelector("#create").addEventListener("click", async () => {
	let the_url = `${location.origin}/ssb.html?url=${encodeURIComponent(input_url.value)}&name=${encodeURIComponent(input_name.value)}&incognito=${encodeURIComponent(input_incognito.checked)}`;
	the_url = the_url.replaceAll("%","=-=");
	url_container.hidden = false;
	copy_url.setAttribute("app_url", the_url);
});

(async () => {
	let can_access_incognito = await chrome.extension.isAllowedIncognitoAccess();
	if(!can_access_incognito) {
		input_incognito.style.cursor = "not-allowed";
		input_incognito.checked = false;
		input_incognito.disabled = true;
		input_incognito.title = "Required Incognito Access"
	}
})();