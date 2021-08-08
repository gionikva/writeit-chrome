export interface StorageInterface {
    enabled: boolean;
}

export interface Message {
    showSuggestions?: true,
    correctText?: true,
}


export interface Suggestion {
    initial: string
    description: string
    corrections: string[]
    startIndex: Number
    endIndex: Number
}

export interface Highlight {
    position: {
        left: number,
        right: number
    },
    width: number,
    suggestion: Suggestion,
    id: string
}

export interface InputElement {
    currentText: string,
    element: HTMLElement
}