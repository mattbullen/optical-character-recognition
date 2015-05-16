(function () {

    document.addEventListener("deviceready", function () {

        $(function () {
            FastClick.attach(document.body);
        });

        window.listview = kendo.observable({

            reset: function () {
                window.location.reload();
            }

        });

        function draw() {

            var c = document.getElementById("c");
            c.width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            c.height = c.width;
            c.style.borderTop = "1px solid rgba(0, 0, 0, 0.0980392)";
            var o = c.getContext("2d");
            o.fillStyle = "#ffffff";
            o.fillRect(0, 0, c.width, c.height);
            o.fillStyle = "#000000";

            var drag = false,
                lastX, lastY;

            function down(e) {
                e.preventDefault();
                e.stopPropagation();
                drag = true;
                lastX = 0;
                lastY = 0;
                c.onmousemove(e);
            }

            function up(e) {
                e.preventDefault();
                e.stopPropagation();
                drag = false;
                ocr();
            }

            function move(e) {
                e.preventDefault();
                e.stopPropagation();

                var rect = c.getBoundingClientRect();
                var r = 2;

                function dot(x, y) {
                    o.beginPath();
                    o.moveTo(x + r, y);
                    o.arc(x, y, r, 0, Math.PI * 2);
                    o.fill();
                }

                if (e.touches && e.touches.length === 1) {
                    //if (e.touches.length == 1) {
                    var touch = e.touches[0];
                    var x = touch.pageX - touch.target.offsetLeft;
                    var y = touch.pageY - touch.target.offsetTop;
                    //}
                } else {
                    var x = e.clientX - rect.left;
                    var y = e.clientY - rect.top;
                }

                if (drag) {
                    if (lastX && lastY) {
                        var dx = x - lastX;
                        var dy = y - lastY;
                        var d = Math.sqrt(dx * dx + dy * dy);
                        for (var i = 1; i < d; i += 2) {
                            dot(lastX + dx / d * i, lastY + dy / d * i);
                        }
                    }
                    dot(x, y);
                    lastX = x;
                    lastY = y;
                }

            }

            c.onmousedown = down;
            c.onmouseup = up;
            c.onmousemove = move;

            c.addEventListener("touchstart", down);
            c.addEventListener("touchmove", move);
            c.addEventListener("touchend", up);

        }

        function ocr() {
            var c = document.getElementById("c");
            var o = c.getContext("2d");
            var base = o.getImageData(0, 0, c.width, c.height);
            var string = OCRAD(o);
            console.log("ocr():", string);
            $("#ocr-result").val(string);
        }

        function bindSelect() {
            var culture = [
                {
                    key: "af-ZA",
                    value: "Afrikaans"
                },
                {
                    key: "sq-AL",
                    value: "Albanian"
                },
                {
                    key: "am-AM",
                    value: "Amharic"
                },
                {
                    key: "ar-SA",
                    value: "Arabic"
                },
                {
                    key: "hy-AM",
                    value: "Armenian"
                },
                {
                    key: "az-AZ",
                    value: "Azerbaijani"
                },
                {
                    key: "bjs-BJS",
                    value: "Bengali"
                },
                {
                    key: "eu-ES",
                    value: "Basque"
                },
                {
                    key: "be-BY",
                    value: "Bielarus"
                },
                {
                    key: "bi-BI",
                    value: "Bislama"
                },
                {
                    key: "bs-BA",
                    value: "Bosnian"
                },
                {
                    key: "br-FR",
                    value: "Breton"
                },
                {
                    key: "bg-BG",
                    value: "Bulgarian"
                },
                {
                    key: "my-MM",
                    value: "Burmese"
                },
                {
                    key: "ca-ES",
                    value: "Catalan"
                },
                {
                    key: "cb-PH",
                    value: "Cebuano"
                },
                {
                    key: "ch-CH",
                    value: "Chamorro"
                },
                {
                    key: "zh-CN",
                    value: "Chinese (Simplified)"
                },
                {
                    key: "zh-TW",
                    value: "Chinese (Traditional)"
                },
                {
                    key: "hr-HR",
                    value: "Croatian"
                },
                {
                    key: "cs-CZ",
                    value: "Czech"
                },
                {
                    key: "da-DK",
                    value: "Danish"
                },
                {
                    key: "nl-NL",
                    value: "Dutch"
                },
                {
                    key: "en-GB",
                    value: "English"
                },
                {
                    key: "et-EE",
                    value: "Estonian"
                },
                {
                    key: "fi-FI",
                    value: "Finnish"
                },
                {
                    key: "fr-FR",
                    value: "French"
                },
                {
                    key: "ka-GE",
                    value: "Georgian"
                },
                {
                    key: "de-DE",
                    value: "German"
                },
                {
                    key: "el-GR",
                    value: "Greek"
                },
                {
                    key: "XN-US",
                    value: "Hawaiian"
                },
                {
                    key: "he-IL",
                    value: "Hebrew"
                },
                {
                    key: "hi-IN",
                    value: "Hindi"
                },
                {
                    key: "hu-HU",
                    value: "Hungarian"
                },
                {
                    key: "is-IS",
                    value: "Icelandic"
                },
                {
                    key: "id-ID",
                    value: "Indonesian"
                },
                {
                    key: "it-IT",
                    value: "Italian"
                },
                {
                    key: "ko-KR",
                    value: "Korean"
                },
                {
                    key: "ku-TR",
                    value: "Kurdish"
                },
                {
                    key: "la-XN",
                    value: "Latin"
                },
                {
                    key: "lv-LV",
                    value: "Latvian"
                },
                {
                    key: "lt-LT",
                    value: "Lithuanian"
                },
                {
                    key: "lb-LB",
                    value: "Luxembourgish"
                },
                {
                    key: "mk-MK",
                    value: "Macedonian"
                },
                {
                    key: "mn-MN",
                    value: "Mongolian"
                },
                {
                    key: "ne-NP",
                    value: "Nepali"
                },
                {
                    key: "no-NO",
                    value: "Norwegian"
                },
                {
                    key: "ur-PK",
                    value: "Pakistani"
                },
                {
                    key: "pa-IN",
                    value: "Panjabi"
                },
                {
                    key: "fa-IR",
                    value: "Persian"
                },
                {
                    key: "pl-PL",
                    value: "Polish"
                },
                {
                    key: "pt-PT",
                    value: "Portuguese"
                },
                {
                    key: "ro-RO",
                    value: "Romanian"
                },
                {
                    key: "ru-RU",
                    value: "Russian"
                },
                {
                    key: "sr-RS",
                    value: "Serbian"
                },
                {
                    key: "sk-SK",
                    value: "Slovak"
                },
                {
                    key: "sl-SI",
                    value: "Slovenian"
                },
                {
                    key: "es-ES",
                    value: "Spanish"
                },
                {
                    key: "sv-SE",
                    value: "Swedish"
                },
                {
                    key: "de-CH",
                    value: "Swiss German"
                },
                {
                    key: "th-TH",
                    value: "Thai"
                },
                {
                    key: "bo-CN",
                    value: "Tibetan"
                },
                {
                    key: "tr-TR",
                    value: "Turkish"
                },
                {
                    key: "tk-TK",
                    value: "Turkmen"
                },
                {
                    key: "uk-UA",
                    value: "Ukrainian"
                },
                {
                    key: "uz-UZ",
                    value: "Uzbek"
                },
                {
                    key: "vi-VN",
                    value: "Vietnamese"
                },
                {
                    key: "cy-GB",
                    value: "Welsh"
                },
                {
                    key: "wo-SN",
                    value: "Wolof"
                },
                {
                    key: "xh-ZA",
                    value: "Xhosa"
                },
                {
                    key: "yi-YD",
                    value: "Yiddish"
                },
                {
                    key: "zu-ZU",
                    value: "Zulu"
                }
        ];

            for (var i in culture) {
                var obj = culture[i];
                var index = 0;
                var key, val;
                for (var prop in obj) {
                    switch (index++) {
                        case 0:
                            key = obj[prop];
                            break;
                        case 1:
                            val = obj[prop];
                            break;
                        default:
                            break;
                    }
                }
                $("select").append("<option value=\"" + key + "\">" + val + "</option>");
            }
        }

        function toggleResponseMessage(id, text) {
            var message = $("#" + id).html(text).css({
                "position": "absolute",
                "top": "0px",
                "left": "0px",
                "height": "56px",
                "width": "100%",
                "margin": "0 auto",
                "z-index": "5000",
                "font-family": "Museo, Equip, Arial, sans-serif !important",
                "line-height": "56px",
                "color": "#ffffff",
                "text-align": "center",
                "background-color": "rgb(16, 196, 178)"
            });
            message.show();
            window.setTimeout(function () {
                message.hide();
            }, 2500);
            return false;
        }

        function translate() {
            $("#translate").removeClass("km-state-active");
            var text = $("#ocr-result").val();
            if (!text || text === "") {
                toggleResponseMessage("notification", "Please enter a word to translate!"); 
                return false;
            }
            var translationURI = "http://mymemory.translated.net/api/get?q=";
            var langQS = "&langpair=";
            var from = $("#sourceLanguage").val();
            var to = $("#destinationLanguage").val();
            var qsVal = langQS + from + "|" + to;
            var fullURI = translationURI + text + qsVal;
            $.ajax({
                url: fullURI,
                dataType: "json",
                success: function (data) {
                    $("#original").fadeOut(0).html("Original: " + text).fadeIn();
                    $("#translated").fadeOut(0).html("Translated: " + data.responseData.translatedText).fadeIn();
                }
            });
        }

        $("#translate").click(function () {
            translate();
        });

        function sizeElements() {
            var w = (window.innerWidth > 0) ? window.innerWidth : screen.width;
            var w47 = w * 0.47;
            var w465 = w * 0.465;
            var w2675 = w * 0.2675;
            var w18 = w * 0.18;
            var w02 = w * 0.02;
            var w015 = w * 0.01333;
            $("h3").css({
                "font-family": "Museo, Equip, Arial, sans-serif !important",
                "text-align": "center"
            });
            $("#ocr-result").css({
                "width": w47 + "px",
                "margin-right": w02 + "px",
                "padding": "10px 5px 9px 5px",
                "font-size": "1rem",
                "color": "#000000"
            });
            $("#translate").css({
                "width": w2675 + "px",
                "margin-right": w015 + "px",
                "text-align": "center"
            });
            $("#reset").css({
                "width": w18 + "px",
                "text-align": "center"
            });
            $("#sourceLanguage").css({
                "width": w465 + "px"
            });
            $("#destinationLanguage").css({
                "width": w465 + "px"
            });
            $("#original").css({
                "width": w47 + "px"
            });
            $("#translated").css({
                "width": w47 + "px"
            });
            $("h4").css({
                "font-family": "Museo, Equip, Arial, sans-serif !important",
                "width": "100%",
                "margin": "1.25rem 0px",
                "text-align": "center"
            });
        }

        var app = new kendo.mobile.Application(document.body, {
            skin: "flat"
        });

        bindSelect();

        draw();

        sizeElements();

        navigator.splashscreen.hide();

    });

}());