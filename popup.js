document.addEventListener("DOMContentLoaded", function () {
  const openInNewTab = document.getElementById("openInNewTab");
  const dropdownMenu = document.getElementById('dropdown-menu');
  const searchInput = document.getElementById('searchInput');
  const userLang = navigator.language || navigator.userLanguage; 
  const items = document.querySelectorAll('.aiMenu li'); // Получаем все элементы li из всех списков
  const h1items = document.querySelectorAll('h1');
  const favoriteCheckbox =  document.getElementById("favoriteCheckbox");
  const scrollToElement = document.getElementById("scrollToElement");
  const openOnRightClick = document.getElementById("openOnRightClick");
  const copyOnRightClick = document.getElementById("copyOnRightClick");
  const updateMessageElement = document.getElementById('update-message');
  const NewYearTheme = document.getElementById("NewYearTheme");
  const santa = document.getElementById('santa');
  const body = document.body;
  const aiChat = document.getElementById("aiChat");
  const aiScripts = document.getElementById("aiScripts");
  const aiPC = document.getElementById("aiPC");
  const aiArticle = document.getElementById("aiArticle");
  const aiImage = document.getElementById("aiImage");
  const aiVideo = document.getElementById("aiVideo");
  const aiPresentation = document.getElementById("aiPresentation");
  const aiSound = document.getElementById("aiSound");
  const aiTODO = document.getElementById("aiTODO");
  const aiOther = document.getElementById("aiOther");
  const garland = document.getElementById('garland');
  const snowman = document.getElementById('snowman');
  const snowlayer = document.getElementById('snowlayer');
  const snowcont = document.getElementById('snowcont');
  const treecont = document.getElementById('treecont');
  const advancedSearch = document.getElementById('advancedSearch');
  const headerMenuToggle = document.getElementById("header-menu-toggle");
  const headerDropdownMenu = document.getElementById("header-dropdown-menu");
  const themeMenuToggle = document.getElementById("theme-menu-toggle");
  const themeDropdownMenu = document.getElementById("theme-dropdown-menu");
  const canOpen = document.getElementById("canOpen");
  const searchSuggestions = document.getElementById("searchSuggestions"); // Используется для подсказок во время поиска

  // Переменные для подсказок
  let currentSuggestionIndex = -1;
  let suggestionsList = [];

  // Флаг для отслеживания, добавлены ли чекбоксы
  let checkboxesAdded = false;
  let isMenuVisible = false; // Флаг для отслеживания состояния меню
  let originalContent; // Сохраняем оригинальное содержимое
  let currentWebsite = null;
  let originalOrder = []; // Массив для хранения исходного порядка элементов
  let translateUrl = "";
  let translatedText = "";
  let updateText = "Доступно обновление!"
  let userLangDesc = [];

  currentWebsite = localStorage.getItem('currentWebsite'); // Загружаем из localStorage
  
  // Загрузка состояния чекбоксов из localStorage
  openOnRightClick.checked = JSON.parse(localStorage.getItem("openOnRightClick")) || false;
  copyOnRightClick.checked = JSON.parse(localStorage.getItem("copyOnRightClick")) || false;
  copyOnRightClick.checked = JSON.parse(localStorage.getItem("advancedSearch")) || false;
  canOpen.checked = JSON.parse(localStorage.getItem("canOpen")) || false;

  // Обработчик события для canOpen
  canOpen.addEventListener('change', updateCanOpenState);

  //filters
  let blockSites = ["https://duck.ai/", "https://www.phind.com", "https://www.perplexity.ai/", 
    "https://chat.tune.app/", "https://labs.perplexity.ai/", "https://huggingface.co/spaces/Qwen/Qwen2-72B-Instruct",
    "https://you.com/search?q=hi&fromSearchBar=true&tbm=youchat", "https://finechat.ai/ru/app", "https://iask.ai/", 
    "https://chatgptchatapp.com", "https://chat.chatgptdemo.net", "https://promptboom.com/PowerChat/PowerChatTalk",
    "https://chat.mistral.ai/chat", "https://share.wendaalpha.net", "https://chat.swt-ai.com/", "https://groq.com/", 
    "https://ya.ru/", "https://codepal.ai/", "https://t.me/EdyaAIrobot", "https://github.com/KudoAI/googlegpt",
    "https://github.com/KudoAI/duckduckgpt", "https://github.com/KudoAI/bravegpt", "https://github.com/Processori7/llm/releases",
    "https://perchance.org/ai-text-to-image-generator", "https://dewatermark.ai/ru", "https://pika.art/login", 
    "ttps://huggingface.co/spaces/ehristoforu/dalle-3-xl-lora-v2", "https://www.veed.io/", "https://gamma.app/",
    "https://slidesgo.com/", "https://hidola.ai/en", "https://gpt-chatbot.ru/chat-gpt-ot-openai-dlya-generacii-teksta",
    "https://huggingface.co/spaces/stabilityai/stable-diffusion-3-medium", "https://huggingface.co/spaces/mukaist/DALLE-4K", "https://huggingface.co/spaces/Xenova/whisper-webgpu",
    "https://huggingface.co/spaces/THUDM/CodeGeeX", "https://huggingface.co/spaces/gokaygokay/Kolors", "https://www.craiyon.com/","https://simplified.com/",
    "https://elevenlabs.io/","https://huggingface.co/spaces/KwaiVGI/LivePortrait","https://character.ai","https://ltx.studio", "https://www.hedra.com/",
    "https://huggingface.co/spaces/TencentARC/PhotoMaker-Style", "https://app.scenario.com/upscale", "https://easywithai.com/tools/vidiq", 
    "https://smartbuddy.ru/models/gpt-4-omni", "https://smartbuddy.ru/models/gpt-4o-mini", "https://huggingface.co/spaces/Xenova/whisper-word-level-timestamps",
    "https://huggingface.co/spaces/gokaygokay/Tile-Upscaler", "https://github.com/Anjok07/ultimatevocalremovergui/releases", "https://huggingface.co/spaces/yizhezhu/MoMA_zeroGPU",
    "https://klingai.com/", "https://huggingface.co/spaces/lllyasviel/IC-Light", "https://huggingface.co/spaces/gokaygokay/AuraSR-v2","https://huggingface.co/spaces/finegrain/finegrain-object-eraser",
    "https://huggingface.co/spaces/finegrain/finegrain-image-enhancer", "https://huggingface.co/spaces/multimodalart/flux-lora-the-explorer", "https://huggingface.co/spaces/Kwai-Kolors/Kolors-Virtual-Try-On",
    "https://github.com/ToonCrafter/ToonCrafter","https://github.com/captainzero93/Protect-Images-from-AI-PixelGuard#","https://labs.heygen.com/expressive-photo-avatar", "https://elevenlabs.io/dubbing",
    "https://huggingface.co/spaces/GanymedeNil/Qwen2-VL-7B","https://huggingface.co/spaces/finegrain/finegrain-object-cutter","https://huggingface.co/spaces/yanze/PuLID-FLUX","https://seapik.com/",
    "https://huggingface.co/jasperai/Flux.1-dev-Controlnet-Upscaler","https://huggingface.co/spaces/fffiloni/diffusers-image-outpaint","https://www.figma.com/community/plugin/1326990370920029683/figma-to-replit",
    "https://tinywow.com/tools/write","https://huggingface.co/spaces/DamarJati/FLUX.1-RealismLora","https://yce.perfectcorp.com/colorize","https://venice.ai/chat","https://huggingface.co/chat/","https://app.giz.ai/assistant?mode=chat",
    "https://huggingface.co/spaces/OzzyGT/diffusers-image-fill","https://app.myshell.ai/explore","https://huggingface.co/spaces/TheEeeeLin/HivisionIDPhotos","https://huggingface.co/spaces/fffiloni/expression-editor","https://komo.ai/","https://pythonspath.ru/gpt4o",
    "https://huggingface.co/spaces/kayfahaarukku/fufufafa-makan-brem","https://gpt-4o.biz/playground","https://gpt4o.so/ru/app","https://rubiks.ai/","https://julius.ai/ai-chatbot","https://chat.eqing.tech/","https://ai.mitup.ru/chatgpt-free","https://magictellers.com/",
    "https://tools.rotato.app/compress","https://huggingface.co/spaces/aifeifei798/FeiFei-Lora-8step","https://www.eraser.io/diagramgpt","https://huggingface.co/spaces/AI4Editing/MagicQuill","https://www.askmarcus.app/chat", "https://huggingface.co/spaces/fffiloni/text-guided-image-colorization",
    "https://huggingface.co/spaces/aifeifei798/FeiFei-Lora-8step","https://www.eraser.io/diagramgpt","https://www.askmarcus.app/chat", "https://huggingface.co/spaces/fffiloni/text-guided-image-colorization",
    "https://huggingface.co/spaces/JeffreyXiang/TRELLIS","https://discord.com/invite/domoai","https://aistudio.google.com/live","https://huggingface.co/spaces/OAOA/InvSR","https://huggingface.co/spaces/MoonQiu/FreeScale","https://www.zarla.com/","https://www.hotbot.com/chat","https://suno.com/me",
    "https://huggingface.co/spaces/artificialguybr/video-dubbing", "https://huggingface.co/spaces/lllyasviel/iclight-v2-vary","https://doodad.dev/pattern-generator/","https://sourcegraph.com/cody/chat","https://huggingface.co/spaces/franciszzj/Leffa","https://oo.ai/","https://x-doc.ai/","https://huggingface.co/spaces/osanseviero/gemini-coder",
    "https://huggingface.co/spaces/akhaliq/anychat","https://huggingface.co/spaces/Qwen/QVQ-72B-preview","https://huggingface.co/spaces/stabilityai/stable-diffusion-3.5-large","https://huggingface.co/spaces/eswardivi/phi-4","https://huggingface.co/spaces/playgroundai/playground-v2.5","https://huggingface.co/spaces/llamameta/llama3.1-405B","https://huggingface.co/spaces/Qwen/Qwen2.5-Coder-demo",
    "https://huggingface.co/spaces/Lightricks/LTX-Video-Playground","https://huggingface.co/spaces/LGAI-EXAONE/EXAONE-3.5-7.8B-Instruct-Demo","https://huggingface.co/spaces/webml-community/text-to-speech-webgpu","https://t.me/gpt_lama_bot","https://www.hailuo.ai/","https://v0.dev/","https://www.whatmore.ai/studio","https://huggingface.co/spaces/tencent/Hunyuan3D-2","https://www.dzine.ai/",
    "https://huggingface.co/spaces/deepseek-ai/deepseek-vl2-small","https://huggingface.co/spaces/Trudy/gemini-image-to-code","https://chat.deepseek.com/","https://backgrounderase.net/home","https://huggingface.co/spaces/webml-community/kokoro-webgpu","https://www.morphic.sh/","https://scira.app/","https://kagi.com/fastgpt","https://shapen.com/","https://alice.yandex.ru/chat/01953c1a-be79-4000-9e88-5177131e2739/",
    "https://notedly.ai/dashboard","https://playground.ai.cloudflare.com/","https://huggingface.co/spaces/ASLP-lab/DiffRhythm","https://chat.akash.network/","https://www.sesame.com/research/crossing_the_uncanny_valley_of_voice#demo","https://www.imagineanything.ai/","https://huggingface.co/spaces/prs-eth/thera","https://www.openai.fm/","https://huggingface.co/spaces/starvector/starvector-1b-im2svg",
    "https://huggingface.co/spaces/enzostvs/deepsite","https://huggingface.co/spaces/jasperai/Flux.1-dev-Controlnet-Upscaler","https://huggingface.co/spaces/nightfury/Image_Face_Upscale_Restoration-GFPGAN","https://auphonic.com/","https://wordpress.com/ai-website-builder/","https://t.me/askplexbot","https://digma.ai/","https://lightpdf.com/","https://dxgpt.app/","https://humanize-ai.click/",
    "https://huggingface.co/spaces/nvidia/parakeet-tdt-0.6b-v2","https://app.youlearn.ai/","https://spinbot.com/paraphrasing-tool","https://puter.com/","https://www.eraser.io/ai","https://www.scribbr.com/paraphrasing-tool/","https://www.eraser.io/ai/uml-diagram-generator","https://huggingface.co/spaces/ByteDance/Dolphin","https://gptkit.ai/","https://huggingface.co/spaces/Stable-X/Hi3DGen","https://www.warp.dev/",
    "https://www.wondera.ai/","https://ayesoul.com","https://scispace.com/","https://huggingface.co/spaces/llamameta/Grok-4-heavy-free","https://noiz.io/free-ai-tools/","https://huggingface.co/spaces/Qwen/Qwen3-MT-Demo","https://deep-seek-ai.ru/free-deepseek-chat/","https://gpt-chatbot.ru/openai-o3-mini","https://www.waveterm.dev/","https://cline.bot/","https://addons.mozilla.org/en-US/firefox/addon/polination-ai-chat/",
    "https://github.com/Processori7/Poli_Sidebar","https://writify.ai/tool/","https://qoder.com/download","https://windsurf.com/download","https://www.trae.ai/","https://qwenlm.github.io/blog/qwen3-coder/","https://huggingface.co/spaces/Qwen/Qwen-Image","https://bagoodex.io/","https://www.design.com/ai-logo-generator","https://www.wolframalpha.com/","https://www.texttospeechpro.com/tts","https://x-minus.pro/ai",
    "https://processor.alwaysdata.net/"
  ];


  function updateCanOpenState() {
      localStorage.setItem("canOpen", canOpen.checked);
      hideBlockedServices();
  }
  
  // Обработчик события для canOpen
  canOpen.addEventListener('change', updateCanOpenState);

  function hideBlockedServices() {
    items.forEach(item => {
      const website = item.getAttribute('data-website');
      if (blockSites.includes(website)) {
        if (!canOpen.checked) {
          item.style.display = ""; // Показываем элемент
        } else {
          item.style.display = "none"; // Скрываем элемент
        }
      }
    });
  }

  function countElements()
  {
     // Выбираем все элементы li на странице
     const liElements = document.querySelectorAll("li");
     // Получаем их количество
     const count = liElements.length;
     // Находим элемент, куда будем выводить результат
     const liCountContainer = document.getElementById("liCount");
     // Выводим результат
     liCountContainer.textContent =  translateText("Количество бесплатных сервисов: ", "ru") + " " + count;
  }

  // Функция для обновления состояния advancedSearch в localStorage
  function updateOpenOnAdvancedSearchState() {
      localStorage.setItem("advancedSearch", advancedSearch.checked);
  }
  
  // Обработчик события для advancedSearch
  advancedSearch.addEventListener('change', updateOpenOnAdvancedSearchState);

  function isTouchDevice() {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  }
  
  const move = (e) => {
    try {
      var x = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
      var y = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
    } catch (e) {}
    santa.style.left = x - 100 + "px";
    santa.style.top = y - 100 + "px";
  };

  document.addEventListener("mousemove", (e) => {
    move(e);
  });
  document.addEventListener("touchmove", (e) => {
    move(e);
  });

  function updateTheme() {
    if (NewYearTheme.checked) {
        body.classList.add("snow");
        body.classList.remove("no-snow");
        santa.style.display = "block";
        garland.style.display = "block";
        snowman.style.display= "block";
        snowlayer.style.display= "block";
        garland.style.padding = "20px";
        treecont.style.display= "block";
        snowcont.style.top="80px";
        localStorage.setItem("newYearTheme", "enabled");
        // Включаем скрипт и стиль курсора
        addCursorScriptAndStyle();
    } else {
        body.classList.remove("snow");
        body.classList.add("no-snow");
        santa.style.display = "none"; // Скрыть элемент
        garland.style.display = "none";
        snowman.style.display= "none";
        snowlayer.style.display= "none";
        snowcont.style.top="40px";
        treecont.style.display= "none";
        localStorage.setItem("newYearTheme", "disabled");
        // Удаляем скрипт и стиль курсора
        removeCursorScriptAndStyle();
    }
}

function addCursorScriptAndStyle() {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = './snowcursor.js';
    document.head.appendChild(script);

    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'body, a,button,input,label,div:hover {cursor: url(https://uguide.su/new_year/11/snowcurser.cur), url(https://uguide.su/new_year/11/snowcurser.png), auto !important;}';
    document.head.appendChild(style);
}

function removeCursorScriptAndStyle() {
  // Удаляем скрипт
  const scripts = document.querySelectorAll('script[src="./snowcursor.js"]');
  scripts.forEach(script => script.remove());

  // Удаляем стиль
  const styles = document.querySelectorAll('style');
  styles.forEach(style => {
      if (style.innerHTML.includes('cursor: url(https://uguide.su/new_year/11/snowcurser.cur)')) {
          style.remove();
      }
  });

  // Удаляем все блоки div с классом snowcursor
  const divs = document.querySelectorAll('div.snowcursor');
  divs.forEach(div => div.remove());
}

// Проверяем состояние чекбокса при загрузке страницы
window.onload = () => {
  const savedTheme = localStorage.getItem("newYearTheme");
  if (savedTheme === "enabled") {
      NewYearTheme.checked = true; // Устанавливаем чекбокс в состояние "включен"
      body.classList.add("snow"); // Добавляем класс для анимации снега
      body.classList.remove("no-snow"); // Убираем класс, если он есть
      garland.style.display = "block";
      snowman.style.display= "block";
      snowlayer.style.display= "block";
      treecont.style.display= "block";
      santa.style.display = "block";
      snowcont.style.top="80px";

      // Включаем скрипт и стиль курсора
      addCursorScriptAndStyle();
  } else {
      NewYearTheme.checked = false; // Устанавливаем чекбокс в состояние "выключен"
      body.classList.remove("snow"); // Убираем класс для анимации снега
      garland.style.display = "none";
      body.classList.add("no-snow"); // Добавляем класс для остановки анимации
      snowman.style.display= "none";
      snowlayer.style.display= "none";
      treecont.style.display= "none";
      snowcont.style.top="40px";
      santa.style.display = "none";
      // Удаляем скрипт и стиль курсора
      removeCursorScriptAndStyle();
  }
};

// Добавляем обработчик события для чекбокса
NewYearTheme.addEventListener("change", updateTheme);

// Функция для проверки обновлений
async function checkForUpdates() {
    const repoUrl = "https://api.github.com/repos/Processori7/FreeAiChromeSidebar/contents/manifest.json";
    
    // Получаем локальную версию из manifest.json расширения
    //const localVersion = "16.6.27"; // Для тестирования;
    const localVersion = chrome.runtime.getManifest().version;
    
    try {
        const response = await fetch(repoUrl);
        const data = await response.json();
        
        // Декодируем содержимое файла manifest.json
        const manifestContent = JSON.parse(atob(data.content));
        const remoteVersion = manifestContent.version; // Извлекаем версию из полученного манифеста

        // Сравниваем локальную версию с удаленной версией
        if (localVersion !== remoteVersion) {
            // Если версии не совпадают, показываем сообщение
            if (userLang.startsWith('ru')) {
                updateMessageElement.textContent = updateText;
            } else {
                updateMessageElement.textContent = translateText(updateText, "ru");
            }
            updateMessageElement.style.display = 'block';

            // Добавляем обработчик клика на сообщение
            updateMessageElement.onclick = function() {
                window.open("https://github.com/Processori7/FreeAiChromeSidebar", "_blank");
                updateMessageElement.style.display = 'none'; // Скрываем сообщение после клика
            };
        }
    } catch (error) {
        console.error("Ошибка при проверке обновлений:", error);
    }
}
    
   // Создаем элементы меню для каждого заголовка
   h1items.forEach(h1 => {
    const menuItem = document.createElement('div');
    if (!userLang.startsWith('ru'))
        {
            menuItem.textContent = translateText(h1.textContent, "en"); // Текст заголовка
        }
        else
        {
            if(h1.textContent =="Free AI Chat"){menuItem.textContent="Бесплатный чат с ИИ"}
            else if(h1.textContent =="Free GPT scripts for search engines"){menuItem.textContent="Бесплатные GPT скрипты помощники для поисковых систем"}
            else if(h1.textContent =="Free GPT on Windows PC"){menuItem.textContent="Бесплатный GPT на ПК с Windows"}
            else if(h1.textContent =="Free AI Article Generators"){menuItem.textContent="Бесплатные генераторы статей с ИИ"}
            else if(h1.textContent =="Free AI Image Services"){menuItem.textContent="Бесплатные сервисы для работы с изображениями"}
            else if(h1.textContent =="Free AI Video Services"){menuItem.textContent="Бесплатные сервисы для работы с видео"}
            else if(h1.textContent =="Free AI Presentation Generators"){menuItem.textContent="Бесплатные сервисы для генерации презентаций"}
            else if(h1.textContent =="Free AI sound services"){menuItem.textContent="Бесплатные сервисы для работы со звуком"}
            else if(h1.textContent =="Free AI TODO Services"){menuItem.textContent="Бесплатные сервисы для планирования"}
            else if(h1.textContent =="Other AI Services"){menuItem.textContent="Другие бесплатные сервисы с ИИ"}
        }
        menuItem.classList.add('header-dropdown-item'); // Добавляем класс для стилей
        menuItem.addEventListener('click', function () {
        smoothScroll(h1, 1000); // Прокручиваем к заголовку
        headerDropdownMenu.style.display = 'none'; // Закрываем меню после клика
    });
    headerDropdownMenu.appendChild(menuItem);
});

// Обработчик клика по кнопке основного меню
if (headerMenuToggle && headerDropdownMenu) {
    headerMenuToggle.addEventListener("click", function(event) {
      event.stopPropagation();
      headerDropdownMenu.style.display = headerDropdownMenu.style.display === "block" ? "none" : "block";
      if (themeDropdownMenu) {
        themeDropdownMenu.style.display = "none";
      }
    });
  }
  
  // Обработчик клика по кнопке меню темы
  if (themeMenuToggle && themeDropdownMenu) {
    themeMenuToggle.addEventListener("click", function(event) {
      event.stopPropagation();
      themeDropdownMenu.style.display = themeDropdownMenu.style.display === "block" ? "none" : "block";
      if (headerDropdownMenu) {
        headerDropdownMenu.style.display = "none";
      }
    });
  }
  
  // Закрытие меню при клике вне его
  document.addEventListener("click", function(event) {
    if (headerMenuToggle && headerDropdownMenu && 
        !headerMenuToggle.contains(event.target) && 
        !headerDropdownMenu.contains(event.target)) {
      headerDropdownMenu.style.display = "none";
    }
    
    if (themeMenuToggle && themeDropdownMenu && 
        !themeMenuToggle.contains(event.target) && 
        !themeDropdownMenu.contains(event.target)) {
      themeDropdownMenu.style.display = "none";
    }
  });

  // Сохранение состояния чекбоксов
  function updateOpenOnRightClickState() {
      localStorage.setItem("openOnRightClick", openOnRightClick.checked);
  }
  openOnRightClick.addEventListener("change", updateOpenOnRightClickState);

  function updateCopyOnRightClickState() {
      localStorage.setItem("copyOnRightClick", copyOnRightClick.checked);
  }
  copyOnRightClick.addEventListener("change", updateCopyOnRightClickState);

  // Обработчик правого клика на элементах списка
  items.forEach(item => {
      item.addEventListener("contextmenu", function (event) {
          event.preventDefault(); // Отменяем стандартное меню

          const website = item.getAttribute('data-website');

          if (openOnRightClick.checked) {
              window.open(website, '_blank'); // Открываем сайт в новой вкладке
          }

          if (copyOnRightClick.checked && !openOnRightClick.checked) {
              navigator.clipboard.writeText(website).then(() => {
                  //alert("Ссылка скопирована в буфер обмена!"); // Уведомление о копировании
              })
          }
      });
  });

  function updateScrollToElementState() {
    localStorage.setItem("scrollToElement", scrollToElement.checked);
}
scrollToElement.addEventListener("change", updateScrollToElementState);

  function smoothScroll(target, duration) {
    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + start;
    const distance = end - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        window.scrollTo(0, start + distance * progress);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}
if (currentWebsite) {
    const item = document.querySelector(`[data-website="${currentWebsite}"]`);
    if (item) {
        let scrollToElementChecked = scrollToElement.checked = JSON.parse(localStorage.getItem("scrollToElement")) || false;
        if(scrollToElementChecked)
            {
                smoothScroll(item, 1000); // 1000 миллисекунд = 1 секунда
            }
        item.classList.add('highlight');
        setTimeout(() => {
            item.classList.remove('highlight');
        }, 2000);
    }
}
// Сохраняем исходный порядок элементов при загрузке страницы
function saveOriginalOrder() {
    items.forEach((item, index) => {
        item.setAttribute('data-original-index', index);
    });
}

function saveFavorites() {
    const favorites = [];
    items.forEach(item => {
        const checkbox = item.querySelector('.favorite-checkbox');
        if (checkbox && checkbox.checked) {
            favorites.push(item.getAttribute('data-website'));
        }
    });
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function loadFavorites() {
    const favoritesData = localStorage.getItem('favorites');
    if (favoritesData) {
        const favorites = JSON.parse(favoritesData);
        favorites.forEach(website => {
            const item = document.querySelector(`[data-website="${website}"]`);
            if (item) {
                item.classList.add('favorite');
                item.parentNode.prepend(item);
            }
        });
    }
}

favoriteCheckbox.addEventListener('click', function() {
    if (favoriteCheckbox.checked && !checkboxesAdded) {
        items.forEach(item => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'favorite-checkbox';
            item.insertBefore(checkbox, item.firstChild);

            checkbox.addEventListener('click', function(event) {
                event.stopPropagation();
            });

            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    item.classList.add('favorite');
                    item.parentNode.prepend(item);
                } else {
                    item.classList.remove('favorite');
                    const originalIndex = originalOrder.indexOf(item.getAttribute('data-website'));
                    const parent = item.parentNode;
                    const referenceNode = originalIndex < originalOrder.length - 1 ? 
                        parent.querySelector(`[data-website="${originalOrder[originalIndex + 1]}"]`) : null;
                    parent.insertBefore(item, referenceNode);
                }
                saveFavorites();
            });
        });
        checkboxesAdded = true;
    } else if (!favoriteCheckbox.checked && checkboxesAdded) {
        items.forEach(item => {
            const checkbox = item.querySelector('.favorite-checkbox');
            if (checkbox) {
                item.removeChild(checkbox);
            }
        });
        checkboxesAdded = false;
    }
});

