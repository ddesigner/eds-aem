import { fetchPlaceholders } from '../../scripts/placeholders.js';
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import { fetchTaxonomy } from '../../scripts/taxonomy.js';

export default async function decorate(block) {
    const [
        quoteWrapper,
        authorEl,
        showAsHeadingEl,
        headingTypeEl,
    ] = block.children;
    console.log(block);
    const selectedHeading = headingTypeEl?.textContent?.trim();
    const showAsHeadingEnable = showAsHeadingEl?.textContent?.trim();

    console.log('selectedHeading', selectedHeading);
    const blockquote = document.createElement('blockquote');
    blockquote.textContent = quoteWrapper.textContent.trim();


    //Hide heading tag and checkbox value
    showAsHeadingEl.style.display = "none";
    headingTypeEl.style.display = "none";
    authorEl.classList.add("quote-author");

    const allowed = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const isValidHeading = showAsHeadingEnable === "true" && selectedHeading && allowed.includes(selectedHeading.toLowerCase());
    if (isValidHeading) {
        // Wrap blockquote with selected heading
        const heading = document.createElement(selectedHeading.toLowerCase());
        heading.textContent = blockquote.textContent;
        blockquote.textContent = '';
        blockquote.appendChild(heading);
        quoteWrapper.replaceWith(blockquote);
    } else {
        const parent = quoteWrapper.parentElement;

        if (parent && allowed.includes(parent.tagName.toLowerCase())) {
            parent.replaceWith(blockquote);
        } else {
            quoteWrapper.replaceWith(blockquote);
        }
    }

    // Append suffix at the bottom
    const placeholders = await fetchPlaceholders();
    const quoteSuffix = placeholders.quoteSuffix;
    if (quoteSuffix) {
        const suffixEle = document.createElement('p');
        suffixEle.textContent = quoteSuffix;
        authorEl.appendChild(suffixEle);
    }

    //Read value from Taxonomy and append in quote  
    const taxonomy = await fetchTaxonomy();
    const tagData = taxonomy?.data;
    if (Array.isArray(tagData) && tagData.length > 0) {
        const titles = tagData.map(item => item?.title).filter(Boolean);
        if (titles.length > 0) {
            block.dataset.tag = titles.join(',');
        }
    }


    const quoteMata = getMetadata('quote');
    console.log('tag', quoteMata);
}
