
function Config() {
	this.css = `
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
    
    &.cfg {
      background: rgba(10, 10, 15, 0.95) !important;
      color: #f1f5f9;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      padding: 24px;
      max-width: 480px;
      width: 90%;
      box-sizing: border-box;
    }

    &::backdrop {
      background: rgba(5, 5, 5, 0.8) !important;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 12px;
    }

    .modal-title {
      font-size: 1.25rem;
      font-weight: 600;
      letter-spacing: -0.025em;
      color: #f8fafc;
      font-family: "Inter Tight", sans-serif;
    }

    .section-title {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94a3b8;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .buttons {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    .buttons button {
      flex: 1;
      border: 1px solid rgba(255, 255, 255, 0.08);
      background-color: rgba(255, 255, 255, 0.04);
      border-radius: 8px;
      color: #cbd5e1;
      padding: 10px 14px;
      font-size: 0.85rem;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .buttons button.active {
      background-color: rgba(99, 102, 241, 0.15);
      border-color: rgba(99, 102, 241, 0.5);
      color: #e0e7ff;
      box-shadow: 0 0 12px rgba(99, 102, 241, 0.1);
    }

    .buttons button:hover:not(.active) {
      background-color: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.15);
      color: #f1f5f9;
    }

    .input_row {
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .input_row label {
      font-size: 0.85rem;
      font-weight: 500;
      color: #94a3b8;
    }

    .input_row input {
      background-color: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      color: #f1f5f9;
      outline: none;
      padding: 10px 12px;
      font-size: 0.9rem;
      transition: all 0.2s;
      font-family: "IBM Plex Mono", monospace;
    }

    .input_row input:focus {
      border-color: rgba(99, 102, 241, 0.5);
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.1);
      background-color: rgba(0, 0, 0, 0.5);
    }

    .status-pill {
      font-family: "IBM Plex Mono", monospace;
      font-size: 0.75rem;
      color: #818cf8;
      background-color: rgba(99, 102, 241, 0.08);
      border: 1px solid rgba(99, 102, 241, 0.15);
      padding: 8px 12px;
      border-radius: 6px;
      text-align: center;
      margin-bottom: 20px;
    }

    .close-btn {
      background: #818cf8;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 10px 24px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s;
      width: 100%;
    }

    .close-btn:hover {
      background: #6366f1;
      transform: translateY(-1px);
    }

    .close-btn:active {
      transform: translateY(0);
    }
  `;

	function handleModalClose(modal) {
		modal.style.opacity = 0;
		setTimeout(() => {
			modal.close();
			modal.style.opacity = 1;
		}, 250);
	}

	return html`
      <dialog class="cfg">
        <div class="modal-header">
          <div class="modal-title">Network Configuration</div>
        </div>
        
        <div class="section-title">Select Connection Protocol</div>
        <div class="buttons">
          <button class=${use(store.transport, (t) => t === "/baremod/index.mjs" ? "active" : "")} on:click=${() => {
						connection.setTransport("/baremod/index.mjs", [store.bareurl]);
						store.transport = "/baremod/index.mjs";
					}}>Bare 3</button>
          <button class=${use(store.transport, (t) => t === "/libcurl/index.mjs" ? "active" : "")} on:click=${() => {
						connection.setTransport("/libcurl/index.mjs", [
							{ wisp: store.wispurl },
						]);
						store.transport = "/libcurl/index.mjs";
					}}>Libcurl</button>
          <button class=${use(store.transport, (t) => t === "/epoxy/index.mjs" ? "active" : "")} on:click=${() => {
						connection.setTransport("/epoxy/index.mjs", [
							{ wisp: store.wispurl },
						]);
						store.transport = "/epoxy/index.mjs";
					}}>Epoxy</button>
        </div>

        <div class="input_row">
          <label for="wisp_url_input">Wisp Gateway URL</label>
          <input id="wisp_url_input" bind:value=${use(store.wispurl)} spellcheck="false" placeholder="wss://fern.best/wisp"></input>
        </div>

        <div class="input_row">
          <label for="bare_url_input">Bare Server URL</label>
          <input id="bare_url_input" bind:value=${use(store.bareurl)} spellcheck="false" placeholder="https://fern.best/bare"></input>
        </div>

        <div class="section-title">Active Connection</div>
        <div class="status-pill">
          ${use(store.transport, (t) => {
						if (t === "/epoxy/index.mjs") return "⚡ Epoxy (WebAssembly TCP)";
						if (t === "/libcurl/index.mjs") return "🌐 Libcurl.js (Wisp Proxy)";
						return "🔗 Bare Server 3 (Classic)";
					})}
        </div>

        <div>
          <button class="close-btn" on:click=${() => handleModalClose(this.root)}>Save & Close</button>
        </div>
      </dialog>
  `;
}


