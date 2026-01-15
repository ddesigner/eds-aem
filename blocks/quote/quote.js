export default function decorate(block) {
    const data = block.dataset;

    const quote = data.quote;
    const author = data.author;
    const showAsHeading = data.showAsHeading === 'true';

    const allowed = ['h2', 'h3', 'h4', 'h5', 'h6'];
    const headingType = allowed.includes(data.headingType)
        ? data.headingType
        : 'h2';

    // Clear block
    block.innerHTML = '';

    // Create blockquote wrapper
    const blockquote = document.createElement('blockquote');

    // Create quote text element
    const textEl = document.createElement(
        showAsHeading ? headingType : 'p'
    );
    textEl.textContent = quote;

    blockquote.append(textEl);

    // Optional author
    if (author) {
        const authorEl = document.createElement('cite');
        authorEl.textContent = author;
        blockquote.append(authorEl);
    }

    block.append(blockquote);
}
