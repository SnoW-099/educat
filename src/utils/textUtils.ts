
export const normalizeAnswer = (text: string): string => {
    return text
        .toLowerCase()
        .trim()
        // Normalize apostrophes (users might use different characters)
        .replace(/[‘’´`]/g, "'")
        // Normalize spaces (double spaces to single)
        .replace(/\s+/g, " ");
};

export const checkAnswerWithNormalization = (userAnswer: string, correctAnswer: string | string[]): boolean => {
    const normalizedUser = normalizeAnswer(userAnswer);

    if (Array.isArray(correctAnswer)) {
        return correctAnswer.some(correct =>
            normalizeAnswer(correct) === normalizedUser
        );
    }

    return normalizeAnswer(correctAnswer) === normalizedUser;
};
