document.addEventListener("DOMContentLoaded", function () {
  const openInNewTab = document.getElementById("openInNewTab");
  const dropdownMenu = document.getElementById('dropdown-menu');
  const searchInput = document.getElementById('searchInput');
  const userLang = navigator.language || navigator.userLanguage; 
  const items = document.querySelectorAll('.aiMenu li'); // Получаем все элементы li из всех списков
  const favoriteCheckbox =  document.getElementById("favoriteCheckbox");
  const scrollToElement = document.getElementById("scrollToElement");

  // Флаг для отслеживания, добавлены ли чекбоксы
  let checkboxesAdded = false;
  let isMenuVisible = false; // Флаг для отслеживания состояния меню
  let originalContent; // Сохраняем оригинальное содержимое
  let currentWebsite = null;
  let originalOrder = []; // Массив для хранения исходного порядка элементов

  currentWebsite = localStorage.getItem('currentWebsite'); // Загружаем из localStorage
  
  function updateScrollToElementState() {
    localStorage.setItem("scrollToElement", scrollToElement.checked);
    console.log('Сохраненное значение:', localStorage.getItem("scrollToElement"));
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
    const itemsArray = Array.from(items);
    originalOrder = itemsArray.map(item => item.getAttribute('data-website'));
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

  // Поиск
  searchInput.addEventListener('input', function() {
      const filter = searchInput.value.toLowerCase();

      items.forEach(item => {
          const text = item.textContent || item.innerText;

          if (text.toLowerCase().indexOf(filter) > -1) {
              item.style.display = ""; // Показываем элемент
          } else {
              item.style.display = "none"; // Скрываем элемент
          }
      });
  });

  if (userLang.startsWith('ru')) {
      openInNewTab.nextSibling.textContent = 'Открывать сайты в новой вкладке.';
      searchInput.placeholder = 'Поиск...';
      favoriteCheckbox.nextSibling.textContent = 'Добавить в избранное';
      const aiChat = document.getElementById("aiChat");
      aiChat.innerText = "Бесплатный чат с ИИ";
      const aiScripts = document.getElementById("aiScripts");
      aiScripts.innerText="Бесплатные GPT скрипты помощники для поисковых систем";
      const aiPC = document.getElementById("aiPC");
      aiPC.innerText="Бесплатный GPT на ПК с Windows";
      const aiArticle = document.getElementById("aiArticle");
      aiArticle.innerText="Бесплатный генератор статей";
      const aiImage = document.getElementById("aiImage");
      aiImage.innerText="Бесплатные сервисы для работы с изображениями";
      const aiVideo = document.getElementById("aiVideo");
      aiVideo.innerText="Бесплатные сервисы для работы с видео";
      const aiPresentation = document.getElementById("aiPresentation");
      aiPresentation.innerText="Бесплатные сервисы для генерации презентаций";
      const aiSound = document.getElementById("aiSound");
      aiSound.innerText="Бесплатные сервисы для работы со звуком";
      const aiTODO = document.getElementById("aiTODO");
      aiTODO.innerText="Бесплатные сервисы для планирования";
      const aiOther = document.getElementById("aiOther");
      aiOther.innerText="Другие бесплатные сервисы с ИИ";
      const scrollToElement = document.getElementById("scrollToElement");
      scrollToElement.nextSibling.textContent="Прокручивать к последнему выбранному элементу";
  }

  openInNewTab.checked = JSON.parse(localStorage.getItem("openInNewTab")) || false;

  function updateCheckboxState() {
      localStorage.setItem("openInNewTab", openInNewTab.checked);
  }
  openInNewTab.addEventListener("change", updateCheckboxState);

  function initializePage() {
    saveOriginalOrder()
    // Сохраняем оригинальное содержимое
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
            //filters
            let blockSites = ["https://duck.ai/", "https://www.phind.com", "https://www.perplexity.ai/", 
                "https://chat.tune.app/", "https://labs.perplexity.ai/", "https://huggingface.co/spaces/Qwen/Qwen2-72B-Instruct",
                "https://you.com/search?q=hi&fromSearchBar=true&tbm=youchat", "hhttps://finechat.ai/ru/app", "https://iask.ai/", 
                "https://chatgptchatapp.com", "https://chat.tune.app/", "https://chat.chatgptdemo.net", "https://promptboom.com/PowerChat/PowerChatTalk",
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
                "https://github.com/ToonCrafter/ToonCrafter"];
                if (openInNewTab.checked) {
                    window.open(website, '_blank');
                } else {
                    if (blockSites.includes(website)) {
                        let answer = userLang.startsWith('ru') 
                            ? confirm("Внимание! Этот сайт не может быть открыт в боковой панели, открыть его в новой вкладке?")
                            : confirm("Attention! This site can't be opened in the sidebar, should I open it in a new tab?");
                        if (answer) {
                            window.open(website, '_blank');
                        }
                    } else {
                        // Скрываем оригинальное содержимое и создаем iframe
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

    function initializePopup() {
        var aiMenuItems = document.querySelectorAll('.aiMenu li');
        var popup = document.createElement('div');
        popup.classList.add('popup');
        document.body.appendChild(popup); // Добавляем popup в body один раз
    
        var descriptions = (userLang.startsWith('ru')) ? websiteDescriptionsRu : websiteDescriptionsEn;
    
        aiMenuItems.forEach(function(item) {
            item.addEventListener('mouseover', function(event) {
                var website = this.getAttribute('data-website');
                if (descriptions.hasOwnProperty(website)) {
                    var description = descriptions[website];
                    popup.textContent = description;
    
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

var websiteDescriptionsEn = {
  "https://duck.ai/": "Free: Claude3 Hiku, GPT-4o-mini, Llama3.1 70B, Mixtral 8x7B",
  "https://thinkany.ai/": "Free: Claude 3 Haiku, GPT-4o-mini, Gemeni Flash 1.5. There is a dark theme on the site. Need login.",
  "https://www.phind.com": "Phind LLM. Free Search Engine. There is a dark theme on the site.",
  "https://www.prefind.ai/": "Free search engine, available models: Llama 3, Claude 3",
  "https://www.blackbox.ai/": "Free: BlackBox AI LLM. There is a dark theme on the site.",
  "https://www.perplexity.ai/": "Perplexity Ai. Free search engine. There is a dark theme on the site.",
  "https://chat.tune.app/": "Free: Llama 3.1 405B, Llama 3.1 8B, Llama 3 70B, Mixtral 8x7B, Tune wizardlm 2 8x22B, Tune mythomax l2 13B. Other LLMs are available after registration. There is a dark theme on the site.",
  "https://labs.perplexity.ai/": "Free: Llama 3.1 70B, Llama 3.1 8B, Gemma-2 9B, Gemma-2 27B, Mixtral 8x7B. There is a dark theme on the site.",
  "https://jeeves.ai/": "Free search engine, available models: Jeeves LLM. There is a dark theme on the site.",
  "https://bagoodex.io/": "Free search engine. Free LLM: GPT-4o, BaGooDex chat, and other tools. There is a dark theme on the site.",
  "https://www.aiuncensored.info": "Free GPT-3.5. There is a dark theme on the site.",
  "https://huggingface.co/spaces/Qwen/Qwen2-72B-Instruct": "Free: Qwen2-72B-Instruct",
  "https://chat.tinycms.xyz:3002/#/chat": "GPT-4 and other model free, but have limit. There is a dark theme on the site.",
  "https://you.com/search?q=hi&fromSearchBar=true&tbm=youchat": "Free: You Chat LLM, GPT-4o (have limit). There is a dark theme on the site.",
  "https://finechat.ai/ru/app": "Free GPT-4o (have limit)",
  "https://gpt-4o.biz/playground": "Free: GPT-4o (have limit)",
  "https://gpt4o.so/ru/app": "GPT4o (have limit)",
  "https://iask.ai/": "Free search engine and other AI tools.",
  "https://www.popai.pro/": "Free GPT and other AI tools, but need login and this service have limit.",
  "https://useadrenaline.com/": "Free AI for programmers, allows you to analyze repositories on GitHub",
  "https://gpt.h2o.ai/": "Free LLM.",
  "https://chat.lmsys.org/": "Large platform for testing various AIs. Some have limits. The site has a dark theme, and it is also possible to use several LLMs at the same time.",
  "https://chat.deepseek.com/": "AI for programmers, great at writing code, but registration required.",
  "https://chatgate.ai/gpt4/": "Free: ChatGPT-4 and other tool, but have limit.",
  "https://agentgpt.reworkd.ai/ru": "This is a service that can find solutions to your problems. Just write what you need and he will offer options. Registration required. There is a dark theme on the site.",
  "https://smartbuddy.ru/models/gpt-4-omni": "Free GPT-4o, have limit.",
  "https://andisearch.com/": "Free search engine.",
  "https://anonchatgpt.com/": "Free GPT-3.5. There is a dark theme on the site.",
  "https://aoyo.ai/": "Free Search Engine.",
  "https://pi.ai/talk": "Free AI Assistent.",
  "https://gpt-chatbot.ru/chat-gpt-ot-openai-dlya-generacii-teksta": "Free:ChatBot",
  "https://devv.ai/": "AI for programmers, includes chat with LLM: Gemeni 1.5 and Claude 3, (registration required), Web search and work with GitHub, but need login.",
  "https://huggingface.co/spaces/THUDM/CodeGeeX": "Free Codex LLM for programmers.",
  "https://www.cleeai.com/": "Free search engine, have limit, need login.",
  "https://app.anakin.ai/discover": "Many LLM and AI tools, the site has a dark theme, have a limit.",
  "https://chatgptchatapp.com": "Free GPT-3.5.",
  "https://character.ai": "Free personalized chat, need login.",
  "https://chat.chatgptdemo.net": "GPT 3.5 Turbo. Free limit 15 qv.",
  "https://leingpt.ru/chat/": "Free GPT, doesn't work with ad blocker. The site has a dark theme, have a limit.",
  "https://promptboom.com/PowerChat/PowerChatTalk": "Free AI services, but need registration and have limit.",
  "https://pbot2.bus1.skybyte.me/#/chat/1002": "Free Chat, but not SSL certificate.",
  "https://chataibot.ru/app/free-chat": "Free Chat (GPT-3.5 Turbo). ",
  "https://chat.mistral.ai/chat": "Free Chat Mistral ( need login)",
  "https://yep.com/chat/": "Free Yep search and chat.",
  "https://share.wendaalpha.net": "Free GPT-4o, the site has a dark theme, but answer only on China",
  "https://groq.com/": "Free chat",
  "https://ya.ru/": "Free Yandex GPT",
  "https://talkai.info/ru/": "Free Gpt-3.5, have limit, the site has a dark theme.",
  "https://ai.mitup.ru/chatgpt-free": "Free chat",
  "https://www.anytopic.io": "Free Claude models, but need registration.",
  "https://codepal.ai/": "Free chat, but need login",
  "https://t.me/EdyaAIrobot": "Free chat bot in Telegram",
  "https://github.com/KudoAI/googlegpt": "Integrates GPT Chat into the search engine. For correct operation, I recommend enabling the API mod in the settings.",
  "https://github.com/KudoAI/duckduckgpt": "Integrates GPT Chat into the search engine. For correct operation, I recommend enabling the API mod in the settings.",
  "https://github.com/KudoAI/bravegpt": "Integrates GPT Chat into the search engine. For correct operation, I recommend enabling the API mod in the settings.",
  "https://github.com/Processori7/llm/releases":"This is a program that allows you to use various LLMs for free. Attention: Windows Defender may trigger.",
  "https://aibro.io/article/":"This is a free article generator, just enter a topic",
  "https://dezgo.com/":"Free image generator, many models available",
  "https://perchance.org/ai-text-to-image-generator":"Free image generator",
  "https://fusionbrain.ai/":"Free image and video generator. Use Kandinsky model. Need login.",
  "https://shedevrum.ai/text-to-image/":"Free image generator from Yandex. Need login.",
  "https://ideogram.ai/":"Free image generator, need login.",
  "https://dall-e-2.ru/":"Free image generator",
  "https://www.craiyon.com/":"Free image generator, generates a picture and shows similar ones.",
  "https://stabledifffusion.com/":"Free image generator",
  "https://dreamlike.art/create":"Free image generator, but need login.",
  "https://huggingface.co/spaces/gokaygokay/Kolors":"Free image generator",
  "https://magnific.ai/":"A service that improves photo quality using AI algorithms. Need login.",
  "https://dewatermark.ai/ru":"A service that doubles any watermark.",
  "https://magic-eraser.ai":"With Imgedit AI eraser, you can remove unwanted objects from your photos online free in seconds!",
  "https://huggingface.co/spaces/ehristoforu/dalle-3-xl-lora-v2":"Free image generator Dalle-3.",
  "https://ru.aiseesoft.com/watermark-remover-online/#":"A service that doubles any watermark.",
  "https://remaker.ai/en":"The service changes faces in photos.",
  "https://huggingface.co/spaces/stabilityai/stable-diffusion-3-medium":"Free image generator Stable-diffusion-3-medium.",
  "https://huggingface.co/spaces/mukaist/DALLE-4K":"Free image generator DALLE-4K",
  "https://picwish.com/photo-enhancer":"The service improves photo quality.",
  "https://www.artguru.ai/":"A free image generator, without registration, with the ability to choose a style.",
  "https://www.veed.io/":"Free video generator. Need login.",
  "https://app.runwayml.com/":"Free video generator. Need login.",
  "https://videodubber.ai/":"Free video generator. Need login.",
  "https://www.typeframes.com/":"Free video generator. Need login.",
  "https://maestra.ai/tools/video-translator":"Free video translator. Need login.",
  "https://pika.art/login":"Free video generator. Need login.",
  "https://www.genmo.ai/":"Free video generator. Need login.",
  "https://huggingface.co/spaces/KwaiVGI/LivePortrait":"A service that allows you to bring portraits to life.",
  "https://ltx.studio":"Free video generator. Need login. Demo.",
  "https://www.hedra.com/":"Free video generator. Need login.",
  "https://gamma.app/":"Free presentation generator. Need login.",
  "https://slidesgo.com/":"Free presentation generator. Need login.",
  "https://www.crystalsound.ai/":"CrystalSound: Your Smart Noise Cancelling App and Screen Recorder. Free, but need login.",
  "https://diktatorial.com/":"Online AI Mastering Tool for Audio & Music | DIKTATORIAL Suite. Free, but need login.",
  "https://huggingface.co/spaces/Xenova/whisper-webgpu":"Free audio translator in real time.",
  "https://elevenlabs.io/":"Free audio services. Need login.",
  "https://hidola.ai/en":"Free TODO service. Need login.",
  "https://simplified.com/":"Free TODO service. Need login.",
  "https://huggingface.co/spaces/TencentARC/PhotoMaker-Style":"Avatar generation service. Throw in a few of your photos, write a prompt, choose a style and you're done.",
  "https://app.scenario.com/upscale":"Scenario is a tool for creating game characters using AI",
  "https://easywithai.com/tools/vidiq":"It is a growth tool for YouTube creators that now has AI features.",
  "https://www.noota.io/":"A neural network that squeezes out of any meeting, including conferences, voice messages, and podcasts.",
  "https://smartbuddy.ru/models/gpt-4o-mini":"Chat with GPT-4o-mini.",
  "https://websim.ai/":"The AI will answer the questions and also create anything! All versions of Claude and GPT-4o are available, but registration is required.",
  "https://spline.design/":"Neural network 3D model generator right in the browser. Registration is required.",
  "https://mojo-app.com/ai":"AI for logo animation.",
  "https://www.fontspace.com/":"The service for designers is 120 thousand fonts in one place, free of charge. There is also a generator and an automated search inside.",
  "https://huggingface.co/spaces/Xenova/whisper-word-level-timestamps":"Neural will quickly and free of charge distill the video into text. The service works directly in the browser. Throw in the source and get a transcript.",
  "https://huggingface.co/spaces/gokaygokay/Tile-Upscaler":"A neural network that allows you to enhance blurry photos right in your browser. A free analogue of Upscayl with a maximum magnification of 20x.",
  "https://github.com/Anjok07/ultimatevocalremovergui/releases":"The AI service will separate the music from the vocals and divide the track into separate tracks. The service is completely free of charge and allows you to squeeze out of musical compositions.",
  "https://huggingface.co/spaces/yizhezhu/MoMA_zeroGPU":"AI will generate a picture from another image for free. You will get quality work based on another. Write a prompt, throw in a reference and get the result. Everything can be customized for yourself, the neural network has a flexible editor.",
  "https://klingai.com/":"Kling creates cool videos and prompt images",
  "https://www.gling.ai/":"Gling is a neural network for novice bloggers. It will be able to remove the words parasites, pauses, and other sounds that spoil the content. Greatly simplify installation and save a lot of time.",
  "https://www.superupscaler.com/":"The service will quickly improve the quality of images right in the browser. You just need to throw in the source.",
  "https://huggingface.co/spaces/lllyasviel/IC-Light":"The service based on a neural network is able to determine how and from where the light falls in the image, and take this into account when creating a new background. In short, the times of long exposure of light in Photoshop are forever gone.",
  "https://app.chathub.gg/":"The service will compare different neurons. GPT-4, Claude 3.5, Liama 3 and other AIs are collected here. You just throw in a request and see which neural network did better. The perfect way to choose the right AI assistant. Authorization is required.",
  "https://dubverse.ai/":"Allows you to make your videos multilingual with the click of a button. Need login.",
  "https://huggingface.co/spaces/gokaygokay/AuraSR-v2":"The service will improve the quality of any picture by 8 times. It works for free, right in the browser.",
  "https://copilot2trip.com/":"A personalized AI-powered travel assistant with maps. Just tell him where and when you want to go, and he will offer personalized plans with recommended destinations and attractions.",
  "https://rugpt.io/chat-gpt-dlya-rerajta-teksta":"The service supports many models, including the GT-4o mini.",
  "https://chat.eqing.tech/":"The service supports many models, including the GT-4o mini.",
  "https://huggingface.co/spaces/finegrain/finegrain-object-eraser":"A service that removes any object from a photo. Just throw in the photo and write what needs to be deleted",
  "https://huggingface.co/spaces/finegrain/finegrain-image-enhancer":"We improve the quality of images right in the browser. The service works absolutely free of charge. Throw in the picture and get an improved version.",
  "https://julius.ai/ai-chatbot":"Free chat, have limit and dark them. Free models: GPT-4o, GPT-3.5, Claude Hiku, Claude Sonnet, Gemeni 1.5, Gemeni Flash, Command R, Llama 3.",
  "https://chatgpt5free.com/chatgpt-5-free/":"A free chat room with a lot of features and a dark theme.",
  "https://felo.ai/search":"A new search engine, fast and detailed search using AI, has a dark theme.",
  "https://rubiks.ai/":"A search engine with the ability to search using files, many models are available, the default is GPT-4o-mini. There is no dark theme.",
  "https://huggingface.co/spaces/multimodalart/flux-lora-the-explorer":"Flux's image generator produces high-quality images. There are several styles to choose from: realism, anime, paintings and others.",
  "https://kidgeni.com/":"Kidgeni allows you to generate images, books, stories, images from sketches. Note: To generate images, you must enter the query only in English. Some features are only available after registration. There is a limit: 15 requests.",
  "https://textbot.ru/":"TextBot is a neural network that will help generate, supplement, improve or rewrite text on any topic.",
  "https://www.seaart.ai/ai-tools/ai-face-swap":"A tool to combine your face with different art styles and scenes. It supports face swapping in both videos and images, making it easy to create unique and entertaining content.",
  "https://www.basedgpt.chat/":"GPT-3.5 Trubo is free, chat works without registration.",
  "https://llmplayground.net/":"A site with a dark theme and a large selection of LLMs.",
  "https://www.farfalle.dev":"A free search engine, with a dark theme, GPT-3.5 Turbo and LLAMA 3-70B are available.",
  "https://www.pizzagpt.it/en":"Free Chat GPT-3.5 Turbo, a site with a dark theme.",
  "https://www.turboseek.io":"Free AI search engine, using LLAMA 3-8B or Mixtrai 8x7B.",
  "https://www.xdash.ai":"A free search engine that uses AI to improve search results.",
  "https://chatify-ai.vercel.app/":"Free chat with LLAMA, has a dark theme.",
  "https://www.teach-anything.com/":"A free tool that will help you learn anything.",
  "https://discopixel.app/animator":"AI allows you to bring faces in photos to life in a couple of clicks. The service works for free. Choose a photo, choose an emotion and you're done.",
  "https://huggingface.co/spaces/Kwai-Kolors/Kolors-Virtual-Try-On":"Kolors Virtual is a neural network that can change a person's clothes using AI. Everything is as simple as possible: upload your photo to the left field, and a picture with clothes to the right.",
  "https://github.com/ToonCrafter/ToonCrafter": "An open-source video interpolation model that is configured for the production of cartoon videos. It requires two images – the beginning and end of your video or animation (also known as keyframes). The AI then uses these two images to generate and interpolate the motion of the fluid between frames. This can save valuable time for sketchers and illustrators who make animations, as they no longer have to draw each frame individually.",
  "https://peopleai.app/?_gl=1*gapbb3*_gcl_au*MTMwMjI4MDI1OS4xNzI0Njc3NDg5*_ga*MjA1Mjk5NTAxOC4xNzI0Njc3NDg5*_ga_QJSPV2MRPV*MTcyNDY3NzQ4OC4xLjAuMTcyNDY3NzQ4OC4wLjAuMA":"AI chatbots, allowing you to converse with and learn from some of the most influential and significant figures in human history.",
  "https://www.pixelcut.ai/":"The service will remove the background from the picture, remove unnecessary objects and improve the quality.",
  "https://www.segmind.com/":"Segmind has dozens of different models for creating and processing images: Stable Diffusion XL, Dream Shaper or the same Kandinsky. There is a free plan.",
  "https://toolbaz.com/":"ToolBaz offers an impressive suite of over 30 free AI writing tools to help writers and content creators."
};

var websiteDescriptionsRu = {
    "https://duck.ai/": "Бесплатно: Claude3 Hiku, GPT-4o-mini, Llama3.1 70B, Mixtral 8x7B",
    "https://thinkany.ai/": "Бесплатно: Claude 3 Haiku, GPT-4o-mini, Gemeni Flash 1.5. На сайте есть темная тема. Нужна авторизация.",
    "https://www.phind.com": "Phind LLM. Бесплатная поисковая система. На сайте есть темная тема.",
    "https://www.prefind.ai/": "Бесплатная поисковая система, доступны модели: Llama 3, Claude 3",
    "https://www.blackbox.ai/": "Бесплатно: BlackBox AI LLM. На сайте есть темная тема.",
    "https://www.perplexity.ai/": "Perplexity Ai. Бесплатная поисковая система. На сайте есть темная тема.",
    "https://chat.tune.app/": "Бесплатно: Llama 3.1 405B, Llama 3.1 8B, Llama 3 70B, Mixtral 8x7B, Tune wizardlm 2 8x22B, Tune mythomax l2 13B. Другие LLM доступны после регистрации. На сайте есть темная тема.",
    "https://labs.perplexity.ai/": "Бесплатно: Llama 3.1 70B, Llama 3.1 8B, Gemma-2 9B, Gemma-2 27B, Mixtral 8x7B. На сайте есть темная тема.",
    "https://jeeves.ai/": "Бесплатная поисковая система, доступны модели: Jeeves LLM. На сайте есть темная тема.",
    "https://bagoodex.io/": "Бесплатная поисковая система. Бесплатный LLM: GPT-4o, BaGooDex чат и другие инструменты. На сайте есть темная тема.",
    "https://www.aiuncensored.info": "Бесплатно GPT-3.5. На сайте есть темная тема.",
    "https://huggingface.co/spaces/Qwen/Qwen2-72B-Instruct": "Бесплатно: Qwen2-72B-Instruct",
    "https://chat.tinycms.xyz:3002/#/chat": "GPT-4 и другие модели бесплатно, но с ограничениями. На сайте есть темная тема.",
    "https://you.com/search?q=hi&fromSearchBar=true&tbm=youchat": "Бесплатно: You Chat LLM, GPT-4o (с ограничениями). На сайте есть темная тема.",
    "https://finechat.ai/ru/app": "Бесплатно GPT-4o (с ограничениями)",
    "https://gpt-4o.biz/playground": "Бесплатно: GPT-4o (с ограничениями)",
    "https://gpt4o.so/ru/app": "GPT4o (с ограничениями)",
    "https://iask.ai/": "Бесплатная поисковая система и другие инструменты ИИ.",
    "https://www.popai.pro/": "Бесплатно GPT и другие инструменты ИИ, но требуется вход в систему и у этого сервиса есть ограничения.",
    "https://useadrenaline.com/": "Бесплатный ИИ для программистов, позволяет анализировать репозитории на GitHub.",
    "https://gpt.h2o.ai/": "Бесплатный LLM.",
    "https://chat.lmsys.org/": "Большая платформа для тестирования различных ИИ. Некоторые имеют ограничения. На сайте есть темная тема, также возможно использовать несколько LLM одновременно.",
    "https://chat.deepseek.com/": "ИИ для программистов, отлично справляется с написанием кода, но требуется регистрация.",
    "https://chatgate.ai/gpt4/": "Бесплатно: ChatGPT-4 и другие инструменты, но с ограничениями.",
    "https://agentgpt.reworkd.ai/ru": "Это сервис, который может находить решения ваших проблем. Просто напишите, что вам нужно, и он предложит варианты. Требуется регистрация. На сайте есть темная тема.",
    "https://smartbuddy.ru/models/gpt-4-omni": "Бесплатно GPT-4o, с ограничениями.",
    "https://andisearch.com/": "Бесплатная поисковая система.",
    "https://anonchatgpt.com/": "Бесплатно GPT-3.5. На сайте есть темная тема.",
    "https://aoyo.ai/": "Бесплатная поисковая система.",
    "https://pi.ai/talk": "Бесплатный ИИ-ассистент.",
    "https://gpt-chatbot.ru/chat-gpt-ot-openai-dlya-generacii-teksta": "Бесплатно: Чат-бот",
    "https://devv.ai/": "ИИ для программистов, включает чат с LLM: Gemeni 1.5 и Claude 3 (требуется регистрация), веб-поиск и работа с GitHub, но требуется вход в систему.",
    "https://huggingface.co/spaces/THUDM/CodeGeeX": "Бесплатный Codex LLM для программистов.",
    "https://www.cleeai.com/": "Бесплатная поисковая система, с ограничениями, требуется вход в систему.",
    "https://app.anakin.ai/discover": "Множество LLM и инструментов ИИ, на сайте есть темная тема, с ограничениями.",
    "https://chatgptchatapp.com": "Бесплатно GPT-3.5.",
    "https://character.ai": "Бесплатный персонализированный чат, требуется вход в систему.",
    "https://chat.chatgptdemo.net": "GPT 3.5 Turbo. Бесплатно, лимит 15 запросов.",
    "https://leingpt.ru/chat/": "Бесплатно GPT, не работает с блокировщиком рекламы. На сайте есть темная тема, с ограничениями.",
    "https://promptboom.com/PowerChat/PowerChatTalk": "Бесплатные ИИ-сервисы, но требуется регистрация и есть ограничения.",
    "https://pbot2.bus1.skybyte.me/#/chat/1002": "Бесплатный чат, но нет SSL-сертификата.",
    "https://chataibot.ru/app/free-chat": "Бесплатный чат (GPT-3.5 Turbo).",
    "https://chat.mistral.ai/chat": "Бесплатный чат Mistral (требуется вход в систему)",
    "https://yep.com/chat/": "Бесплатный поиск и чат Yep.",
    "https://share.wendaalpha.net": "Бесплатно GPT-4o, на сайте есть темная тема, но отвечает только на китайском.",
    "https://groq.com/": "Бесплатный GPT, блокирует запросы из РФ.",
    "https://ya.ru/": "Бесплатно Yandex GPT",
    "https://talkai.info/ru/": "Бесплатно Gpt-3.5, с ограничениями, на сайте есть темная тема.",
    "https://ai.mitup.ru/chatgpt-free": "Бесплатный чат",
    "https://www.anytopic.io": "Бесплатные модели Claude, но требуется регистрация.",
    "https://codepal.ai/": "Бесплатный чат, но требуется вход в систему.",
    "https://t.me/EdyaAIrobot": "Бесплатный чат-бот в Telegram",
    "https://github.com/KudoAI/googlegpt": "Интегрирует GPT Chat в поисковую систему. Для корректной работы рекомендую включить мод API в настройках.",
    "https://github.com/KudoAI/duckduckgpt": "Интегрирует GPT Chat в поисковую систему. Для корректной работы рекомендую включить мод API в настройках.",
    "https://github.com/KudoAI/bravegpt": "Интегрирует GPT Chat в поисковую систему. Для корректной работы рекомендую включить мод API в настройках.",
    "https://github.com/Processori7/llm/releases": "Это программа, которая позволяет использовать различные LLM бесплатно. Внимание: Windows Defender может сработать.",
    "https://aibro.io/article/": "Это бесплатный генератор статей, просто введите тему.",
    "https://dezgo.com/": "Бесплатный генератор изображений, доступно много моделей.",
    "https://perchance.org/ai-text-to-image-generator": "Бесплатный генератор изображений.",
    "https://fusionbrain.ai/": "Бесплатный генератор изображений и видео. Использует модель Кандинского. Требуется вход в систему.",
    "https://shedevrum.ai/text-to-image/": "Бесплатный генератор изображений от Яндекса. Требуется вход в систему.",
    "https://ideogram.ai/": "Бесплатный генератор изображений, требуется вход в систему.",
    "https://dall-e-2.ru/": "Бесплатный генератор изображений.",
    "https://www.craiyon.com/": "Бесплатный генератор изображений, генерирует картину и показывает похожие.",
    "https://stabledifffusion.com/": "Бесплатный генератор изображений.",
    "https://dreamlike.art/create": "Бесплатный генератор изображений, но требуется вход в систему.",
    "https://huggingface.co/spaces/gokaygokay/Kolors": "Бесплатный генератор изображений.",
    "https://magnific.ai/": "Сервис, который улучшает качество фотографий с помощью алгоритмов ИИ. Требуется вход в систему.",
    "https://dewatermark.ai/ru": "Сервис, который удваивает любой водяной знак.",
    "https://magic-eraser.ai": "С помощью Imgedit AI eraser вы можете удалить нежелательные объекты из ваших фотографий онлайн бесплатно за считанные секунды!",
    "https://huggingface.co/spaces/ehristoforu/dalle-3-xl-lora-v2": "Бесплатный генератор изображений Dalle-3.",
    "https://ru.aiseesoft.com/watermark-remover-online/#": "Сервис, который удваивает любой водяной знак.",
    "https://remaker.ai/en": "Сервис, который меняет лица на фотографиях.",
    "https://huggingface.co/spaces/stabilityai/stable-diffusion-3-medium": "Бесплатный генератор изображений Stable-diffusion-3-medium.",
    "https://huggingface.co/spaces/mukaist/DALLE-4K": "Бесплатный генератор изображений DALLE-4K.",
    "https://picwish.com/photo-enhancer": "Сервис, который улучшает качество фотографий.",
    "https://www.artguru.ai/": "Бесплатный генератор изображений, без регистрации, с возможностью выбора стиля.",
    "https://www.veed.io/": "Бесплатный генератор видео. Требуется вход в систему.",
    "https://app.runwayml.com/": "Бесплатный генератор видео. Требуется вход в систему.",
    "https://videodubber.ai/": "Бесплатный генератор видео. Требуется вход в систему.",
    "https://www.typeframes.com/": "Бесплатный генератор видео. Требуется вход в систему.",
    "https://maestra.ai/tools/video-translator": "Бесплатный видеопереводчик. Требуется вход в систему.",
    "https://pika.art/login": "Бесплатный генератор видео. Требуется вход в систему.",
    "https://www.genmo.ai/": "Бесплатный генератор видео. Требуется вход в систему.",
    "https://huggingface.co/spaces/KwaiVGI/LivePortrait": "Сервис, который позволяет оживить портреты.",
    "https://ltx.studio": "Бесплатный генератор видео. Требуется вход в систему. Демонстрация.",
    "https://www.hedra.com/": "Бесплатный генератор видео. Требуется вход в систему.",
    "https://gamma.app/": "Бесплатный генератор презентаций. Требуется вход в систему.",
    "https://slidesgo.com/": "Бесплатный генератор презентаций. Требуется вход в систему.",
    "https://www.crystalsound.ai/": "CrystalSound: ваше умное приложение для подавления шума и записи экрана. Бесплатно, но требуется вход в систему.",
    "https://diktatorial.com/": "Онлайн инструмент для мастеринга аудио и музыки | DIKTATORIAL Suite. Бесплатно, но требуется вход в систему.",
    "https://huggingface.co/spaces/Xenova/whisper-webgpu": "Бесплатный аудиопереводчик в реальном времени.",
    "https://elevenlabs.io/": "Бесплатные аудиосервисы. Требуется вход в систему.",
    "https://hidola.ai/en": "Бесплатный TODO-сервис. Требуется вход в систему.",
    "https://simplified.com/": "Бесплатный TODO-сервис. Требуется вход в систему.",
    "https://huggingface.co/spaces/TencentARC/PhotoMaker-Style": "Сервис генерации аватаров. Загрузите несколько своих фотографий, напишите запрос, выберите стиль и готово.",
    "https://app.scenario.com/upscale": "Scenario — это инструмент для создания игровых персонажей с использованием ИИ.",
    "https://easywithai.com/tools/vidiq": "Это инструмент роста для создателей YouTube, который теперь имеет функции ИИ.",
    "https://www.noota.io/": "Нейронная сеть, которая извлекает информацию из любых встреч, включая конференции, голосовые сообщения и подкасты.",
    "https://smartbuddy.ru/models/gpt-4o-mini": "Чат с GPT-4o-mini.",
    "https://websim.ai/": "ИИ ответит на вопросы и также создаст что угодно! Все версии Claude и GPT-4o доступны, но требуется регистрация.",
    "https://spline.design/": "Генератор 3D-моделей на основе нейронной сети прямо в браузере. Требуется регистрация.",
    "https://mojo-app.com/ai": "ИИ для анимации логотипов.",
    "https://www.fontspace.com/": "Сервис для дизайнеров с 120 тысячами шрифтов в одном месте, бесплатно. Также есть генератор и автоматизированный поиск.",
    "https://huggingface.co/spaces/Xenova/whisper-word-level-timestamps": "Нейронная сеть быстро и бесплатно преобразует видео в текст. Сервис работает прямо в браузере. Загрузите исходник и получите транскрипцию.",
    "https://huggingface.co/spaces/gokaygokay/Tile-Upscaler": "Нейронная сеть, которая позволяет улучшать размытые фотографии прямо в вашем браузере. Бесплатный аналог Upscayl с максимальным увеличением 20x.",
    "https://github.com/Anjok07/ultimatevocalremovergui/releases": "Сервис ИИ отделяет музыку от вокала и делит трек на отдельные дорожки. Сервис полностью бесплатен и позволяет извлекать из музыкальных композиций.",
    "https://huggingface.co/spaces/yizhezhu/MoMA_zeroGPU": "ИИ сгенерирует изображение из другого изображения бесплатно. Вы получите качественную работу на основе другого. Напишите запрос, загрузите ссылку и получите результат. Все можно настроить под себя, нейронная сеть имеет гибкий редактор.",
    "https://klingai.com/": "Kling создает классные видео и изображения по запросу.",
    "https://www.gling.ai/": "Gling — нейронная сеть для начинающих блогеров. Она сможет удалить слова-паразиты, паузы и другие звуки, которые портят контент. Значительно упростит монтаж и сэкономит много времени.",
    "https://www.superupscaler.com/": "Сервис быстро улучшает качество изображений прямо в браузере. Вам просто нужно загрузить исходник.",
    "https://huggingface.co/spaces/lllyasviel/IC-Light": "Сервис на основе нейронной сети способен определить, как и откуда падает свет на изображение, и учитывать это при создании нового фона. Короче говоря, времена долгой экспозиции света в Photoshop навсегда ушли.",
    "https://app.chathub.gg/": "Сервис сравнивает различные нейронные сети. Здесь собраны GPT-4, Claude 3.5, Liama 3 и другие ИИ. Просто загрузите запрос и посмотрите, какая нейронная сеть справилась лучше. Идеальный способ выбрать подходящего ИИ-ассистента. Требуется авторизация.",
    "https://dubverse.ai/": "Позволяет сделать ваши видео многоязычными одним нажатием кнопки. Требуется вход в систему.",
    "https://huggingface.co/spaces/gokaygokay/AuraSR-v2": "Сервис улучшает качество любого изображения в 8 раз. Работает бесплатно, прямо в браузере.",
    "https://copilot2trip.com/": "Персонализированный ИИ-ассистент по путешествиям с картами. Просто скажите ему, куда и когда вы хотите поехать, и он предложит персонализированные планы с рекомендованными направлениями и достопримечательностями.",
    "https://rugpt.io/chat-gpt-dlya-rerajta-teksta": "Сервис поддерживает множество моделей, включая GT-4o mini.",
    "https://chat.eqing.tech/": "Сервис поддерживает множество моделей, включая GT-4o mini.",
    "https://huggingface.co/spaces/finegrain/finegrain-object-eraser": "Сервис, который удаляет любой объект из фотографии. Просто загрузите фото и напишите, что нужно удалить.",
    "https://huggingface.co/spaces/finegrain/finegrain-image-enhancer": "Мы улучшаем качество изображений прямо в браузере. Сервис работает абсолютно бесплатно. Загрузите изображение и получите улучшенную версию.",
    "https://julius.ai/ai-chatbot": "Бесплатный чат, с ограничениями и темной темой. Бесплатные модели: GPT-4o, GPT-3.5, Claude Hiku, Claude Sonnet, Gemeni 1.5, Gemeni Flash, Command R, Llama 3.",
    "https://chatgpt5free.com/chatgpt-5-free/":"Бесплатный чат с множеством возможностей и тёмной темой оформления.",
    "https://felo.ai/search":"Новая поисковая система, быстрый и подробный поиск с использованием ИИ, есть тёмная тема оформления.",
    "https://rubiks.ai/":"Поисковая система с возможность поиска с использованием файлов, доступны множества моделей, по умолчанию используется GPT-4o-mini. Нет тёмной темы оформления.",
    "https://huggingface.co/spaces/multimodalart/flux-lora-the-explorer":"Генератор картинок Flux создаёт изображения высокого качества. На выбор доступно несколько стилей: реализм, аниме, картины и другие.",
    "https://kidgeni.com/":"Kidgeni позволяет генерировать изображения, книги, истории, изображения из набросков. Внимание: для генерации изображений запрос нужно вводить только на ангийском языке. Некоторые функции доступны только после регистрации. Есть лимит: 15 запросов.",
    "https://textbot.ru/":"TextBot — нейросеть которая поможет сгенерировать, дополнить, улучшить или отрерайтить текст на любую тему.",
    "https://www.seaart.ai/ai-tools/ai-face-swap":"Инструмент для объединения вашего лица с различными художественными стилями и сценами. Он поддерживает обмен лицами как в видео, так и в изображениях, что облегчает создание уникального и развлекательного контента.",
    "https://www.basedgpt.chat/":"Беспалтный GPT-3.5 Trubo, чат работает без регистрации.",
    "https://llmplayground.net/":"Сайт с тёмной темой оформления и большим выбором LLM.",
    "https://www.farfalle.dev":"Бесплатный поисковый движок, с тёмной темой оформления, доступны GPT-3.5 Turbo и LLAMA 3-70B.",
    "https://www.pizzagpt.it/en":"Бесплатный Chat GPT-3.5 Turbo,  сайт с тёмной темой оформления.",
    "https://www.turboseek.io":"Бесплатная поисковая система с ИИ, используются LLAMA 3-8B или Mixtrai 8x7B.",
    "https://www.xdash.ai":"Бесплатная поисковая система, использует ИИ для улучшения результатов поиска.",
    "https://chatify-ai.vercel.app/":"Бесплатный чат с LLAMA, есть тёмная тема оформления.",
    "https://www.teach-anything.com/":"Бесплатный инструмент, который поможет выучить что угодно, русский язык пока не поддерживается.",
    "https://discopixel.app/animator":"ИИ позволяет оживить лица на фотографиях в пару кликов. Сервис работает бесплатно.  Выбираем фото, выбираем эмоцию и готово.",
    "https://huggingface.co/spaces/Kwai-Kolors/Kolors-Virtual-Try-On":"Kolors Virtual — нейросеть которая может переодевать человека с помощью ИИ. Всё максимально просто: в левое поле загружаем своё фото, а в правое — картинку с одеждой.",
    "https://github.com/ToonCrafter/ToonCrafter":"Модель интерполяции видео с открытым исходным кодом, которая настроена для производства мультипликационных видео. Для этого требуется два изображения - начало и конец вашего видео или анимации (также известные как ключевые кадры). Затем ИИ использует эти два изображения для генерации и интерполяции движения жидкости между кадрами. Это может сэкономить драгоценное время для эскизов и иллюстраторов, которые делают анимацию, так как им больше не нужно рисовать каждый кадр по отдельности.",
    "https://peopleai.app/?_gl=1*gapbb3*_gcl_au*MTMwMjI4MDI1OS4xNzI0Njc3NDg5*_ga*MjA1Mjk5NTAxOC4xNzI0Njc3NDg5*_ga_QJSPV2MRPV*MTcyNDY3NzQ4OC4xLjAuMTcyNDY3NzQ4OC4wLjAuMA":"Чат-боты с искусственным интеллектом, позволяющие общаться и учиться у некоторых из самых влиятельных и значимых фигур в истории человечества.",
    "https://www.pixelcut.ai/":"Сервис уберёт фон с картинки, удалит лишние объекты и улучшит качество.",
    "https://www.segmind.com/":"В Segmind собраны десятки различных моделей для создания и обработки изображений: Stable Diffusion XL, Dream Shaper или тот же Kandinsky. Есть бесплатный тарифный план.",
    "https://toolbaz.com/":"ToolBaz предлагает впечатляющий набор из более чем 30 бесплатных инструментов для написания искусственного интеллекта, чтобы помочь писателям и создателям контента."
};

  initializePage();
  initializePopup();
});