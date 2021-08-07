interface StorageInterface {
    enabled: boolean;
}

interface Message {
    showSuggestions?: true,
    correctText?: true,
}


interface Suggestion {
    initial: string
    description: string
    corrections: string[]
    startIndex: Number
    endIndex: Number
}

interface InputElement {
    currentText: string,
    element: HTMLElement
}