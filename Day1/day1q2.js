let target = document.querySelector('.target');
async function getWords()
{
    headers = new Headers({
        "Content-Type":"text/plain"
    });

    let response = await fetch("input.txt");

    let text= await response.text();
    let words = text.split('\n');
    return words;
    
}

async function getSum()
{
    let words = await getWords();
    let sum = 0;
    const stringConversion = {
        'zero':'0',
        'one':'1',
        'two':'2',
        'three':'3',
        'four':'4',
        'five':'5',
        'six':'6',
        'seven':'7',
        'eight':'8',
        'nine':'9',
        "0":'0',
        "1":'1',
        "2":'2',
        "3":'3',
        "4":'4',
        "5":'5',
        "6":'6',
        "7":'7',
        "8":'8',
        "9":'9'
    }
    let numbers = Object.keys(stringConversion);
    for(i = 0; i < words.length-1; i++)
    {
        let leftmost = {
            indexStart: words[i].length,
            value: ""
        };
        let rightmost = {
            indexStart: -1,
            value:""
        };
        numbers.forEach((key) => {
            if(words[i].indexOf(key)!= -1)
            {
                let leftBefore = leftmost.indexStart;
                let rightBefore = rightmost.indexStart;
                leftmost.indexStart = Math.min(leftmost.indexStart,words[i].indexOf(key));
                rightmost.indexStart = Math.max(rightmost.indexStart,words[i].lastIndexOf(key));

                if(leftBefore != leftmost.indexStart)
                {
                    leftmost.value= key;
                }
                if(rightBefore != rightmost.indexStart)
                {
                    rightmost.value = key;
                }
            }   
        })
        num = stringConversion[leftmost.value] + stringConversion[rightmost.value];
        sum += Number(num);
    }
    target.innerText=sum;
}

getSum();