window.addEventListener("load", async () => {
	const { ScramjetController } = $scramjetLoadController();

	const scramjet = new ScramjetController({
		files: {
			wasm: "/scram/scramjet.wasm.wasm",
			all: "/scram/scramjet.all.js",
			sync: "/scram/scramjet.sync.js",
		},
		flags: {
			rewriterLogs: false,
			scramitize: false,
			cleanErrors: true,
			sourcemaps: true,
		},
	});

	await scramjet.init();
	if ("serviceWorker" in navigator) {
		await navigator.serviceWorker.register("./sw.js");
		if (navigator.serviceWorker.controller) {
			navigator.serviceWorker.controller.postMessage({
				scramjet$type: "loadConfig",
				config: scramjet.config,
			});
		}
	}

	const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
	const flex = css`
		display: flex;
	`;
	const col = css`
		flex-direction: column;
	`;

	connection.setTransport(store.transport, [{ wisp: store.wispurl }]);

	function BrowserApp() {
		this.url = store.url || "";
		this.isHome = true;
		this.tabs = [];
		this.activeTabId = null;

		let nextTabId = 1;

		this.getActiveTab = () => {
			return this.tabs.find(t => t.id === this.activeTabId) || null;
		};

		this.createTab = (initialUrl = "", switchNow = true) => {
			const tabId = "tab_" + (nextTabId++);
			const frame = scramjet.createFrame();
			frame.frame.className = "w-full h-full flex-1 border-0 outline-none bg-white rounded-lg block";
			frame.frame.style.width = "100%";
			frame.frame.style.height = "100%";
			frame.frame.style.border = "none";

			let blankBody = btoa(`<body style="background: #000; color: #fff"></body>`);
			frame.go(`data:text/html;base64,${blankBody}`);

			const tab = {
				id: tabId,
				title: "New Tab",
				url: initialUrl || "",
				isHome: !initialUrl,
				icon: "🌐",
				frame: frame
			};

			frame.addEventListener("urlchange", (e) => {
				if (!e.url) return;
				if (e.url.startsWith("data:text/html;base64,")) {
					tab.isHome = true;
					tab.url = "";
					tab.title = "New Tab";
					tab.icon = "🌐";
				} else {
					tab.isHome = false;
					tab.url = e.url;
					try {
						const u = new URL(e.url);
						tab.title = u.hostname.replace(/^www\./, "") || e.url;
						tab.icon = "🌐";
					} catch (err) {
						tab.title = e.url;
					}
					addHistoryItem(e.url, tab.title);
				}

				if (this.activeTabId === tab.id) {
					this.url = tab.url;
					this.isHome = tab.isHome;
				}
				this.tabs = [...this.tabs];
			});

			if (initialUrl) {
				let targetUrl = initialUrl.trim();
				if (!targetUrl.includes(".") || targetUrl.includes(" ")) {
					targetUrl = "https://www.google.com/search?q=" + encodeURIComponent(targetUrl);
				} else if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
					targetUrl = "https://" + targetUrl;
				}
				tab.isHome = false;
				tab.url = targetUrl;
				frame.go(targetUrl);
			}

			this.tabs = [...this.tabs, tab];

			if (switchNow || !this.activeTabId) {
				this.switchTab(tabId);
			}
		};

		this.switchTab = (tabId) => {
			this.activeTabId = tabId;
			const tab = this.getActiveTab();
			if (tab) {
				this.url = tab.url;
				this.isHome = tab.isHome;
			}
			this.tabs = [...this.tabs];
		};

		this.closeTab = (tabId, e) => {
			if (e) {
				e.stopPropagation();
				e.preventDefault();
			}

			const index = this.tabs.findIndex(t => t.id === tabId);
			if (index === -1) return;

			const newTabs = this.tabs.filter(t => t.id !== tabId);

			if (newTabs.length === 0) {
				this.tabs = [];
				this.createTab("", true);
				return;
			}

			this.tabs = newTabs;

			if (this.activeTabId === tabId) {
				const nextTab = this.tabs[Math.max(0, index - 1)];
				this.switchTab(nextTab.id);
			} else {
				this.tabs = [...this.tabs];
			}
		};

		// Create initial tab
		this.createTab(store.url || "", true);

		this.mount = () => {
			// Tab initialized
		};

		const handleSubmit = () => {
			this.url = (this.url || "").trim();
			if (!this.url) return;

			let targetUrl = this.url;
			if (!targetUrl.includes(".") || targetUrl.includes(" ")) {
				targetUrl = "https://www.google.com/search?q=" + encodeURIComponent(targetUrl);
			} else if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
				targetUrl = "https://" + targetUrl;
			}

			const tab = this.getActiveTab();
			if (tab) {
				tab.url = targetUrl;
				tab.isHome = false;
				try {
					const u = new URL(targetUrl);
					tab.title = u.hostname.replace(/^www\./, "") || targetUrl;
				} catch (err) {
					tab.title = targetUrl;
				}
				this.isHome = false;
				tab.frame.go(targetUrl);
				this.tabs = [...this.tabs];
			}
		};

		const handleQuickLink = (linkUrl) => {
			this.url = linkUrl;
			handleSubmit();
		};

		const cfg = h(Config);
		document.body.appendChild(cfg);
		this.githubURL = `https://github.com/MercuryWorkshop/scramjet/commit/${$scramjetVersion.build}`;

		const quickLinks = [
			{ name: "Google", url: "https://google.com", icon: "🔍", desc: "Browse and search" },
			{ name: "YouTube", url: "https://youtube.com", icon: "📺", desc: "Stream and watch" },
			{ name: "GitHub", url: "https://github.com", icon: "💻", desc: "Build & host code" },
			{ name: "Wikipedia", url: "https://wikipedia.org", icon: "📖", desc: "Discover knowledge" },
			{ name: "Reddit", url: "https://reddit.com", icon: "💬", desc: "Join communities" },
			{ name: "Discord", url: "https://discord.com", icon: "🎙️", desc: "Voice & text chat" },
			{ name: "Twitter", url: "https://twitter.com", icon: "𝕏", desc: "Read latest news" },
			{ name: "Twitch", url: "https://twitch.tv", icon: "🎮", desc: "Live stream feeds" }
		];

		const POPULAR_SUGGESTIONS = [
			{ name: "Google", url: "https://google.com", desc: "Search Engine" },
			{ name: "YouTube", url: "https://youtube.com", desc: "Video Streaming" },
			{ name: "GitHub", url: "https://github.com", desc: "Code Repository" },
			{ name: "Wikipedia", url: "https://wikipedia.org", desc: "Free Encyclopedia" },
			{ name: "Reddit", url: "https://reddit.com", desc: "Communities & News" },
			{ name: "Discord", url: "https://discord.com", desc: "Voice & Text Chat" },
			{ name: "Twitter / X", url: "https://x.com", desc: "Social Media Feed" },
			{ name: "Twitch", url: "https://twitch.tv", desc: "Live Streaming" },
			{ name: "DuckDuckGo", url: "https://duckduckgo.com", desc: "Private Search Engine" },
			{ name: "ChatGPT", url: "https://chatgpt.com", desc: "AI Conversational Assistant" },
			{ name: "StackOverflow", url: "https://stackoverflow.com", desc: "Developer Q&A" },
			{ name: "Amazon", url: "https://amazon.com", desc: "Online Shopping" }
		];

		// History and Bookmark Helper Functions
		const addHistoryRecord = (targetUrl, customTitle) => {
			if (!targetUrl || targetUrl.startsWith("data:") || targetUrl.startsWith("about:")) return;

			let cleanTitle = customTitle || "";
			if (!cleanTitle || cleanTitle.startsWith("data:")) {
				try {
					const parsed = new URL(targetUrl);
					cleanTitle = parsed.hostname.replace(/^www\./, "");
				} catch (e) {
					cleanTitle = targetUrl;
				}
			}

			const now = Date.now();
			const prevHistory = store.history || [];
			const filtered = prevHistory.filter((item) => item.url.toLowerCase() !== targetUrl.toLowerCase());

			const newRecord = {
				id: "h_" + now + "_" + Math.floor(Math.random() * 10000),
				name: cleanTitle,
				url: targetUrl,
				visitedAt: now
			};

			store.history = [newRecord, ...filtered].slice(0, 100);
		};

		const isUrlBookmarked = (targetUrl) => {
			if (!targetUrl || !store.bookmarks) return false;
			return store.bookmarks.some((b) => b.url.toLowerCase() === targetUrl.toLowerCase());
		};

		const toggleUrlBookmark = (targetUrl, customTitle) => {
			if (!targetUrl || targetUrl.startsWith("data:")) return;

			const bms = store.bookmarks || [];
			const exists = bms.some((b) => b.url.toLowerCase() === targetUrl.toLowerCase());

			if (exists) {
				store.bookmarks = bms.filter((b) => b.url.toLowerCase() !== targetUrl.toLowerCase());
			} else {
				let cleanTitle = customTitle || "";
				if (!cleanTitle || cleanTitle.startsWith("data:")) {
					try {
						cleanTitle = new URL(targetUrl).hostname.replace(/^www\./, "");
					} catch (e) {
						cleanTitle = targetUrl;
					}
				}
				const newBm = {
					id: "bm_" + Date.now(),
					name: cleanTitle,
					url: targetUrl,
					icon: "⭐",
					addedAt: Date.now()
				};
				store.bookmarks = [newBm, ...bms];
			}
		};

		const computeSuggestions = (query) => {
			const q = (query || "").trim().toLowerCase();
			if (!q) return [];

			const results = [];
			const seenUrls = new Set();

			// 1. History matches
			const historyList = store.history || [];
			for (const item of historyList) {
				const nameMatch = item.name && item.name.toLowerCase().includes(q);
				const urlMatch = item.url && item.url.toLowerCase().includes(q);
				if ((nameMatch || urlMatch) && !seenUrls.has(item.url.toLowerCase())) {
					seenUrls.add(item.url.toLowerCase());
					results.push({
						type: "history",
						badge: "History",
						icon: "🕒",
						title: item.name || item.url,
						url: item.url
					});
				}
				if (results.length >= 4) break;
			}

			// 2. Bookmark matches
			const bookmarkList = store.bookmarks || [];
			for (const item of bookmarkList) {
				const nameMatch = item.name && item.name.toLowerCase().includes(q);
				const urlMatch = item.url && item.url.toLowerCase().includes(q);
				if ((nameMatch || urlMatch) && !seenUrls.has(item.url.toLowerCase())) {
					seenUrls.add(item.url.toLowerCase());
					results.push({
						type: "bookmark",
						badge: "Bookmark",
						icon: "⭐",
						title: item.name || item.url,
						url: item.url
					});
				}
				if (results.length >= 6) break;
			}

			// 3. Popular site matches
			for (const pop of POPULAR_SUGGESTIONS) {
				const nameMatch = pop.name.toLowerCase().includes(q);
				const urlMatch = pop.url.toLowerCase().includes(q);
				if ((nameMatch || urlMatch) && !seenUrls.has(pop.url.toLowerCase())) {
					seenUrls.add(pop.url.toLowerCase());
					results.push({
						type: "popular",
						badge: "Site",
						icon: "🌐",
						title: pop.name,
						url: pop.url
					});
				}
				if (results.length >= 7) break;
			}

			// 4. Search query auto-completes
			if (!q.startsWith("http://") && !q.startsWith("https://")) {
				const googleSearchUrl = "https://www.google.com/search?q=" + encodeURIComponent(q);
				if (!seenUrls.has(googleSearchUrl)) {
					results.push({
						type: "search",
						badge: "Search",
						icon: "🔍",
						title: `Search Google for "${q}"`,
						url: googleSearchUrl
					});
				}

				if (!q.includes(" ") && !q.includes(".")) {
					const dotComUrl = "https://" + q + ".com";
					if (!seenUrls.has(dotComUrl)) {
						results.push({
							type: "domain",
							badge: "Direct URL",
							icon: "🚀",
							title: `Go to ${q}.com`,
							url: dotComUrl
						});
					}
				}
			}

			return results.slice(0, 8);
		};

		const formatTimeAgo = (timestamp) => {
			if (!timestamp) return "";
			const seconds = Math.floor((Date.now() - timestamp) / 1000);
			if (seconds < 60) return "Just now";
			const minutes = Math.floor(seconds / 60);
			if (minutes < 60) return `${minutes}m ago`;
			const hours = Math.floor(minutes / 60);
			if (hours < 24) return `${hours}h ago`;
			const days = Math.floor(hours / 24);
			if (days < 30) return `${days}d ago`;
			return new Date(timestamp).toLocaleDateString();
		};

		this.activeTab = "launchpad"; // launchpad | bookmarks | history
		this.showAddBmModal = false;
		this.newBmName = "";
		this.newBmUrl = "";
		this.filterText = "";
		this.showTopSuggestions = false;
		this.topSuggestions = [];
		this.showCenterSuggestions = false;
		this.centerSuggestions = [];

		this.updateTopSuggestions = () => {
			this.topSuggestions = computeSuggestions(this.url);
			this.showTopSuggestions = this.topSuggestions.length > 0;
		};

		this.updateCenterSuggestions = () => {
			this.centerSuggestions = computeSuggestions(this.url);
			this.showCenterSuggestions = this.centerSuggestions.length > 0;
		};

		this.selectSuggestion = (sugUrl) => {
			this.url = sugUrl;
			this.showTopSuggestions = false;
			this.showCenterSuggestions = false;
			handleSubmit();
		};

		return html`
			<div class="flex flex-col w-screen h-screen min-h-0 bg-neutral-950 text-neutral-100 p-3 box-border font-sans select-none overflow-hidden">
				<!-- Browser Tab Bar -->
				<div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 z-30 shrink-0 select-none">
					<div class="flex items-center gap-1.5 flex-1 overflow-x-auto no-scrollbar">
						${use(this.tabs, (tabList) => tabList.map((tab) => html`
							<div class="group relative flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-all max-w-[210px] min-w-[120px] border shrink-0 ${tab.id === this.activeTabId ? "bg-neutral-800/90 text-white border-neutral-700/80 shadow-md" : "bg-neutral-900/50 text-neutral-400 hover:bg-neutral-900/90 hover:text-neutral-200 border-white/5"}"
								on:click=${() => this.switchTab(tab.id)}>
								<span class="text-xs shrink-0">${tab.icon || "🌐"}</span>
								<span class="truncate flex-1 font-sans text-xs">${tab.title || "New Tab"}</span>
								<button class="w-4 h-4 rounded-full flex items-center justify-center text-neutral-400 hover:bg-neutral-700/80 hover:text-rose-300 opacity-60 group-hover:opacity-100 transition-all shrink-0 ml-1"
									on:click=${(e) => this.closeTab(tab.id, e)} title="Close Tab">
									✕
								</button>
							</div>
						`))}
					</div>

					<!-- New Tab Button -->
					<button class="flex items-center justify-center w-8 h-8 rounded-xl bg-neutral-900/60 border border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800/90 transition-all shrink-0 shadow-sm"
						on:click=${() => this.createTab("", true)} title="Open New Tab">
						<svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
						</svg>
					</button>
				</div>

				<!-- Navigation Toolbar -->
				<div class="flex items-center p-2.5 gap-2 bg-neutral-900/70 backdrop-blur-md border border-neutral-800 rounded-xl shadow-lg mb-3 relative z-30 shrink-0">
					<button class="flex items-center justify-center text-neutral-400 w-9 h-9 rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:bg-neutral-800 hover:border-neutral-700 transition-all shrink-0" 
						on:click=${() => {
							const tab = this.getActiveTab();
							if (tab) {
								tab.isHome = true;
								tab.url = "";
								tab.title = "New Tab";
								this.isHome = true;
								this.url = "";
								let blankBody = btoa(`<body style="background: #000; color: #fff"></body>`);
								tab.frame.go(`data:text/html;base64,${blankBody}`);
								this.tabs = [...this.tabs];
							}
						}} title="Go Home">
						<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
						</svg>
					</button>
					
					<button class="flex items-center justify-center text-neutral-400 w-9 h-9 rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:bg-neutral-800 hover:border-neutral-700 transition-all shrink-0" on:click=${() => { const t = this.getActiveTab(); if (t) t.frame.back(); }} title="Back">
						<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
					</button>
					
					<button class="flex items-center justify-center text-neutral-400 w-9 h-9 rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:bg-neutral-800 hover:border-neutral-700 transition-all shrink-0" on:click=${() => { const t = this.getActiveTab(); if (t) t.frame.forward(); }} title="Forward">
						<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
						</svg>
					</button>
					
					<button class="flex items-center justify-center text-neutral-400 w-9 h-9 rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:bg-neutral-800 hover:border-neutral-700 transition-all shrink-0" on:click=${() => { const t = this.getActiveTab(); if (t) t.frame.reload(); }} title="Reload">
						<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 8.656a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
						</svg>
					</button>

					<!-- URL Input Container with Suggestions -->
					<div class="relative flex-1">
						<input class="w-full font-sans px-3.5 text-sm border-none outline-none text-white h-9 rounded-lg bg-black/40 border border-white/10 transition-all focus:bg-black/60 focus:border-indigo-500/50" autocomplete="off" autocapitalize="off" autocorrect="off" placeholder="Enter URL or search query..."
							bind:value=${use(this.url)} 
							on:input=${(e) => { this.url = e.target.value; this.updateTopSuggestions(); }} 
							on:focus=${() => this.updateTopSuggestions()}
							on:blur=${() => setTimeout(() => { this.showTopSuggestions = false; }, 200)}
							on:keyup=${(e) => e.keyCode == 13 && (store.url = this.url) && handleSubmit()}></input>

						<!-- Top Suggestions Dropdown -->
						<div class="absolute left-0 right-0 top-11 bg-neutral-900/95 border border-white/10 rounded-xl shadow-2xl p-1.5 backdrop-blur-xl flex flex-col gap-0.5 z-50 max-h-72 overflow-y-auto" style=${use(this.showTopSuggestions, (s) => s ? "display: flex;" : "display: none;")}>
							${use(this.topSuggestions, (sugs) => sugs.map((sug) => html`
								<div class="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-800/80 cursor-pointer transition-colors group" on:mousedown=${(e) => { e.preventDefault(); this.selectSuggestion(sug.url); }}>
									<div class="flex items-center gap-2.5 overflow-hidden">
										<span class="text-base">${sug.icon}</span>
										<div class="truncate text-sm font-medium text-neutral-200 group-hover:text-white">${sug.title}</div>
									</div>
									<span class="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400 shrink-0">${sug.badge}</span>
								</div>
							`))}
						</div>
					</div>

					<!-- Bookmark Toggle Star Button -->
					<button class="flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:bg-neutral-800 hover:border-neutral-700 transition-all shrink-0" 
						on:click=${() => toggleUrlBookmark(this.url, "")} 
						title=${use(this.url, (u) => isUrlBookmarked(u) ? "Remove Bookmark" : "Bookmark this page")}>
						<svg class="w-4 h-4 transition-colors ${use(this.url, (u) => isUrlBookmarked(u) ? "text-amber-400 fill-amber-400" : "text-neutral-400 fill-none")}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
						</svg>
					</button>

					<!-- Quick Switch Bookmarks Tab -->
					<button class="flex items-center justify-center text-neutral-400 w-9 h-9 rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:bg-neutral-800 hover:border-neutral-700 transition-all shrink-0" on:click=${() => { this.isHome = true; this.activeTab = "bookmarks"; }} title="View Bookmarks">
						⭐
					</button>

					<!-- Quick Switch History Tab -->
					<button class="flex items-center justify-center text-neutral-400 w-9 h-9 rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:bg-neutral-800 hover:border-neutral-700 transition-all shrink-0" on:click=${() => { this.isHome = true; this.activeTab = "history"; }} title="View History">
						🕒
					</button>

					<button class="flex items-center justify-center text-neutral-400 w-9 h-9 rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:bg-neutral-800 hover:border-neutral-700 transition-all shrink-0" on:click=${() => window.open(scramjet.encodeUrl(this.url))} title="Open in new window">
						<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
						</svg>
					</button>

					<button class="flex items-center justify-center text-neutral-400 w-9 h-9 rounded-lg bg-neutral-800/50 border border-neutral-700/50 hover:bg-neutral-800 hover:border-neutral-700 transition-all shrink-0" on:click=${() => cfg.showModal()} title="Connection Settings">
						<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
							<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
					</button>

					<p class="font-mono text-xs text-neutral-600 bg-black/35 px-3 py-1.5 rounded-full border border-white/5 shrink-0 hidden sm:block">
						<b>scramjet</b> ${$scramjetVersion.version} <a class="text-indigo-400 hover:text-indigo-300" href=${use(this.githubURL)} target="_blank">${$scramjetVersion.build}</a>
					</p>
				</div>

				<!-- Main Body Area -->
				<div class="flex-1 flex flex-col min-h-0 overflow-hidden w-full h-full relative">
					<!-- Welcome Dashboard (Only shown when isHome is true) -->
					<div class="flex-1 flex flex-col items-center justify-start p-6 overflow-y-auto w-full max-w-[920px] mx-auto" style=${use(this.isHome, (h) => h ? "display: flex;" : "display: none;")}>
						<div class="text-center mb-8 animate-fade">
							<h1 class="font-sans font-extrabold text-5xl sm:text-6xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-indigo-500 mb-0">Onyx</h1>
							<div class="text-xs font-semibold text-neutral-500 tracking-[0.2em] uppercase mt-2">High-Performance Web Gateway</div>
						</div>

						<!-- Central Search Bar with Suggestions -->
						<div class="w-full max-w-[640px] mb-8 relative z-20">
							<div class="relative w-full">
								<svg class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
								<input class="w-full h-14 rounded-2xl bg-neutral-900/80 border border-white/10 shadow-2xl pl-12 pr-28 text-base text-white outline-none transition-all focus:bg-black/90 focus:border-indigo-500/60" autocomplete="off" autocapitalize="off" autocorrect="off" placeholder="Search the web or enter an address..." 
									bind:value=${use(this.url)} 
									on:input=${(e) => { this.url = e.target.value; this.updateCenterSuggestions(); }} 
									on:focus=${() => this.updateCenterSuggestions()}
									on:blur=${() => setTimeout(() => { this.showCenterSuggestions = false; }, 200)}
									on:keyup=${(e) => e.keyCode == 13 && (store.url = this.url) && handleSubmit()}></input>
								<button class="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl px-4 py-2 text-xs uppercase tracking-wider transition-all shadow-md active:scale-95" on:click=${() => handleSubmit()}>Launch</button>
							</div>

							<!-- Central Suggestions Overlay -->
							<div class="absolute left-0 right-0 top-16 bg-neutral-900/95 border border-white/10 rounded-2xl shadow-2xl p-2 backdrop-blur-xl flex flex-col gap-1 z-50 max-h-80 overflow-y-auto" style=${use(this.showCenterSuggestions, (s) => s ? "display: flex;" : "display: none;")}>
								${use(this.centerSuggestions, (sugs) => sugs.map((sug) => html`
									<div class="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-800/80 cursor-pointer transition-colors group" on:mousedown=${(e) => { e.preventDefault(); this.selectSuggestion(sug.url); }}>
										<div class="flex items-center gap-3 overflow-hidden">
											<span class="text-lg">${sug.icon}</span>
											<div class="flex flex-col overflow-hidden">
												<div class="truncate text-sm font-semibold text-neutral-100 group-hover:text-white">${sug.title}</div>
												<div class="truncate text-xs text-neutral-500 font-mono">${sug.url}</div>
											</div>
										</div>
										<span class="text-[10px] font-semibold uppercase px-2 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-400 shrink-0 ml-2">${sug.badge}</span>
									</div>
								`))}
							</div>
						</div>

						<!-- Dashboard Tab Bar Selector -->
						<div class="flex items-center p-1 bg-neutral-900/80 border border-white/10 rounded-xl mb-6 gap-1 w-full max-w-[640px]">
							<button class="flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${use(this.activeTab, (t) => t === "launchpad" ? "bg-indigo-600 text-white shadow" : "text-neutral-400 hover:text-white")}" on:click=${() => { this.activeTab = "launchpad"; }}>
								🚀 Launchpad
							</button>
							<button class="flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${use(this.activeTab, (t) => t === "bookmarks" ? "bg-indigo-600 text-white shadow" : "text-neutral-400 hover:text-white")}" on:click=${() => { this.activeTab = "bookmarks"; }}>
								⭐ Bookmarks (${use(store.bookmarks, (b) => b ? b.length : 0)})
							</button>
							<button class="flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${use(this.activeTab, (t) => t === "history" ? "bg-indigo-600 text-white shadow" : "text-neutral-400 hover:text-white")}" on:click=${() => { this.activeTab = "history"; }}>
								🕒 History (${use(store.history, (h) => h ? h.length : 0)})
							</button>
						</div>

						<!-- Tab Content Container -->
						<div class="w-full max-w-[800px] mb-8">
							<!-- 1. LAUNCHPAD TAB -->
							<div class="w-full flex flex-col gap-6" style=${use(this.activeTab, (t) => t === "launchpad" ? "display: flex;" : "display: none;")}>
								<div class="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full">
									${quickLinks.map(link => html`
										<div class="bg-neutral-900/50 border border-white/5 rounded-xl p-4 flex flex-col items-start justify-between cursor-pointer min-h-[110px] transition-all hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-neutral-900/80 shadow-md group" on:click=${() => handleQuickLink(link.url)}>
											<div class="text-2xl bg-white/5 rounded-lg w-9 h-9 flex items-center justify-center mb-2 border border-white/5 transition-all group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 group-hover:scale-105">${link.icon}</div>
											<div>
												<div class="text-sm font-semibold text-neutral-100 group-hover:text-indigo-200">${link.name}</div>
												<div class="text-[11px] text-neutral-500 line-clamp-1">${link.desc}</div>
											</div>
										</div>
									`)}
								</div>

								<!-- Connection Status Card -->
								<div class="w-full bg-neutral-900/40 border border-white/5 rounded-xl p-4 px-6 flex justify-between items-center flex-wrap gap-3">
									<div class="flex items-center gap-2.5">
										<div class="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"></div>
										<div class="text-sm font-medium text-neutral-300">Scramjet Core Ready</div>
									</div>
									<div class="flex gap-4">
										<div class="font-mono text-xs text-neutral-500">Protocol: <strong class="text-indigo-400 font-medium">${use(store.transport, (t) => t.includes("epoxy") ? "Epoxy" : t.includes("libcurl") ? "Libcurl.js" : "Bare 3")}</strong></div>
										<div class="font-mono text-xs text-neutral-500">Wisp Gateway: <strong class="text-indigo-400 font-medium">Connected</strong></div>
									</div>
								</div>
							</div>

							<!-- 2. BOOKMARKS TAB -->
							<div class="w-full flex flex-col gap-4" style=${use(this.activeTab, (t) => t === "bookmarks" ? "display: flex;" : "display: none;")}>
								<!-- Header with Controls -->
								<div class="flex items-center justify-between gap-3">
									<input class="flex-1 bg-neutral-900/60 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-neutral-500 outline-none focus:border-indigo-500/50" placeholder="Filter bookmarks..." 
										bind:value=${use(this.filterText)} 
										on:input=${(e) => { this.filterText = e.target.value; }}></input>
									<button class="bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl px-4 py-2 text-xs flex items-center gap-1.5 transition-all shadow shrink-0" on:click=${() => { this.showAddBmModal = !this.showAddBmModal; }}>
										<span>+</span> Add Bookmark
									</button>
								</div>

								<!-- Inline Add Bookmark Form -->
								<div class="bg-neutral-900/90 border border-indigo-500/30 rounded-xl p-4 flex flex-col gap-3 shadow-xl" style=${use(this.showAddBmModal, (m) => m ? "display: flex;" : "display: none;")}>
									<div class="text-xs font-bold uppercase tracking-wider text-indigo-400">Add Custom Bookmark</div>
									<div class="flex flex-col sm:flex-row gap-2">
										<input class="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500" placeholder="Bookmark Title (e.g. My Website)" 
											bind:value=${use(this.newBmName)} 
											on:input=${(e) => { this.newBmName = e.target.value; }}></input>
										<input class="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-indigo-500" placeholder="URL (e.g. https://example.com)" 
											bind:value=${use(this.newBmUrl)} 
											on:input=${(e) => { this.newBmUrl = e.target.value; }}></input>
										<button class="bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg px-4 py-2 text-xs shrink-0" on:click=${() => {
											if (this.newBmUrl) {
												toggleUrlBookmark(this.newBmUrl, this.newBmName);
												this.newBmName = "";
												this.newBmUrl = "";
												this.showAddBmModal = false;
											}
										}}>Save</button>
										<button class="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium rounded-lg px-3 py-2 text-xs shrink-0" on:click=${() => { this.showAddBmModal = false; }}>Cancel</button>
									</div>
								</div>

								<!-- Bookmarks Grid -->
								<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
									${use(store.bookmarks, (bms) => {
										const filter = (this.filterText || "").toLowerCase();
										const list = (bms || []).filter(b => !filter || (b.name && b.name.toLowerCase().includes(filter)) || (b.url && b.url.toLowerCase().includes(filter)));
										if (list.length === 0) {
											return html`
												<div class="col-span-2 text-center py-10 bg-neutral-900/30 border border-dashed border-white/10 rounded-xl text-neutral-500 text-sm">
													No saved bookmarks found. Click the ⭐ button on any page or add one above!
												</div>
											`;
										}
										return list.map(bm => html`
											<div class="bg-neutral-900/50 border border-white/10 rounded-xl p-3.5 flex items-center justify-between gap-3 hover:border-indigo-500/40 transition-all group">
												<div class="flex items-center gap-3 overflow-hidden cursor-pointer flex-1" on:click=${() => handleQuickLink(bm.url)}>
													<span class="text-xl bg-white/5 rounded-lg w-9 h-9 flex items-center justify-center border border-white/5 shrink-0">${bm.icon || "⭐"}</span>
													<div class="flex flex-col overflow-hidden">
														<div class="text-sm font-semibold text-neutral-200 group-hover:text-indigo-300 truncate">${bm.name}</div>
														<div class="text-xs text-neutral-500 truncate font-mono">${bm.url}</div>
													</div>
												</div>
												<button class="text-neutral-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors shrink-0" on:click=${() => toggleUrlBookmark(bm.url, "")} title="Remove Bookmark">
													<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
														<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
													</svg>
												</button>
											</div>
										`);
									})}
								</div>
							</div>

							<!-- 3. HISTORY TAB -->
							<div class="w-full flex flex-col gap-4" style=${use(this.activeTab, (t) => t === "history" ? "display: flex;" : "display: none;")}>
								<!-- Header with Controls -->
								<div class="flex items-center justify-between gap-3">
									<input class="flex-1 bg-neutral-900/60 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-neutral-500 outline-none focus:border-indigo-500/50" placeholder="Search history..." 
										bind:value=${use(this.filterText)} 
										on:input=${(e) => { this.filterText = e.target.value; }}></input>
									<button class="bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/40 font-medium rounded-xl px-4 py-2 text-xs flex items-center gap-1.5 transition-all shrink-0" on:click=${() => { store.history = []; }}>
										Clear All History
									</button>
								</div>

								<!-- History Records List -->
								<div class="flex flex-col gap-2 w-full">
									${use(store.history, (histList) => {
										const filter = (this.filterText || "").toLowerCase();
										const list = (histList || []).filter(h => !filter || (h.name && h.name.toLowerCase().includes(filter)) || (h.url && h.url.toLowerCase().includes(filter)));
										if (list.length === 0) {
											return html`
												<div class="text-center py-10 bg-neutral-900/30 border border-dashed border-white/10 rounded-xl text-neutral-500 text-sm">
													No recent browsing history recorded.
												</div>
											`;
										}
										return list.map(item => html`
											<div class="bg-neutral-900/40 border border-white/5 rounded-xl p-3 px-4 flex items-center justify-between gap-3 hover:border-indigo-500/30 transition-all group">
												<div class="flex items-center gap-3 overflow-hidden cursor-pointer flex-1" on:click=${() => handleQuickLink(item.url)}>
													<span class="text-neutral-500 text-sm shrink-0">🕒</span>
													<div class="flex flex-col overflow-hidden">
														<div class="text-sm font-medium text-neutral-200 group-hover:text-indigo-300 truncate">${item.name || item.url}</div>
														<div class="text-xs text-neutral-500 truncate font-mono">${item.url}</div>
													</div>
												</div>
												<div class="flex items-center gap-3 shrink-0">
													<span class="text-xs text-neutral-500 font-mono">${formatTimeAgo(item.visitedAt)}</span>
													<button class="text-neutral-600 hover:text-rose-400 p-1 rounded hover:bg-white/5 transition-colors" on:click=${() => {
														store.history = store.history.filter(h => h.id !== item.id);
													}} title="Delete Item">
														<svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
															<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
														</svg>
													</button>
												</div>
											</div>
										`);
									})}
								</div>
							</div>
						</div>
					</div>

					<!-- Proxy Active Iframe (Only shown when active tab is not home) -->
					<div class="flex-1 flex flex-col min-h-0 w-full h-full p-px bg-gradient-to-br from-indigo-500/15 to-transparent rounded-xl border border-white/10 overflow-hidden relative" style=${use(this.isHome, (h) => h ? "display: none;" : "display: flex;")}>
						${use(this.tabs, (tabList) => tabList.map((tab) => html`
							<div class="w-full h-full flex-1 min-h-0" style=${tab.id === this.activeTabId && !tab.isHome ? "display: flex;" : "display: none;"}>
								${tab.frame.frame}
							</div>
						`))}
					</div>
				</div>
			</div>
		`;
	}

	const root = document.getElementById("app");
	try {
		root.replaceWith(h(BrowserApp));
	} catch (e) {
		root.replaceWith(document.createTextNode("" + e));
		throw e;
	}
	function b64(buffer) {
		let binary = "";
		const bytes = new Uint8Array(buffer);
		const len = bytes.byteLength;
		for (let i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}

		return btoa(binary);
	}
	const arraybuffer = await (await fetch("/assets/scramjet.png")).arrayBuffer();
	console.log(
		"%cb",
		`
      background-image: url(data:image/png;base64,${b64(arraybuffer)});
      color: transparent;
      padding-left: 200px;
      padding-bottom: 100px;
      background-size: contain;
      background-position: center center;
      background-repeat: no-repeat;
  `
	);
});