//Поиск с подсказками

// Функция для создания подсказок
function generateSuggestions(query) {
  if (!query || query.length < 2) {
    return [];
  }

  const suggestions = new Set();
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(word => word.length > 1);

  // Поиск по названиям сервисов
  items.forEach(item => {
    const text = (item.textContent || item.innerText).toLowerCase();
    const website = item.getAttribute('data-website');
    
    // Проверяем совпадение с началом названия
    if (text.startsWith(queryLower)) {
      suggestions.add(text.trim());
    }
    
    // Поиск по частичному совпадению
    queryWords.forEach(word => {
      if (text.includes(word)) {
        suggestions.add(text.trim());
      }
    });
  });

  // Поиск по описаниям
  const descriptions = userLang.startsWith("ru") ? websiteDescriptionsRu : getTranslatedDescriptions();
  
  Object.keys(descriptions).forEach(website => {
    const description = descriptions[website];
    if (description && typeof description === 'string') {
      const descLower = description.toLowerCase();
      
      queryWords.forEach(word => {
        if (descLower.includes(word)) {
          // Находим соответствующий элемент
          const item = document.querySelector(`[data-website="${website}"]`);
          if (item) {
            const text = (item.textContent || item.innerText).trim();
            suggestions.add(text);
          }
        }
      });
    }
  });

  // Умные подсказки на основе контекста
  const contextualSuggestions = generateContextualSuggestions(queryLower, descriptions);
  contextualSuggestions.forEach(suggestion => suggestions.add(suggestion));

  // Общие ключевые слова для подсказок
  const keywordSuggestions = {
    'чат': ['бесплатный чат', 'gpt чат', 'чат с ии'],
    'gpt': ['chatgpt', 'gpt-4', 'gpt-3.5'],
    'картинки': ['генератор картинок', 'создание изображений'],
    'видео': ['генератор видео', 'создание видео'],
    'поиск': ['поисковая система', 'поиск с ии'],
    'chat': ['free chat', 'ai chat', 'chatgpt'],
    'image': ['image generator', 'create images', 'ai images'],
    'video': ['video generator', 'create video', 'ai video'],
    'search': ['search engine', 'ai search'],
    'code': ['coding ai', 'programming', 'code generator'],
    'текст': ['генератор текста', 'написание текста'],
    'text': ['text generator', 'writing assistant'],
    'музыка': ['генератор музыки', 'создание музыки'],
    'music': ['music generator', 'create music'],
    'презентация': ['создание презентаций', 'слайды'],
    'presentation': ['create presentations', 'slides']
  };

  // Добавляем ключевые подсказки
  Object.keys(keywordSuggestions).forEach(keyword => {
    if (queryLower.includes(keyword)) {
      keywordSuggestions[keyword].forEach(suggestion => {
        if (suggestion.toLowerCase().includes(queryLower)) {
          suggestions.add(suggestion);
        }
      });
    }
  });

  return Array.from(suggestions).slice(0, 8); // Ограничиваем количество подсказок
}

// Новая функция для генерации контекстных подсказок
function generateContextualSuggestions(query, descriptions) {
  const suggestions = [];
  const queryWords = query.split(/\s+/).filter(word => word.length > 1);
  
  // Умные контекстные подсказки
  const contextMap = {
    // Описательные фразы на русском
    'убрать фон': ['удаление фона', 'убрать фон с фото'],
    'улучшить фото': ['улучшение качества', 'повышение разрешения'],
    'генерировать код': ['создание кода', 'программирование'],
    'перевести': ['переводчик', 'перевод текста'],
    'математика': ['решение задач', 'математические примеры'],
    'музыка': ['создание музыки', 'генератор музыки'],
    'логотип': ['создание логотипа', 'генератор логотипов'],
    'презентация': ['создание презентаций', 'слайды'],
    
    // Описательные фразы на английском
    'remove background': ['background removal', 'remove bg'],
    'enhance photo': ['photo enhancement', 'upscale image'],
    'generate code': ['code generation', 'programming'],
    'translate': ['translator', 'text translation'],
    'math': ['solve math', 'mathematics'],
    'music': ['create music', 'music generator'],
    'logo': ['logo creation', 'logo generator'],
    'presentation': ['create presentations', 'slides'],
    
    // Функциональные фразы
    'бесплатно': ['free service', 'no registration'],
    'без регистрации': ['no login required', 'instant access'],
    'быстро': ['fast generation', 'quick results'],
    'качественно': ['high quality', 'professional'],
    'free': ['бесплатно', 'no cost'],
    'no registration': ['без регистрации', 'instant'],
    'fast': ['быстро', 'quick'],
    'quality': ['качественно', 'professional']
  };
  
  // Ищем контекстные совпадения
  Object.keys(contextMap).forEach(contextKey => {
    if (query.includes(contextKey)) {
      contextMap[contextKey].forEach(suggestion => {
        suggestions.push(suggestion);
      });
    }
  });
  
  // Анализ описаний для поиска релевантных сервисов
  const scoredServices = [];
  
  Object.keys(descriptions).forEach(website => {
    const description = descriptions[website];
    if (description && typeof description === 'string') {
      let score = 0;
      const descLower = description.toLowerCase();
      
      // Подсчитываем релевантность
      queryWords.forEach(word => {
        const wordRegex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = (descLower.match(wordRegex) || []).length;
        score += matches * 2; // Точные совпадения слов весят больше
        
        if (descLower.includes(word)) {
          score += 1; // Частичные совпадения
        }
      });
      
      if (score > 0) {
        const item = document.querySelector(`[data-website="${website}"]`);
        if (item) {
          const serviceName = (item.textContent || item.innerText).trim();
          scoredServices.push({ name: serviceName, score, description });
        }
      }
    }
  });
  
  // Сортируем по релевантности и добавляем лучшие совпадения
  scoredServices
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .forEach(service => {
      suggestions.push(service.name);
    });
  
  return suggestions;
}

// Функция для получения переведённых описаний
function getTranslatedDescriptions() {
  const stored = localStorage.getItem('translatedDescriptions');
  if (stored) {
    const parsed = JSON.parse(stored);
    const descriptions = {};
    parsed.forEach(item => {
      descriptions[item.url] = item.translatedText;
    });
    return descriptions;
  }
  return {};
}

// Функция для отображения подсказок
function showSuggestions(suggestions) {
  if (!suggestions || suggestions.length === 0) {
    searchSuggestions.style.display = 'none';
    return;
  }

  searchSuggestions.innerHTML = '';
  suggestionsList = suggestions;
  currentSuggestionIndex = -1;

  suggestions.forEach((suggestion, index) => {
    const suggestionElement = document.createElement('div');
    suggestionElement.className = 'suggestion-item';
    suggestionElement.textContent = suggestion;
    suggestionElement.dataset.index = index;

    suggestionElement.addEventListener('click', () => {
      searchInput.value = suggestion;
      searchSuggestions.style.display = 'none';
      performSearch(suggestion, true); // Используем точное совпадение
    });

    suggestionElement.addEventListener('mouseenter', () => {
      // Убираем выделение с всех элементов
      document.querySelectorAll('.suggestion-item').forEach(item => {
        item.classList.remove('selected');
      });
      suggestionElement.classList.add('selected');
      currentSuggestionIndex = index;
    });

    searchSuggestions.appendChild(suggestionElement);
  });

  searchSuggestions.style.display = 'block';
}

