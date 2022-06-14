/**
 * Artyom uses webkitSpeechRecognition && SpeechSynthesisUtterance property of Google Inc.
 * Artyom only works in browsers based in Chromium (Google Chrome or Electron)
 *
 * @version 0.9.6
 * @copyright Carlos Delgado 2016
 * @author Carlos Delgado - www.ourcodeworld.com
 * @param {type} window
 * @see http://sdkcarlos.github.io/artyom.html
 * @returns Artyom
 */
 ! function (e) {
  "use strict";

  function o() {
    var o = {},
      l = [];
    o.device = u, o.getVoices = function () {
      return e.speechSynthesis.getVoices()
    }, o.getAvailableCommands = function () {
      for (var e = [], o = 0; o < l.length; o++) {
        var n = l[o],
          t = {};
        t.indexes = n.indexes, n.smart && (t.smart = !0), n.description && (t.description = n.description), e.push(t)
      }
      return e
    }, o.initialize = function (e) {
      if ("object" != typeof e) return void console.error("You must give the configuration for start artyom properly.");
      if (e.hasOwnProperty("lang")) {
        switch (e.lang) {
        case "de":
        case "de-DE":
          c = a.german;
          break;
        case "en-GB":
          c = a.englishGB;
          break;
        case "pt":
        case "pt-br":
        case "pt-PT":
          c = a.brasilian;
          break;
        case "ru":
        case "ru-RU":
          c = a.russia;
          break;
        case "nl":
        case "nl-NL":
          c = a.holand;
          break;
        case "es":
        case "es-CO":
        case "es-ES":
          c = a.spanish;
          break;
        case "en":
        case "en-US":
          c = a.englishUSA;
          break;
        case "fr":
        case "fr-FR":
          c = a.france;
          break;
        case "it":
        case "it-IT":
          c = a.italian;
          break;
        case "jp":
        case "ja-JP":
          c = a.japanese;
          break;
        case "id":
        case "id-ID":
          c = a.indonesia;
          break;
        case "pl":
        case "pl-PL":
          c = a.polski;
          break;
        case "zh-CN":
          c = a.mandarinChinese;
          break;
        case "zh-HK":
          c = a.cantoneseChinese;
          break;
        default:
          console.warn("The given language for artyom is not supported yet. English has been set to default")
        }
        t.lang = e.lang
      }
      return e.hasOwnProperty("continuous") && (e.continuous ? (t.continuous = !0, i.restartRecognition = !0) : (t.continuous = !1, i.restartRecognition = !1)), o.is.number(e.speed) && (t.speed = e.speed), e.hasOwnProperty("executionKeyword") && (t.executionKeyword = e.executionKeyword), o.is.number(e.volume) && (t.volume = e.volume), e.hasOwnProperty("listen") && (t.listen = e.listen), e.hasOwnProperty("debug") ? t.debug = e.debug : console.warn("The initialization doesn't provide how the debug mode should be handled. Is recommendable to set this value either to true or false."), e.mode && (t.mode = e.mode), t.listen === !0 && p(), !0
    }, o.fatality = function () {
      try {
        return i.restartRecognition = !1, n.stop(), !0
      } catch (e) {
        return console.log(e), !1
      }
    }, o.addCommands = function (e) {
      var o = function (e) {
        e.hasOwnProperty("indexes") ? l.push(e) : (console.error("The following command doesn't provide any index to execute :"), console.dir(e))
      };
      if (e instanceof Array)
        for (var n = 0; n < e.length; n++) o(e[n]);
      else o(e);
      return !0
    }, o.removeCommands = function (e) {
      if ("string" == typeof e) {
        for (var o = [], n = 0; n < l.length; n++) {
          var t = l[n];
          t.indexes.indexOf(e) && o.push(n)
        }
        for (var r = 0; r < o.length; r++) l.splice(r, 1)
      }
      return o
    }, o.emptyCommands = function () {
      return l = []
    }, o.shutUp = function () {
      if ("speechSynthesis" in e)
        do e.speechSynthesis.cancel(); while (e.speechSynthesis.pending === !0);
      t.speaking = !1, o.clearGarbageCollection()
    }, o.getProperties = function () {
      return t
    };
    var d = function (e, o) {
      var n = new CustomEvent(e, {
        detail: o
      });
      return document.dispatchEvent(n), n
    };
    o.when = function (e, o) {
      return document.addEventListener(e, function (e) {
        o(e.detail)
      }, !1)
    }, o.getLanguage = function (e) {
      if (e) switch (c) {
      case "Google UK English Male":
        return "en-GB";
      case "Google español":
        return "es";
      case "Google Deutsch":
        return "de";
      case "Google français":
        return "fr";
      case "Google italiano":
        return "it";
      case "Google 日本人":
        return "jp";
      case "Google US English":
        return "en-US";
      case "Google português do Brasil":
        return "pt";
      case "Google русский":
        return "ru";
      case "Google Nederlands":
        return "nl";
      case "Google polski":
        return "pl";
      case "Google Bahasa Indonesia":
        return "id";
      case "Google 普通话（中国大陆）":
        return "zh-CN";
      case "Google 粤語（香港）":
        return "zh-HK"
      }
      switch (c) {
      case "Google UK English Male":
        return "en-GB";
      case "Google español":
        return "es-CO";
      case "Google Deutsch":
        return "de-DE";
      case "Google français":
        return "fr-FR";
      case "Google italiano":
        return "it-IT";
      case "Google 日本人":
        return "ja-JP";
      case "Google US English":
        return "en-US";
      case "Google português do Brasil":
        return "pt-BR";
      case "Google русский":
        return "ru-RU";
      case "Google Nederlands":
        return "nl-NL";
      case "Google polski":
        return "pl-PL";
      case "Google Bahasa Indonesia":
        return "id-ID";
      case "Google 普通话（中国大陆）":
        return "zh-CN";
      case "Google 粤語（香港）":
        return "zh-HK"
      }
    };
    var g = function (n, i, a, u) {
      var l = new SpeechSynthesisUtterance;
      l.text = n, l.volume = t.volume, l.rate = t.speed, c && (l.voice = speechSynthesis.getVoices().filter(function (e) {
        return e.name == c
      })[0]), 1 == i && l.addEventListener("start", function () {
        t.speaking = !0, o.debug("Event reached : " + s.SPEECH_SYNTHESIS_START), d(s.SPEECH_SYNTHESIS_START), u && "function" == typeof u.onStart && u.onStart.call(l)
      }), i >= a && l.addEventListener("end", function () {
        t.speaking = !1, o.debug("Event reached : " + s.SPEECH_SYNTHESIS_END), d(s.SPEECH_SYNTHESIS_END), u && "function" == typeof u.onEnd && u.onEnd.call(l)
      }), o.debug(i + " text chunk processed succesfully out of " + a), r.push(l), e.speechSynthesis.speak(l)
    };
    o.say = function (e, n) {
      if (o.speechSupported())
        if ("string" == typeof e)
          if (e.length > 0) {
            var r, i = e.split(","),
              a = e.split(".");
            r = i.length > a.length ? i.filter(function (e) {
              return e
            }) : a.filter(function (e) {
              return e
            }), r.forEach(function (e, o) {
              var t = o + 1;
              e && g(e, t, r.length, n)
            }), t.helpers.lastSay = {
              text: e,
              date: new Date
            }
          } else console.warn("Artyom expects a string to say ... none given.");
      else console.warn("Artyom expects a string to say ... " + typeof e + " given.")
    }, o.repeatLastSay = function (e) {
      var n = t.helpers.lastSay;
      return e ? n : void(null != n && o.say(n.text))
    }, o.speechSupported = function () {
      return "speechSynthesis" in e
    }, o.recognizingSupported = function () {
      return "webkitSpeechRecognition" in e
    };
    var p = function () {
      var e, r;
      n.continuous = !0, n.interimResults = !0, n.lang = t.lang, n.onstart = function () {
        o.debug("Event reached : " + s.COMMAND_RECOGNITION_START), d(s.COMMAND_RECOGNITION_START), t.recognizing = !0, r = !0
      }, n.onerror = function (o) {
        d(s.ERROR, {
          code: o.error
        }), "audio-capture" == o.error && (r = !1), "not-allowed" == o.error && (r = !1, o.timeStamp - e < 100 ? d(s.ERROR, {
          code: "info-blocked",
          message: "Artyom needs the permision of the microphone, is blocked."
        }) : d(s.ERROR, {
          code: "info-denied",
          message: "Artyom needs the permision of the microphone, is denied"
        }))
      }, n.onend = function () {
        i.restartRecognition === !0 ? (r === !0 ? (n.start(), o.debug("Continuous mode enabled, restarting", "info")) : console.error("Verify the microphone and check for the table of errors in sdkcarlos.github.io/sites/artyom.html to solve your problem. If you want to give your user a message when an error appears add an artyom listener"), d(s.COMMAND_RECOGNITION_END, {
          code: "continuous_mode_enabled",
          message: "OnEnd event reached with continuous mode"
        })) : d(s.COMMAND_RECOGNITION_END, {
          code: "continuous_mode_disabled",
          message: "OnEnd event reached without continuous mode"
        }), t.recognizing = !1
      };
      var a;
      if ("normal" == t.mode && (a = function (e) {
          if (!l.length) return void o.debug("No commands to process in normal mode.");
          var r = e.results.length;
          d(s.TEXT_RECOGNIZED);
          for (var i = e.resultIndex; r > i; ++i) {
            var a = e.results[i][0].transcript;
            if (e.results[i].isFinal) {
              var c = f(a.trim());
              if ("function" == typeof t.helpers.redirectRecognizedTextOutput && t.helpers.redirectRecognizedTextOutput(a, !0), c !== !1 && 1 == t.recognizing) {
                o.debug("<< Executing Matching Recognition in normal mode >>", "info"), n.stop(), t.recognizing = !1, c.wildcard ? c.objeto.action(c.indice, c.wildcard.item, c.wildcard.full) : c.objeto.action(c.indice);
                break
              }
            } else {
              if ("function" == typeof t.helpers.redirectRecognizedTextOutput && t.helpers.redirectRecognizedTextOutput(a, !1), "string" == typeof t.executionKeyword && -1 != a.indexOf(t.executionKeyword)) {
                var c = f(a.replace(t.executionKeyword, "").trim());
                if (c !== !1 && 1 == t.recognizing) {
                  o.debug("<< Executing command ordered by ExecutionKeyword >>", "info"), n.stop(), t.recognizing = !1, c.wildcard ? c.objeto.action(c.indice, c.wildcard.item, c.wildcard.full) : c.objeto.action(c.indice);
                  break
                }
              }
              o.debug("Normal mode : " + a)
            }
          }
        }), "quick" == t.mode && (a = function (e) {
          if (!l.length) return void o.debug("No commands to process.");
          var r = e.results.length;
          d(s.TEXT_RECOGNIZED);
          for (var i = e.resultIndex; r > i; ++i) {
            var a = e.results[i][0].transcript;
            if (e.results[i].isFinal) {
              var c = f(a.trim());
              if ("function" == typeof t.helpers.redirectRecognizedTextOutput && t.helpers.redirectRecognizedTextOutput(a, !1), c !== !1 && 1 == t.recognizing) {
                o.debug("<< Executing Matching Recognition in quick mode >>", "info"), n.stop(), t.recognizing = !1, c.wildcard ? c.objeto.action(c.indice, c.wildcard.item) : c.objeto.action(c.indice);
                break
              }
            } else {
              var c = f(a.trim());
              if ("function" == typeof t.helpers.redirectRecognizedTextOutput && t.helpers.redirectRecognizedTextOutput(a, !0), c !== !1 && 1 == t.recognizing) {
                o.debug("<< Executing Matching Recognition in quick mode >>", "info"), n.stop(), t.recognizing = !1, c.wildcard ? c.objeto.action(c.indice, c.wildcard.item) : c.objeto.action(c.indice);
                break
              }
            }
            o.debug("Quick mode : " + a)
          }
        }), n.onresult = a, t.recognizing) n.stop(), o.debug("Event reached : " + s.COMMAND_RECOGNITION_END), d(s.COMMAND_RECOGNITION_END);
      else try {
        n.start()
      } catch (c) {
        d(s.ERROR, {
          code: "recognition_overlap",
          message: "A webkitSpeechRecognition instance has been started while there's already running. Is recommendable to restart the Browser"
        })
      }
    };
    o.simulateInstruction = function (e) {
      if (!e || "string" != typeof e) return console.warn("Cannot execute a non string command"), !1;
      var n = f(e);
      return "object" != typeof n ? (console.warn("No command founded trying with " + e), !1) : n.objeto ? (n.objeto.smart ? (o.debug("Smart command matches with simulation, executing", "info"), n.objeto.action(n.indice, n.wildcard.item, n.wildcard.full)) : (o.debug("Command matches with simulation, executing", "info"), n.objeto.action(n.indice)), !0) : void 0
    };
    var f = function (e) {
      if (!e) return console.warn("Internal error: Execution of empty command"), !1;
      o.debug(">> " + e);
      for (var n = 0; n < l.length; n++) {
        for (var t = l[n], r = t.indexes, i = -1, a = 0; a < r.length; a++) {
          var c = r[a];
          if (t.smart) {
            if (-1 != c.indexOf("*")) {
              var u = c.split("*");
              if (u.length > 2) {
                console.warn("Artyom found a smart command with " + (u.length - 1) + " wildcards. Artyom only support 1 wildcard for each command. Sorry");
                continue
              }
              var g = u[0],
                p = u[1];
              if ("" == p || " " == p) {
                if (-1 != e.indexOf(g) || -1 != e.toLowerCase().indexOf(g.toLowerCase())) {
                  var f = e.replace(g, "");
                  f = f.toLowerCase().replace(g.toLowerCase(), ""), i = parseInt(a)
                }
              } else if (!(-1 == e.indexOf(g) && -1 == e.toLowerCase().indexOf(g.toLowerCase()) || -1 == e.indexOf(p) && -1 == e.toLowerCase().indexOf(p.toLowerCase()))) {
                var f = e.replace(g, "").replace(p, "");
                f = f.toLowerCase().replace(g.toLowerCase(), "").replace(p.toLowerCase(), ""), f = f.toLowerCase().replace(p.toLowerCase(), ""), i = parseInt(a)
              }
            } else console.warn("Founded command marked as SMART but have no wildcard in the indexes, remove the SMART for prevent extensive memory consuming or add the wildcard *");
            if (i >= 0) {
              i = parseInt(a);
              break
            }
          }
        }
        if (i >= 0) return d(s.COMMAND_MATCHED), {
          indice: i,
          objeto: t,
          wildcard: {
            item: f,
            full: e
          }
        }
      }
      for (var n = 0; n < l.length; n++) {
        for (var t = l[n], r = t.indexes, i = -1, a = 0; a < r.length; a++) {
          var c = r[a];
          if (!t.smart) {
            if (e === c) {
              o.debug(">> MATCHED FULL EXACT OPTION " + c + " AGAINST " + e + " WITH INDEX " + a + " IN COMMAND ", "info"), i = parseInt(a);
              break
            }
            if (e.toLowerCase() === c.toLowerCase()) {
              o.debug(">> MATCHED OPTION CHANGING ALL TO LOWERCASE " + c + " AGAINST " + e + " WITH INDEX " + a + " IN COMMAND ", "info"), i = parseInt(a);
              break
            }
          }
        }
        if (i >= 0) return d(s.COMMAND_MATCHED), {
          indice: i,
          objeto: t
        }
      }
      for (var n = 0; n < l.length; n++) {
        for (var t = l[n], r = t.indexes, i = -1, a = 0; a < r.length; a++)
          if (!t.smart) {
            var c = r[a];
            if (e.indexOf(c) >= 0) {
              o.debug(">> MATCHED INDEX EXACT OPTION " + c + " AGAINST " + e + " WITH INDEX " + a + " IN COMMAND ", "info"), i = parseInt(a);
              break
            }
            if (e.toLowerCase().indexOf(c.toLowerCase()) >= 0) {
              o.debug(">> MATCHED INDEX OPTION CHANGING ALL TO LOWERCASE " + c + " AGAINST " + e + " WITH INDEX " + a + " IN COMMAND ", "info"), i = parseInt(a);
              break
            }
          }
        if (i >= 0) return d(s.COMMAND_MATCHED), {
          indice: i,
          objeto: t
        }
      }
      return !1
    };
    return o.debug = function (e, o) {
      if (t.debug === !0) switch (o) {
      case "error":
        console.log(" %cArtyom.js  " + e, "background: #C12127; color: #FFFFFF");
        break;
      case "warn":
        console.warn(e);
        break;
      case "info":
        console.log(" %cArtyom.js:  " + e, "background: #4285F4; color: #FFFFFF");
        break;
      default:
        console.log(" %cArtyom.js %c  " + e, "background: #005454; color: #BFF8F8", "color:black;")
      }
    }, o.is = {
      integer: function (e) {
        return Number(e) === e && 0 === e % 1
      },
      "float": function (e) {
        return e === Number(e) && 0 !== e % 1
      },
      "function": function (e) {
        return "function" == typeof e ? !0 : !1
      },
      object: function (e) {
        return "object" == typeof e ? !0 : !1
      },
      "boolean": function (e) {
        return "boolean" == typeof e ? !0 : !1
      },
      array: function (e) {
        return e.constructor === Array ? !0 : !1
      },
      number: function (e) {
        return e === parseFloat(e)
      },
      odd: function (e) {
        return o.is.number(e) && 1 === Math.abs(e) % 2
      },
      even: function (e) {
        return o.is.number(e) && 0 === e % 2
      },
      jQueryObject: function (e) {
        return e instanceof jQuery ? !0 : !1
      }
    }, o.detectErrors = function () {
      if ("file:" == e.location.protocol) {
        var n = "Fatal Error Detected : It seems you're running the artyom demo from a local file ! The SpeechRecognitionAPI Needs to be hosted someway (server as http or https). Artyom will NOT work here, Sorry.";
        return console.error(n), {
          code: "artyom_error_localfile",
          message: n
        }
      }
      if (!o.device.isChrome) {
        var n = "Fatal Error Detected: You are not running Google Chrome ! SpeechRecognitionAPI and SpeechSynthesisAPI is only available in google chrome ! ";
        return console.error(n), {
          code: "artyom_error_browser_unsupported",
          message: n
        }
      }
      return "https:" != e.location.protocol && console.warn("Artyom is not running in HTTPS protocol,running in protocol : " + e.location.protocol + " that means the browser will ask the permission of microphone too often. You need a HTTPS Connection if you want artyom in continuous mode !"), !1
    }, o.redirectRecognizedTextOutput = function (e) {
      return "function" != typeof e ? (console.warn("Expected function to handle the recognized text ..."), !1) : (t.helpers.redirectRecognizedTextOutput = e, !0)
    }, o.sayRandom = function (e) {
      if (e instanceof Array) {
        var n = Math.floor(Math.random() * e.length);
        return o.say(e[n]), {
          text: e[n],
          index: n
        }
      }
      return console.error("Random quotes must be in an array !"), null
    }, o.newDictation = function (e) {
      if (!o.recognizingSupported()) return console.error("SpeechRecognition is not supported in this browser"), !1;
      var n = new webkitSpeechRecognition;
      return n.continuous = !0, n.interimResults = !0, n.lang = t.lang, n.onresult = function (o) {
        for (var n = "", t = "", r = 0; r < o.results.length; ++r) o.results[r]["final"] ? n += o.results[r][0].transcript : t += o.results[r][0].transcript;
        e.onResult && e.onResult(t, n)
      }, new function () {
        var o = n,
          t = !0,
          r = !1;
        this.onError = null, this.start = function () {
          e.continuous === !0 && (r = !0), o.onstart = function () {
            "function" == typeof e.onStart && t === !0 && e.onStart()
          }, o.onend = function () {
            r === !0 ? (t = !1, o.start()) : (t = !0, "function" == typeof e.onEnd && e.onEnd())
          }, o.start()
        }, this.stop = function () {
          r = !1, o.stop()
        }, "function" == typeof e.onError && (o.onerror = e.onError)
      }
    }, o.newPrompt = function (e) {
      "object" != typeof e && console.error("Expected the prompt configuration.");
      var n = Object.assign([], l);
      o.emptyCommands();
      var t = {
        description: "Setting the artyom commands only for the prompt. The commands will be restored after the prompt finishes",
        indexes: e.options,
        action: function (o, t) {
          l = n;
          var r = e.onMatch(o, t);
          return "function" != typeof r ? void console.error("onMatch function expects a returning function to be executed") : void r()
        }
      };
      e.smart && (t.smart = !0), o.addCommands(t), "undefined" != typeof e.beforePrompt && e.beforePrompt(), o.say(e.question, {
        onStart: function () {
          "undefined" != typeof e.onStartPrompt && e.onStartPrompt()
        },
        onEnd: function () {
          "undefined" != typeof e.onEndPrompt && e.onEndPrompt()
        }
      })
    }, o.extensions = function () {
      return {}
    }, o.getNativeApi = function () {
      return n
    }, o.isRecognizing = function () {
      return t.recognizing
    }, o.isSpeaking = function () {
      return t.speaking
    }, o.clearGarbageCollection = function () {
      return r = []
    }, o.getGarbageCollection = function () {
      return r
    }, o.setDebug = function (e) {
      return e ? t.debug = !0 : t.debug = !1
    }, o.getVersion = function () {
      return "0.9.6"
    }, o
  }
  if ("speechSynthesis" in e && speechSynthesis.getVoices(), "webkitSpeechRecognition" in e) var n = new webkitSpeechRecognition;
  var t = {
      lang: "en-GB",
      recognizing: !1,
      continuous: !1,
      speed: 1,
      volume: 1,
      listen: !1,
      mode: "normal",
      debug: !1,
      helpers: {
        redirectRecognizedTextOutput: null,
        lastSay: null
      },
      executionKeyword: null,
      speaking: !1
    },
    r = [],
    i = {
      restartRecognition: !1
    },
    a = {
      german: "Google Deutsch",
      spanish: "Google español",
      italian: "Google italiano",
      japanese: "Google 日本人",
      englishUSA: "Google US English",
      englishGB: "Google UK English Male",
      brasilian: "Google português do Brasil",
      russia: "Google русский",
      holand: "Google Nederlands",
      france: "Google français",
      polski: "Google polski",
      indonesia: "Google Bahasa Indonesia",
      mandarinChinese: "Google 普通话（中国大陆）",
      cantoneseChinese: "Google 粤語（香港）"
    },
    s = {
      ERROR: "ERROR",
      SPEECH_SYNTHESIS_START: "SPEECH_SYNTHESIS_START",
      SPEECH_SYNTHESIS_END: "SPEECH_SYNTHESIS_END",
      TEXT_RECOGNIZED: "TEXT_RECOGNIZED",
      COMMAND_RECOGNITION_START: "COMMAND_RECOGNITION_START",
      COMMAND_RECOGNITION_END: "COMMAND_RECOGNITION_END",
      COMMAND_MATCHED: "COMMAND_MATCHED"
    },
    c = "Google UK English Male",
    u = {
      isMobile: !1,
      isChrome: !0
    };
  (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) && (u.isMobile = !0), -1 == navigator.userAgent.indexOf("Chrome") && (u.isChrome = !1), "undefined" == typeof artyom ? e.artyom = Object.preventExtensions(new o) : console.warn("Artyom is being loaded twice in your document or you're injecting the artyom script via console (injected webkitSpeechRecognition will not work due to security reasons)")
}(window);