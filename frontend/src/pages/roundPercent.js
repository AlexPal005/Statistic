export const roundPercent = (totalCountVotes, countVotes) => {
    const votePercentage = countVotes / totalCountVotes * 100;
    let votePercentageRes = votePercentage.toString();

    if(!Number.isInteger(votePercentage)) {
        if (Number.isInteger(votePercentage * 10)) {
            votePercentageRes = votePercentage.toFixed(1);
        } else if (!Number.isInteger(votePercentage * 100)) {
            votePercentageRes = votePercentage.toFixed(2);
        }
    }
    return [votePercentageRes, votePercentage];
};