// Функция для навигации по подсказкам с клавиатуры
function navigateSuggestions(direction) {
  const suggestions = document.querySelectorAll('.suggestion-item');
  if (suggestions.length === 0) return;

  // Убираем выделение с текущего элемента
  if (currentSuggestionIndex >= 0 && currentSuggestionIndex < suggestions.length) {
    suggestions[currentSuggestionIndex].classList.remove('selected');
  }

  // Обновляем индекс
  if (direction === 'down') {
    currentSuggestionIndex = Math.min(currentSuggestionIndex + 1, suggestions.length - 1);
  } else if (direction === 'up') {
    currentSuggestionIndex = Math.max(currentSuggestionIndex - 1, -1);
  }

  // Применяем выделение к новому элементу
  if (currentSuggestionIndex >= 0 && currentSuggestionIndex < suggestions.length) {
    suggestions[currentSuggestionIndex].classList.add('selected');
    // Обновляем значение в поле ввода
    searchInput.value = suggestionsList[currentSuggestionIndex];
  }
}

// Функция для выполнения поиска
function performSearch(query, exactMatch = false) {
  const filter = query.toLowerCase().trim();
  const filterWords = filter.split(/\s+/).filter(word => word.length > 0);
  
  if (!filter) {
    // Если поиск пустой, показываем все элементы
    items.forEach(item => {
      item.style.display = "";
      item.style.order = "";
    });
    hideBlockedServices();
    return;
  }

  const descriptions = userLang.startsWith("ru") ? websiteDescriptionsRu : getTranslatedDescriptions();
  const scoredItems = [];

  items.forEach(item => {
    const text = (item.textContent || item.innerText).toLowerCase();
    const website = item.getAttribute('data-website');
    let descriptionText = "";
    
    // Получаем описание в зависимости от языка
    if (descriptions[website]) {
      descriptionText = descriptions[website].toLowerCase();
    }

    // Если это точное совпадение (выбор из подсказок), ищем точное совпадение названия
    if (exactMatch) {
      const matches = text.trim() === filter;
      item.style.display = matches ? "" : "none";
      item.style.order = "";
      return;
    }

    // Вычисляем релевантность
    let relevanceScore = 0;

    // Проверка названия сервиса
    filterWords.forEach(word => {
      // Точное совпадение слова в названии
      const exactWordMatch = new RegExp(`\\b${word}\\b`, 'gi');
      const titleMatches = (text.match(exactWordMatch) || []).length;
      relevanceScore += titleMatches * 100; // Максимальный приоритет для названий
      
      // Начало названия
      if (text.startsWith(word)) {
        relevanceScore += 50;
      }
      
      // Простое вхождение в название
      if (text.includes(word)) {
        relevanceScore += 20;
      }
    });

    // Проверка описания
    if (descriptionText) {
      filterWords.forEach(word => {
        // Точное совпадение слова в описании
        const exactWordMatch = new RegExp(`\\b${word}\\b`, 'gi');
        const descMatches = (descriptionText.match(exactWordMatch) || []).length;
        relevanceScore += descMatches * 10; // Средний приоритет для описаний
        
        // Простое вхождение в описание
        if (descriptionText.includes(word)) {
          relevanceScore += 5;
        }
      });
    }

    // Бонус за близость слов в описании
    if (filterWords.length > 1 && descriptionText) {
      const proximityBonus = calculateProximityBonus(filterWords, descriptionText);
      relevanceScore += proximityBonus;
    }

    if (relevanceScore > 0) {
      scoredItems.push({ item, score: relevanceScore });
    }
  });

  // Сортируем по релевантности и отображаем
  const sortedItems = scoredItems.sort((a, b) => b.score - a.score);
  
  items.forEach(item => {
    const scoredItem = sortedItems.find(si => si.item === item);
    if (scoredItem) {
      item.style.display = "";
      item.style.order = -scoredItem.score; // Используем отрицательные значения для сортировки
    } else {
      item.style.display = "none";
      item.style.order = "";
    }
  });
}

// Вспомогательная функция для вычисления бонуса за близость слов
function calculateProximityBonus(words, text) {
  let bonus = 0;
  const positions = [];
  
  // Находим позиции всех слов
  words.forEach(word => {
    let index = text.indexOf(word);
    while (index !== -1) {
      positions.push(index);
      index = text.indexOf(word, index + 1);
    }
  });
  
  // Вычисляем бонус за близость
  if (positions.length > 1) {
    positions.sort((a, b) => a - b);
    for (let i = 0; i < positions.length - 1; i++) {
      const distance = positions[i + 1] - positions[i];
      if (distance < 50) { // Бонус за слова, находящиеся рядом
        bonus += Math.max(0, 25 - distance);
      }
    }
  }
  
  return bonus;
}

searchInput.addEventListener('input', function() {
  const query = searchInput.value.trim();
  
  if (query.length >= 2) {
    const suggestions = generateSuggestions(query);
    showSuggestions(suggestions);
  } else {
    searchSuggestions.style.display = 'none';
  }
  
  // Выполняем поиск
  performSearch(query);
});

// Обработка навигации с клавиатуры
searchInput.addEventListener('keydown', function(e) {
  if (searchSuggestions.style.display === 'none') return;
  
  switch(e.key) {
    case 'ArrowDown':
      e.preventDefault();
      navigateSuggestions('down');
      break;
    case 'ArrowUp':
      e.preventDefault();
      navigateSuggestions('up');
      break;
    case 'Enter':
      e.preventDefault();
      if (currentSuggestionIndex >= 0 && currentSuggestionIndex < suggestionsList.length) {
        searchInput.value = suggestionsList[currentSuggestionIndex];
        searchSuggestions.style.display = 'none';
        performSearch(suggestionsList[currentSuggestionIndex], true); // Используем точное совпадение
      }
      break;
    case 'Escape':
      searchSuggestions.style.display = 'none';
      currentSuggestionIndex = -1;
      break;
  }
});

// Скрываем подсказки при клике вне области поиска
document.addEventListener('click', function(e) {
  if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
    searchSuggestions.style.display = 'none';
    currentSuggestionIndex = -1;
  }
});


// Функция для перевода текста
function translateText(text, lang) {
    translateUrl = "https://translate.googleapis.com/translate_a/single?format=text&client=gtx&sl=" + lang + "&tl=" + userLang + "&dt=t&q=" + encodeURIComponent(text); //lang = "ru"
    translatedText = httpGet(translateUrl);
    return cleanAndTrimData(translatedText);
}

