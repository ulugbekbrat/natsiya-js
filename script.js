document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    let result = document.querySelector('.result');
    result.innerHTML = "";
    let name = document.querySelector('.name').value;
    let loadingMessage = document.createElement('p');
    loadingMessage.textContent = "Yullanmoqda ......";
    result.appendChild(loadingMessage);

    fetch(`https://api.nationalize.io/?name=${name}`)
        .then((res) => res.json())
        .then((data) => {
            loadingMessage.remove();
            if (data.country && data.country.length > 0) {
                data.country.forEach((country) => {
                    let probability = (country.probability * 100).toFixed(2);
                    let countryCode = country.country_id.toLowerCase();
                    let flagUrl = `https://flagpedia.net/data/flags/h80/${countryCode}.png`;

                    result.innerHTML += `
                        <li>
                            <img src="${flagUrl}" alt="${country.country_id} flag" style="width: 24px; height: auto; vertical-align: middle;">
                            ${probability}%
                        </li>
                    `;
                });
            } else {
                result.innerHTML += `<p>${name} uchun millat topilmadi</p>`;
            }
        })
        .catch((error) => {
            loadingMessage.remove();
            result.innerHTML = `<p>Xato yuz berdi, iltimos qaytadan kiriting</p>`;
        });
});
