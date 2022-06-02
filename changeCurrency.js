document.addEventListener('DOMContentLoaded', changeCurrency(0));

function changeCurrency(tryCount) {

    let dollarPricesDivs = document.getElementsByClassName('js-product-price'); // Блоки с ценами

    if ((dollarPricesDivs.length >= 1) && (dollarPricesDivs[0].innerText)) { // Если выполняется - блок товаров уже отобразился
        changeCurrencyFinal(dollarPricesDivs);
    } else { // Если блок товаров еще не отобразился - попробуем через паузу
        tryCount++;
        if (tryCount < 30) { // Чтобы бесконечно не нагрузить, если нет блоков
            setTimeout(function () { changeCurrency(tryCount) }, 100)
        }
    }
}

function changeCurrencyFinal(dollarPricesDivs) {
    $.getJSON("https://www.cbr-xml-daily.ru/daily_json.js", function (data) { // Получаем курс валют
        let rateDol = data.Valute.USD.Value; // Курс доллара
        for (let i = 0; i < dollarPricesDivs.length; i++) {
            let textFromDiv = dollarPricesDivs[i].innerText;
            let textWithoutSpaces = textFromDiv.replace(/\s/g, '');
            let numberFromDiv = Number(textWithoutSpaces);
            let newValue = (numberFromDiv * rateDol * 1.1).toFixed(); // К курсу еще накинуто
            dollarPricesDivs[i].innerText = newValue.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
        }
    });
}