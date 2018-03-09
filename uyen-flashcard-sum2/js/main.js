$(document).ready(function () {

    let arr = [];
    let indexNext = 0;
    let indexPrevious = 0;
    let isAhead = false;
    let isBehind = false;
    let operation1 = 0;
    let operation2 = 0;
    let isResult = 0;
    let htmlResult = ``;
    let indexRandom = 0;
    let htmlPrinter = "";
    let controlCSS = () => {
        $(".control-record").hide();
        $(".open-option").on("click", () => {
            $(".control-record").show();
            $(this).hide();
        });

        $(".close").on("click", () => {
            $(".control-record").hide();
            $(".open-option").show();
        });
        $(".left").on("click", () => {
            if ($(this).hasClass("float-left")) {
                $(".right").removeClass("float-right");
                $(".right").addClass("float-left");
                $(this).removeClass("float-left");
                $(this).addClass("float-right");
            }

            else {

                $(".right").removeClass("float-left");
                $(".right").addClass("float-right");
                $(this).removeClass("float-right");
                $(this).addClass("float-left");
            }
        });
        $(".wrap-result").hide();

    }

    $('.ahead').on("click", () => {
        isAhead = true;
        isBehind = false;
    })
    $('.behind').on("click", () => {
        isAhead = false;
        isBehind = true;
    })

    let initArr = () => {
        for (let j = 9; j >= 2; j--) {
            for (let k = 11 - j; k <= 9; k++) {
                arr.push(j + " + " + k);
            }
        }
    }

    let renderContent = (index) => {
        htmlPrinter = " <div class='wrap-operation wrap-ahead'><p class='operation'>" + arr[index] + "</p></div>"
        $('.wrap-ahead').empty();
        $('.wrap-ahead').html(htmlPrinter);
        $('.wrap-ahead').show();
        $('.wrap-result').hide();
    }


    let nextFunction = () => {
        $('.next').on("click", () => {
            if (isAhead) {
                indexNext++;
                if (indexNext < arr.length) {
                    renderContent(indexNext);
                    indexPrevious = indexNext;
                }
                else {
                    indexNext = 0;
                    renderContent(indexNext);
                }
            }
            if (isBehind) {
                indexPrevious--;
                if (indexPrevious >= 0 && indexPrevious < arr.length) {
                    renderContent(indexPrevious);
                    indexNext = indexPrevious;
                }
                if (indexPrevious < 0) {
                    indexPrevious = arr.length - 1;
                    renderContent(indexPrevious);
                }
            }
        })
    }

    let previousFuntion = () => {
        $('.previous').on("click", () => {
            if (isAhead) {
                indexPrevious--;
                if (indexPrevious >= 0 && indexPrevious < arr.length) {
                    renderContent(indexPrevious);
                    indexNext = indexPrevious;
                }
                if (indexPrevious < 0) {
                    indexPrevious = arr.length - 1;
                    renderContent(indexPrevious);
                }
            }
            if (isBehind) {
                $('.previous').disable;
            }
        })
    }

    let resultFunction = () => {
        $('.result-btn').on("click", () => {
            isAhead = true;
            operation1 = arr[indexNext].split("+")[0];
            operation2 = arr[indexNext].split("+")[1];
            isResult = parseInt(operation1) + parseInt(operation2);
            htmlResult = `<div class="wrap-operation wrap-result">
                    <p class="operation">
                        ${isResult}
                    </p>

                </div>`;
            $('.wrap-ahead').hide();
            $('.wrap-result').html(htmlResult);
            $('.wrap-result').show();
        })
    }


    let resetFunction = () => {
        $('.reset').on("click", () => {
            indexNext = 0;
            indexPrevious = 0;
            renderContent(indexNext);
            indexPrevious = indexNext;
        })
    }


    let randonFunction = () => {
        $('.random').on("click", () => {
            indexRandom = Math.floor(Math.random() * arr.length);
            renderContent(indexRandom);
            indexNext = indexRandom;
            indexPrevious = indexRandom;

        })
    }

    initArr();
    previousFuntion();
    nextFunction();
    resultFunction();
    resetFunction()
    randonFunction();
    controlCSS();

});