if (userLang.startsWith('ru')) {
  openInNewTab.nextSibling.textContent = 'Открывать сайты в новой вкладке.';
  searchInput.placeholder = 'Поиск...';
  favoriteCheckbox.nextSibling.textContent = 'Добавить в избранное';
  aiChat.innerText = "Бесплатный чат с ИИ";
  aiScripts.innerText="Бесплатные GPT скрипты помощники для поисковых систем";
  aiPC.innerText="Бесплатный GPT на ПК с Windows";
  aiArticle.innerText="Бесплатные генераторы статей с ИИ";
  aiImage.innerText="Бесплатные сервисы для работы с изображениями";
  aiVideo.innerText="Бесплатные сервисы для работы с видео";
  aiPresentation.innerText="Бесплатные сервисы для генерации презентаций";
  aiSound.innerText="Бесплатные сервисы для работы со звуком";
  aiTODO.innerText="Бесплатные сервисы для планирования";
  aiOther.innerText="Другие бесплатные сервисы с ИИ";
  scrollToElement.nextSibling.textContent="Прокручивать к последнему выбранному элементу";
  openOnRightClick.nextSibling.textContent="Открывать сайт в новой вкладке при нажатии правой кнопкой мыши";
  copyOnRightClick.nextSibling.textContent="Копировать ссылку при нажатии правой кнопкой мыши";
  NewYearTheme.nextSibling.textContent = "Новогодняя тема";
  canOpen.nextSibling.textContent = "Скрыть сервисы, которые не могут быть открыты в боковой панели";
  document.querySelector('#theme-settings-title').textContent = 'Настройки темы';
  document.querySelector('#background-color .translate-text').textContent = 'Цвет фона:';
  document.querySelector('#text-color-headings .translate-text').textContent = 'Цвет заголовков:';
  document.querySelector('#li-back-color .translate-text').textContent = 'Цвет фона элементов:';
  document.querySelector('#li-text-color .translate-text').textContent = 'Цвет текста элементов:';
  document.querySelector('#tooltip-background-color .translate-text').textContent = 'Цвет фона подсказок:';
  document.querySelector('#font-family-settings .translate-text').textContent = 'Семейство шрифтов:';
  document.querySelector('#heading-font-size .translate-text').textContent = 'Размер шрифта заголовков:';
  document.querySelector('#item-font-size .translate-text').textContent = 'Размер шрифта элементов:';
  document.querySelector('#tooltip-font-size .translate-text').textContent = 'Размер шрифта подсказок:';
  document.querySelector('#resetTheme .translate-text').textContent = 'Сбросить тему';
  advancedSearch.style.display = "none";
  document.getElementById('advancedSearchText').style.display="none";
}
else
{
// Переводим все элементы
openInNewTab.nextSibling.textContent = translateText("Открывать сайты в новой вкладке.", "ru");
searchInput.placeholder = translateText('Поиск...', "ru");
favoriteCheckbox.nextSibling.textContent = translateText('Добавить в избранное', "ru");
const aiChat = document.getElementById("aiChat");
aiChat.innerText = translateText("Бесплатный чат с ИИ", "ru");
const aiScripts = document.getElementById("aiScripts");
aiScripts.innerText = translateText("Бесплатные GPT скрипты помощники для поисковых систем", "ru");
const aiPC = document.getElementById("aiPC");
aiPC.innerText = translateText("Бесплатный GPT на ПК с Windows", "ru");
const aiArticle = document.getElementById("aiArticle");
aiArticle.innerText = translateText("Бесплатный генератор статей", "ru");
const aiImage = document.getElementById("aiImage");
aiImage.innerText = translateText("Бесплатные сервисы для работы с изображениями", "ru");
const aiVideo = document.getElementById("aiVideo");
aiVideo.innerText = translateText("Бесплатные сервисы для работы с видео", "ru");
const aiPresentation = document.getElementById("aiPresentation");
aiPresentation.innerText = translateText("Бесплатные сервисы для генерации презентаций", "ru");
const aiSound = document.getElementById("aiSound");
aiSound.innerText = translateText("Бесплатные сервисы для работы со звуком", "ru");
const aiTODO = document.getElementById("aiTODO");
aiTODO.innerText = translateText("Бесплатные сервисы для планирования", "ru");
const aiOther = document.getElementById("aiOther");
aiOther.innerText = translateText("Другие бесплатные сервисы с ИИ", "ru");
const scrollToElement = document.getElementById("scrollToElement");
scrollToElement.nextSibling.textContent = translateText("Прокручивать к последнему выбранному элементу", "ru");
openOnRightClick.nextSibling.textContent=translateText("Открывать сайт в новой вкладке при нажатии правой кнопкой мыши", "ru");
copyOnRightClick.nextSibling.textContent=translateText("Копировать ссылку при нажатии правой кнопкой мыши", "ru");
NewYearTheme.nextSibling.textContent = translateText("Новогодняя тема", "ru");
document.querySelector('#theme-settings-title').textContent = translateText('Настройки темы', "ru");
document.querySelector('#background-color .translate-text').textContent = translateText('Цвет фона:', "ru");
document.querySelector('#text-color-headings .translate-text').textContent = translateText('Цвет заголовков:', "ru");
document.querySelector('#li-back-color .translate-text').textContent = translateText('Цвет фона элементов:', "ru");
document.querySelector('#li-text-color .translate-text').textContent = translateText('Цвет текста элементов:', "ru");
document.querySelector('#tooltip-background-color .translate-text').textContent = translateText('Цвет фона подсказок:', "ru");
document.querySelector('#font-family-settings .translate-text').textContent = translateText('Семейство шрифтов:', "ru");
document.querySelector('#heading-font-size .translate-text').textContent = translateText('Размер шрифта заголовков:', "ru");
document.querySelector('#item-font-size .translate-text').textContent = translateText('Размер шрифта элементов:', "ru");
document.querySelector('#tooltip-font-size .translate-text').textContent = translateText('Размер шрифта подсказок:', "ru");
document.querySelector('#resetTheme .translate-text').textContent = translateText('Сбросить тему', "ru");
advancedSearch.nextSibling.textContent = translateText("Enable contextual search (Attention! Initialization can take up to 20 seconds on first startup)", "en");
document.getElementById('advancedSearchText').style.display="block";
canOpen.nextSibling.textContent = translateText("Скрыть сервисы, которые не могут быть открыты в боковой панели","ru");
  }
  openInNewTab.checked = JSON.parse(localStorage.getItem("openInNewTab")) || false;

  function updateCheckboxState() {
      localStorage.setItem("openInNewTab", openInNewTab.checked);
  }
  openInNewTab.addEventListener("change", updateCheckboxState);

  function initializePage() {
    saveOriginalOrder()
    // Сохраняем исходный порядок элементов при загрузке страницы
    originalContent = document.body.innerHTML;

    // Восстанавливаем состояние избранного при инициализации страницы
    loadFavorites();

    // Инициализируем обработчики событий для элементов списка
    initializeListItems();
}

  function createBackButton() {
    let backButton = document.createElement("button");
    backButton.textContent = userLang.startsWith('ru') ? "Вернуться в главное меню" : "Back to menu";
    backButton.style.position = "fixed";
    backButton.style.top = "10px";
    backButton.style.left = "10px";
    backButton.style.zIndex = "1000";
    backButton.style.backgroundColor = "#242582";
    backButton.style.color = "#FFFF00";
    backButton.style.margin = "10px";

    // Обработчик нажатия на кнопку "Назад"
    backButton.addEventListener("click", function () {
        // Восстанавливаем оригинальное содержимое
        document.body.innerHTML = originalContent;

        // Восстанавливаем состояние меню
        dropdownMenu.style.display = isMenuVisible ? 'block' : 'none'; // Восстанавливаем видимость меню
        favoriteCheckbox.checked = false; // Сбрасываем состояние чекбокса
        checkboxesAdded = false; // Сбрасываем флаг добавления чекбоксов
        // Переинициализируем страницу
        initializePage(); // Re-initialize event listeners
        location.reload();
    });

    document.body.appendChild(backButton);
}

  function initializeListItems() {
    const listItems = document.querySelectorAll("li");
    listItems.forEach((li) => {
        li.addEventListener("click", function () {
            let website = this.getAttribute("data-website");
            currentWebsite = website;
            localStorage.setItem('currentWebsite', currentWebsite);
                if (openInNewTab.checked) {
                    window.open(website, '_blank');
                } else {
                    if (blockSites.includes(website)) {
                        let text = translateText("Этот сайт не может быть открыт в боковой панели, открыть его в новой вкладке?", "ru");
                        let answer = userLang.startsWith('ru') 
                            ? confirm("Этот сайт не может быть открыт в боковой панели, открыть его в новой вкладке?")
                            : confirm(text);
                        if (answer) {
                            window.open(website, '_blank');
                        }
                    } else {

                        // Скрываем оригинальное содержимое и создаем iframe
                        document.body.innerHTML = ''; // Очищаем содержимое body

                        let iframe = document.createElement("iframe");
                        iframe.id = "websiteFrame";
                        iframe.style.width = "100%";
                        iframe.style.height = "100%";
                        iframe.style.position = "fixed";
                        iframe.style.top = "0";
                        iframe.style.left = "0";
                        iframe.style.border = "none";
                        iframe.src = website;
                        document.body.appendChild(iframe);

                        // Создаем кнопку "Назад"
                        createBackButton();
                    }
                }
            });
        });
    }

    // Отправка запроса
    function httpGet(url) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
        }

        //Убираю лишние символы и дубликаты
        function cleanAndTrimData(data) {
            
            // Обрезаем первые 4 символа
            let trimmedText = data.slice(4);
            // Находим индекс символа "
            let quoteIndex = trimmedText.indexOf('",');

            // Если символ найден, обрезаем строку до этого индекса
            if (quoteIndex !== -1) {
                trimmedText = trimmedText.slice(0, quoteIndex);
            }
            return trimmedText;
        }

    //Функция для создания описания
    function initializePopup() {
        var aiMenuItems = document.querySelectorAll('.aiMenu li');
        var popup = document.createElement('div');
        popup.classList.add('popup');
        document.body.appendChild(popup); // Добавляем popup в body один раз
    
        var descriptions = websiteDescriptionsRu;
            
        aiMenuItems.forEach(function(item) {
            item.addEventListener('mouseover', function(event) {
                var website = this.getAttribute('data-website');
                if (descriptions.hasOwnProperty(website)) {
                    var description = descriptions[website];
                    let translateUrl = "https://translate.googleapis.com/translate_a/single?format=text&client=gtx&sl=" + "ru" + "&tl=" + userLang + "&dt=t&q=" + description;
                    // sl – язык оригинала, tl – язык для перевода, originalText – текст запроса (можно использовать результат string.match(/.{1,2000}(?=\.)/gi))
                    if(userLang.startsWith('ru'))
                        {
                            popup.textContent = description;
                        }
                    else
                    {
                        let translatedText = httpGet(translateUrl);
                        translatedText = cleanAndTrimData(translatedText);
                        popup.textContent =translatedText;
                    }

                    // Устанавливаем позицию popup
                    popup.style.left = event.pageX + 'px'; // Позиция по X
                    popup.style.top = event.pageY + 'px'; // Позиция по Y
                    popup.classList.add('show'); // Показываем popup
                }
            });
    
            item.addEventListener('mouseout', function() {
                popup.classList.remove('show'); // Скрываем popup
            });
        });
    }

    function translate_and_write_desc() {
        var descriptions = websiteDescriptionsRu;
    
        // Перебираем каждую запись в объекте описаний
        for (var url in descriptions) {
            if (descriptions.hasOwnProperty(url)) {
                var description = descriptions[url]; // Получаем описание для текущего URL
                let translateUrl = "https://translate.googleapis.com/translate_a/single?format=text&client=gtx&sl=ru&tl=" + userLang + "&dt=t&q=" + encodeURIComponent(description);
    
                // Если язык пользователя не русский, переводим описание
                if (!userLang.startsWith('ru')) {
                    // Получаем переведенный текст
                    let translatedText = httpGet(translateUrl);
                    translatedText = cleanAndTrimData(translatedText);
                    userLangDesc.push({url, translatedText }); // Добавляем объект с URL и переведенным описанием
                } else {
                    // Если язык русский, просто добавляем оригинальное описание
                    userLangDesc.push({url, description });
                }
            }
        }
        // Здесь можно записать userLangDesc в кэш, если это необходимо
        localStorage.setItem('translatedDescriptions', JSON.stringify(userLangDesc));
    }
    
    var websiteDescriptionsRu = {
      "https://duck.ai/": "Бесплатно: Claude3 Hiku, GPT-4o-mini, Llama3.1 70B, Mixtral 8x7B.",
      "https://thinkany.ai/": "Бесплатно можно использовать различные LLM, на сайте есть тёмная тема и нужна авторизация.",
      "https://www.phind.com": "Phind LLM, бесплатная поисковая система, на сайте есть тёмная тема.",
      "https://www.prefind.ai/": "Бесплатная поисковая система, доступны модели: Llama 3, Claude 3.",
      "https://www.blackbox.ai/": "Бесплатно: BlackBox AI LLM, на сайте есть тёмная тема.",
      "https://www.perplexity.ai/": "Бесплатная поисковая система, на сайте есть тёмная тема, использует GPT-3.5 Turbo",
      "https://chat.tune.app/": "Бесплатно досткпны несколько LLM, а остальные доступные после регистрации, на сайте есть тёмная тема.",
      "https://labs.perplexity.ai/": "Бесплатно доступны несколько моделей LLM, на сайте есть тёмная тема.",
      "https://jeeves.ai/": "Бесплатная поисковая система, доступны модели: Jeeves LLM, на сайте есть тёмная тема.",
      "https://bagoodex.io/": "Бесплатная поисковая система, использует GPT-4o, BaGooDex чат и другие инструменты, доступна тёмная тема.",
      "https://www.aiuncensored.info": "Бесплатно можно использовать: GPT-3.5, на сайте есть тёмная тема.",
      "https://huggingface.co/spaces/Qwen/Qwen2-72B-Instruct": "Бесплатно: Qwen2-72B-Instruct.",
      "https://chat.tinycms.xyz:3002/#/chat": "Доступны: GPT-4 и другие модели бесплатно, но с ограничениями, на сайте есть тёмная тема.",
      "https://you.com/search?q=hi&fromSearchBar=true&tbm=youchat": "Бесплатно: You Chat LLM, GPT-4o (с ограничениями), на сайте есть тёмная тема.",
      "https://finechat.ai/ru/app": "Бесплатно: GPT-4o (с ограничениями).",
      "https://gpt-4o.biz/playground": "Бесплатно: GPT-4o (с ограничениями).",
      "https://gpt4o.so/ru/app": "Бесплатно: GPT4o (с ограничениями).",
      "https://iask.ai/": "Бесплатная поисковая система и другие инструменты ИИ.",
      "https://www.popai.pro/": "Бесплатно: GPT и другие инструменты ИИ, но требуется вход в систему и у этого сервиса есть ограничения.",
      "https://useadrenaline.com/": "Бесплатный ИИ для программистов, позволяет анализировать репозитории на GitHub.",
      "https://gpt.h2o.ai/": "Бесплатные LLM.",
      "https://chat.lmsys.org/": "Большая платформа для тестирования различных ИИ, но некоторые имеют ограничения, на сайте есть тёмная тема, а также возможно использовать несколько LLM одновременно.",
      "https://chat.deepseek.com/": "ИИ для программистов, отлично справляется с написанием кода, но требуется регистрация.",
      "https://chatgate.ai/gpt4/": "Бесплатно: ChatGPT-4 и другие инструменты, но с ограничениями.",
      "https://agentgpt.reworkd.ai/ru": "Это сервис, который может находить решения ваших проблем, для этого нужно напишисать, что вам нужно, и он предложит варианты, однако функционал доступен только после регистрация, а также на сайте есть тёмная тема.",
      "https://smartbuddy.ru/models/gpt-4-omni": "Бесплатно GPT-4o, с ограничениями.",
      "https://andisearch.com/": "Бесплатная поисковая система.",
      "https://anonchatgpt.com/": "Бесплатно GPT-3.5, на сайте есть тёмная тема.",
      "https://aoyo.ai/": "Бесплатная поисковая система.",
      "https://pi.ai/talk": "Бесплатный ИИ-ассистент.",
      "https://gpt-chatbot.ru/chat-gpt-ot-openai-dlya-generacii-teksta": "Бесплатно: Чат-бот",
      "https://devv.ai/": "ИИ для программистов, включает чат с LLM: Gemeni 1.5 и Claude 3 (требуется регистрация), веб-поиск и работа с GitHub, но требуется вход в систему.",
      "https://huggingface.co/spaces/THUDM/CodeGeeX": "Бесплатный Codex LLM для программистов.",
      "https://www.cleeai.com/": "Бесплатная поисковая система, с ограничениями, требуется вход в систему.",
      "https://app.anakin.ai/discover": "Множество LLM и инструментов ИИ, на сайте есть тёмная тема, с ограничениями.",
      "https://chatgptchatapp.com": "Бесплатно GPT-3.5.",
      "https://character.ai": "Бесплатный персонализированный чат, требуется вход в систему.",
      "https://chat.chatgptdemo.net": "Бесплатно: GPT 3.5 Turbo, лимит 15 запросов.",
      "https://leingpt.ru/chat/": "Бесплатно GPT, не работает с блокировщиком рекламы, на сайте есть тёмная тема и ограничения.",
      "https://promptboom.com/PowerChat/PowerChatTalk": "Бесплатные ИИ-сервисы, но требуется регистрация и есть ограничения.",
      "https://pbot2.bus1.skybyte.me/#/chat/1002": "Бесплатный чат, но нет SSL-сертификата.",
      "https://chataibot.ru/app/free-chat": "Бесплатный чат (GPT-3.5 Turbo).",
      "https://chat.mistral.ai/chat": "Бесплатный чат Mistral (требуется вход в систему)",
      "https://yep.com/chat/": "Бесплатный поиск и чат Yep.",
      "https://share.wendaalpha.net": "Бесплатно GPT-4o, на сайте есть тёмная тема, но отвечает только на китайском.",
      "https://groq.com/": "Бесплатный GPT, блокирует запросы из РФ.",
      "https://ya.ru/": "Бесплатно: Yandex GPT",
      "https://talkai.info/ru/": "Бесплатно Gpt-3.5, с ограничениями, на сайте есть тёмная тема.",
      "https://ai.mitup.ru/chatgpt-free": "Бесплатный чат",
      "https://www.anytopic.io": "Бесплатные модели Claude, но требуется регистрация.",
      "https://codepal.ai/": "Бесплатный чат, но требуется вход в систему.",
      "https://t.me/EdyaAIrobot": "Бесплатный чат-бот в Telegram",
      "https://github.com/KudoAI/googlegpt": "Интегрирует GPT Chat в поисковую систему, для корректной работы рекомендую включить мод API в настройках.",
      "https://github.com/KudoAI/duckduckgpt": "Интегрирует GPT Chat в поисковую систему, для корректной работы рекомендую включить мод API в настройках.",
      "https://github.com/KudoAI/bravegpt": "Интегрирует GPT Chat в поисковую систему, для корректной работы рекомендую включить мод API в настройках.",
      "https://github.com/Processori7/llm/releases": "Это программа, которая позволяет использовать различные LLM бесплатно, возможны ложные срабатывания Windows Defender.",
      "https://aibro.io/article/": "Это бесплатный генератор статей, просто введите тему.",
      "https://dezgo.com/": "Бесплатный генератор изображений, доступно много моделей.",
      "https://perchance.org/ai-text-to-image-generator": "Бесплатный генератор изображений.",
      "https://fusionbrain.ai/": "Бесплатный генератор изображений и видео, использует модель Кандинского, требуется вход в систему.",
      "https://shedevrum.ai/text-to-image/": "Бесплатный генератор изображений от Яндекса, требуется вход в систему для использования.",
      "https://ideogram.ai/": "Бесплатный генератор изображений, требуется вход в систему.",
      "https://dall-e-2.ru/": "Бесплатный генератор изображений.",
      "https://www.craiyon.com/": "Бесплатный генератор изображений, генерирует картину и показывает похожие.",
      "https://stabledifffusion.com/": "Бесплатный генератор изображений.",
      "https://dreamlike.art/create": "Бесплатный генератор изображений, но требуется вход в систему.",
      "https://huggingface.co/spaces/gokaygokay/Kolors": "Бесплатный генератор изображений.",
      "https://magnific.ai/": "Сервис, который улучшает качество фотографий с помощью алгоритмов ИИ, требуется вход в систему.",
      "https://dewatermark.ai/ru": "Сервис, который удваивает любой водяной знак.",
      "https://magic-eraser.ai": "С помощью Imgedit AI eraser вы можете удалить нежелательные объекты из ваших фотографий онлайн бесплатно за считанные секунды!",
      "https://huggingface.co/spaces/ehristoforu/dalle-3-xl-lora-v2": "Бесплатный генератор изображений Dalle-3.",
      "https://ru.aiseesoft.com/watermark-remover-online/#": "Сервис, который удваивает любой водяной знак.",
      "https://remaker.ai/en": "Сервис, который меняет лица на фотографиях.",
      "https://huggingface.co/spaces/stabilityai/stable-diffusion-3-medium": "Бесплатный генератор изображений Stable-diffusion-3-medium.",
      "https://huggingface.co/spaces/mukaist/DALLE-4K": "Бесплатный генератор изображений DALLE-4K.",
      "https://picwish.com/photo-enhancer": "Сервис, который улучшает качество фотографий.",
      "https://www.artguru.ai/": "Бесплатный генератор изображений, без регистрации, с возможностью выбора стиля.",
      "https://www.veed.io/": "Бесплатный генератор видео, требуется вход в систему.",
      "https://app.runwayml.com/": "Бесплатный генератор видео, требуется вход в систему.",
      "https://videodubber.ai/": "Бесплатный генератор видео, требуется вход в систему.",
      "https://www.typeframes.com/": "Бесплатный генератор видео, требуется вход в систему.",
      "https://maestra.ai/tools/video-translator": "Бесплатный видеопереводчик, требуется вход в систему.",
      "https://pika.art/login": "Бесплатный генератор видео, требуется вход в систему.",
      "https://www.genmo.ai/": "Бесплатный генератор видео, требуется вход в систему.",
      "https://huggingface.co/spaces/KwaiVGI/LivePortrait": "Сервис, который позволяет оживить портреты.",
      "https://ltx.studio": "Бесплатный генератор видео, требуется вход в систему.",
      "https://www.hedra.com/": "Бесплатный генератор видео, требуется вход в систему.",
      "https://gamma.app/": "Бесплатный генератор презентаций, требуется вход в систему.",
      "https://slidesgo.com/": "Бесплатный генератор презентаций, требуется вход в систему.",
      "https://www.crystalsound.ai/": "CrystalSound: ваше умное приложение для подавления шума и записи экрана, использование бесплатно, но требуется вход в систему.",
      "https://diktatorial.com/": "Онлайн инструмент для мастеринга аудио и музыки, использование бесплатно, но требуется вход в систему.",
      "https://huggingface.co/spaces/Xenova/whisper-webgpu": "Бесплатный аудиопереводчик в реальном времени.",
      "https://elevenlabs.io/": "Бесплатные аудиосервисы, требуется вход в систему.",
      "https://hidola.ai/en": "Бесплатный TODO-сервис, требуется вход в систему.",
      "https://simplified.com/": "Бесплатный TODO-сервис, требуется вход в систему.",
      "https://huggingface.co/spaces/TencentARC/PhotoMaker-Style": "Сервис генерации аватаров, просто загрузите несколько своих фотографий, напишите запрос, выберите стиль и готово.",
      "https://app.scenario.com/upscale": "Scenario — это инструмент для создания игровых персонажей с использованием ИИ.",
      "https://easywithai.com/tools/vidiq": "Это инструмент роста для создателей YouTube, который теперь имеет функции ИИ.",
      "https://www.noota.io/": "Нейронная сеть, которая извлекает информацию из любых встреч, включая конференции, голосовые сообщения и подкасты.",
      "https://smartbuddy.ru/models/gpt-4o-mini": "Чат с GPT-4o-mini.",
      "https://websim.ai/": "ИИ ответит на вопросы и также создаст что угодно, все версии Claude и GPT-4o доступны, но требуется регистрация.",
      "https://spline.design/": "Генератор 3D-моделей на основе нейронной сети прямо в браузере, требуется регистрация.",
      "https://mojo-app.com/ai": "ИИ для анимации логотипов.",
      "https://www.fontspace.com/": "Сервис для дизайнеров с 120 тысячами шрифтов в одном месте, бесплатно, также есть генератор и автоматизированный поиск.",
      "https://huggingface.co/spaces/Xenova/whisper-word-level-timestamps": "Нейронная сеть быстро и бесплатно преобразует видео в текст, просто загрузите исходник и получите транскрипцию.",
      "https://huggingface.co/spaces/gokaygokay/Tile-Upscaler": "Нейронная сеть, которая позволяет улучшать размытые фотографии прямо в вашем браузере, это бесплатный аналог Upscayl с максимальным увеличением 20x.",
      "https://github.com/Anjok07/ultimatevocalremovergui/releases": "Сервис ИИ отделяет музыку от вокала и делит трек на отдельные дорожки, данный сервис полностью бесплатен и позволяет извлекать из музыкальных композиций.",
      "https://huggingface.co/spaces/yizhezhu/MoMA_zeroGPU": "ИИ сгенерирует изображение из другого изображения бесплатно, просто напишите запрос, загрузите ссылку и получите результат.",
      "https://klingai.com/": "Kling создает классные видео и изображения по запросу.",
      "https://www.gling.ai/": "Gling — нейронная сеть для начинающих блогеров, она сможет удалить слова-паразиты, паузы и другие звуки, которые портят контент.",
      "https://www.superupscaler.com/": "Сервис быстро улучшает качество изображений, просто нужно загрузить исходник.",
      "https://huggingface.co/spaces/lllyasviel/IC-Light": "Сервис на основе нейронной сети способен определить, как и откуда падает свет на изображение, и учитывать это при создании нового фона.",
      "https://app.chathub.gg/": "Сервис сравнивает различные нейронные сети, здесь собраны GPT-4, Claude 3.5, Liama 3 и другие ИИ, просто загрузите запрос и посмотрите, какая нейронная сеть справилась лучше, но для использования требуется авторизация.",
      "https://dubverse.ai/": "Позволяет сделать ваши видео многоязычными одним нажатием кнопки, требуется вход в систему.",
      "https://huggingface.co/spaces/gokaygokay/AuraSR-v2": "Сервис улучшает качество любого изображения в 8 раз.",
      "https://copilot2trip.com/": "Персонализированный ИИ-ассистент по путешествиям с картами, просто скажите ему, куда и когда вы хотите поехать, и он предложит персонализированные планы с рекомендованными направлениями и достопримечательностями.",
      "https://rugpt.io/chat-gpt-dlya-rerajta-teksta": "Сервис поддерживает множество моделей, включая GT-4o mini.",
      "https://chat.eqing.tech/": "Сервис поддерживает множество моделей, включая GT-4o mini.",
      "https://huggingface.co/spaces/finegrain/finegrain-object-eraser": "Сервис, который удаляет любой объект из фотографии, просто загрузите фото и напишите, что нужно удалить.",
      "https://huggingface.co/spaces/finegrain/finegrain-image-enhancer": "Сервис улучшит качество изображений прямо в браузере, сервис работает абсолютно бесплатно, просто загрузите изображение и получите улучшенную версию.",
      "https://julius.ai/ai-chatbot": "Бесплатный чат, с ограничениями и темной темой, Доступные LLM: GPT-4o, GPT-3.5, Claude Hiku, Claude Sonnet, Gemeni 1.5, Gemeni Flash, Command R, Llama 3.",
      "https://chatgpt5free.com/chatgpt-5-free/":"Бесплатный чат с множеством возможностей и тёмной темой оформления.",
      "https://felo.ai/search":"Новая поисковая система, быстрый и подробный поиск с использованием ИИ, есть тёмная тема оформления.",
      "https://rubiks.ai/":"Поисковая система с возможность поиска с использованием файлов, доступны множества моделей, по умолчанию используется GPT-4o-mini, но нет тёмной темы оформления.",
      "https://huggingface.co/spaces/multimodalart/flux-lora-the-explorer":"Генератор картинок Flux создаёт изображения высокого качества, на выбор доступно несколько стилей: реализм, аниме, картины и другие.",
      "https://kidgeni.com/":"Kidgeni позволяет генерировать изображения, книги, истории, изображения из набросков, но для генерации изображений запрос нужно вводить только на ангийском языке, а также некоторые функции доступны только после регистрации, есть лимит: 15 запросов.",
      "https://textbot.ru/":"TextBot — нейросеть которая поможет сгенерировать, дополнить, улучшить или отрерайтить текст на любую тему.",
      "https://www.seaart.ai/ai-tools/ai-face-swap":"Инструмент для объединения вашего лица с различными художественными стилями и сценами, он поддерживает обмен лицами как в видео, так и в изображениях, что облегчает создание уникального и развлекательного контента.",
      "https://llmplayground.net/":"Сайт с тёмной темой оформления и большим выбором LLM.",
      "https://www.farfalle.dev":"Бесплатный поисковый движок, с тёмной темой оформления, доступны GPT-3.5 Turbo и LLAMA 3-70B.",
      "https://www.pizzagpt.it/en":"Бесплатный Chat GPT-3.5 Turbo, сайт с тёмной темой оформления.",
      "https://www.turboseek.io":"Бесплатная поисковая система с ИИ, используются LLAMA 3-8B или Mixtrai 8x7B.",
      "https://www.xdash.ai":"Бесплатная поисковая система, использует ИИ для улучшения результатов поиска.",
      "https://chatify-ai.vercel.app/":"Бесплатный чат с LLAMA, есть тёмная тема оформления.",
      "https://www.teach-anything.com/":"Бесплатный инструмент, который поможет выучить что угодно, русский язык пока не поддерживается.",
      "https://discopixel.app/animator":"ИИ позволяет оживить лица на фотографиях в пару кликов, просто выбираем фото, выбираем эмоцию и готово.",
      "https://huggingface.co/spaces/Kwai-Kolors/Kolors-Virtual-Try-On":"Kolors Virtual — нейросеть которая может переодевать человека с помощью ИИ, использовать просто: в левое поле загружаем своё фото, а в правое — картинку с одеждой.",
      "https://github.com/ToonCrafter/ToonCrafter":"Модель интерполяции видео с открытым исходным кодом, которая настроена для производства мультипликационных видео, для этого требуется два изображения - начало и конец вашего видео или анимации.",
      "https://peopleai.app/?_gl=1*gapbb3*_gcl_au*MTMwMjI4MDI1OS4xNzI0Njc3NDg5*_ga*MjA1Mjk5NTAxOC4xNzI0Njc3NDg5*_ga_QJSPV2MRPV*MTcyNDY3NzQ4OC4xLjAuMTcyNDY3NzQ4OC4wLjAuMA":"Чат-боты с искусственным интеллектом, позволяющие общаться и учиться у некоторых из самых влиятельных и значимых фигур в истории человечества.",
      "https://www.pixelcut.ai/":"Сервис уберёт фон с картинки, удалит лишние объекты и улучшит качество.",
      "https://www.segmind.com/":"В Segmind собраны десятки различных моделей для создания и обработки изображений: Stable Diffusion XL, Dream Shaper или тот же Kandinsky, есть бесплатный тарифный план.",
      "https://toolbaz.com/":"ToolBaz предлагает впечатляющий набор из более чем 30 бесплатных инструментов для написания искусственного интеллекта, чтобы помочь писателям и создателям контента.",
      "https://www.memfree.me/":"Бесплатный ИИ-поисковик. Он найдёт информацию буквально за секунды, на сайте есть тёмная тема оформления, установлена по умолчанию.",
      "https://labs.heygen.com/expressive-photo-avatar":"Expressive Photos — сервис, который превращает фото в видео, натурально говорящее вашим голосом.",
      "https://github.com/captainzero93/Protect-Images-from-AI-PixelGuard#":"PixelGuard защищает изображения от считывания AI и несанкционированного использования в обучении AI, например, в моделях распознавания лиц или алгоритмах переноса стиля.",
      "https://search.lepton.run/":"Бесплатная поисковая система с ИИ",
      "https://fliki.ai/?via=withai":"Fliki позволяет преобразовывать текст в видео с помощью ИИ",
      "https://unwatermark.ai/":"Бесплатно убираем вотермарки с любых изображений",
      "https://sivi.ai/":"Сервис позволяет превратить ваш текстовый контент в потрясающий графический дизайн за считанные минуты",
      "https://bgbye.fyrean.com/":"Нейросеть, которая идеально удаляет любой фон",
      "https://easywithai.com/tools/linkzai":"Сервис добавляет предварительный просмотр ссылок в реальном времени на ваш сайт, увеличивая вовлеченность и снижая процент отказов",
      "https://rugpt.io/nejroset-dlya-rekomendacii-filmov":"Этот чат-бот подберёт для вас фильм, нужно просто написать ему запрос.",
      "https://reflection-playground-production.up.railway.app/":"Reflection ИИ исправляет свои же ошибки, особенно в логике и обучается сама",
      "https://mootion.com/":"Сервис позволяет легко создавать анимированных 3D-персонажей и сцены, используя текстовые подсказки или видео в качестве основы",
      "https://molypix.ai/general-poster":"Нейросеть, которая сделает любой графический дизайн",
      "https://musichero.ai/ru/app":"Бесплатный генератор музыки из текстовых запросов",
      "https://www.webcrumbs.org/frontend-ai":"Инструмент для генерации веб-компонентов и интерфейсов из изображений и текста с возможностью экспорта",
      "https://elevenlabs.io/dubbing":"Нейросеть может полностью переводить видеоролики и фильмы, сохраняя подлинные голоса, при необходимости редактируя отдельные фрагменты, короткие ролики обрабатывает бесплатно",
      "https://supabase-community.github.io/babelfish.ai/":"Это онлайн-инструмент, который переводит речь в текст на более чем 200 языков",
      "https://huggingface.co/spaces/GanymedeNil/Qwen2-VL-7B":"Нейросеть для распознования рукописного текста с большой точностью",
      "https://www.chatize.com":"Сервис позволяет загружать различные документы и задавать в чате вопросы, а ИИ будет отвечать на вопросы, используя загруженный документ",
      "https://www.i2text.com/ru/ai-writer":"Бесплатный и функциональный генератор текста, способный создавать статьи, эссе, сценарии, прозу, слоганы и многое другое, а затем скачивать получившийся текст",
      "https://magictellers.com/":"ИИ, который позволяет создавать персонализированные истории, детские книги и книжки-раскраски",
      "https://www.mathgptpro.com/":"ИИ агент, который специализируется на математике, обрабатывает примеры в любом формате: текст, фото и даже голосовое описание",
      "https://straico.com/":"Сервис предлагает широкий спектр мощных генеративных инструментов ИИ, которые могут помочь вам в различных творческих начинаниях, от От написания и обобщения контента ИИ до создания изображений и анализа PDF, эти инструменты используют передовые алгоритмы ИИ, чтобы помочь оптимизировать ваш рабочий процесс и повысить вашу производительность",
      "https://nexra.aryahcr.cc/en":"Сервис позволяет интегрировать ИИ в различные проекты",
      "https://www.promptrefine.com/prompt/new":"Сервис позволяет задавать вопросы к различным моделям ChatGPT",
      "https://www.patterned.ai/":"Сервис позволяет создавать и искать бесшовные шаблоны и текстуры, не защищенные авторским правом",
      "https://hailuoai.video/":"Сервис для генерации видео",
      "https://huggingface.co/spaces/finegrain/finegrain-object-cutter":"ИИ аккуратно вырежет нужные объекты с изображений, просто загружаем фото и пишем, что конкретно необходимо вырезать",
      "https://bgeraser.com/":"Средство для удаления фона изображений, которое также может удалять отдельные объекты",
      "https://www.tripo3d.ai/app":"Нейросеть для генерации 3D-моделей, на старте дают 600 кредитов, это примерно 10-24 генераций",
      "https://swimm.ai/":"Удобный инструмент документации кода, который использует ИИ для упрощения процесса создания и организации документации для вашего кода или приложения",
      "https://huggingface.co/spaces/yanze/PuLID-FLUX":"Сервис для генерации реалистичных картинок высокого качества",
      "https://seapik.com/":"Это комплексная онлайн-платформа AI, предлагающая ряд мощных и удобных инструментов AI для создания и редактирования контента",
      "https://convert.leiapix.com/":"Бесплатный инструмент обработки изображений, который преобразует 2D-изображения в 3D-изображения Lightfield",
      "https://llamatutor.together.ai/":"Бесплатный инструмент, который поможет выучить что угодно",
      "https://artbit.ai/":"Беслплатный генератор изображений с возможностью выбора количества изображений и их размера",
      "https://chatgpt.es":"Сервис предоставляет возможность использовать GPT4o бесплатно.",
      "https://huggingface.co/jasperai/Flux.1-dev-Controlnet-Upscaler":"Сервис поднимает разрешение изображения, тем самым делая картинку более чёткой",
      "https://learnfast.ai/ru/app":"Бесплатный сервис, который поможет выучить что-то новое",
      "https://huggingface.co/spaces/fffiloni/diffusers-image-outpaint":"Бесплатная нейросеть, расширяющая любые фотографии, просто загружаем картинку, выбираем нужное соотношение сторон и нажимаем «Генерировать»",
      "https://www.i2img.com/":"Это удобный фоторедактор прямо в браузере, который способен удалить фон, раскрасить ч/б фото, улучшить качество и многое другое",
      "https://www.relume.io/":"Бесплатный генератор сайтов, хорошо подходит для создания лендингов",
      "https://wegic.ai/":"Конструктор сайтов на основе чата, который может создавать профессиональные многостраничные веб-сайты с помощью разговоров - не требуются навыки программирования или дизайна, идеально подходит для новичков.",
      "https://reactor.helloarc.ai/chat":"Бесплатный интерактивный чат-бот, целью которого является обеспечение энергоэффективного и высокопроизводительного разговорного ИИ, для использования необходимо войти в систему",
      "https://huggingface.co/spaces/DamarJati/FLUX.1-RealismLora":"Бесплатный генератор реалистичных изображений, просто введите промт, нажмите 'Generate' и ожидайте результат",
      "https://undetectio.com/":"Инструмент перефразирования контента на основе нейросети, который предназначен для того, чтобы сделать ваш контент, необнаружимым детекторами контента ИИ, сервис предлагает бесплатный план с 1000 словами в месяц",
      "https://www.freepik.com/pikaso":"Генератор эскизов для изображений с ИИ, который превращает ваши рисунки и идеи в жизнь в режиме реального времени",
      "https://yce.perfectcorp.com/colorize":"Сервис раскрасит любое фото, цвета получаются натуральными и насыщенными, войдите используя почту, чтобы скачать фото без вотерки",
      "https://www.figma.com/community/plugin/1326990370920029683/figma-to-replit":"Плагин конвертирует ваши дизайны сразу в приложения на HTML, CSS или React, при этом финальный результат вам не составит труда экспортировать, запустить или подредактировать код.",
      "https://tinywow.com/tools/write":"Это огромнейшая база ИИ для работы с текстом, доступно множество возможностей от генерации текста до проверки текста на наличия различных ошибок",
      "https://imagecolorizer.com/":"Это бесплатный онлайн-инструмент на основе ИИ, который может автоматически раскрашивать и восстанавливать старые черно-белые фотографии",
      "https://melody.ml/":"Сервис позволяет легко разделить аудиодорожки с помощью машинного обучения бесплатно, при этом автоматически изолируйте вокал и генерируйте стебы для ремиксов песен",
      "https://venice.ai/chat":"Сервис с бесплатный планом, который позволяет общаться с раличными LLM на любые темы",
      "https://deepai.org/chat":"Сервис с бесплатный планом, который позволяет общаться с раличными LLM на любые темы",
      "https://lmarena.ai/":"LLM арена, сервис позволяет общаться с раличными LLM на любые темы и оценивать их эффективность",
      "https://studyable.app/":"Сервис с бесплатным планом, который поможет справиться с любым домашним заданием",
      "https://huggingface.co/chat/":"Сервис позволяет общаться с различными LLM",
      "https://app.giz.ai/assistant?mode=chat":"Сервис позволяет общаться с различными LLM",
      "https://app.myshell.ai/explore":"Платформа предлагает бесплатный доступ к передовым языковым моделям, включая GPT-4 и другие ведущие LLM, что позволяет пользователям создавать высокоспособных и привлекательных ботов",
      "https://huggingface.co/spaces/OzzyGT/diffusers-image-fill":"Сервис, который поможет убрать лишнее с фотографии",
      "https://huggingface.co/spaces/TheEeeeLin/HivisionIDPhotos":"Сервис, который позволяет быстро сделать фото на документы",
      "https://huggingface.co/spaces/fffiloni/expression-editor":"Нейросеть для управления эмоциями на фото в реальном времени",
      "https://www.transvribe.com/":"Бесплатный инструмент ИИ, который позволяет быстро получать ответы на любые видео на YouTube",
      "https://aisaver.io/face-swap-video":"Бесплатный инструмент для изменения лица на видео, необходима регистрация или вход в аккаунт",
      "https://modulbot.ru/text-generator":"Бесплатный генератор текстов",
      "https://minitoolai.com/":"Сервис, который предоставляет доступ к нескольким полезным сервисам с ИИ в том числе и GPT-4o",
      "https://komo.ai/":"Бесплатная поисковая система с ИИ, имеет дополнительные платные функции",
      "https://heybro.ai/web":"Бесплатный доступ к GPT-4o-mini",
      "https://kingnish-opengpt-4o.hf.space/?__theme=dark":"Сервис позволяет общаться с GPT-4o, генерировать видео и картинки",
      "https://pythonspath.ru/gpt4o":"Сервис позволяет использовать GPT-4o",
      "https://huggingface.co/spaces/kayfahaarukku/fufufafa-makan-brem":"Бесплатный генератор изображений высокого качества",
      "https://www.genmo.ai/play":"Бесплатный генератор видео, нобходима авторизация",
      "https://giga.chat/":"Бесплатный ИИ чат из России",
      "https://storm.genie.stanford.edu/":"ИИ для исследователей, которая способна писать качественные работы, требуется вход в систему",
      "https://tools.rotato.app/compress":"Бесплатный сервис, который позволяет сжимать видео без видимой потери качества",
      "https://mokker.ai/":"Инструмент для генерации фотографий на основе искусственного интеллекта, требуется регистрация, лимит бесплатно плана: 40 картинок",
      "https://hix.ai/ru/search":"Бесплатная поисковая система с ИИ и подробными ответами на вопросы, включая генерацию перезентаций и ментальную карту",
      "https://llmarena.ru/":"LLM арена, досутупно множество моделей, сайт имеет тёмную тему оформления",
      "https://claudeson.net/":"Позволяет бесплатно использовать Claude 3.5 Sonnet",
      "https://claude3.free2gpt.xyz/":"Позволяет бесплатно использовать Claude 3.5 Sonnet",
      "https://copilot.getbind.co/":"Бесплатная поисковая система с ИИ, позволяет использовать GPT-4o mini",
      "https://flowith.io/":"Инструмент повышения производительности на основе искусственного интеллекта, предназначенный для глубокой работы",
      "https://llmchat.in/":"Бесплатный чат с большим выбором LLM",
      "https://www.me.bot/":"Приложение-компаньон с искусственным интеллектом, доступное онлайн, а также на Android и iOS, лимит 100 запросов в месяц",
      "https://www.mathgptpro.com/app/ask":"ИИ решит математические примеры любой сложности, бесплатно с ограничениями",
      "https://huggingface.co/spaces/aifeifei798/FeiFei-Lora-8step":"Качественный генератор изображений",
      "https://www.meshcapade.com/":"Сервис предлагает функцию, которая преобразовывает текст в движение и как бы «оживляет» персонажей",
      "https://www.eraser.io/diagramgpt":"Инструмент позволяет генерировать различные диагрымы на основе текста или фото",
      "https://www.photoroom.com/tools":"Набор инструментов для обработки фото",
      "https://llamaocr.com/":"Бесплатная нейросеть для распознавания текста на фото",
      "https://gptengineer.app/":"Агент с открытым исходным кодом, который может помочь в создании кода",
      "https://www.yeschat.ai/ru/gpts-ZxWyZIKg-EE-GPT":"GPT эксперт по электротехнике на основе ИИ",
      "https://www.rubbrband.com/":"Бесплатный генератор изображений и видео, который позволяет последовательно создавать изображения в уникальных стилях, есть лимит",
      "https://huggingface.co/spaces/AI4Editing/MagicQuill":"Бесплатный редактор изображений с ИИ",
      "https://iki.ai":"Платформа для хранения и организации знаний",
      "https://mcanswers.ai/":"Чат-бот по кодированию с ИИ, который может предоставить вам уточненные, подробные ответы на вопросы по кодированию благодаря своей полной библиотеке, бесплатный план позволяет задавать 100 вопросов каждый день",
      "https://www.askmarcus.app/chat":"Чат-бот предоставляет бесплатный доступ к Chat GPT",
      "https://www.askmyai.chat/":"Чат-бот предоставляет бесплатный доступ к Chat GPT",
      "https://acetone.ai/":"Инструмент для удаление фона с картинок",
      "https://otio.ai/":"Полезный ИИ для учёбы и работы, требуется авторизация",
      "https://fal.ai/models/fal-ai/ltx-video":"Генератор видео по текстовому запросу",
      "https://copycoder.ai/":"Копируем ЛЮБОЙ сайт с помощью CopyCoder, просто делаем скриншот понравившегося сайта ,загружаем в CopyCoder и получаем промт для ChatGPT или любой другой модели",
      "https://huggingface.co/spaces/fffiloni/text-guided-image-colorization":"Раскрашиваем черно-белые фото бесплатно",
      "https://replit.com/":"Генератор приложений, бесплатный план с ограничениями",
      "https://aihairstyle.net/":"ИИ подберет вам варианты причесок, которые лучше всего будут на вас смотреться",
      "https://discord.com/invite/domoai":"Нейросеть которая делает анимацию по выбранному стилю, сервис может сгенерировать из исходного ролика анимацию с помощью одной из десяти моделей, весь процесс генерации проходит на Discord сервере разработчиков",
      "https://bgsub.com/webapp/":"Нейросеть для удаления фона у изображений и фото",
      "https://huggingface.co/spaces/JeffreyXiang/TRELLIS":"Качественные генерации 3D-модели по картинке",
      "https://mockey.ai/":"Генератор макетов ИИ, который предоставляет набор инструментов для генерации макетов ИИ, фотографии ИИ, генерации изображений ИИ, удаления фона ИИ и многого другого, есть бесплатный план с ограничениями",
      "https://netwrck.com/":"Сервис предоставляет доступ к множеству моделей LLM и позволяет генерировать изображения",
      "https://autodraw.com/":"Сервис для создания иконок и быстрых набросков",
      "https://aistudio.google.com/live":"Официальный сайт для доступа к  Gemini 2.0 Flash",
      "https://www.krea.ai/edit":"Аналог Adobe Photoshop с ИИ",
      "https://focalml.com/":"Платформа для создавания собственных телешоу и фильмов с помощью искусственного интеллекта",
      "https://www.zarla.com/":"Конструктор веб-сайтов",
      "https://huggingface.co/spaces/OAOA/InvSR":"Сервис для улучшения изображений",
      "http://multimodalart-stable-cascade.hf.space/":"Бесплатный сервис , который позволяет генерировать изображения",
      "https://www.hotbot.com/chat":"Бесплатный сервис для общения с ИИ",
      "https://free-ai-chat.com/en/model/o1-mini":"Бесплатный сервис для общения с различными LLM",
      "https://suno.com/me":"Бесплатный сервис для генерации музыки",
      "https://huggingface.co/spaces/MoonQiu/FreeScale":"Бесплатный сервис для генерации изображений",
      "https://doodad.dev/pattern-generator/":"Сервис генерирует паттерны с уникальным дизайном, которые можно использовать в любом коммерческом проекте.",
      "https://cobalt.tools/":"Сервис позволяет скачивать любое видео с любого сайта",
      "https://huggingface.co/spaces/artificialguybr/video-dubbing":"Нейросеть может полностью переводить видеоролики и фильмы, сохраняя подлинные голоса (при необходимости редактируя отдельные фрагменты)",
      "https://www.clipfly.ai/":"Бесплатный видеогенератор с искусственным интеллектом и платформа для создания, идеально подходящая для пользователей, не имеющих предыдущего опыта работы с видео",
      "https://huggingface.co/spaces/lllyasviel/iclight-v2-vary":"ИИ для замены фона и освещения на фото",
      "https://sourcegraph.com/cody/chat":"Бесплатный сервис для общения с ИИ, 200 запросов в месяц, требуется регистрация",
      "https://snapedit.app/ru/remove-object/upload":"Бесплтаный сервис для редактирования изображений и удаления лишних объектов",
      "https://huggingface.co/spaces/franciszzj/Leffa":"ИИ-примерочная — бесплатная и с максимально понятным интерфейсом",
      "https://huggingface.co/spaces/TencentARC/InstantMesh":"Бесплатная нейросеть от Tencent, которая превращает изображение в 3D-объект",
      "https://oo.ai/":"Бесплатная поисковая система с ИИ",
      "https://www.drawdb.app/editor":"Это надёжный и удобный редактор связей между объектами базы данных (DBER) прямо в вашем браузере",
      "https://dictation.io/":"инструмент распознавания речи для Google Chrome, который транскрибрует ваши произнесенные слова на другой язык в режиме реального времени",
      "https://www.fillout.com/ai-survey-maker":"Бесплатный инструмент, который позволяет быстро и легко создавать профессиональные опросы с помощью искусственного интеллекта",
      "https://x-doc.ai/":"ИИ для перевода книг и документов на 108 языков, требуется регистрация",
      "https://fokus.am":"Генератор презентаий с бесплатным планом, доступ можно получить только по ссылке, экспорт в PPTX не доступен",
      "https://www.gptpanda.io/":"Помощник ChatGPT для Slack, основываясь на последних моделях OpenAI, GptPanda предлагает неограниченное количество запросов, а также имеет бесплатный стартовый план",
      "https://riverside.fm/transcription":"ИИ-инструмент для транскрибирования видео и подкастов",
      "https://huggingface.co/spaces/osanseviero/gemini-coder":"ИИ для создания различных приложений на React",
      "https://huggingface.co/spaces/akhaliq/anychat":"Сервис предоставляет доступ к большому количеству языковых моделей, поэтому может загружаться довольно долго",
      "https://huggingface.co/spaces/Qwen/QVQ-72B-preview":"Сервис позволяет общаться с QVQ-72B-preview",
      "https://huggingface.co/spaces/stabilityai/stable-diffusion-3.5-large":"Сервис позволяет использовать Stable-diffusion-3.5-large для генерации изображений",
      "https://huggingface.co/spaces/eswardivi/phi-4":"Сервис позволяет общаться с Phi-4",
      "https://huggingface.co/spaces/playgroundai/playground-v2.5":"Очень быстрый генератор изображений по запросу",
      "https://huggingface.co/spaces/llamameta/llama3.1-405B":"Сервис позволяет использовать LLaMA3.1-405B для общения",
      "https://huggingface.co/spaces/Qwen/Qwen2.5-Coder-demo":"Сервис позволяет общаться с Qwen2.5-Coder-demo",
      "https://huggingface.co/spaces/Lightricks/LTX-Video-Playground":"Сервис позволяет генерировать видео по описанию, бесплатно и без регистрации",
      "https://www.whatmore.ai/studio":"Инструмент для создания видео на основе ИИ, предназначенный для брендов электронной коммерции для быстрого создания высококачественных маркетинговых видео, требуется регистрация",
      "https://huggingface.co/spaces/LGAI-EXAONE/EXAONE-3.5-7.8B-Instruct-Demo":"EXAONE 3.5: Набор инструктивных моделей от LG AI, это ссылка на универсальную 7.8B модель",
      "https://huggingface.co/spaces/webml-community/text-to-speech-webgpu":"Данный сервис позволяет переводить текст в речь",
      "https://chat.qwenlm.ai/":"Сервис позволяет использовать различные модели QwenLM, требуется авторизация",
      "https://t.me/gpt_lama_bot":"Бот в Телеграм, который позволяет общаться с несколькими моделями LLM, включая GPT4o",
      "https://consensus.app/":"Поисковая система на основе искусственного интеллекта, которая помогает вам найти основанные на фактических данных ответы на ваши исследовательские вопросы",
      "https://bexi.ai/":"Сервис предлагает два основных инструмента: AI Humanizer для преобразования текста, созданного ИИ, в естественный, похожий на человека язык, и AI Detector для обнаружения контента, созданного AI, с высокой точностью",
      "https://Metatable.ai":"Metatable — это платформа для визуальной разработки приложений, позволяющая создавать базы данных, конечные точки и целые приложения от фронтенда до бэкенда без написания кода",
      "https://lovable.dev/":"Это инструмент, который превращает текстовые идеи в рабочие приложения, требуется регистрация",
      "https://llamacoder.together.ai/":"Этот сервис генерирует полноценные проекты по одному запросу: просто вводите текстовый промпт, и она выдаёт рабочее решение с готовым бэкендом и фронтендом",
      "https://v0.dev/":"ИИ превращает макеты в готовый React-код, создаёт адаптивные компоненты на Next.js и TailwindCSS, а ещё помогает улучшать UX и визуализировать архитектуры через диаграммы, требуется регистрация",
      "https://bolt.new/":"Нейросеть, которая может генерировать интерфейсы, анимации и даже писать код по текстовым или визуальным запросам, требуется регистрация",
      "https://www.dzine.ai/":"Универсальный ИИ-редактор фото — в нём есть ВСЕ ИИ-инструменты для работы с изображениями, есть бесплтаный план, требуется авторизация",
      "https://ai-icon.top/":"Бесплатный ИИ генератор иконок и логотипов, требуется авторизация",
      "https://www.soundverse.ai/":"Генератор музыки с бесплатным планом, требуется авторизация",
      "https://huggingface.co/spaces/tencent/Hunyuan3D-2":"Генерации 3D из текста и изображения",
      "https://www.autodraw.com/":"Онлайн-инструмент для рисования, созданный Дэном Моценбекером и Кайлом Филлипсом с друзьями в Google Creative Lab",
      "https://photoeditor.ai/":"Набор инструментов для редактирования фотографий, которые могут легко удалять ненужные объекты, людей или текст из изображений, это позволяет вам хранить только то, что наиболее важно в ваших фотографиях",
      "https://www.promptengine.cc/":"Генератор промптов для ChatGPT и других ИИ",
      "https://www.deepfind.co/":"Поисковая система с ИИ",
      "https://nomorecopyright.com/":"Сервис генерирует изображение, похожее на оригинал, но без авторских прав",
      "https://huggingface.co/spaces/deepseek-ai/deepseek-vl2-small":"Новая модель DeepSeek-VL2-small, распознающая объекты на изображениях и объясняющая их «смысл»",
      "https://app.dreamlab.gg/":"Генерируем игры прямо в браузере",
      "https://huggingface.co/spaces/Trudy/gemini-image-to-code":"Превращает изображения в интерактивные картинки",
      "https://backgrounderase.net/home":"ИИ для удаления фона",
      "https://huggingface.co/spaces/webml-community/kokoro-webgpu":"ИИ для генерации аудио на основе текста или сценария",
      "https://www.squarespace.com/logo/":"Генератор логотипов",
      "https://chat.mathsolver.top/":"Бесплатное решение математических задач, которое предлагает персонализированный опыт репетиторства",
      "https://chatgptgratis.eu/en/chat.html":"Сервис предоставляет бесплатный доступ к различным LLM",
      "https://www.webpilot.ai/":"Бесплатная поисковая система с ИИ",
      "https://isou.chat":"Бесплатная поисковая система с ИИ",
      "https://www.morphic.sh/":"Бесплатная поисковая система с ИИ",
      "https://scira.app/":"Бесплатная поисковая система с ИИ",
      "https://kagi.com/fastgpt":"Бесплатная поисковая система с ИИ",
      "https://getliner.com/":"Бесплатная поисковая система с ИИ, требуется авторизация",
      "https://www.xdash.ai/":"Бесплатная поисковая система с ИИ",
      "https://correkt.ai/":"Бесплатная поисковая система с ИИ",
      "https://compute.hyper.space/":"Довольно интересный проект, который совмещает различных ИИ агентов с поисковой системой",
      "https://hika.fyi/":"Бесплатная поисковая система с ИИ",
      "https://shapen.com/":"Загрузите изображение — ИИ сам соберёт детализированную 3D-модель",
      "https://www.grok3ai.live/":"Сервис предоставляет доступ к GROK 3 от xAI",
      "https://app.invesst.ai/login":"ИИ-сервис для ИНВЕСТИЦИОННЫХ исследований — Invesst буквально «DeepResearch для инвестиций», объединяющий в себе мощь поиска с помощью ChatGPT и Perplexity",
      "https://neonpangolin.github.io/FilePhish/":"Сервис позволяет находить файлы на веб-сайтах по ключевым словам, а также БД и ПО",
      "https://www.yeschat.ai/features/grok-3":"Сервис предоставляет доступ к GROK 3 от xAI",
      "https://www.rabbithole.chat/":"Поисковая система с ИИ, в день даётся 3 бесплатных запроса, но внутри них можно разветвлять бесконечно",
      "https://wise-cat-groq.vercel.app/chat/ephemeral":"Бесплатный чат с ИИ",
      "https://www.whatonearth.ai/":"Бесплатная поисковая система с ИИ",
      "https://medisearch.io/":"Бесплатная поисковая система с ИИ, ориентированная на вопросы связанные со здоровьем",
      "https://phind-ai.com/":"Бесплатная поисковая система с ИИ",
      "https://usefind.ai/":"Бесплатная поисковая система с ИИ",
      "https://alice.yandex.ru/chat/01953c1a-be79-4000-9e88-5177131e2739/":"ИИ чат от с Алисой от команды Яндекса",
      "https://app.yourchat.ai/#/":"Сервис предоставляет доступ к ChatGPT и поиску с ИИ",
      "https://chat100.ai/":"Бесплатный чат с различными моделями LLM с ограничением в 50 запросов в неделю",
      "https://makepix.ai/":"ИИ генератор фото с бесплатным планом",
      "https://chat.inceptionlabs.ai/":"Первая dLLM-модель называется Mercury Coder от Inception, требуется регистрация",
      "https://notedly.ai/dashboard":"Бесплатный образовательный ИИ-инструмент, призванный помочь студентам, упростив процесс чтения и конспектирования, доступен поиск с ИИ, есть бесплатные сервисы",
      "https://freeaichatplayground.com/":"Сервис предоставляет бесплатный доступ к различным LLM",
      "https://www.chatplayground.ai/":"Сервис предоставляет доступ к множеству LLM, нужна регистрация, есть ограничения на количество запросов",
      "https://playground.ai.cloudflare.com/":"Сервис предоставляет бесплатный доступ к различным LLM",
      "https://letmegpt.com/":"Сервис совмещеает ИИ с Google поиском",
      "https://chat.akash.network/":"Сервис предоставляет доступ к различным LLM",
      "https://www.sesame.com/research/crossing_the_uncanny_valley_of_voice#demo":"Голосовой чат-бот для практики английского языка",
      "https://huggingface.co/spaces/ASLP-lab/DiffRhythm":"Аналог Suno для генерации музыки",
      "https://playground.allenai.org":"Сервис предоставляет бесплатный доступ к различным LLM",
      "https://heck.ai/":"Бесплатная поисковая система с ИИ, позволяет использовать несколько LLM бесплатно, ограничение - 50 запросов в день",
      "https://chat.two.ai/":"Бесплатный чат с ИИ с возможностью поиска информации в Интернете",
      "https://hix.ai/claude/claude-3-7-sonnet":"Сервис предоставляет доступ к Claude 3.7",
      "https://chat.felo.ai/":"Felo чат, предоставляет доступ к различным LLM, требуется авторизация",
      "https://playground.electronhub.top/":"Сервис предоставляет бесплатный доступ к различным LLM и моделям для генерации фото, видео и звука, требуется авторизация, есть лимит - 100000 токенов в день",
      "https://grok.com/":"Grok Ai - бесплатный чат с ИИ, не доступен в некоторых странах, требуется авторизация",
      "https://withsubtitles.com/":"Генератор субтитров для видео",
      "https://www.imagineanything.ai/":"Генератор изображений, с ограничением в 10 бесплатных генераций и скачаиваний в месяц, требуется авторизация",
      "https://raphael.app/":"Генератор изображений без ограничений, платформа использует модель FLUX.1-Dev",
      "https://kimi.ai/":"Бесплатный ИИ сервис с возможностью поиска в Интернете от китайских разработчиков",
      "https://playground.zyphra.com/chat":"Сервис предоставляет доступ к нескольким моделям от компании Zyphra",
      "https://app.artflow.ai/pricing":"Сервис позволяет генерировать аватар по тексту от пользователя или шаблону, можно задать параметры для персонажа и фона, бесплатный аккаунт даёт 100 фото- и 30 видеокредитов ежемесячно",
      "https://fastflux.co/":"Быстрый и бесплатный генератор изображений",
      "https://huggingface.co/spaces/prs-eth/thera":"Сервис улучшает размытые фотографии",
      "https://explorer.globe.engineer/":"Это визуальная поисковая система, которая помогает легко изучать новые темы и исследовать их с помощью наглядных материалов и изображений",
      "https://www.openai.fm/":"Модель text2speech от OpenAi — голоса для озвучки можно сделать промтом или выбрать готовый",
      "https://uncovr.app/":"Сервис предоставляет доступ к различным LLM",
      "https://chatgpt-clone-ten-nu.vercel.app":"Сервис предосталяет доступ к GPT-3.5 и GPT-4",
      "https://www.florafauna.ai/":"Редактор изображений и ВИДЕО по промту",
      "https://www.cutout.pro/photo-enhancer-sharpener-upscaler/upload":"ИИ сервис для улучшения качества изображений",
      "https://huggingface.co/spaces/starvector/starvector-1b-im2svg":"Нейросеть для генерации SVG из любой картинки",
      "https://noowai.com/":"Бесплатный чат-бот и помощник, который может бесплатно общаться, отвечать на вопросы и помогать вам с работой",
      "https://chat.typegpt.net/":"Сервис предоставляет доступ к различным LLM, работает не во всех браузерах",
      "https://huggingface.co/spaces/enzostvs/deepsite":"Бесплатный аналог Cursor прямо в браузере",
      "https://auphonic.com/":"Бесплатная нейросеть, которая буквально спасает испорченные записи",
      "https://huggingface.co/spaces/jasperai/Flux.1-dev-Controlnet-Upscaler":"Сервис для повышения качества изображений",
      "https://huggingface.co/spaces/nightfury/Image_Face_Upscale_Restoration-GFPGAN":"Сервис для повышения качества изображений",
      "https://www.clear-background.com/remove-bg":"Сервис позволяет удалить фон у изображений",
      "https://gitmcp.io/":"Инструмент для разработчиков, который позволяет подключить свой репозиторий и работать с ним используя ИИ",
      "https://wordpress.com/ai-website-builder/":"ИИ создатель сайтов от известного конструктора WordPress",
      "https://firebase.studio/":"Новый сервис от компании Google для генерации приложений",
      "https://t.me/askplexbot":"Бот Perplexity в Телеграм",
      "https://o3minichat.exa.ai/":"Сервис предоставляет доступ к GPT-o3",
      "https://www.logopony.com/":"Бесплатный генератор логотипов с искусственным интеллектом, где вы можете создать пользовательский логотип для чего угодно всего за несколько кликов",
      "https://digma.ai/":"Инструмент анализа кода на основе ИИ, который дает разработчикам постоянную обратную связь для ускорения циклов разработки",
      "https://llmchat.co/chat":"Сервис позволяет общаться с различными LLM, имеет ограничение на 10 бесплатных запросов в день",
      "https://chat.sonus.ai/":"Сервис позволяет общаться с различными LLM от Sonus",
      "https://delve.a9.io/":"Сервис который помогает углубиться во все нюансы любой темы",
      "https://www.slazzer.com/":"Сервис для удаления фона у изображений",
      "https://chat.writingmate.ai/chat":"Сервис предоставляет доступ к различным LLM, есть бесплатный план с ограничениями",
      "https://fragments.e2b.dev/":"Сервис позволяет создавать свои приложения",
      "https://lightpdf.com/":"Сервис для работы с PDF, позволяет добавлять текст, рисовать и многое другое",
      "https://www.bohrium.com/":"Поисковая система с ИИ",
      "https://ayle.chat/":"Поисковая система с различными LLM, требуется регистрация, есть тёмная тема оформления",
      "https://onlook.com/":"Аналог Cursor для ДИЗАЙНЕРОВ, позволяет экономить время",
      "https://dxgpt.app/":"Microsoft выпустила чат-бота DxGPT для распознавания заболеваний по симптомам, для медосмотра нужно вбить пол, возраст и проблемы, которые вас беспокоят",
      "https://chat.aitopia.ai/":"Сервис предоставляет доступ к чату с LLM, генерации изображений и не только, ограничение на 10 запросов в день",
      "https://chat.z.ai/":"Китайская команда представила локальную модель GLM-4-32B, по уровню она спокойно держится рядом с Sonnet 3.5, но полностью автономна",
      "https://humanize-ai.click/":"Бесплатный сервис Humanize поможет пройти антиплагиат, убрав следы ИИ",
      "https://pad.ws/":"Сервис превращающий IDE в dashboard, требуется авторизация, есть тёмная тема оформления",
      "https://chat.mcpcore.xyz/":"Сервис предоставляет доступ к различным LLM, требуется авторизация, есть тёмная тема оформления",
      "https://www.spoonfeed.codes/":"Сервис превращает весь репозиторий или директорию проекта в код Markdown, есть ограничения, требуется авторизация",
      "https://svgartista.net/":"Анимируем свой логотип, иконки и любой другой SVG-файл",
      "https://golex.ai/":"ИИ платформа для создания сайтов, есть ограничения, требуется авторизация",
      "https://www.queryhub.ai/connections":"Чат-бот Queryhub, генерирует целые базы данных и проводит операции с таблицами и данными, требуется авторизация",
      "https://free-gemini.vercel.app/":"Сервис позволяет общаться с gemeni-2.0-flash",
      "https://app.youlearn.ai/":"ИИ-РЕПЕТИТОР, позволяет быстрее изучать новое, требуется авторизация",
      "https://spinbot.com/paraphrasing-tool":"Синонимайзер",
      "https://www.fluig.cc/home":"Сервис для создания диаграмм и не только из любого документа",
      "https://huggingface.co/spaces/nvidia/parakeet-tdt-0.6b-v2":"Модель для распознавания речи от Nvidia",
      "https://anara.com/":"Сервис для подробного ресёрча по любым задачам",
      "https://chatsandbox.com/characters":"Сервис предоставляет доступ к различным LLM, есть тёмная тема оформления",
      "https://beta.lmarena.ai/?mode=direct":"LLM арена, сервис предоставляет доступ к различным LLM",
      "https://puter.com/":"Виртуальный ПК",
      "https://lambda.chat/":"Сервис предоставляет доступ к множеству LLM",
      "https://www.eraser.io/ai":"Второй пилот технического проектирования, который способен оптимизировать рабочие процессы технического проектирования для разработчиков и инженерных команд",
      "https://demo.bagel-ai.org/":"Редактор фото с ИИ в виде чата",
      "https://www.scribbr.com/paraphrasing-tool/":"Синонимайзер и не только",
      "https://promptcatalyst.ai/":" ИИ для создания лучших концепт-артов, требуется авторизация",
      "https://search.exomlapi.com/":"Бесплатная поисковая система с ИИ и не только, есть тёмная тема оформления",
      "https://exomlapi.com/":"Сервис предоставляет бесплатный доступ к множеству LLM, есть тёмная тема оформления",
      "https://suno.exomlapi.com/":"Сервис предоставляет доступ к Suno 4.5, которая позвоялет генерировать музыку по запросу",
      "https://gpt1image.exomlapi.com/":"Сервис позволяет генерировать изображения по запросу",
      "https://runway.exomlapi.com/":"Сервис позволяет генерировать видео",
      "https://imagen.exomlapi.com/":"Сервис позволяет генерировать изображения по запросу",
      "https://www.youware.com/":"Генератор сайтов, приложений и чат с ИИ, требуется авторизация",
      "https://frendi.ai/":"Сервис позволяет пообщаться или создать своего персонажа на основе ИИ, требуется авторизация",
      "https://jpgrm.com/":"Сервис позволяет убрать лишние объекты с фото",
      "https://pixnova.ai/":"Сервис предоставляет множество функций для работы с изображениями и видео",
      "https://aurachat.io/":"Сервис позволяет сгенерировать интерфейс любого приложения с возможностью экспорта в FIGMA или HTML, есть бесплатный тариф, нужна авторизация",
      "https://animateai.pro/":"Сервис позволяет создавать анимации и видео с ИИ, есть бесплатный план, требуется авторизация",
      "https://www.eraser.io/ai/uml-diagram-generator":"Генератор UML диаграмм, требуется авторизация",
      "https://cascadeur.com/":"Сервис помогает создавать 3D фигуры и анимации, есть бесплатный план, требуется авторизация",
      "https://chat.xenai.tech/":"Сервис предоставляет доступ к различным LLM, есть тёмная тема оформления, требуется авторизация",
      "https://search.ai/":"Бесплатная поисковая система с ИИ, по умолчанию использует Claude-3.5",
      "https://askai.io/search":"Бесплатная поисковая система с ИИ, по умолчанию использует Claude-3 Haiku",
      "https://www.toolsmart.ai/feature-free-undetectable-ai/":"ИИ сервис для очеловечивания ИИ контента",
      "https://lipsync.video/":"Генератор коротких видео",
      "https://database.build/":"Сервис в котором можно запускать и тестировать PostgreSQL прямо в браузере",
      "https://huggingface.co/spaces/ByteDance/Dolphin":"OCR-модель Dolphin для распознавания любых PDF",
      "https://www.rocket.new/":"Генератор приложений и сайтов, требуется авторизация",
      "https://www.chatwithmono.xyz/":"Система предоставляет бесплатный доступ к различным LLM, поисковой системе с ИИ и генератору изображений",
      "https://www.alphaxiv.org/assistant":"Поисковая система с ИИ с функцией глубокого поиска, требудется авторизация",
      "https://gptkit.ai/":"Детектор ИИ контента",
      "https://www.director.ai/":"Это аналог Operator от OpenAI, который создаёт скрипты веб-автоматизации с помощью простых промтов",
      "https://www.minimax.io/audio/text-to-speech":"ИИ для клонирования голоса и генерации речи или музыки, требуется авторизация",
      "https://aicg.wisecleaner.com/":"Сервис предоставляет доступ к множеству LLM, требуется авторизация",
      "https://chat.minimax.io/":"Сервис предоставляет доступ к чату с ИИ, а также поддерживает режим агента, требуется авторизация",
      "https://resumly.ai/":"Генератор резюме под конкретную работу, есть бесплатный план, требуется авторизация",
      "https://hatchcanvas.com/":"В данном сервисе можно генерировать дизайны, приложения, сайты, макеты, презентации и тд",
      "https://upmash.fun/":"Сервис бесплатно объединяет две песни по выбору — достаточно загрузить их",
      "https://www.warp.dev/":"Приложение со встроенным ИИ агентом, есть бесплатный план на 150 запросов в месяц (запросы автоматизированы), требуется загрузка, установка и авторизация",
      "https://huggingface.co/spaces/Stable-X/Hi3DGen":"Сервис генерирует 3D модель по фото",
      "https://alphaxiv.org/assistant":"Агент ищет релевантные статьи по вашему запросу, анализирует их и помогает в исследованиях, работает с научными архивами, требуется авторизация",
      "https://www.publishstudio.one/creator-kit":"Различные инструменты для работы с изображениями, включая удаление фона",
      "https://www.wondera.ai/":"Аналог Suno, требуется авторизация",
      "https://deepguardtech.com/app":"Сервис анализирует каждый пиксель видео, проверяет метаданные и выдаёт подробный отчёт о вероятности GenAI, проверка на генерацию ИИ",
      "https://pdf2zh.com/":"Сервис для быстрого перевода PDF документов на различные языки",
      "https://ayesoul.com/":"Поисковая система с ИИ",
      "https://products.aspose.ai/total/":"Сервис предоставляет множество инструментов для работы с файлами",
      "https://legacy.lmarena.ai/":"LLM арена, сервис предоставляет доступ к множеству LLM",
      "https://godmode.space/":"Godmode — это инструмент для автоматизации повторяющихся задач и работы с данными",
      "https://examful.ai/app":"Сервис для помощи с задачами для школьников и студентов",
      "https://scispace.com/":"Поисковик с ИИ для учёных, находит статьи на разные темы",
      "https://www.superfile.ai/":"Множество полезных сервисов для работы с файлами",
      "https://www.orchids.app/":"Генератор сайтов и приложений, требуется авторизация",
      "https://transcribetext.com/":"Сервис, который превращает любое аудио или видео в текст, даже если там помехи",
      "https://app.twaingpt.com/":"Сервис для очеловечивания ИИ контента",
      "https://noiz.io/free-ai-tools/":"Сервис предоставляет множество полезных инструментов, ключая чат с файлами и тд",
      "https://huggingface.co/spaces/llamameta/Grok-4-heavy-free":"Сервис предоставляет доступ к LLM Grok-4 Heavy",
      "https://www.promptcannon.com/":"Сервис предоставляет жоступ к множеству LLM и позволяет получать ответ сразу от нескольких LLM, требуется регистрация",
      "https://www.onyx.app/":"Поисковый движок для рабочего места, основанный на искусственном интеллекте, который помогает быстро находить информацию в документах, приложениях и сотрудниках вашей компании",
      "https://qwq32.com/chat":"Сервис предоставляет доступ к различным LLM",
      "https://bothub.chat/qwen3-235b-a22b":"Сервис предоставляет доступ к различным LLM, ограничение 30000 токенов в день, регистрация не обязательна",
      "https://deep-seek-ai.ru/free-deepseek-chat/":"Сервис предоставляет доступ к различным LLM",
      "https://gpt-chatbot.ru/openai-o3-mini":"Сервис предоставляет доступ к различным LLM",
      "https://webos.live/":"Достаточно интересный проект операциионной системы с внедренным ИИ агентом, проект еще разрабатывается, некоторые функции могут не работать",
      "https://huggingface.co/spaces/Qwen/Qwen3-MT-Demo":"Переводчик от Qwen",
      "https://pollinations.ai/":"Бесплатный сервис, который предоставляет доступ к различным LLM, доступ к генерации фото и чату можно получить сразу на главной странице",
      "https://writify.ai/tool/":"Множество бесплатных инструментов с ИИ",
      "https://faces.app/":"Генератор сайтов",
      "https://www.waveterm.dev/":"Продвинутый терминал для разработчиков с интегрированным браузером и ИИ",
      "https://cline.bot/":"Расширения для VS Code и других платформ, которое позволяет подключать ИИ агентов",
      "https://addons.mozilla.org/en-US/firefox/addon/polination-ai-chat/":"Бесплатное расширение, которое позволяет взаимодействовать с API Polinations AI, данное расширение для Firefox",
      "https://github.com/Processori7/Poli_Sidebar":"Бесплатное расширение, которое позволяет взаимодействовать с API Polinations AI, данное расширение для Chrome",
      "https://qoder.com/download":"Среда разработки с интегрированными функциями ИИ, в месяц доступно 2000 запросов (модель выбирается автоматически), доступен Agent mode, необходима установка и авторизация",
      "https://windsurf.com/download":"Среда разработки с интегрированными функциями ИИ, есть несколько моделей на выбор, бесплатный тариф ограничен 25 запросами в месяц, доступен Agent mode, необходима установка и авторизация",
      "https://www.trae.ai/":"Среда разработки с интегрированными функциями ИИ, есть несколько моделей на выбор, бесплатный тариф ограничен 1060 запросами в месяц, доступен Agent mode, необходима установка и авторизация",
      "https://qwenlm.github.io/blog/qwen3-coder/":"ИИ агент который устанавливается на ПК и вызывается в терминале с помощью команды: qwen, для быстрой установки рекомендуется выполнить команду: npm install -g @qwen-code/qwen-code@latest, требуется авторизация",
      "https://www.chatslide.ai/#features":"Сервис предоставляет доступ к нескольким инструментам ИИ, включая: PPTX в видео, создание карточек из текста, клонирование голоса и так далее, требуется авторизация, бесплатно доступен GPT-3 и 100 кредитов для задач",
      "https://huggingface.co/spaces/Qwen/Qwen-Image":"Новая бесплатная генеративная модель Qwen Image выдаёт как гиперреалистичные фото, так и стильные постеры, арты и даже полноценные страницы комиксов",
      "https://www.trydoco.com/#Pricing":"DOCO сочетает в себе Grammarly, Google Translate, Co-Pilot и многое другое для работы с текстом и документами, бесплатный план ограничен, требуется регистрация",
      "https://www.zeroregai.com":"Сервис предоставляет бесплатный доступ к множеству LLM",
      "https://www.design.com/ai-logo-generator":"Сервис включает в себя множество инструментов с ИИ, требуется авторизация",
      "https://www.wolframalpha.com/":"Сервис для решения математических задач",
      "https://www.kimi.com/kimiplus/cvvm7bkheutnihqi2100":"Генератор презентаций от Kimi AI, требуется авторизация",
      "https://revast.xyz/":"Сервис для создания интерактивных учебников, есть бесплатный план, требуется авторизация",
      "https://Kira.art":"Сервис для работы с изображениями, есть бесплатный план, требуется авторизация",
      "https://ebank.nz/aiartgenerator":"Бесплатный сервис для генерации изображений, поддерживает различные стили",
      "https://www.texttospeechpro.com/tts":"Сервис для озвучивания текста",
      "https://x-minus.pro/ai":"Сервис предлагает набор аудиоинструментов с ИИ",
      "https://postspark.app/screenshot":"Сервис в котором можно быстро собрать красивый дизайн, макет или скриншот проекта",
      "https://processor.alwaysdata.net/":"Сайт с бесплатными сервисами с ИИ, теперь расширение будет с Вами всегда",
      "https://www.zeroregai.com/":"Сервис предоставляет доступ к нескольким LLM"
  };   

