export default async function ({ feature }) {
	const STATE_KEY = "__steProjectCardStatsState";
	const ITEM_DEFINITIONS = [
		{ settingId: "show-love", dataKey: "loves", label: "Love", iconName: "love-icon", type: "number" },
		{ settingId: "show-fav", dataKey: "favorites", label: "Favorite", iconName: "fav-icon", type: "number" },
		{ settingId: "show-view", dataKey: "views", label: "View", iconName: "views-icon", type: "number" },
		{ settingId: "show-published", dataKey: "published", label: "Published", iconName: "published-icon", type: "date" },
	];

	const iconUrls = ITEM_DEFINITIONS.reduce((all, item) => {
		all[item.settingId] = feature.self.getResource(item.iconName);
		return all;
	}, {});

	if (!window[STATE_KEY]) window[STATE_KEY] = { optionVisibility: new Map(), observedFeatures: new WeakSet(), projectStats: new Map(), statsRequests: new Map(), rerender: null, };
	const state = window[STATE_KEY];

	function initializeOptionVisibility() {
		for (const item of ITEM_DEFINITIONS) {
			state.optionVisibility.set(item.settingId, feature.settings.get(item.settingId) || false);
		}
	}

	function parseProjectStats(projectData) {
		if (!projectData || typeof projectData !== "object") return null;
		const projectId = projectData.id != null ? String(projectData.id) : null;
		if (!projectId) return null;

		function parseCount(value) {
			const parsed = Number(value);
			return Number.isFinite(parsed) ? parsed : null;
		}

		const publishedRaw = projectData.history && typeof projectData.history.shared === "string" ? projectData.history.shared : null;

		return {
			id: projectId,
			loves: parseCount(projectData.stats && projectData.stats.loves),
			favorites: parseCount(projectData.stats && projectData.stats.favorites),
			views: parseCount(projectData.stats && projectData.stats.views),
			published: publishedRaw ? publishedRaw.split("T")[0] : null,
		};
	}

	async function fetchProjectStats(projectId) {
		if (!projectId) return null;
		if (state.projectStats.has(projectId)) return state.projectStats.get(projectId);
		if (state.statsRequests.has(projectId)) return state.statsRequests.get(projectId);

		const request = (async () => {
			try {
				const response = await fetch(`https://api.scratch.mit.edu/projects/${projectId}`);
				if (!response.ok) {
					state.projectStats.set(projectId, null);
					return null;
				}

				const parsed = parseProjectStats(await response.json());
				state.projectStats.set(projectId, parsed);
				return parsed;
			} catch {
				state.projectStats.set(projectId, null);
				return null;
			} finally {
				state.statsRequests.delete(projectId);
			}
		})();

		state.statsRequests.set(projectId, request);
		return request;
	}

	function getProjectIdFromCard(card) {
		const link = card.querySelector("a.thumbnail-image, a.thumbnail-title, a[href*='/projects/']");
		const href = link && typeof link.href === "string" ? link.href : "";
		const match = href.match(/\/projects\/(\d+)/);
		return match ? match[1] : null;
	}

	function formatNumber(value) {
		if (!Number.isFinite(value)) return "-";
		return value.toLocaleString();
	}

	function formatPublishedDate(value) {
		if (!value || typeof value !== "string") return "-";
		const date = new Date(value);
		if (Number.isNaN(date.getTime())) return value;
		return date.toLocaleDateString();
	}

	function ensureCardStatsRow(card) {
		const creator = card.querySelector("div.thumbnail-creator");
		if (!creator) return null;

		let row = card.querySelector(".ste-project-card-stats-row");
		if (!row) {
			row = document.createElement("div");
			row.className = "ste-project-card-stats-row";
			creator.insertAdjacentElement("afterend", row);
		}
		return row;
	}

	function renderCardStats(card) {
		const row = ensureCardStatsRow(card);
		if (!row) return;

		const projectId = getProjectIdFromCard(card);
		const enabledItems = ITEM_DEFINITIONS.filter((item) => { return state.optionVisibility.get(item.settingId) });
		const hasStats = projectId ? state.projectStats.has(projectId) : false;
		const stats = hasStats ? state.projectStats.get(projectId) : null;

		if (enabledItems.length === 0) {
			row.replaceChildren();
			row.style.display = "none";
			return;
		}

		row.style.display = "flex";
		row.replaceChildren();

		for (const item of enabledItems) {
			const statItem = document.createElement("span");
			statItem.className = "ste-project-card-stat";

			const icon = document.createElement("span");
			icon.className = "ste-project-card-stat-icon";
			icon.style.setProperty("--ste-project-card-icon-url", `url(\"${iconUrls[item.settingId]}\")`);

			const value = document.createElement("span");
			value.className = "ste-project-card-stat-value";
			value.textContent = item.type === "date" ? formatPublishedDate(stats ? stats[item.dataKey] : null) : formatNumber(stats ? stats[item.dataKey] : NaN);

			statItem.title = `${item.label}: ${value.textContent}`;
			statItem.appendChild(icon);
			statItem.appendChild(value);
			row.appendChild(statItem);
		}

		if (projectId && !hasStats && !state.statsRequests.has(projectId)) {
			fetchProjectStats(projectId).then(() => {
				if (state.projectStats.has(projectId)) {
					const rerender = state.rerender;
					if (typeof rerender === "function") rerender();
				}
			});
		}
	}

	function renderVisibleCards() {
		if (state.optionVisibility.size === 0) initializeOptionVisibility();
		document.querySelectorAll("#projectBox div.thumbnail.project").forEach(renderCardStats);
	}

	state.rerender = renderVisibleCards;
	initializeOptionVisibility();

	if (!state.observedFeatures.has(feature)) {
		state.observedFeatures.add(feature);
		feature.settings.addEventListener("changed", (event) => {
			if (!event || typeof event !== "object") {
				initializeOptionVisibility();
				renderVisibleCards();
				return;
			}

			const item = ITEM_DEFINITIONS.find((definition) => definition.settingId === event.key);
			if (!item) return;

			state.optionVisibility.set(event.key, event.value);
			renderVisibleCards();
		});
	}

	ScratchTools.waitForElements("#projectBox div.thumbnail.project", renderCardStats);
	renderVisibleCards();

	feature.addEventListener("enabled", () => renderVisibleCards());
}
