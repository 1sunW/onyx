const defaultBookmarks = [
	{ id: "bm1", name: "Google", url: "https://google.com", icon: "🔍", addedAt: Date.now() },
	{ id: "bm2", name: "YouTube", url: "https://youtube.com", icon: "📺", addedAt: Date.now() },
	{ id: "bm3", name: "GitHub", url: "https://github.com", icon: "💻", addedAt: Date.now() },
	{ id: "bm4", name: "Wikipedia", url: "https://wikipedia.org", icon: "📖", addedAt: Date.now() },
	{ id: "bm5", name: "Reddit", url: "https://reddit.com", icon: "💬", addedAt: Date.now() },
	{ id: "bm6", name: "Discord", url: "https://discord.com", icon: "🎙️", addedAt: Date.now() }
];

const store = $store(
	{
		url: "https://google.com",
		wispurl: _CONFIG?.wispurl || "wss://fern.best/wisp",
		bareurl: _CONFIG?.bareurl || "https://fern.best/bare",
		proxy: "",
		transport: "/epoxy/index.mjs",
		bookmarks: defaultBookmarks,
		history: [
			{ id: "h1", name: "Google", url: "https://google.com", visitedAt: Date.now() - 3600000 }
		]
	},
	{ ident: "settings", backing: "localstorage", autosave: "auto" }
);

if (!store.bookmarks || !Array.isArray(store.bookmarks) || store.bookmarks.length === 0) {
	store.bookmarks = defaultBookmarks;
}
if (!store.history || !Array.isArray(store.history)) {
	store.history = [];
}

self.store = store;