function applyTheme(backgroundColor, textColor, liColor, liTextColor, tooltipBgColor, fontFamily, headingFontSize, itemFontSize, tooltipFontSize) { 
  try {
    // Применяем основные цвета
    if (document.body) {
      document.body.style.backgroundColor = backgroundColor;
      document.body.style.fontFamily = fontFamily || "'Droid serif', serif";
    }
    
    const h1Elements = document.querySelectorAll('h1');
    h1Elements.forEach(h1 => {
      if (h1) {
        h1.style.color = textColor;
        h1.style.fontFamily = fontFamily || "'Droid serif', serif";
        h1.style.fontSize = (headingFontSize || 32) + 'px';
      }
    });

    // Цвета элементов списка
    const listItems = document.querySelectorAll('.aiMenu li');
    listItems.forEach(li => {
      if (li) {
        li.style.backgroundColor = liColor;
        li.style.color = liTextColor;
        li.style.fontFamily = fontFamily || "'Droid serif', serif";
        li.style.fontSize = (itemFontSize || 16) + 'px';
      }
    });

    // Обновляем фон для theme-settings и header-dropdown-item
    const themeSettings = document.querySelector('.theme-settings');
    const themeSettingsTitle = document.getElementById('theme-settings-title');
    const headerDropdownItems = document.querySelectorAll('.header-dropdown-item');
    
    if (themeSettings) {
      themeSettings.style.backgroundColor = liColor;
      themeSettings.style.color = textColor;
      themeSettings.style.fontFamily = fontFamily || "'Droid serif', serif";
    }
    
    if (themeSettingsTitle) {
      themeSettingsTitle.style.color = textColor;
      themeSettingsTitle.style.fontFamily = fontFamily || "'Droid serif', serif";
      themeSettingsTitle.style.fontSize = (headingFontSize || 32) + 'px';
    }
    
    headerDropdownItems.forEach(item => {
      if (item) {
        item.style.backgroundColor = liColor;
        item.style.color = textColor;
        item.style.fontFamily = fontFamily || "'Droid serif', serif";
        item.style.fontSize = (itemFontSize || 16) + 'px';
      }
    });

    // Адаптируем цвета меню
    const headerDropdownMenu = document.getElementById('header-dropdown-menu');
    const themeDropdownMenu = document.getElementById('theme-dropdown-menu');
    const themeMenuToggle = document.getElementById('theme-menu-toggle');
    const headerMenuToggle = document.getElementById('header-menu-toggle');
    const menuLabel = document.querySelector('.menu-label');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const searchInput = document.getElementById('searchInput');

    // Применяем стили к выпадающему меню настроек
    if (dropdownMenu) {
      dropdownMenu.style.backgroundColor = backgroundColor;
      dropdownMenu.style.color = textColor;
      dropdownMenu.style.fontFamily = fontFamily || "'Droid serif', serif";
    }

    // Применяем стили к элементам выпадающего меню
    dropdownItems.forEach(item => {
      if (item) {
        item.style.backgroundColor = liColor;
        item.style.color = textColor;
        item.style.fontFamily = fontFamily || "'Droid serif', serif";
        item.style.fontSize = (itemFontSize || 16) + 'px';
      }
    });

    // Стилизуем кнопку меню настроек
    if (menuLabel) {
      menuLabel.style.backgroundColor = liColor;
      menuLabel.style.color = textColor;
      menuLabel.style.fontFamily = fontFamily || "'Droid serif', serif";
    }

    if (headerMenuToggle) {
      headerMenuToggle.style.backgroundColor = liColor;
      headerMenuToggle.style.color = textColor;
      headerMenuToggle.style.fontFamily = fontFamily || "'Droid serif', serif";
    }
    if (themeMenuToggle) {
      themeMenuToggle.style.backgroundColor = liColor;
      themeMenuToggle.style.color = textColor;
      themeMenuToggle.style.fontFamily = fontFamily || "'Droid serif', serif";
    }
    
    if (headerDropdownMenu) {
      headerDropdownMenu.style.backgroundColor = backgroundColor;
      headerDropdownMenu.style.color = textColor;
      headerDropdownMenu.style.fontFamily = fontFamily || "'Droid serif', serif";
    }
    
    if (themeDropdownMenu) {
      themeDropdownMenu.style.backgroundColor = backgroundColor;
      themeDropdownMenu.style.color = textColor;
      themeDropdownMenu.style.fontFamily = fontFamily || "'Droid serif', serif";
    }

    // Применяем стили к поисковому полю
    if (searchInput) {
      searchInput.style.backgroundColor = liColor;
      searchInput.style.color = textColor;
      searchInput.style.borderColor = liColor;
      searchInput.style.fontFamily = fontFamily || "'Droid serif', serif";
      searchInput.style.fontSize = (itemFontSize || 16) + 'px';
    }

    // Применяем стили к подсказкам
    const searchSuggestions = document.getElementById('searchSuggestions');
    if (searchSuggestions) {
      searchSuggestions.style.backgroundColor = backgroundColor;
      searchSuggestions.style.borderColor = liColor;
      searchSuggestions.style.fontFamily = fontFamily || "'Droid serif', serif";
    }

    const suggestionItems = document.querySelectorAll('.suggestion-item');
    suggestionItems.forEach(item => {
      if (item) {
        item.style.color = textColor;
        item.style.fontFamily = fontFamily || "'Droid serif', serif";
        item.style.fontSize = (itemFontSize || 16) + 'px';
      }
    });

    // Применяем стили к всплывающим подсказкам (tooltips)
    const popup = document.querySelector('.popup');
    if (popup) {
      popup.style.backgroundColor = tooltipBgColor || '#333';
      popup.style.fontFamily = fontFamily || "'Droid serif', serif";
      popup.style.fontSize = (tooltipFontSize || 14) + 'px';
    }

    // Применяем стили к лейблам в настройках темы
    const themeLabels = document.querySelectorAll('.theme-settings label, .theme-settings .translate-text');
    themeLabels.forEach(label => {
      if (label) {
        label.style.fontFamily = fontFamily || "'Droid serif', serif";
        label.style.fontSize = (itemFontSize || 16) + 'px';
        label.style.color = textColor;
      }
    });

    // Применяем стили к значениям размеров шрифтов
    const fontSizeValues = document.querySelectorAll('#headingFontSizeValue, #itemFontSizeValue, #tooltipFontSizeValue');
    fontSizeValues.forEach(value => {
      if (value) {
        value.style.fontFamily = fontFamily || "'Droid serif', serif";
        value.style.fontSize = (itemFontSize || 16) + 'px';
        value.style.color = textColor;
      }
    });

    // Применяем стили к кнопке сброса
    const resetButton = document.getElementById('resetTheme');
    if (resetButton) {
      resetButton.style.fontFamily = fontFamily || "'Droid serif', serif";
      resetButton.style.fontSize = (itemFontSize || 16) + 'px';
    }

    // Сохраняем текущую тему
    const currentTheme = {
      backgroundColor,
      textColor,
      liColor,
      liTextColor,
      tooltipBgColor: tooltipBgColor || '#333',
      fontFamily: fontFamily || "'Droid serif', serif",
      headingFontSize: headingFontSize || 32,
      itemFontSize: itemFontSize || 16,
      tooltipFontSize: tooltipFontSize || 14
    };
    saveTheme(currentTheme);

  } catch (error) {
    console.error('Ошибка применения темы:', error);
  }
}

