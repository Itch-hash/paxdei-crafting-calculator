const ASSET_BASE_URL = 'https://cdn-hosted.gaming.tools/paxdei';

function normalizeAssetPath(assetPath, height) {
	if (!assetPath) return '';

	let normalizedPath = assetPath;

	if (normalizedPath.startsWith('/images/_pd/')) {
		normalizedPath = normalizedPath.replace('/images/_pd/', '/images/{height}/');
	}

	if (normalizedPath.startsWith('/images/') && !normalizedPath.startsWith('/images/{height}/')) {
		normalizedPath = normalizedPath.replace('/images/', '/images/{height}/');
	}

	return normalizedPath.replace('{height}', height);
}

export function buildAssetUrl(assetPath, height = '_pd') {
	if (!assetPath) return '';

	const normalizedPath = normalizeAssetPath(assetPath, height);
	return `${ASSET_BASE_URL}${normalizedPath.startsWith('/') ? '' : '/'}${normalizedPath}`;
}