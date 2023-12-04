async function getScheme()
{
    headers = new Headers({
        "Content-Type":"text/plain"
    });

    let response = await fetch("input.txt");

    let text= await response.text();
    let scheme = text.split('\n');
    return scheme;
}
function isNum(input)
{
    return (input >= '0' && input <= '9')
}

function isSpecialCharacter(input)
{
    console.log(input);
    let list = '`~!@#$%^&*()_|+\-=?;:\'",<>\{\}\[\]\\\/</>';

    if(list.indexOf(input) != -1)
        return true;
    return false;
}
async function getSum()
{
    let sum = 0;
    let scheme = await getScheme();
    for(let i = 0; i < scheme.length;i++)
    {
        for(let j = 0; j < scheme[i].length;j++)
        {
            let isPartNum = false;
            if(isNum(scheme[i][j]))
            {
                if(i > 0)
                {
                    if(isSpecialCharacter(scheme[i-1][j]))
                    {
                        isPartNum = true;
                    }
                    if(j > 0 && (isSpecialCharacter(scheme[i-1][j-1])))
                    {
                        isPartNum = true;
                    }
                    if(j < scheme[i].length-1 && (isSpecialCharacter(scheme[i-1][j+1] )))
                    {
                        isPartNum = true;
                    }
                }
                if(i < scheme.length - 2)
                {
                    if(isSpecialCharacter(scheme[i+1][j]))
                    {
                        isPartNum = true;
                    }
                    if(j > 0 && isSpecialCharacter(scheme[i+1][j-1]))
                    {
                        isPartNum = true;
                    }
                    if(j < scheme[i].length-1 && isSpecialCharacter(scheme[i+1][j+1]))
                    {
                        isPartNum = true;
                    }
                }
                if( (j > 0 && isSpecialCharacter(scheme[i][j-1])) ||  (j < scheme[i].length-1 && isSpecialCharacter(scheme[i][j+1])))
                {
                    isPartNum = true;
                }
            }
            if(isPartNum)
            {
                let startNum = j;
                while(startNum > 0 && isNum(scheme[i][startNum-1]))
                {
                    startNum--;
                }
                let endNum = j;
                while(endNum < scheme[i].length-1 && isNum(scheme[i][endNum+1]))
                {
                    endNum++;
                }
                let num = scheme[i].substring(startNum,endNum+1);
                console.log(num);
                sum += Number(num);
                j = endNum+1;
            }
            
        }
    }
    let target = document.querySelector('.target');
    target.innerText = sum;
}

getSum();