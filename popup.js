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
			  "https://huggingface.co/spaces/THUDM/CodeGeeX", "https://huggingface.co/spaces/gokaygokay/Kolors"];
        
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
  }

  initializePage();
});