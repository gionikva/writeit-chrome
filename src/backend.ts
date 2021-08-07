import Tokenizer from 'sentence-tokenizer';

export function getSuggestions(text: string): Suggestion[] {
    const tokenizer = new Tokenizer("Anon");
    tokenizer.setEntry(text);
    console.log("Text: ", text);
    if (tokenizer.getSentences().length > 0) {
        const incorrectForm = tokenizer.getTokens(0)[0];
        const startIndex = tokenizer.getSentences()[0].indexOf(incorrectForm);
        const endIndex = startIndex + incorrectForm.length - 1;
        const description = "MUST BE IN UPPERCASE";
        const corrections = [incorrectForm.toUpperCase()];
        console.log(`Text was ${text}, returning non-empty array.`);

        return [{ initial: incorrectForm, description, corrections, startIndex, endIndex }]
    } else {
        console.log(`Text was ${text}, returning empty array.`);
        return [];
    }
   
}