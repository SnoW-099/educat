// Utilidades para ejercicios de EduCat

export const playDictationAudio = (text: string): void => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ca-ES'; // Catalán
    utterance.rate = 0.8; // Velocidad más lenta para dictados
    window.speechSynthesis.speak(utterance);
  }
};

export const calculateExerciseScore = (userAnswers: string[], correctAnswers: string[], exerciseType: string): number => {
  if (userAnswers.length !== correctAnswers.length) {
    return 0;
  }

  let score = 0;
  
  for (let i = 0; i < userAnswers.length; i++) {
    // Safe handling of undefined values
    const userAnswer = (userAnswers[i] || '').toLowerCase().trim();
    const correctAnswer = (correctAnswers[i] || '').toLowerCase().trim();
    
    if (exerciseType === 'redaccions') {
      // Para redacciones, evaluar por longitud y complejidad
      if (userAnswer.length >= 50 && userAnswer.split(' ').length >= 10) {
        score += 100; // Dar puntos completos si cumple requisitos mínimos
      } else if (userAnswer.length >= 20) {
        score += 60; // Puntuación parcial
      }
    } else if (exerciseType === 'comprensió escrita') {
      // Para comprensión, ser más flexible con sinónimos
      if (correctAnswer.includes(userAnswer) || userAnswer.includes(correctAnswer)) {
        score += 100;
      } else {
        // Revisar si al menos algunas palabras clave coinciden
        const userWords = userAnswer.split(' ');
        const correctWords = correctAnswer.split(' ');
        const matchingWords = userWords.filter(word => 
          correctWords.some(correctWord => correctWord.includes(word) || word.includes(correctWord))
        );
        if (matchingWords.length > 0) {
          score += Math.round((matchingWords.length / correctWords.length) * 100);
        }
      }
    } else {
      // Para dictados y ortografía, ser más estricto
      if (userAnswer === correctAnswer) {
        score += 100;
      } else {
        // Dar puntos parciales por similitud
        const similarity = calculateStringSimilarity(userAnswer, correctAnswer);
        if (similarity > 0.7) {
          score += Math.round(similarity * 100);
        }
      }
    }
  }
  
  return Math.round(score / userAnswers.length);
};

function calculateStringSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) {
    return 1.0;
  }
  
  const editDistance = getEditDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function getEditDistance(str1: string, str2: string): number {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}