// Функция сохранения темы
function saveTheme(theme) {
  try {
    localStorage.setItem('customTheme', JSON.stringify(theme));
    console.log('Тема сохранена:', theme);
  } catch (error) {
    console.error('Ошибка сохранения темы:', error);
  }
}

// Функция загрузки темы
function loadTheme() {
  try {
    const savedTheme = JSON.parse(localStorage.getItem('customTheme')) || defaultTheme;
    
    // Применяем цвета
    applyTheme(
      savedTheme.backgroundColor, 
      savedTheme.textColor, 
      savedTheme.liColor,
      savedTheme.liTextColor,
      savedTheme.tooltipBgColor,
      savedTheme.fontFamily,
      savedTheme.headingFontSize,
      savedTheme.itemFontSize,
      savedTheme.tooltipFontSize
    );

    // Обновляем значения color picker и других элементов
    const bgColorPicker = document.getElementById('bgColorPicker');
    const textColorPicker = document.getElementById('textColorPicker');
    const liColorPicker = document.getElementById('liColorPicker');
    const liTextColorPicker = document.getElementById('liTextColorPicker');
    const tooltipBgColorPicker = document.getElementById('tooltipBgColorPicker');
    const fontFamilySelect = document.getElementById('fontFamilySelect');
    const headingFontSize = document.getElementById('headingFontSize');
    const itemFontSize = document.getElementById('itemFontSize');
    const tooltipFontSize = document.getElementById('tooltipFontSize');
    const headingFontSizeValue = document.getElementById('headingFontSizeValue');
    const itemFontSizeValue = document.getElementById('itemFontSizeValue');
    const tooltipFontSizeValue = document.getElementById('tooltipFontSizeValue');

    if (bgColorPicker) bgColorPicker.value = savedTheme.backgroundColor;
    if (textColorPicker) textColorPicker.value = savedTheme.textColor;
    if (liColorPicker) liColorPicker.value = savedTheme.liColor;
    if (liTextColorPicker) liTextColorPicker.value = savedTheme.liTextColor;
    if (tooltipBgColorPicker) tooltipBgColorPicker.value = savedTheme.tooltipBgColor || '#333';
    if (fontFamilySelect) fontFamilySelect.value = savedTheme.fontFamily || "'Droid serif', serif";
    if (headingFontSize) {
      headingFontSize.value = savedTheme.headingFontSize || 32;
      if (headingFontSizeValue) headingFontSizeValue.textContent = (savedTheme.headingFontSize || 32) + 'px';
    }
    if (itemFontSize) {
      itemFontSize.value = savedTheme.itemFontSize || 16;
      if (itemFontSizeValue) itemFontSizeValue.textContent = (savedTheme.itemFontSize || 16) + 'px';
    }
    if (tooltipFontSize) {
      tooltipFontSize.value = savedTheme.tooltipFontSize || 14;
      if (tooltipFontSizeValue) tooltipFontSizeValue.textContent = (savedTheme.tooltipFontSize || 14) + 'px';
    }

    return savedTheme;
  } catch (error) {
    console.error('Ошибка загрузки темы:', error);
    return defaultTheme;
  }
}

