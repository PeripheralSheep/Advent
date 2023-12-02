async function getGames()
{
    headers = new Headers({
        "Content-Type":"text/plain"
    });

    let response = await fetch("input.txt");

    let text= await response.text();
    let games = text.split('\n');
    return games;
}

async function getSum()
{
    let sum = 0;
    const bagSize = {
        "red": 12,
        "green": 13,
        "blue":14
    };
    let games = await getGames();
    
    games.forEach( (game) => {
        if(game != "")
        {
            let gameNum = Number(game.split(': ')[0].replace(/\D/g,''));
            let sets = game.split(': ')[1].split('; ');
            let minEach = {
                "red": 1,
                "blue": 1,
                "green": 1
            }
            sets.forEach( (set) => {
                balls = set.split(', ');
                balls.forEach( (ball) => {
                    let colours = Object.keys(bagSize)
                    colours.forEach( (colour) => {
                        if(ball.includes(colour))
                        {
                            minEach[colour] = Math.max(minEach[colour],Number(ball.replace(/\D/g,'')))
                        }
                    })
                })
            })
            let power = 1;
            power = power * minEach["red"];
            power =power * minEach["blue"];
            power = power*minEach["green"];
            sum+= power;
        }
        
    })
    let target = document.querySelector('.target');
    target.innerText = sum;
}

getSum();