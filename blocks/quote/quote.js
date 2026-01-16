export default function decorate(block) {
    const [
        quoteWrapper,
        authorEl,
        showAsHeadingEl,
        headingTypeEl
    ] = block.children;

    const selectedHeading = headingTypeEl?.textContent?.trim();
    const showAsHeadingEnable = showAsHeadingEl?.textContent?.trim();

    console.log('selectedHeading', selectedHeading);
    const blockquote = document.createElement('blockquote');
    blockquote.textContent = quoteWrapper.textContent.trim();

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

    // quoteWrapper.replaceChildren(blockquote);
}


