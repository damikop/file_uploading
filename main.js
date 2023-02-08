function destroyPopup(popup) {
    popup.remove();
}

function ask({title}) {
    return new Promise(resolve => {

        const popup = document.createElement('form');
        popup.classList.add('popup');
        popup.classList.add('open');

        popup.insertAdjacentHTML(
            'afterbegin',
            `<fieldset>
                    <label>${title}</label>
                    <input type="file" name="input"/>
                    <button type="submit">Submit</button>
                  </fieldset>`
        );

        popup.addEventListener('submit', e => {
            e.preventDefault();
            const inputValue = e.target.input.value;
            resolve(inputValue);

            destroyPopup(popup);
        }, { once: true });

        document.body.appendChild(popup);
    })
}

const messages = [
    {
        title: 'Upload your files',
    },
    {
        title: 'Please, upload another file?',
    },
    {
        title: 'And the last one',
    }
];

// Promise.all(questions.map(question => ask(question))).then();

// questions.forEach(async(question) => {
//     await ask(question);
// });

async function askMany() {
    for (const message of messages) {
        const answer = await ask(message);
        console.log(answer)
    }
}

askMany();