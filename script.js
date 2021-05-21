const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/Enable button

function toggleButton() {
    button.disabled = !button.disabled;
}

//Get a joke from JokeAPI
async function getJokes() {
    let joke = '';
    const apiUrl = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellMe(joke);
        toggleButton()
    } catch (e) {
        console.log('Oops!!', e)
    }
}

//Passing the joke to VoiceRSS API
function tellMe(joke) {
    console.log("Tell Me : ", joke)
    VoiceRSS.speech({
        key: '1bae663eacd84cd789261a805558340b',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)