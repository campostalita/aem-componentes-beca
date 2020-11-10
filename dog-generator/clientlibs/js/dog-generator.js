let htmlDog = document.querySelector('.img-dog')


async function selectDog() {
    try {
        const response = await fetch('https://dog.ceo/api/breed/' + htmlDog.dataset.breed + '/images/random')
        const data = await response.json();
        return document.querySelector('.img-dog').setAttribute('src', data.message)
    } catch (err) {
        console.log(err.msg)
    }
};

selectDog()