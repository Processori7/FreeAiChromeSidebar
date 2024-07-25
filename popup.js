document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.getElementById("openInNewTab");
  checkbox.checked = JSON.parse(localStorage.getItem("openInNewTab")) || false;

  function updateCheckboxState() {
      localStorage.setItem("openInNewTab", checkbox.checked);
  }
  checkbox.addEventListener("change", updateCheckboxState);

  let listItems = document.querySelectorAll("li");
  let originalContent = document.body.innerHTML; // Save original content

  function initializePage() {
      listItems = document.querySelectorAll("li");
      listItems.forEach((li) => {
          li.addEventListener("click", function () {
              let website = this.getAttribute("data-website");

              //filters
              let blockSites = ["https://duckduckgo.com/", "https://www.phind.com", "https://www.perplexity.ai/", 
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
              "https://klingai.com/"];
        
              if (checkbox.checked) {
                  window.open(website, '_blank');
              } else {
                if (blockSites.includes(website))
                  {
                    let answer = confirm("Attention! This site can't be opened in the sidebar, should I open it in a new tab?");
                    if (answer) {
                    
                      window.open(website, '_blank');
                    }
                  }
                  else{
                    // Hide original content and create or update iframe
                    document.body.innerHTML = ''; // Clear body content

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

                    // Create Back button
                    let backButton = document.createElement("button");
                    backButton.textContent = "Back to menu";
                    backButton.style.position = "fixed";
                    backButton.style.top = "10px";
                    backButton.style.left = "10px";
                    backButton.style.zIndex = "1000";
                    backButton.style.backgroundColor= "#242582";
                    backButton.style.color = "#FFFF00";
                    backButton.style.margin = "10px";
                    backButton.addEventListener("click", function () {
                        document.body.innerHTML = originalContent;
                        initializePage(); // Re-initialize event listeners
                    });
                    document.body.appendChild(backButton);
                  }
              }
          });
      });
	  initializePopup();
  }
  
  function initializePopup() {
  var aiMenuItems = document.querySelectorAll('#aiMenu li');
  var popup = document.createElement('div');
  popup.classList.add('popup');

  aiMenuItems.forEach(function(item) {
    item.addEventListener('mouseover', function() {
      var website = this.getAttribute('data-website');
      var description = websiteDescriptions[website];
      popup.textContent = description;
      this.appendChild(popup);
    });
    item.addEventListener('mouseout', function() {
      this.removeChild(popup);
    });
  });
}

var websiteDescriptions = {
  "https://duckduckgo.com/": "Free: Claude3, GPT-3.5 Turbo, Llama3 70B, Mixtral 8x7B",
  "https://thinkany.ai/": "Free: Claude 3 Haiku, DeepSeek-V2, Mixtral 8x7B, Llama 3.1 8B, GPT-4o-mini, Gemeni 1.0 Pro. There is a dark theme on the site.",
  "https://www.phind.com": "Phind LLM. Free Search Engine. There is a dark theme on the site.",
  "https://www.prefind.ai/": "Free Llama-3, Claude 3",
  "https://www.blackbox.ai/": "Free: BlackBox AI LLM. There is a dark theme on the site.",
  "https://www.perplexity.ai/": "Perplexity Ai. Free search engine. There is a dark theme on the site.",
  "https://chat.tune.app/": "Free: Llama3 70B, Llama3 8B, Mixtral 8x7b, Tune wizardlm 2 8x22b, Tune mythomax l2 13b. Other LLMs are available after registration. There is a dark theme on the site.",
  "https://labs.perplexity.ai/": "Free: Llama 3-Sonar, Llama3 70B, Llama3 8B, Gemma-2, Mixtral 8x7b, Nemotron-4-340B. There is a dark theme on the site.",
  "https://jeeves.ai/": "Free: Jeeves LLM. There is a dark theme on the site.",
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
  "https://www.yeschat.ai/claude3": "Free Yeschat Claude3, have limit.",
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
  "https://fusionbrain.ai/":"Free video generator. Need login.",
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
  "https://www.superupscaler.com/":"The service will quickly improve the quality of images right in the browser. You just need to throw in the source."

};
  
  window.addEventListener('DOMContentLoaded', function() {
	   initializePage();
     initializePopup();
    });
  initializePage();
  initializePopup();
});