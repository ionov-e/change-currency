let DOLLAR_RATE = 1; // Никогда не используется как 1

$(document).ready(function () {
    $.getJSON("https://www.cbr-xml-daily.ru/daily_json.js", function (data) { // Получаем курс валют
        DOLLAR_RATE = data.Valute.USD.Value; // Записываем в "глобальную" переменную
        document.addEventListener('DOMContentLoaded', initialCurrencyChange(0));
    });
})

$("body").on("change", ".js-product-edition-option-variants", function () {
    let price = $(this).closest(".js-product").find(".js-product-price").eq(0);
    price.text(replacePrice(price.text()));
});

function initialCurrencyChange(tryCount) {  // Меняет валюту при загрузке страницы

    let dollarPricesDivs = document.getElementsByClassName('js-product-price'); // Блоки с ценами

    if ((dollarPricesDivs.length >= 1) && (dollarPricesDivs[0].innerText)) { // Если выполняется - блок товаров уже отобразился
        for (let i = 0; i < dollarPricesDivs.length; i++) { // Меняем содержимое, конвертируя в новую валюту
            dollarPricesDivs[i].innerText = replacePrice(dollarPricesDivs[i].innerText);
        }
    } else { // Если блок товаров еще не отобразился - попробуем через паузу
        tryCount++;
        if (tryCount < 30) { // Чтобы бесконечно не нагрузить, если нет блоков
            setTimeout(function () { initialCurrencyChange(tryCount) }, 100)
        }
    }
}

function replacePrice (textPrice) {
    let textWithoutSpaces = textPrice.replace(/\s/g, '');
    let numberFromDiv = Number(textWithoutSpaces);
    let newValue = (numberFromDiv * DOLLAR_RATE * 1.1).toFixed(); // К курсу еще накинуто
    return newValue.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ');
}