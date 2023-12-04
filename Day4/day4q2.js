async function getScratchcards()
{
    headers = new Headers({
        "Content-Type":"text/plain"
    });

    let response = await fetch("input.txt");

    let text= await response.text();
    let scratchcards = text.split('\n');
    return scratchcards;
}

async function getSum()
{
    let scratchcards = await getScratchcards();
    let sum = 0;
    let numEachCard = [];
    numEachCard[0] = 0;
    for(let i = 1; i <= scratchcards.length; i++)
    {
        numEachCard[i] = 1;
    }
    scratchcards.forEach( (card) => {
        if(card != '')
        {
            let cardNum = Number(card.split(':')[0].substring(4).trim());
            console.log(cardNum);
            let curCount = 0;
            let [winNums, cardNums] = card.split(':')[1].split('|');
            winNums = winNums.trim().split(' ');
            cardNums = cardNums.trim().split(' ');
            winNums = winNums.filter( (x) => x != '');
            cardNums = cardNums.filter( (x) => x != '');
            while(curCount < numEachCard[cardNum])
            {
                let numMatches = 0;
                winNums.forEach( (num) => {
                    if(cardNums.includes(num))
                    {
                        numMatches++;
                    }
                })
                let i = 1;
                while(numMatches > 0)
                {
                    numEachCard[cardNum + i]++;
                    i++;
                    numMatches--;
                }
                curCount++;
            }
        }
    })
    sum = numEachCard.reduce( (x, y) => x+y);
    // for(let i = 0; i < numEachCard.length; i++)
    // {
    //     sum+= numEachCard[i];
    // }
    let target = document.querySelector('.target');
    target.innerText = sum;
}

getSum();