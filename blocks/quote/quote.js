export default function decorate(block) {
    const [quoteWrapper] = block.children;
    const [
        quoteEl,
        authorEl,
        showAsHeadingEl,
        headingTypeEl
    ] = block.children;

    const selectedHeading = headingTypeEl?.textContent?.trim() || 'h2';
    console.log('selectedHeading', selectedHeading);
    const blockquote = document.createElement('blockquote');
    blockquote.textContent = quoteWrapper.textContent.trim();

    const data = block.dataset;
    const allowed = ['h2', 'h3', 'h4', 'h5', 'h6'];
    const headingType = allowed.includes(data.headingType);;
    if (headingType) {

    }
    quoteWrapper.replaceChildren(blockquote);
}

