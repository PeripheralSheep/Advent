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
    scratchcards.forEach( (card) => {
        if(card != '')
        {
            let [winNums, cardNums] = card.split(':')[1].split('|');
            winNums = winNums.trim().split(' ');
            cardNums = cardNums.trim().split(' ');
            let cardTotal = 0;
            winNums = winNums.filter( (x) => x != '');
            cardNums = cardNums.filter( (x) => x != '');
            winNums.forEach( (num) => {
                if(cardNums.includes(num))
                {
                    if(cardTotal == 0)
                        cardTotal = 1;
                    else
                        cardTotal *= 2;
                }
            })
            sum += cardTotal;
        }
    })
    let target = document.querySelector('.target');
    target.innerText = sum;
}

getSum();