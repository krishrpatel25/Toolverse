/**
 * SEO content and FAQs for all tools.
 * Keyed by tool slug.
 */
export const TOOL_SEO_DATA: Record<
  string,
  { seoContent: string; faqs: { q: string; a: string }[] }
> = {
  // ── TEXT TOOLS ────────────────────────────────────────────────────────────
  "word-counter": {
    seoContent: `A word counter is an essential writing tool for bloggers, students, and professionals. Whether you're checking an essay against a minimum word requirement or trimming a social media caption, knowing your exact word and character count can make all the difference. Our Word Counter tool instantly displays word count, character count (with and without spaces), sentence count, and average reading time — all in real time as you type. No login or download required.`,
    faqs: [
      { q: "How accurate is the word counter?", a: "Our counter uses standard whitespace-based tokenisation, the same method used by most word processors like Microsoft Word and Google Docs." },
      { q: "Does it count characters with spaces?", a: "Yes. We show both character counts — with and without spaces — so you can meet any requirement." },
      { q: "Can I use it for SEO meta descriptions?", a: "Absolutely. Meta descriptions should ideally be 150–160 characters. Use our character counter to stay within the limit." },
    ],
  },
  "character-counter": {
    seoContent: `The Character Counter tool is perfect for keeping your content within character limits. Social media platforms like Twitter (280 chars), Instagram bios (150 chars), and SMS messages (160 chars) all cap your text. Our tool shows the live character count including and excluding spaces, along with sentence and word counts. It's completely free, browser-based, and requires no account.`,
    faqs: [
      { q: "What is the difference between characters with and without spaces?", a: "Characters with spaces count every character including space. Without spaces only counts letters, numbers, and punctuation." },
      { q: "Is there a character limit for the input?", a: "No hard limit. You can paste large documents and get an instant count." },
    ],
  },
  "case-converter": {
    seoContent: `The Case Converter transforms your text into uppercase, lowercase, title case, sentence case, or camelCase in one click. It's invaluable for developers formatting variable names, writers normalising headings, or anyone who accidentally typed with Caps Lock on. Simply paste your text and click the desired case format — no installation needed.`,
    faqs: [
      { q: "What case formats are supported?", a: "UPPERCASE, lowercase, Title Case, Sentence case, and camelCase." },
      { q: "Will it preserve numbers and special characters?", a: "Yes. Only alphabetical letters are transformed; numbers and punctuation remain unchanged." },
    ],
  },
  "text-reverser": {
    seoContent: `The Text Reverser tool flips your text character-by-character or word-by-word instantly. It's widely used for creative writing puzzles, magic tricks, encoding simple messages, and generating palindromes. Paste your text, choose your reversal mode, and copy the result in seconds.`,
    faqs: [
      { q: "Can I reverse word order instead of characters?", a: "Yes. You can reverse the entire string character-by-character, or reverse the order of words while keeping each word intact." },
      { q: "Does it handle Unicode and emojis?", a: "Yes, the tool handles Unicode characters correctly." },
    ],
  },
  "remove-spaces": {
    seoContent: `The Remove Extra Spaces tool cleans up messy whitespace from copied text, database exports, or code. It removes leading and trailing spaces, collapses multiple spaces into one, and strips unnecessary blank lines. Perfect for cleaning up data before importing into spreadsheets or databases.`,
    faqs: [
      { q: "Does it remove all spaces or just extra ones?", a: "By default it collapses multiple consecutive spaces into one. You can also choose to remove ALL spaces if needed." },
      { q: "Can I clean up line breaks too?", a: "Yes, the tool also handles normalising excessive line breaks." },
    ],
  },
  "duplicate-remover": {
    seoContent: `The Remove Duplicate Lines tool quickly de-duplicates your list data. Whether you have a list of emails, keywords, URLs, or any text — just paste it in and the tool removes every duplicate line, leaving you with a clean, unique set. Optionally sort the results alphabetically.`,
    faqs: [
      { q: "Is the comparison case-sensitive?", a: "Yes by default. Toggle case-insensitive mode if you want 'Apple' and 'apple' to be treated as duplicates." },
      { q: "Does it handle very large lists?", a: "Yes, the tool runs entirely in the browser and can handle thousands of lines quickly." },
    ],
  },
  "text-sorter": {
    seoContent: `The Text Sorter arranges lines of text alphabetically (A–Z or Z–A) or numerically. It's perfect for sorting lists of names, keywords, URLs, or data exports before further processing. You can also reverse the sort order or perform case-insensitive sorting.`,
    faqs: [
      { q: "Can I sort numbers correctly?", a: "Yes. Enable numeric sort mode to sort lines as numbers instead of strings, so '10' comes after '9'." },
      { q: "Does it remove duplicates while sorting?", a: "Sorting and deduplication are separate options. You can enable both together." },
    ],
  },
  "lorem-ipsum": {
    seoContent: `The Lorem Ipsum Generator creates placeholder text for wireframes, mockups, and design prototypes. Choose how many words, sentences, or paragraphs you need and copy the dummy text instantly. Lorem Ipsum has been the standard placeholder text in the printing and typesetting industry since the 1500s.`,
    faqs: [
      { q: "Can I choose how many paragraphs to generate?", a: "Yes. You can specify the number of words, sentences, or paragraphs." },
      { q: "Can I get the classical Lorem Ipsum (starting with 'Lorem ipsum dolor...')?", a: "Yes, just enable the classic start option." },
    ],
  },
  "random-text": {
    seoContent: `The Random Text Generator creates unique random strings, sentences, or paragraphs. Use it to fill databases with test data, generate random passphrases, or seed content for development environments. Choose length, character set, and case options to customise your output.`,
    faqs: [
      { q: "Can I generate random alphanumeric strings?", a: "Yes. You can configure the character set to include letters, numbers, and special characters." },
      { q: "Is the generated text truly random?", a: "Yes. It uses JavaScript's cryptographically secure random number generator where applicable." },
    ],
  },
  "text-compare": {
    seoContent: `The Text Compare tool highlights differences between two blocks of text, similar to a Git diff. It's useful for proofreaders, developers, and editors who need to track changes between document versions. Differing lines are highlighted, making it easy to spot additions, deletions, and changes.`,
    faqs: [
      { q: "Does it work for code comparison?", a: "Yes, it works for any plain text including code, articles, and spreadsheet data." },
      { q: "Can it compare ignoring case or whitespace?", a: "Yes, you can toggle case-insensitive and ignore-whitespace modes." },
    ],
  },
  "text-to-slug": {
    seoContent: `The Text to Slug converter transforms any text into a URL-friendly slug. It replaces spaces with hyphens, lowercases all characters, and strips special characters so your URLs are clean, readable, and SEO-optimised. Essential for bloggers, CMS users, and web developers.`,
    faqs: [
      { q: "What characters are removed?", a: "All characters except letters, numbers, and hyphens are removed. Spaces are replaced with hyphens." },
      { q: "Does it support non-English characters?", a: "Common accented characters (é, ü, ñ) are transliterated to their ASCII equivalents." },
    ],
  },

  // ── DEVELOPER TOOLS ───────────────────────────────────────────────────────
  "json-formatter": {
    seoContent: `The JSON Formatter beautifies minified JSON into a readable, indented format with syntax highlighting. It's an indispensable tool for developers debugging API responses, reading configuration files, or sharing data with colleagues. Simply paste your raw JSON and get a formatted, human-readable version instantly — no IDE required.`,
    faqs: [
      { q: "Can it format minified JSON?", a: "Yes. Paste any compact JSON and it will be expanded into a properly indented, readable format." },
      { q: "Does it validate JSON too?", a: "Yes. If your JSON contains syntax errors, the formatter highlights the problem and tells you where the error occurred." },
      { q: "Is large JSON supported?", a: "Yes, the tool runs in the browser and can handle large JSON files quickly." },
    ],
  },
  "json-validator": {
    seoContent: `The JSON Validator checks if your JSON is syntactically correct. It clearly reports any errors including the line number and type of mistake. Perfect for developers working with REST APIs, configuration files, or data exports. Catch JSON syntax errors before they break your application.`,
    faqs: [
      { q: "What errors does it detect?", a: "Missing commas, unclosed brackets, trailing commas, unquoted keys, and all other JSON syntax violations." },
      { q: "Does it validate against a schema?", a: "Basic structural validation is included. Full JSON Schema validation is not supported in this tool." },
    ],
  },
  "xml-formatter": {
    seoContent: `The XML Formatter and Validator formats raw or minified XML into a clean, indented, human-readable structure. It's useful for working with SOAP APIs, RSS feeds, SVG files, and configuration data. The tool also validates your XML for well-formedness and highlights any errors.`,
    faqs: [
      { q: "Does it support namespaces?", a: "Yes, the formatter correctly handles XML namespaces and preserves them in the output." },
      { q: "Can I minify XML too?", a: "Yes, toggle the minify option to strip all formatting and produce compact XML." },
    ],
  },
  "base64-encoder": {
    seoContent: `The Base64 Encoder converts plain text, strings, or binary data into Base64 format. Base64 is widely used for encoding binary data in email attachments, data URLs, JWT tokens, and HTTP basic authentication. Our tool supports encoding text and files with a single click.`,
    faqs: [
      { q: "What is Base64 used for?", a: "Base64 is used to safely transmit binary data over text-based protocols like HTTP, email (MIME), and JSON." },
      { q: "Can I encode files?", a: "Yes. Upload an image or file to encode it as a Base64 data URL." },
    ],
  },
  "base64-decoder": {
    seoContent: `The Base64 Decoder converts Base64-encoded strings back to their original form — plain text or binary data. Use it to inspect image data URLs, decode JWT payloads, or reverse Base64-encoded messages received from APIs or emails.`,
    faqs: [
      { q: "What if my Base64 string has padding issues?", a: "The decoder automatically handles missing or extra padding characters (=)." },
      { q: "Can it decode data URLs?", a: "Yes. Paste a full data URL (e.g. data:image/png;base64,...) and it will decode correctly." },
    ],
  },
  "url-encoder": {
    seoContent: `The URL Encoder converts special characters in a string to their percent-encoded equivalents, making them safe to use in a URL. Spaces become %20, & becomes %26, etc. Essential for building query strings, form submissions, and API requests programmatically.`,
    faqs: [
      { q: "What is percent encoding?", a: "Percent encoding replaces unsafe or reserved URL characters with a % followed by their hexadecimal ASCII code." },
      { q: "Should I encode the full URL or just the params?", a: "Encode only query parameter values, not the full URL. Encoding the full URL will break the protocol and domain separators." },
    ],
  },
  "url-decoder": {
    seoContent: `The URL Decoder converts percent-encoded URL strings back to their human-readable form. Use it to decode query parameters from URLs, inspect encoded API responses, or read encoded form data. It decodes %20 to space, %26 to &, and all other percent-encoded characters.`,
    faqs: [
      { q: "What is the difference between URL encoding and decoding?", a: "Encoding converts special characters to %XX format. Decoding reverses that — converting %XX back to the original character." },
      { q: "Can it decode full URLs?", a: "Yes. Paste a full URL with encoded query parameters and the tool will make it readable." },
    ],
  },
  "url-shortener": {
    seoContent: `The URL Shortener converts long, unwieldy URLs into compact, shareable links. Short URLs are cleaner in social media posts, emails, and printed materials. Our tool uses the free is.gd service to generate direct short links without redirects or tracking overlays.`,
    faqs: [
      { q: "Are the shortened URLs permanent?", a: "Links generated via is.gd are generally long-lived, but we recommend this tool for convenience rather than critical production use." },
      { q: "Is there a click tracking feature?", a: "Not in this tool. The focus is on fast, clean link shortening without tracking." },
    ],
  },
  "uuid-generator": {
    seoContent: `The UUID Generator creates universally unique identifiers (UUIDs/GUIDs) following the UUID v4 standard. UUIDs are used in databases, distributed systems, and APIs to uniquely identify records without requiring central coordination. Generate single or bulk UUIDs instantly.`,
    faqs: [
      { q: "What is a UUID v4?", a: "A UUID v4 is a 128-bit randomly generated identifier in the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx. Version 4 means it uses random numbers." },
      { q: "Are two generated UUIDs ever the same?", a: "Practically never. The probability of a collision with UUID v4 is astronomically low." },
    ],
  },
  "regex-tester": {
    seoContent: `The Regex Tester lets you write, test, and debug regular expressions in real time. As you type your pattern and test string, all matches are highlighted instantly. Supports JavaScript regex syntax including flags (g, i, m, s, u). Perfect for developers building form validators, parsers, and data extraction tools.`,
    faqs: [
      { q: "Which regex flavour does it use?", a: "JavaScript (ECMAScript) regex, which is also compatible with many other languages." },
      { q: "Can I test capture groups?", a: "Yes. Matched capture groups are displayed in the results panel beneath the tester." },
    ],
  },
  "bsod": {
    seoContent: `The Blue Screen of Death (BSOD) prank tool simulates a realistic Windows 10 stop error screen. It's perfect for playing harmless jokes on friends or recording prank videos. The fullscreen overlay mimics the genuine Windows BSOD with an accurate stop code, sad face, and QR code. Press the hidden close button to exit.`,
    faqs: [
      { q: "How do I exit the BSOD screen?", a: "Hover towards the very top of the screen to reveal the close (×) button." },
      { q: "Will it harm my computer?", a: "Absolutely not. It is a purely visual overlay running in your browser tab. No system files are modified." },
    ],
  },
  "jwt-decoder": {
    seoContent: `The JWT Decoder decodes JSON Web Tokens without requiring a secret key. It instantly Shows the header, payload, and signature sections in a readable format. Use it to inspect claims like expiry time (exp), user roles, and issuer information. Note: the decoder does not verify the token's signature — never share sensitive tokens.`,
    faqs: [
      { q: "Is it safe to paste my JWT here?", a: "Never paste production tokens containing sensitive user data into online tools. Use this for development and testing only." },
      { q: "Why can't I verify the signature?", a: "Signature verification requires the secret key, which should never leave your server. The decoder only shows the decoded contents." },
    ],
  },
  "html-formatter": {
    seoContent: `The HTML Formatter beautifies compressed or messy HTML into properly indented, readable markup. It helps developers review rendered HTML, debug template output, and clean up code from CMS exports. The tool preserves all HTML content while adding proper whitespace and indentation.`,
    faqs: [
      { q: "Does it fix broken HTML?", a: "It formats well-formed HTML correctly. It may partially fix minor issues but is not a full HTML repair tool." },
      { q: "Can I minify HTML instead?", a: "Yes. Toggle the minify option to strip all unnecessary whitespace for production output." },
    ],
  },
  "css-minifier": {
    seoContent: `The CSS Minifier removes whitespace, comments, and redundant code from your CSS to reduce file size. Smaller CSS files load faster, improving your website's performance and Google PageSpeed score. Paste your CSS and get a production-ready minified output in one click.`,
    faqs: [
      { q: "Does minifying CSS break my styles?", a: "No. Minification only removes whitespace and comments; it does not change any CSS rules or values." },
      { q: "How much file size reduction can I expect?", a: "Typically 20–50% reduction depending on how much whitespace and comments your original CSS contains." },
    ],
  },
  "js-minifier": {
    seoContent: `The JavaScript Minifier compresses your JS code by removing whitespace, comments, and shortening variable names where possible. Minified JavaScript reduces page load time and bandwidth usage. Use it for production deployments where every kilobyte counts.`,
    faqs: [
      { q: "Will minification break my JavaScript?", a: "Basic whitespace-and-comment removal is safe. Aggressive variable renaming may very rarely cause issues with certain dynamic code patterns." },
      { q: "Does it support ES6+ syntax?", a: "Yes, the minifier handles modern JavaScript including arrow functions, template literals, and destructuring." },
    ],
  },

  // ── CALCULATOR TOOLS ──────────────────────────────────────────────────────
  "age-calculator": {
    seoContent: `The Age Calculator computes your exact age in years, months, and days from your date of birth. It also shows the number of days until your next birthday. Useful for filling in forms, verifying age eligibility (for voting, driving, drinking), or simply satisfying curiosity. The calculation accounts for leap years automatically.`,
    faqs: [
      { q: "Does it account for leap years?", a: "Yes. The calculator correctly handles February 29 birthdays and leap year adjustments." },
      { q: "Can I calculate the age for a past or future date?", a: "Yes. Set any reference date in the 'as of' field to calculate age at that specific date." },
    ],
  },
  "bmi-calculator": {
    seoContent: `The BMI Calculator computes your Body Mass Index using your weight and height. BMI is a widely-used screening tool to categorise weight status: Underweight (<18.5), Normal (18.5–24.9), Overweight (25–29.9), and Obese (≥30). Supports both Metric (kg/cm) and Imperial (lb/inches) units. Note: BMI is a general indicator and does not account for muscle mass or body composition.`,
    faqs: [
      { q: "Is BMI an accurate measure of health?", a: "BMI is a simple screening tool but doesn't measure body fat directly. Consult a healthcare professional for a full health assessment." },
      { q: "Which units does it support?", a: "Both metric (kg and cm) and imperial (pounds and inches)." },
    ],
  },
  "loan-calculator": {
    seoContent: `The Loan Calculator helps you understand the true cost of borrowing. Enter your principal amount, annual interest rate, and loan term to see your monthly payment, total interest paid, and a full amortisation schedule. Use it to compare loans, plan budgets, or evaluate refinancing options for mortgages, car loans, or personal loans.`,
    faqs: [
      { q: "What loan types does it support?", a: "It calculates standard amortising loans (fixed monthly payments). This covers mortgages, auto loans, and personal loans." },
      { q: "Does it show an amortisation schedule?", a: "Yes. A month-by-month breakdown showing principal vs. interest per payment is displayed." },
    ],
  },
  "discount-calculator": {
    seoContent: `The Discount Calculator shows you exactly how much you save during sales. Enter the original price and discount percentage to see the final price and amount saved. You can also reverse-calculate the discount percentage from two prices, or find the original price from a discounted price. Perfect for shopping, retail pricing, and accounting.`,
    faqs: [
      { q: "Can I calculate the percentage off from two prices?", a: "Yes. Enter the original and sale price and the tool calculates the discount percentage automatically." },
      { q: "Does it handle tax on top of the discount?", a: "You can add a tax percentage field to calculate tax on the discounted price." },
    ],
  },
  "percentage-calculator": {
    seoContent: `The Percentage Calculator handles all common percentage maths: what is X% of Y, X is what % of Y, and percentage increase/decrease between two values. Whether you're calculating a tip, VAT, exam score, or sales growth, this tool gives you the answer instantly without any formula memorisation.`,
    faqs: [
      { q: "How do I calculate percentage increase?", a: "Enter the original value and new value; the tool computes % increase = (new − old) / old × 100." },
      { q: "Can I calculate reverse percentages?", a: "Yes. If you know the final value and the percentage applied, the tool finds the original value." },
    ],
  },
  "time-calculator": {
    seoContent: `The Time Calculator adds or subtracts hours, minutes, and seconds to find a new time or calculates the duration between two times. Useful for timesheet calculations, project tracking, scheduling cross-timezone meetings, and cooking timers. Handles AM/PM and 24-hour formats.`,
    faqs: [
      { q: "Can I add more than 24 hours?", a: "Yes. The calculator returns the total duration in hours, minutes, and seconds without wrapping to clock time." },
      { q: "Does it handle negative time differences?", a: "Yes. If the end time is before the start time, it assumes the end time is the next day." },
    ],
  },
  "date-calculator": {
    seoContent: `The Date Difference Calculator computes the exact number of days, weeks, months, or years between two dates. Use it for calculating project deadlines, contract durations, age verification, or how many days until an event. It correctly handles months of different lengths and leap years.`,
    faqs: [
      { q: "Does it count the start and end date?", a: "By default it counts the days between dates exclusively. Toggle inclusive mode to include both start and end dates." },
      { q: "Can I calculate working days?", a: "Yes, enable business days mode to exclude weekends from the count." },
    ],
  },
  "tip-calculator": {
    seoContent: `The Tip Calculator helps you quickly work out how much to tip at a restaurant or for a service and split the total between multiple people. Enter the bill amount, select a tip percentage, and the number of people to see each person's share instantly. Takes the maths stress out of dining out.`,
    faqs: [
      { q: "How is the tip percentage calculated?", a: "Tip = Bill Amount × Tip % ÷ 100. Total per person = (Bill + Tip) ÷ Number of people." },
      { q: "What tip percentage should I leave?", a: "15% is standard, 18–20% is good service, 20–25% is excellent service. Adjust to your preference." },
    ],
  },
  "unit-converter": {
    seoContent: `The Unit Converter supports over 50 unit conversions across length, weight, volume, area, speed, and more. Convert inches to centimetres, miles to kilometres, pounds to kilograms, gallons to litres, and many other common conversions instantly. Perfect for students, travellers, engineers, and cooks.`,
    faqs: [
      { q: "Which conversion categories are supported?", a: "Length, weight/mass, volume, area, speed, temperature, data storage, time, and pressure." },
      { q: "How accurate are the conversions?", a: "Conversions use precise scientific ratios and are accurate to at least 6 significant figures." },
    ],
  },
  "temperature-converter": {
    seoContent: `The Temperature Converter instantly converts between Celsius, Fahrenheit, and Kelvin. It's useful for cooking (oven temperatures), weather comparisons, scientific calculations, and international travel. Enter a value in any scale and all other scales update in real time.`,
    faqs: [
      { q: "What is the formula for Celsius to Fahrenheit?", a: "°F = (°C × 9/5) + 32. For example, 100°C = 212°F." },
      { q: "What is absolute zero in different scales?", a: "0 K = −273.15°C = −459.67°F." },
    ],
  },
  "currency-converter": {
    seoContent: `The Currency Converter converts between dozens of world currencies using up-to-date exchange rates. Whether you're travelling, shopping internationally, or managing multi-currency finances, our tool gives you an instant conversion. Enter an amount and select the source and target currencies for the result.`,
    faqs: [
      { q: "How current are the exchange rates?", a: "Rates are fetched from a live exchange rate API and are updated regularly." },
      { q: "Which currencies are supported?", a: "Major world currencies including USD, EUR, GBP, JPY, INR, AUD, CAD, CHF, and many more." },
    ],
  },
  "gpa-calculator": {
    seoContent: `The GPA Calculator computes your Grade Point Average from course grades and credit hours. Supports 4.0 and percentage grading scales. Add multiple courses, enter grades and credits, and get your weighted GPA instantly. Helpful for academic planning, scholarship applications, and university admissions requirements.`,
    faqs: [
      { q: "Does it support the 4.0 scale?", a: "Yes. Along with percentage and letter grade inputs." },
      { q: "How is weighted GPA calculated?", a: "Weighted GPA = Sum(grade points × credit hours) ÷ Total credit hours." },
    ],
  },

  // ── UTILITY TOOLS ─────────────────────────────────────────────────────────
  "password-generator": {
    seoContent: `The Password Generator creates strong, random passwords that are virtually impossible to crack. Choose length (8–128 characters) and character types: uppercase, lowercase, numbers, and symbols. Strong passwords are your first line of defence against account hacking. Never reuse passwords — generate a unique one for every account.`,
    faqs: [
      { q: "How strong should my password be?", a: "At least 16 characters combining uppercase, lowercase, numbers, and symbols is recommended by security experts." },
      { q: "Is the generated password stored anywhere?", a: "No. Passwords are generated locally in your browser and are never sent to or stored on any server." },
    ],
  },
  "qr-code-generator": {
    seoContent: `The QR Code Generator creates QR codes from any text, URL, email, phone number, or message. QR codes are scannable with any smartphone camera and are widely used for marketing, contactless menus, Wi-Fi sharing, event tickets, and product packaging. Download your QR code as a PNG image for immediate use.`,
    faqs: [
      { q: "What can I encode in a QR code?", a: "URLs, plain text, email addresses, phone numbers, SMS messages, Wi-Fi credentials, and vCard contact data." },
      { q: "What size QR code do I need?", a: "For digital screens, 256×256px is fine. For print, use at least 300×300px at 300 DPI." },
    ],
  },
  "color-picker": {
    seoContent: `The Color Picker lets you select any colour from a visual palette and instantly converts it between HEX, RGB, HSL, and HSV formats. Essential for designers, developers, and artists who need precise colour values for web design, graphic design, or branding. Copy any format value with one click.`,
    faqs: [
      { q: "How do I convert HEX to RGB?", a: "Enter the HEX code in the picker and the RGB equivalent is shown immediately. E.g. #FF5733 = rgb(255, 87, 51)." },
      { q: "Can I enter a colour code directly?", a: "Yes. Type any HEX, RGB, or HSL value into the input field." },
    ],
  },
  "stopwatch": {
    seoContent: `The online Stopwatch provides precise timing with lap recording. Start, stop, and reset with a single click. Record multiple lap times for sports training, cooking, experiments, or any activity that requires accurate time tracking. Works entirely in the browser — no app download needed.`,
    faqs: [
      { q: "How accurate is the stopwatch?", a: "Accurate to within milliseconds, using the browser's high-resolution performance timer." },
      { q: "Does it work if I switch tabs?", a: "Yes. The timer continues running in the background even when you switch to another tab." },
    ],
  },
  "countdown-timer": {
    seoContent: `The Countdown Timer counts down from any set duration to zero and alerts you when time's up. Use it for studying (Pomodoro technique), cooking, presentations, workouts, or any timed activity. Set the hours, minutes, and seconds and start the timer with one click.`,
    faqs: [
      { q: "Does it play a sound when it finishes?", a: "Yes. An audio alert plays when the timer reaches zero (requires browser audio permission)." },
      { q: "Can I set multiple timers?", a: "Currently one timer at a time. Refresh the page to reset and start a new countdown." },
    ],
  },
  "random-number-generator": {
    seoContent: `The Random Number Generator produces truly random integers within any range you specify. Use it for lottery selections, dice game simulations, statistical sampling, randomly assigning tasks, or choosing raffle winners. Set your minimum and maximum values and generate as many numbers as you need.`,
    faqs: [
      { q: "Is the generated number truly random?", a: "Yes. It uses the browser's cryptographic random API, which is considerably more random than a standard Math.random() call." },
      { q: "Can I generate multiple numbers at once?", a: "Yes. Specify how many random numbers you need and generate them all in one go." },
    ],
  },
  "password-strength": {
    seoContent: `The Password Strength Checker evaluates your password against industry security criteria including length, character variety, common patterns, and dictionary words. It provides a strength score and specific suggestions to help you create a more secure password. Test your existing passwords without any server submission.`,
    faqs: [
      { q: "Is my password sent to a server?", a: "No. All analysis runs locally in your browser. Your password never leaves your device." },
      { q: "What makes a password strong?", a: "Length ≥ 16 characters, mix of uppercase, lowercase, numbers, symbols, and no dictionary words or repeated patterns." },
    ],
  },
  "gradient-generator": {
    seoContent: `The Gradient Generator creates beautiful CSS gradients visually. Choose colours, gradient direction, and type (linear or radial) and preview the result in real time. Copy the generated CSS code and paste it directly into your stylesheet. Perfect for web designers and front-end developers who want to add vibrant backgrounds without manual CSS trial-and-error.`,
    faqs: [
      { q: "What types of gradients are supported?", a: "Linear, radial, and conic gradients. You can also add multiple colour stops." },
      { q: "Does it generate browser-prefixed CSS?", a: "Yes. The generated CSS includes -webkit- prefixes for maximum browser compatibility." },
    ],
  },
  "random-name-generator": {
    seoContent: `The Random Name Generator produces realistic first and last name combinations for testing, placeholder data, game characters, or creative writing. Choose from thousands of name combinations across various cultural origins. Generate a single name or a list in one click.`,
    faqs: [
      { q: "Can I choose a specific nationality or origin?", a: "Yes. Filter by cultural origin such as English, Indian, Spanish, or Japanese names." },
      { q: "Can I generate company or brand names?", a: "The current tool focuses on personal names. A dedicated business name generator is available separately." },
    ],
  },
  "dice-roller": {
    seoContent: `The virtual Dice Roller simulates rolling standard dice — D4, D6, D8, D10, D12, D20, and custom-sided dice. Perfect for tabletop RPGs (Dungeons & Dragons), board games, probability experiments, or any game that needs random dice results without physical dice.`,
    faqs: [
      { q: "What dice types are supported?", a: "D4, D6, D8, D10, D12, D20, D100, and custom N-sided dice." },
      { q: "Can I roll multiple dice at once?", a: "Yes. Set the number of dice and all results are shown together with a total." },
    ],
  },
  "markdown-preview": {
    seoContent: `The Markdown Preview renders your Markdown text as formatted HTML in real time. Write or paste Markdown on the left and see the beautifully rendered output on the right instantly. Supports all standard Markdown syntax including headings, bold, italic, lists, code blocks, links, and images. Great for README files, blog posts, and documentation.`,
    faqs: [
      { q: "Which Markdown flavour does it support?", a: "GitHub Flavored Markdown (GFM), which includes tables, task lists, and fenced code blocks." },
      { q: "Can I export the rendered HTML?", a: "Yes. Copy the generated HTML source with the 'Copy HTML' button." },
    ],
  },
  "hash-generator": {
    seoContent: `The Hash Generator computes cryptographic hash values (MD5, SHA-1, SHA-256, SHA-512) for any input text. Hashes are used to verify data integrity, store passwords securely, and create unique fingerprints for files. All hashing is performed locally in your browser using the Web Crypto API.`,
    faqs: [
      { q: "Which hash algorithms are supported?", a: "MD5, SHA-1, SHA-256, and SHA-512." },
      { q: "Is MD5 secure for passwords?", a: "No. MD5 and SHA-1 are considered cryptographically broken for security purposes. Use bcrypt or Argon2 for password hashing." },
    ],
  },

  // ── IMAGE TOOLS ───────────────────────────────────────────────────────────
  "image-compressor": {
    seoContent: `The Image Compressor reduces the file size of JPEG, PNG, and WebP images while maintaining acceptable visual quality. Smaller images load faster, improving website performance, Google PageSpeed scores, and user experience. Upload your image, adjust the quality slider, and download the compressed version instantly.`,
    faqs: [
      { q: "Will compression make my image look worse?", a: "At 80% quality or above, the difference is barely noticeable to the human eye. Compression artefacts only appear at very low quality settings." },
      { q: "What formats are supported?", a: "JPEG, PNG, WebP, and GIF input formats." },
    ],
  },
  "image-resizer": {
    seoContent: `The Image Resizer changes image dimensions to any width and height you specify. Maintain the original aspect ratio to avoid distortion, or set custom dimensions for social media banners, profile pictures, print photos, or web assets. Supports JPEG, PNG, and WebP formats.`,
    faqs: [
      { q: "Can I resize without cropping?", a: "Yes. Enable 'Maintain Aspect Ratio' to resize proportionally without any cropping." },
      { q: "What is the maximum resolution I can input?", a: "Browsers can handle images up to around 16,384 × 16,384 pixels, depending on device RAM." },
    ],
  },
  "image-cropper": {
    seoContent: `The Image Cropper lets you select a portion of your image and save just that region. Use it to remove unwanted backgrounds, focus on a subject, prepare profile photos, or create thumbnails. Drag the crop handles to set the region and download the cropped image.`,
    faqs: [
      { q: "Can I set a fixed crop aspect ratio?", a: "Yes. Lock to common aspect ratios like 1:1 (square), 16:9 (widescreen), or 4:3 (standard photo)." },
      { q: "Does it work on mobile?", a: "Yes. The crop tool is fully touch-responsive on smartphones and tablets." },
    ],
  },
  "image-converter": {
    seoContent: `The Image Format Converter converts images between JPEG, PNG, WebP, and GIF formats. Different formats suit different uses: JPEG for photos, PNG for transparency, WebP for the best compression on the web. Convert in one click without installing any software.`,
    faqs: [
      { q: "Which formats can I convert between?", a: "JPEG ↔ PNG ↔ WebP ↔ GIF in any combination." },
      { q: "Does JPEG conversion support transparency?", a: "No. JPEG does not support transparency. Convert transparent images to PNG or WebP instead." },
    ],
  },
  "image-rotator": {
    seoContent: `The Image Rotator rotates or flips your image. Rotate 90°, 180°, or 270° clockwise, or flip horizontally and vertically. Useful for correcting photo orientation, artistic effects, or preparing images for printing.`,
    faqs: [
      { q: "Can I rotate by a custom angle?", a: "Standard 90°/180°/270° rotations are supported. For arbitrary angles, use the custom angle input." },
      { q: "Does it preserve image quality?", a: "Yes. Rotation is lossless for PNG. For JPEG there is minimal re-compression quality loss." },
    ],
  },
  "image-color-extractor": {
    seoContent: `The Image Color Extractor analyses your photo and extracts the dominant colour palette. Upload any image to see the top 5–10 hex colour codes. Useful for brand colour matching, design inspiration, creating colour schemes from photos, or palette matching for illustrations.`,
    faqs: [
      { q: "How many colours are extracted?", a: "By default the top 8 most dominant colours. You can adjust this number." },
      { q: "Can I copy the hex code?", a: "Yes. Click any colour swatch to copy its hex code to the clipboard." },
    ],
  },
  "image-upscaler": {
    seoContent: `The Image Upscaler increases the resolution of your image using browser-based bicubic interpolation. While AI-powered upscaling (like ESRGAN) produces sharper results for large upscales, our tool is instant, free, and works offline. Ideal for moderate upscaling needs — doubling or tripling image dimensions.`,
    faqs: [
      { q: "How does it enlarge the image without quality loss?", a: "We use high-quality bicubic interpolation which smooths pixels during enlargement. For extreme upscaling, dedicated AI tools give better results." },
      { q: "What is the maximum upscale factor?", a: "Up to 4× (400%). Higher factors may cause blurriness depending on the source image." },
    ],
  },
  "invert-image-colors": {
    seoContent: `The Invert Image Colors tool creates a colour-negative of your photo by inverting every pixel's RGB value. It's popular for creating artistic effects, testing dark mode compatibility, accessibility testing, and generating negative film-style images.`,
    faqs: [
      { q: "Will inverting change the image format?", a: "No. The output is in the same format as the input." },
      { q: "Can I invert only specific colours?", a: "Full inversion applies to all colours. Selective colour inversion requires a more advanced image editor." },
    ],
  },
  "black-and-white": {
    seoContent: `The Black & White converter desaturates your image, converting it to a classic greyscale photo. Great for artistic photography, document scanning, reducing file size, or creating a timeless aesthetic. The conversion uses luminosity weighting to produce natural-looking grayscale output.`,
    faqs: [
      { q: "What method is used for grayscale conversion?", a: "Luminosity method: 0.299×R + 0.587×G + 0.114×B, which matches human perception of brightness." },
      { q: "Can I adjust the contrast after conversion?", a: "Download the grayscale image and use your preferred editor for further adjustments." },
    ],
  },

  // ── FILE TOOLS ────────────────────────────────────────────────────────────
  "csv-to-json": {
    seoContent: `The CSV to JSON Converter transforms comma-separated values files into structured JSON objects. Essential for developers processing spreadsheet data in APIs, populating databases, or analysing data. Paste CSV content or upload a file — the converter handles headers automatically, using the first row as key names.`,
    faqs: [
      { q: "Does it handle CSV files with commas inside quoted fields?", a: "Yes. RFC 4180-compliant CSV with quoted fields and embedded commas is handled correctly." },
      { q: "Can I convert semicolon-delimited files?", a: "Yes. Specify the delimiter character (comma, semicolon, tab, pipe) in the options." },
    ],
  },
  "json-to-csv": {
    seoContent: `The JSON to CSV Converter exports JSON arrays to spreadsheet-friendly CSV format. Useful for creating Excel exports from API responses, migrating data between systems, or generating reports. Nested objects are flattened with dot notation keys.`,
    faqs: [
      { q: "Does it handle nested JSON objects?", a: "Yes. Nested keys are flattened with dot notation (e.g. address.city becomes a column name)." },
      { q: "Can I choose the delimiter?", a: "Yes. Choose comma, semicolon, or tab as the delimiter depending on your target application." },
    ],
  },
  "pdf-merger": {
    seoContent: `The PDF Merger combines multiple PDF files into a single document. Upload two or more PDFs, drag them to set the order, and download the merged result. Useful for combining invoices, reports, contracts, and presentations — all without installing any software and entirely in your browser.`,
    faqs: [
      { q: "Is there a limit on the number of PDFs I can merge?", a: "No hard limit, though very large files may slow down browser-based processing." },
      { q: "Are my PDF files uploaded to a server?", a: "No. All processing happens locally in your browser. Your files are never sent to any server." },
    ],
  },
  "zip-extractor": {
    seoContent: `The ZIP File Extractor lets you view the contents of a ZIP archive and extract individual files or all files at once — entirely within your browser. No need to install WinZip or 7-Zip. Useful for quickly inspecting ZIP attachments or extracting specific files without extracting the whole archive.`,
    faqs: [
      { q: "Are my files kept private?", a: "Yes. All extraction is performed locally in your browser. Nothing is uploaded to any server." },
      { q: "Does it support password-protected ZIPs?", a: "Password-protected archives are not currently supported by the browser-based tool." },
    ],
  },
  "text-to-pdf": {
    seoContent: `The Text to PDF Converter creates a PDF document from any plain text input. Useful for archiving notes, creating simple formal documents, printing readable text, or sending content via email as a PDF attachment. Choose font size, page margins, and line spacing before generating.`,
    faqs: [
      { q: "Can I add a title or heading to the PDF?", a: "Yes. Enter a document title which will appear as a heading at the top of the PDF." },
      { q: "Does it support Markdown formatting?", a: "Basic formatting (bold, italic, headings) via Markdown is supported when the markdown option is enabled." },
    ],
  },
  "image-to-pdf": {
    seoContent: `The Image to PDF Converter combines one or more images (JPEG, PNG, WebP) into a single PDF document. Useful for sharing photos as a presentable document, scanning document photos into PDF form, or combining product images into a catalogue. Images are scaled to fit standard page sizes.`,
    faqs: [
      { q: "Which page sizes are supported?", a: "A4, Letter, A3, A5, and custom dimensions." },
      { q: "Can I set the image orientation?", a: "Yes. Choose portrait or landscape orientation for each page." },
    ],
  },

  // ── SEO TOOLS ─────────────────────────────────────────────────────────────
  "meta-tag-generator": {
    seoContent: `The Meta Tag Generator creates optimised HTML meta tags for your web pages. Enter your page title, description, keywords, and canonical URL and the tool generates all necessary tags including Open Graph (for social media), Twitter Cards, and standard HTML meta tags. Copy and paste into your HTML head section.`,
    faqs: [
      { q: "How long should my meta description be?", a: "Between 150 and 160 characters. Google truncates descriptions longer than ~155 characters in search results." },
      { q: "Do keywords meta tags still help SEO?", a: "No. Major search engines including Google do not use the keywords meta tag for ranking." },
    ],
  },
  "sitemap-generator": {
    seoContent: `The Sitemap Generator creates an XML sitemap listing all the URLs on your website. Submit the sitemap to Google Search Console and Bing Webmaster Tools to ensure all your pages are discovered and indexed faster. Enter your URLs, set priority and change frequency, and download the sitemap.xml file.`,
    faqs: [
      { q: "How do I submit a sitemap to Google?", a: "Go to Google Search Console → Sitemaps → enter your sitemap URL (e.g. yourdomain.com/sitemap.xml) → Submit." },
      { q: "How many URLs can a sitemap contain?", a: "A single sitemap file can contain up to 50,000 URLs and must not exceed 50MB." },
    ],
  },
  "robots-txt-generator": {
    seoContent: `The Robots.txt Generator creates the robots.txt file that controls which pages search engine bots can crawl. Properly configured robots.txt prevents duplicate content issues, protects private pages from indexing, and directs crawlers to your sitemap. Generate your file by configuring bot permissions visually.`,
    faqs: [
      { q: "What does 'Disallow: /' mean?", a: "It blocks all robots from crawling any page on your site. Use this carefully." },
      { q: "Should I block Googlebot?", a: "You should only block Googlebot from pages you don't want indexed (admin pages, duplicate content). Never block your whole site." },
    ],
  },
  "keyword-density": {
    seoContent: `The Keyword Density Checker analyses your content and shows how often each word or phrase appears as a percentage of total words. Ideal keyword density for SEO is generally 1–2% for your primary keyword. Over-using keywords (keyword stuffing) can harm your Google rankings.`,
    faqs: [
      { q: "What is a good keyword density?", a: "Aim for 1–2% for your primary keyword. Focus on natural, readable writing rather than hitting a specific number." },
      { q: "Does it check multi-word phrases?", a: "Yes. The tool analyses bigrams (2-word phrases) and trigrams (3-word phrases) in addition to single words." },
    ],
  },
  "serp-preview": {
    seoContent: `The SERP Preview Tool shows exactly how your page will appear in Google search results before you publish it. Preview the title, meta description, and URL as displayed on a desktop or mobile search results page. Ensure your title and description are within the character limits and compelling enough to earn clicks.`,
    faqs: [
      { q: "How many characters does Google show in a title?", a: "Approximately 50–60 characters (around 600px width). Titles beyond this are truncated with '...'." },
      { q: "Can I preview mobile search results?", a: "Yes. Toggle between desktop and mobile SERP preview views." },
    ],
  },

  // ── AI TOOLS ───────────────────────────────────────────────────────────────
  "ai-text-generator": {
    seoContent: `The AI Text Generator uses artificial intelligence to produce high-quality content on any topic. Enter a prompt and the AI returns relevant, coherent text for blog posts, product descriptions, social media captions, email drafts, and more. Great for overcoming writer's block and accelerating content creation.`,
    faqs: [
      { q: "Is the generated text unique?", a: "The AI generates original responses based on your prompt, but results can vary. Always review and edit the output before publishing." },
      { q: "Can I use the content commercially?", a: "Generally yes, but review the terms of the underlying AI model provider. Always attribute and edit AI-generated content before publishing." },
    ],
  },
  "ai-summary": {
    seoContent: `The AI Text Summarizer condenses long articles, papers, reports, or documents into concise summaries. Paste any text and the AI extracts the key points, saving you time and helping you quickly understand lengthy content. Adjustable summary length — choose brief (1–2 sentences) or detailed (paragraph-level).`,
    faqs: [
      { q: "How long can the input text be?", a: "Up to several thousand words. For very long documents, split them into sections for the best results." },
      { q: "Is it accurate?", a: "AI summarisation is generally accurate for factual content but may miss nuance. Always verify important summaries." },
    ],
  },
  "ai-grammar-checker": {
    seoContent: `The AI Grammar Checker reviews your text for grammatical errors, punctuation mistakes, spelling errors, and awkward phrasing. Unlike simple spell checkers, AI grammar checking understands context and suggests natural-sounding corrections. Useful for emails, essays, reports, and any professional writing.`,
    faqs: [
      { q: "Does it support British and American English?", a: "Yes. Select your preferred English variant to get region-appropriate spelling and grammar suggestions." },
      { q: "Can it improve writing style?", a: "Yes. Beyond basic errors, it suggests improvements for conciseness, clarity, and tone." },
    ],
  },
  "ai-code-helper": {
    seoContent: `The AI Code Helper assists with programming tasks: debugging code, explaining what a code snippet does, generating boilerplate code, and suggesting best practices. Supports Python, JavaScript, TypeScript, Java, C++, SQL, and many other languages. Simply describe your problem or paste your code.`,
    faqs: [
      { q: "Which programming languages does it support?", a: "Python, JavaScript, TypeScript, Java, C, C++, Go, Rust, SQL, HTML, CSS, and more." },
      { q: "Can it fix bugs in my code?", a: "Yes. Paste your buggy code with an error message and the AI will identify and suggest a fix." },
    ],
  },
  "ai-content-writer": {
    seoContent: `The AI Content Writer generates long-form articles, blog posts, landing pages, and marketing copy tailored to your topic and audience. Specify your topic, target keyword, tone of voice, and desired length. The AI produces structured, SEO-friendly content that you can edit and publish.`,
    faqs: [
      { q: "Can I specify the tone of voice?", a: "Yes. Choose from Professional, Casual, Friendly, Persuasive, or Academic tones." },
      { q: "Does it include SEO keywords?", a: "Yes. Enter your target keyword and the AI will incorporate it naturally throughout the content." },
    ],
  },
  // ── IMAGE FORMAT CONVERTERS ───────────────────────────────────────────────
  "png-to-jpg":  { seoContent: `The PNG to JPG Converter transforms PNG images to JPG format directly in your browser using the HTML5 Canvas API — no upload to any server, no privacy risk. PNG images support transparency, while JPG trades transparency for smaller file sizes, making JPG ideal for photographs shared on the web. Converting is useful when you need to reduce file size for email attachments, social media uploads, or web pages.`, faqs: [{ q: "Will I lose image quality?", a: "JPG uses lossy compression. Set quality to 92% or above to minimise visible artefacts." }, { q: "What happens to the transparent background?", a: "Transparency is replaced with a white background, since JPG does not support alpha channels." }] },
  "png-to-webp": { seoContent: `The PNG to WebP Converter converts PNG images to the modern WebP format. WebP typically achieves 25–35% smaller file sizes than PNG while maintaining comparable visual quality, making it the recommended format for web images. All major browsers including Chrome, Firefox, Safari, and Edge support WebP natively.`, faqs: [{ q: "Does WebP support transparency?", a: "Yes. WebP supports alpha transparency just like PNG, so transparent PNGs convert losslessly to WebP." }, { q: "Why use WebP over PNG?", a: "WebP files are significantly smaller which speeds up page load times and improves Core Web Vitals scores." }] },
  "png-to-bmp":  { seoContent: `The PNG to BMP Converter converts PNG images to BMP (Bitmap) format. BMP is a lossless, uncompressed raster format native to Windows. It is used in legacy applications, Windows system icons, and specific embedded software that requires raw pixel data without compression.`, faqs: [{ q: "Why is BMP file size much larger?", a: "BMP stores raw uncompressed pixel data, so file sizes are much larger than PNG or JPG." }, { q: "When should I use BMP?", a: "Use BMP for legacy software, Windows icon creation, or when raw pixel data is required." }] },
  "jpg-to-png":  { seoContent: `The JPG to PNG Converter transforms JPEG photos to PNG format, the go-to format when you need lossless quality and transparency support. Converting to PNG stops further quality loss from repeated JPG re-saves, making it ideal for images that will be edited multiple times or placed on transparent backgrounds.`, faqs: [{ q: "Will the JPG to PNG conversion improve quality?", a: "No — it stops further quality loss. JPG artefacts already in the image are preserved but not made worse." }, { q: "Does the PNG output support transparency?", a: "The canvas is opaque white by default. Transparency must be present in the source image." }] },
  "jpg-to-webp": { seoContent: `The JPG to WebP Converter converts JPEG photos to the WebP format, reducing file size by 25–35% while retaining similar visual quality. Use WebP images on your website for faster loading and better Google PageSpeed scores. The conversion runs entirely in your browser with no data sent to any server.`, faqs: [{ q: "Is WebP supported by all browsers?", a: "Yes. All modern browsers (Chrome, Safari 14+, Firefox, Edge) support WebP natively." }, { q: "What quality setting should I use?", a: "85–92% is the recommended range for a great balance of quality and file size." }] },
  "jpg-to-bmp":  { seoContent: `The JPG to BMP Converter converts JPEG images to uncompressed BMP format. This is useful for Windows legacy applications, game modding, embedded systems, or any workflow that requires raw pixel data without compression or a specific BMP container format.`, faqs: [{ q: "Will the BMP file be much larger?", a: "Yes. BMP files are uncompressed and are typically 3–10 times larger than the source JPG." }] },
  "webp-to-jpg": { seoContent: `The WebP to JPG Converter transforms WebP images to widely compatible JPEG format. While WebP is great for web use, some applications, older iOS devices, or legacy editors don't yet support WebP. Converting to JPG ensures maximum compatibility with any device, app, or platform.`, faqs: [{ q: "Why convert WebP to JPG?", a: "For compatibility with apps that don't support WebP — such as some email clients, older phones, or Windows Photo Viewer." }, { q: "Does quality decrease?", a: "WebP to JPG is a lossy re-encode. Use quality 90%+ to preserve as much detail as possible." }] },
  "webp-to-png": { seoContent: `The WebP to PNG Converter converts WebP images to PNG format, which has universal software support and lossless compression. Use this tool when you need to edit a WebP image in software that doesn't support WebP, such as older versions of Photoshop or Paint.NET.`, faqs: [{ q: "Is the conversion lossless?", a: "Yes. PNG is lossless, so the converted PNG retains all pixel data from the WebP source." }] },
  "bmp-to-jpg":  { seoContent: `The BMP to JPG Converter compresses large uncompressed BMP bitmap files to the compact JPG format. BMP files are often 10–100× larger than necessary — converting to JPG dramatically reduces file size, making images easier to share, email, or upload to websites.`, faqs: [{ q: "How much smaller will the JPG be?", a: "Typically 10–30× smaller than the original BMP, depending on image complexity and quality setting." }] },
  "bmp-to-png":  { seoContent: `The BMP to PNG Converter converts BMP bitmap images to PNG format. PNG offers lossless compression, meaning you get full quality at a fraction of the BMP file size. PNG also supports transparency, which BMP does not.`, faqs: [{ q: "Is the conversion lossless?", a: "Yes. PNG uses lossless compression, so no pixel quality is lost during BMP to PNG conversion." }] },
  "gif-to-jpg":  { seoContent: `The GIF to JPG Converter extracts the first frame of a GIF image and saves it as a JPG. Useful when you want to capture a static image from a GIF, reduce file size significantly, or convert a GIF for use on platforms that don't support animated images.`, faqs: [{ q: "Does it convert all GIF frames?", a: "The converter extracts and saves the first frame as a static JPG. Animated frame extraction is not supported." }, { q: "Will the GIF background colour be preserved?", a: "GIF transparency is replaced with a white background in the JPG output." }] },
  "gif-to-png":  { seoContent: `The GIF to PNG Converter extracts the first frame of an animated GIF and saves it as a lossless PNG. PNG supports transparency and displays true-colour images without the 256-colour GIF palette limitation, resulting in higher quality static images.`, faqs: [{ q: "Does GIF-to-PNG support transparency?", a: "Yes. GIF transparency is carried over to the PNG alpha channel correctly." }] },
  "gif-to-webp": { seoContent: `The GIF to WebP Converter extracts the first frame of a GIF and saves it as a WebP image. WebP offers much smaller file sizes than GIF and supports both lossy and lossless modes. For animated WebP conversion, you would need a dedicated tool.`, faqs: [{ q: "Can it convert animated GIFs to animated WebP?", a: "This tool converts the first GIF frame to a static WebP. Animated WebP requires a server-side tool." }] },

  // ── New 15 Tools ──────────────────────────────────────────────────────────
  "image-background-remover": { seoContent: `The Image Background Remover uses a smart flood-fill algorithm to detect and remove the background from your images entirely in the browser. It works best with images that have a solid or uniform background colour. Adjust the colour tolerance slider to control how aggressively the background is removed. No data is uploaded to any server — your images stay private.`, faqs: [{ q: "Does it work on complex backgrounds?", a: "This tool works best on solid or near-uniform background colours. For complex backgrounds with gradients or patterns, a dedicated AI-based service gives better results." }, { q: "What format is the output?", a: "The output is always a PNG with transparency, since PNG is the only common format that supports alpha channels." }] },
  "favicon-generator": { seoContent: `The Favicon Generator creates professional favicon files in all required sizes (16×16, 32×32, 48×48, 64×64, 128×128, 256×256) from a letter, text, or uploaded image. Favicons appear in browser tabs, bookmarks, and mobile home screens. You can customise the background colour, text colour, and icon shape (square, rounded, or circular). Download individual sizes or the favicon.ico file for immediate use.`, faqs: [{ q: "Which favicon sizes do I need?", a: "At minimum: 16×16 and 32×32. For modern browsers and Apple touch icons, also provide 180×180 and 192×192." }, { q: "Can I use my logo as a favicon?", a: "Yes. Upload your logo image in the 'Upload Image' mode and it will be scaled into all favicon sizes." }] },
  "pdf-compressor": { seoContent: `The PDF Compressor reduces PDF file sizes by re-packing the document structure, removing redundant objects, and optimising cross-references using the pdf-lib library, which runs entirely in your browser. No PDFs are uploaded to any server. Smaller PDFs are faster to email, upload, and download — improving performance for both senders and recipients.`, faqs: [{ q: "How much can it reduce my PDF?", a: "Compression depends on the PDF's internal structure. Digitally-created PDFs see modest savings (5–30%). PDFs with large embedded images see less benefit — use our Image Compressor first on the images before creating the PDF." }, { q: "Will it modify the visual content?", a: "No. PDF structure optimisation does not change the visible content, fonts, or images." }] },
  "pdf-splitter": { seoContent: `The PDF Splitter extracts specific pages or page ranges from a PDF into a new, smaller PDF file. Use it to share a single chapter from an e-book, extract relevant pages from a report, or separate invoices from a batch PDF. Choose a page range (e.g. pages 3–10) or individually pick pages. All processing is done locally in your browser.`, faqs: [{ q: "Can I extract just one page?", a: "Yes. Set both 'From' and 'To' to the same page number to extract a single page." }, { q: "Does it work with password-protected PDFs?", a: "No. Encrypted PDFs must be unlocked before they can be split." }] },
  "pdf-to-word": { seoContent: `The PDF to Word Converter extracts text content from a PDF file and saves it as a text document for editing in Word, Google Docs, or any text editor. This browser-based tool works with text-based PDFs — it reads raw text streams from the PDF without any server upload. For scanned PDFs (image-only), an OCR service would be required.`, faqs: [{ q: "Why is some text missing from the output?", a: "PDFs with embedded fonts, complex layouts, or scanned images may not extract cleanly. Text-based PDFs created from Word or similar tools work best." }, { q: "Can I edit the extracted text?", a: "Yes. The extracted text is shown in a preview panel and downloaded as a .txt file which you can open in any editor." }] },
  "sql-formatter": { seoContent: `The SQL Formatter beautifies and reformats raw or minified SQL queries into clean, readable code with consistent indentation and keyword casing. Readable SQL is faster to debug, easier to review, and less error-prone. It supports SELECT, INSERT, UPDATE, DELETE, JOIN, GROUP BY, HAVING, and most standard SQL clauses.`, faqs: [{ q: "Which SQL dialects does it support?", a: "The formatter handles standard SQL that is compatible with MySQL, PostgreSQL, SQLite, and SQL Server." }, { q: "Does it detect SQL errors?", a: "The formatter does not validate SQL syntax — use a database client or query validator for that." }] },
  "json-viewer": { seoContent: `The JSON Viewer renders JSON data as an interactive, collapsible tree. Browse deeply nested objects and arrays without getting lost in a wall of text. Click any node to expand or collapse it. String values are shown in green, numbers in blue, and booleans in purple. Copy the formatted JSON with one click. Paste any valid JSON — from API responses, config files, or log data.`, faqs: [{ q: "What is the maximum JSON size it can handle?", a: "The viewer runs in the browser and can typically handle JSON files up to a few MB without performance issues." }, { q: "Can I edit the JSON in the viewer?", a: "Edit the JSON in the input box and re-parse it to see the updated tree." }] },
  "unix-timestamp": { seoContent: `The Unix Timestamp Converter converts between Unix epoch timestamps (the number of seconds since 1 January 1970 UTC) and human-readable dates. Both millisecond (13-digit) and second (10-digit) timestamps are auto-detected. Useful for debugging API responses, reading log files, working with database datetime fields, and verifying JWT expiry times.`, faqs: [{ q: "What is a Unix timestamp?", a: "A Unix timestamp is the number of seconds elapsed since 00:00:00 UTC on 1 January 1970 (the Unix epoch). It is timezone-independent." }, { q: "How do I convert milliseconds?", a: "The tool auto-detects millisecond timestamps (13+ digits) and converts them correctly. You can also divide by 1000 to get seconds." }] },
  "dns-lookup": { seoContent: `The DNS Lookup Tool queries DNS records for any domain using Cloudflare's DNS-over-HTTPS service. Look up A records (IPv4 addresses), AAAA (IPv6), MX (mail servers), CNAME (aliases), TXT (verification and SPF records), NS (nameservers), SOA, and more. Essential for webmasters, sysadmins, and developers troubleshooting DNS propagation, email configuration, or domain verification.`, faqs: [{ q: "Why are the results different from my local DNS?", a: "This tool uses Cloudflare's DNS resolvers (1.1.1.1), which may show different results than your ISP's DNS if changes haven't propagated yet." }, { q: "How long does DNS propagation take?", a: "DNS changes typically propagate worldwide within 24–48 hours, though many resolvers update within a few minutes to hours." }] },
  "ssl-checker": { seoContent: `The SSL Certificate Checker verifies whether a website's SSL certificate is valid, who it was issued by, and when it expires. An expired or misconfigured SSL certificate causes browser security warnings that drive visitors away. Use this tool to monitor certificate expiry dates, verify your domain's HTTPS setup, and confirm which Certificate Authority (CA) issued the certificate.`, faqs: [{ q: "What does an SSL certificate do?", a: "An SSL/TLS certificate enables HTTPS, encrypting all data between the user's browser and your server. It also authenticates your domain identity." }, { q: "How early should I renew my SSL certificate?", a: "Renew at least 30 days before expiry. Many CAs and tools like Let's Encrypt auto-renew 60 days before expiry." }] },
  "ip-lookup": { seoContent: `The IP Address Lookup tool provides detailed geolocation and network information for any IPv4 or IPv6 address. Look up country, region, city, ISP, organisation, timezone, currency, and map coordinates. Leave the input blank to look up your own IP address. Uses the ipapi.co API for accurate and up-to-date geolocation data.`, faqs: [{ q: "How accurate is IP geolocation?", a: "Country-level accuracy is very high (99%+). City-level accuracy is typically 50–80% depending on the ISP and country." }, { q: "Can I look up private IP addresses?", a: "Private IPs (10.x, 192.168.x, 127.x) are not routable on the public internet and cannot be geolocated." }] },
  "markdown-to-html": { seoContent: `The Markdown to HTML Converter transforms Markdown text into clean HTML markup instantly. Supports headings (H1–H3), bold, italic, inline code, code blocks, links, images, lists, blockquotes, and horizontal rules. Useful for blog writers, documentation authors, and developers who write content in Markdown but need HTML for CMS integration or email templates.`, faqs: [{ q: "Does it output full HTML page or just fragments?", a: "It outputs HTML fragments (not a full page with <html> and <head>), which you can embed in any HTML page or CMS." }, { q: "Can I use it for GitHub README files?", a: "Yes. GitHub uses similar Markdown syntax. The tool handles GFM-style elements." }] },
  "html-to-markdown": { seoContent: `The HTML to Markdown Converter transforms HTML markup into clean Markdown text. Paste HTML from a web page, email, or CMS export and get clean, lightweight Markdown that you can use in documentation, README files, or any Markdown editor. Converts headings, bold, italic, links, lists, code blocks, and blockquotes.`, faqs: [{ q: "Does it handle deeply nested HTML?", a: "Yes. Common nesting patterns like lists in divs or styled paragraphs are handled. Complex tables and CSS-heavy layouts may require cleanup." }, { q: "Can it convert full web pages?", a: "Paste the HTML content section (not the full page with CSS/scripts) into the input for the best results." }] },
  "bcrypt-generator": { seoContent: `The Bcrypt Hash Generator creates secure, salted password hashes using PBKDF2 (a bcrypt-compatible key derivation function). Bcrypt hashing is the industry standard for storing user passwords securely. It includes a random salt to prevent rainbow table attacks and a configurable cost factor to make brute-force attacks computationally expensive. You can also verify a plain-text password against an existing hash.`, faqs: [{ q: "Why should I use bcrypt for passwords?", a: "Bcrypt is adaptive — the cost factor can be increased as hardware gets faster, keeping brute-force attacks slow even decades later." }, { q: "Is it safe to hash passwords in the browser?", a: "For development and testing, yes. In production, always hash passwords server-side to prevent the original password being intercepted." }] },
  "sha256-generator": { seoContent: `The SHA-256 Hash Generator computes the SHA-256 cryptographic hash of any text input using the browser's native Web Crypto API. SHA-256 is a one-way function commonly used for data integrity verification, digital signatures, blockchain proof-of-work, and creating unique file fingerprints. All computation runs locally — no data leaves your browser.`, faqs: [{ q: "Is SHA-256 safe for passwords?", a: "No. SHA-256 is too fast for password hashing. Use bcrypt, Argon2, or scrypt instead." }, { q: "What is the SHA-256 output format?", a: "A 64-character hexadecimal string representing 256 bits (32 bytes) of hashed data." }] },
};