// Навешиваем обработчики событий сразу
function initializeThemeListeners() {
  const bgColorPicker = document.getElementById('bgColorPicker');
  const textColorPicker = document.getElementById('textColorPicker');
  const liColorPicker = document.getElementById('liColorPicker');
  const liTextColorPicker = document.getElementById('liTextColorPicker');
  const tooltipBgColorPicker = document.getElementById('tooltipBgColorPicker');
  const fontFamilySelect = document.getElementById('fontFamilySelect');
  const headingFontSize = document.getElementById('headingFontSize');
  const itemFontSize = document.getElementById('itemFontSize');
  const tooltipFontSize = document.getElementById('tooltipFontSize');
  const headingFontSizeValue = document.getElementById('headingFontSizeValue');
  const itemFontSizeValue = document.getElementById('itemFontSizeValue');
  const tooltipFontSizeValue = document.getElementById('tooltipFontSizeValue');
  const resetThemeBtn = document.getElementById('resetTheme');

  function updateTheme() {
    applyTheme(
      bgColorPicker ? bgColorPicker.value : defaultTheme.backgroundColor,
      textColorPicker ? textColorPicker.value : defaultTheme.textColor,
      liColorPicker ? liColorPicker.value : defaultTheme.liColor,
      liTextColorPicker ? liTextColorPicker.value : defaultTheme.liTextColor,
      tooltipBgColorPicker ? tooltipBgColorPicker.value : defaultTheme.tooltipBgColor,
      fontFamilySelect ? fontFamilySelect.value : defaultTheme.fontFamily,
      headingFontSize ? headingFontSize.value : defaultTheme.headingFontSize,
      itemFontSize ? itemFontSize.value : defaultTheme.itemFontSize,
      tooltipFontSize ? tooltipFontSize.value : defaultTheme.tooltipFontSize
    );
  }

  if (bgColorPicker) {
    bgColorPicker.addEventListener('change', updateTheme);
  }

  if (textColorPicker) {
    textColorPicker.addEventListener('change', updateTheme);
  }

  if (liColorPicker) {
    liColorPicker.addEventListener('change', updateTheme);
  }

  if (liTextColorPicker) {
    liTextColorPicker.addEventListener('change', updateTheme);
  }

  if (tooltipBgColorPicker) {
    tooltipBgColorPicker.addEventListener('change', updateTheme);
  }

  if (fontFamilySelect) {
    fontFamilySelect.addEventListener('change', updateTheme);
  }

  if (headingFontSize) {
    headingFontSize.addEventListener('input', (e) => {
      if (headingFontSizeValue) headingFontSizeValue.textContent = e.target.value + 'px';
      updateTheme();
    });
  }

  if (itemFontSize) {
    itemFontSize.addEventListener('input', (e) => {
      if (itemFontSizeValue) itemFontSizeValue.textContent = e.target.value + 'px';
      updateTheme();
    });
  }

  if (tooltipFontSize) {
    tooltipFontSize.addEventListener('input', (e) => {
      if (tooltipFontSizeValue) tooltipFontSizeValue.textContent = e.target.value + 'px';
      updateTheme();
    });
  }

  // Кнопка сброса темы
  if (resetThemeBtn) {
    resetThemeBtn.addEventListener('click', () => {
      applyTheme(
        defaultTheme.backgroundColor, 
        defaultTheme.textColor, 
        defaultTheme.liColor,
        defaultTheme.liTextColor,
        defaultTheme.tooltipBgColor,
        defaultTheme.fontFamily,
        defaultTheme.headingFontSize,
        defaultTheme.itemFontSize,
        defaultTheme.tooltipFontSize
      );
      // Обновляем значения контролов
      if (bgColorPicker) bgColorPicker.value = defaultTheme.backgroundColor;
      if (textColorPicker) textColorPicker.value = defaultTheme.textColor;
      if (liColorPicker) liColorPicker.value = defaultTheme.liColor;
      if (liTextColorPicker) liTextColorPicker.value = defaultTheme.liTextColor;
      if (tooltipBgColorPicker) tooltipBgColorPicker.value = defaultTheme.tooltipBgColor;
      if (fontFamilySelect) fontFamilySelect.value = defaultTheme.fontFamily;
      if (headingFontSize) {
        headingFontSize.value = defaultTheme.headingFontSize;
        if (headingFontSizeValue) headingFontSizeValue.textContent = defaultTheme.headingFontSize + 'px';
      }
      if (itemFontSize) {
        itemFontSize.value = defaultTheme.itemFontSize;
        if (itemFontSizeValue) itemFontSizeValue.textContent = defaultTheme.itemFontSize + 'px';
      }
      if (tooltipFontSize) {
        tooltipFontSize.value = defaultTheme.tooltipFontSize;
        if (tooltipFontSizeValue) tooltipFontSizeValue.textContent = defaultTheme.tooltipFontSize + 'px';
      }
    });
  }
}

const defaultTheme = {
  backgroundColor: '#a1a1a1',
  textColor: '#ffde22',
  liColor: '#70040e',
  liTextColor: '#ffffff',
  tooltipBgColor: '#333333',
  fontFamily: "'Droid serif', serif",
  headingFontSize: 32,
  itemFontSize: 16,
  tooltipFontSize: 14
};

  // Проверяем обновления при загрузке страницы
  checkForUpdates();
  loadTheme();
  // Навешиваем обработчики
  initializeThemeListeners();
  initializePage();
  initializePopup();
  countElements();
  hideBlockedServices();
  // Проверяем, существует ли элемент 'translatedDescriptions' в localStorage
  if (!userLang.startsWith('ru'))
    {
        if (!localStorage.getItem('translatedDescriptions') !== null && advancedSearch.checked) {
            translate_and_write_desc();
        }
    } 
});