const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote');
const copyQuoteBtn = document.getElementById('copy-quote');
const tweetQuoteBtn = document.getElementById('tweet-quote');

const API_URL = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';

async function fetchQuote() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.success && data.data) {
            const { content, author } = data.data;
            quoteText.textContent = content;
            quoteAuthor.textContent = `- ${author || 'Unknown'}`;
        } else {
            throw new Error('Failed to fetch quote');
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
        quoteText.textContent = 'Failed to load quote. Please try again.';
        quoteAuthor.textContent = '';
    }
}

async function copyQuote() {
    try {
        const quote = `${quoteText.textContent} ${quoteAuthor.textContent}`;
        await navigator.clipboard.writeText(quote);
        alert('Quote copied to clipboard!');
    } catch (error) {
        alert('Failed to copy quote. Please try again.');
    }
}

function tweetQuote() {
    const quote = `${quoteText.textContent} ${quoteAuthor.textContent}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', fetchQuote);
copyQuoteBtn.addEventListener('click', copyQuote);
tweetQuoteBtn.addEventListener('click', tweetQuote);

// this wil get the initial quote
fetchQuote();