export type PostProps = {
    id: string,
    post: string,
    timestamp: string,
    edited?: boolean;
};

export const _GENERATED_IDS_: string[] = [] // storing all generated Ids to avoid duplication;
const generateRandomIds = function(){
    const randomLettersAndNumbers: string[] = [];
    const words = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    let randomId;
    while(randomLettersAndNumbers.length < 10){
        let number = Math.floor(Math.random() * words.length);
        let letter = words[number];
        randomLettersAndNumbers.push(letter + number)
        
    }
    randomId = randomLettersAndNumbers.join('');
    if(_GENERATED_IDS_.includes(randomId)) generateRandomIds()
    _GENERATED_IDS_.push(randomId);
    return randomId;
}

export const id: Generator<string> = (function* (){
    let generatedId;
    while(true) {
        generatedId = generateRandomIds()
        yield generatedId  
    }    
})()

export const loadData = (key: string): PostProps[] => {
    let data = localStorage.getItem(key);
    if(data) return JSON.parse(data);
    else return []
}
export const saveData = <T>(key: string, value: T) => localStorage.setItem(key, JSON.stringify(value));

export const createTimestamp = () => {
    let date = new Date();
    let time = date.toLocaleString('en-US', {hour: "numeric", minute: "numeric", hour12: true})
    let formattedDate = date.toLocaleDateString();
    return formattedDate + ' ' + time
}

