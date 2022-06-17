export const getWordCount = words => {
    if( words ){
        let splitWords = words
                    .trim()
                    .split(' ');
        return splitWords.length;
    }
    return 0;
}


export const getAccuracyLevel = ( totalCount, totalScore ) => {
    //calculate accuracy level
}