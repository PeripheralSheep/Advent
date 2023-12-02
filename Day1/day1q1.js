
let target = document.querySelector('.target');

async function getWords()
{
    headers = new Headers({
        "Content-Type":"text/plain"
    });

    let response = await fetch("input.txt");

    let text= await response.text();
    let words = text.split('\n');
    console.log(words);
    return words;
    
}

async function getSum()
{
    let words = await getWords();
    let sum = 0;
    for(i = 0; i < words.length-1; i++)
    {
        let l = 0;
        let r = words[i].length-1;
        while(words[i][l] < '0' || words[i][l]>'9')
        {
            l++;
        }
        while(words[i][r] < '0' || words[i][r] > '9')
        {
            r--;
        }
        num = words[i][l] + words[i][r];
        sum += Number(num);
    }
    console.log(sum);
}

getSum();