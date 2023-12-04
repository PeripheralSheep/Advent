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
function getFullNum(line,input)
{
    let startNum = input;
    while(startNum > 0 && isNum(line[startNum-1]))
    {
        startNum--;
    }
    let endNum = input;
    while(endNum < line.length-1 && isNum(line[endNum+1]))
    {
        endNum++;
    }
    let num = line.substring(startNum,endNum+1);
    return {num,explored: endNum};
}
function isAsterisks(input)
{
    return input == '*';
}
async function getSum()
{
    let sum = 0;
    let scheme = await getScheme();
    for(let i = 0; i < scheme.length;i++)
    {
        for(let j = 0; j < scheme[i].length;j++)
        {
            if(isAsterisks(scheme[i][j]))
            {
                let amt = 1;
                let num;
                let count = 0;
                let explored = -1;
                if(i > 0)
                {
                    if(j > 0 && (isNum(scheme[i-1][j-1])))
                    {
                        if(j-1 > explored)
                        {
                            count++;
                            ({num,explored} = getFullNum(scheme[i-1],j-1));
                            amt *= Number(num);
                        }
                    }
                    if(isNum(scheme[i-1][j]))
                    {
                        if(j > explored)
                        {
                            count++;
                            ({num,explored} = getFullNum(scheme[i-1],j));
                            amt *= Number(num);
                        }
                        
                    }
                    if(j < scheme[i].length-1 && (isNum(scheme[i-1][j+1])))
                    {
                        if(j+1 > explored)
                        {
                            count++;
                            ({num,explored} = getFullNum(scheme[i-1],j+1));
                            amt *= Number(num);
                        }
                        
                    }
                }
                explored = -1;
                if(i < scheme.length - 2)
                {
                    if(j > 0 && isNum(scheme[i+1][j-1]))
                    {
                        if(j-1 > explored)
                        {
                            count++;
                            ({num,explored} = getFullNum(scheme[i+1],j-1));
                            amt *= Number(num);
                        }
                        
                    }
                    if(isNum(scheme[i+1][j]))
                    {
                        if(j > explored)
                        {
                            count++;
                            ({num,explored} = getFullNum(scheme[i+1],j));
                            amt *= Number(num);
                        }
                        
                    }
                    if(j < scheme[i].length-1 && isNum(scheme[i+1][j+1]))
                    {
                        if(j+1 > explored)
                        {
                            count++;
                            ({num,explored} = getFullNum(scheme[i+1],j+1));
                            amt *= Number(num);
                        }
                        
                    }
                }
                if( (j > 0 && isNum(scheme[i][j-1])))
                {
                    count++;
                    ({num} = getFullNum(scheme[i],j-1));
                    amt *= Number(num);
                }
                if(j < scheme[i].length-1 && isNum(scheme[i][j+1]))
                {
                    count++;
                    ({num} = getFullNum(scheme[i],j+1));
                    amt *= Number(num);
                }
                if(count == 2)
                {
                    sum += amt;
                }
            } 
        }
    }
    let target = document.querySelector('.target');
    target.innerText = sum;
}

getSum();