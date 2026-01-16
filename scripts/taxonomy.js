export async function fetchTaxonomy() {
    try {
        const response = await fetch('/taxonomy.json');
        if (!response.ok) return null;

        const json = await response.json();

        if (json[':type'] === 'multi-sheet') {
            const lang = document.documentElement.lang || 'en';
            return json[lang] || json.default || json.en;
        }

        return json;
    } catch {
        return null;
    }
}
